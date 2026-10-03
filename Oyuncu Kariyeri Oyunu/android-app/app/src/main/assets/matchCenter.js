/**
 * Rise of Greatness - Canlı TV Maç Merkezi (Quiet Luxury Broadcast)
 * ---------------------------------------------------------------------------
 * Tek çağrıyla başlar:  const mc = initMatchCenter(container, matchData);
 * Motora bağlanmak için: MatchEngine.simulate(home, away, state, mc.bind(legacyCallbacks));
 *
 *  - Kendi CSS'ini dinamik enjekte eder (harici stil dosyası gerekmez).
 *  - Deterministik durum makinesi: IDLE, KICKOFF, LIVE_TICK, PRESSURE_BUILDUP,
 *    CLUTCH_DECISION, RESOLVING_OUTCOME, FULLTIME.
 *  - Olay kartları 12 elemanlı sabit DOM havuzunda yeniden kullanılır (createElement yok).
 *  - Tüm hareketler tek bir yay fiziği çözücüsüyle (stiffness 180, damping 12) sürülür.
 *  - Harici ses dosyası yoktur: Web Audio API ile prosedürel sentez.
 *  - Kariyer verisi (GAME.state, lig puanı, istatistikler) ASLA yazılmaz; yalnızca okunur.
 *    Maç sonucu ve seçim çözümleme tamamen mevcut MatchEngine tarafından yapılır.
 */
(function (global) {
    "use strict";

    // ======================================================================
    // 0. SABİTLER
    // ======================================================================
    var POOL_SIZE = 12;          // Olay kartı havuzu
    var MAX_OPTIONS = 5;         // Karar plaketi havuzu
    var CLUTCH_MS = 11000;       // Karar süresi (11 saniye)
    var FEED_GAP = 8;            // Kartlar arası boşluk (px)
    var STIFFNESS = 180;         // Yay sertliği
    var DAMPING = 12;            // Yay sönümü
    var PHYS_STEP = 1 / 240;     // Sabit fizik adımı (sn)
    var STYLE_ID = "rgmc-style-v1";

    var STATE = Object.freeze({
        IDLE: "IDLE",
        KICKOFF: "KICKOFF",
        LIVE_TICK: "LIVE_TICK",
        PRESSURE_BUILDUP: "PRESSURE_BUILDUP",
        CLUTCH_DECISION: "CLUTCH_DECISION",
        RESOLVING_OUTCOME: "RESOLVING_OUTCOME",
        FULLTIME: "FULLTIME"
    });

    var TRANSITIONS = {
        IDLE: ["KICKOFF", "FULLTIME"],
        KICKOFF: ["LIVE_TICK", "PRESSURE_BUILDUP", "CLUTCH_DECISION", "RESOLVING_OUTCOME", "FULLTIME"],
        LIVE_TICK: ["PRESSURE_BUILDUP", "CLUTCH_DECISION", "RESOLVING_OUTCOME", "FULLTIME"],
        PRESSURE_BUILDUP: ["LIVE_TICK", "CLUTCH_DECISION", "RESOLVING_OUTCOME", "FULLTIME"],
        CLUTCH_DECISION: ["RESOLVING_OUTCOME", "FULLTIME"],
        RESOLVING_OUTCOME: ["LIVE_TICK", "PRESSURE_BUILDUP", "CLUTCH_DECISION", "FULLTIME"],
        FULLTIME: ["IDLE"]
    };

    var STATE_LABEL = {
        IDLE: "HAZIR",
        KICKOFF: "MAÇ BAŞLIYOR",
        LIVE_TICK: "CANLI AKIŞ",
        PRESSURE_BUILDUP: "BASKI ARTIYOR",
        CLUTCH_DECISION: "KRİTİK ANLAR",
        RESOLVING_OUTCOME: "POZİSYON SONUÇLANIYOR",
        FULLTIME: "MAÇ SONU"
    };

    // Olay türü -> kart sınıfı / rozet (önceden üretilmiş sabit dizgiler)
    var CARD_CLASS = {
        goal: "rgmc-card rgmc-t-goal",
        conceded: "rgmc-card rgmc-t-conceded",
        "var": "rgmc-card rgmc-t-var",
        red: "rgmc-card rgmc-t-red",
        yellow: "rgmc-card rgmc-t-yellow",
        foul: "rgmc-card rgmc-t-foul",
        defense: "rgmc-card rgmc-t-defense",
        tactic: "rgmc-card rgmc-t-tactic",
        turnover: "rgmc-card rgmc-t-turnover",
        result: "rgmc-card rgmc-t-result",
        normal: "rgmc-card rgmc-t-normal"
    };

    var BADGE_TEXT = {
        goal: "⚽ GOL",
        conceded: "RAKİP GOLÜ",
        "var": "⚖️ VAR KONTROLÜ",
        red: "🟥 KIRMIZI KART",
        yellow: "🟨 SARI KART",
        foul: "⚠️ FAUL VE TEHLİKE",
        defense: "🛡️ SAVUNMA",
        tactic: "🔄 TAKTİK",
        turnover: "⏱️ TELAŞLI TOP KAYBI",
        result: "🎯 POZİSYON SONUCU",
        normal: ""
    };

    var IMPORTANT = { goal: 1, conceded: 1, "var": 1, red: 1, yellow: 1, turnover: 1, result: 1 };

    // ======================================================================
    // 1. YARDIMCILAR
    // ======================================================================
    function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
    function num(v, d) { v = Number(v); return isFinite(v) ? v : d; }
    function nowMs() { return (global.performance && performance.now) ? performance.now() : Date.now(); }

    function el(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }

    function vibrate(pattern) {
        try { if (global.navigator && typeof navigator.vibrate === "function") navigator.vibrate(pattern); } catch (e) { /* sessiz */ }
    }

    var RE_EMOJI = /[\p{Extended_Pictographic}\uFE0F\u200D]/gu;
    var RE_LEAD_ICON = /^[\p{Extended_Pictographic}][\p{Extended_Pictographic}\uFE0F\u200D]*/u;
    var RE_LEAD_JUNK = /^[^\p{L}\p{N}]+/u;

    function stripEmoji(text) {
        return String(text == null ? "" : text).replace(RE_EMOJI, "").replace(/\s+/g, " ").trim();
    }

    function normalizeKey(text) {
        return stripEmoji(text).toLocaleLowerCase("tr").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    }

    // ======================================================================
    // 2. YAY FİZİĞİ (Stiffness 180 / Damping 12)
    // ======================================================================
    function Spring(world, opts) {
        opts = opts || {};
        this.world = world;
        this.x = num(opts.x, 0);
        this.v = 0;
        this.target = num(opts.target, this.x);
        this.k = num(opts.k, STIFFNESS);
        this.c = num(opts.c, DAMPING);
        this.eps = num(opts.eps, 0.0006);
        this.slowable = opts.slowable !== false;
        this.onUpdate = opts.onUpdate || null;
        this.resting = true;
        world.springs.push(this);
    }
    Spring.prototype.set = function (target) {
        this.target = target;
        this.resting = false;
        this.world.wake();
    };
    Spring.prototype.snap = function (value) {
        this.x = value;
        this.target = value;
        this.v = 0;
        this.resting = true;
        if (this.onUpdate) this.onUpdate(this.x);
    };
    Spring.prototype.kick = function (impulse) {
        this.v += impulse;
        this.resting = false;
        this.world.wake();
    };

    function SpringWorld() {
        this.springs = [];
        this.hooks = [];
        this.running = false;
        this.dead = false;
        this.timeScale = 1;
        this._last = 0;
        this._raf = 0;
        var self = this;
        this._frame = function (t) { self._step(t); };
        this.reduced = !!(global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
    SpringWorld.prototype.wake = function () {
        if (this.running || this.dead) return;
        this.running = true;
        this._last = nowMs();
        this._raf = global.requestAnimationFrame(this._frame);
    };
    SpringWorld.prototype.dispose = function () {
        this.dead = true;
        this.running = false;
        if (this._raf) global.cancelAnimationFrame(this._raf);
        this.springs.length = 0;
        this.hooks.length = 0;
    };
    SpringWorld.prototype.integrate = function (s, dt) {
        var steps = Math.max(1, Math.ceil(dt / PHYS_STEP));
        var h = dt / steps;
        for (var i = 0; i < steps; i++) {
            var a = -s.k * (s.x - s.target) - s.c * s.v;   // kütle = 1
            s.v += a * h;                                    // yarı-örtük Euler (kararlı)
            s.x += s.v * h;
        }
    };
    SpringWorld.prototype._step = function (t) {
        if (this.dead) return;
        var real = Math.min(0.05, Math.max(0, (t - this._last) / 1000));
        this._last = t;
        var active = false;
        var list = this.springs;
        for (var i = 0; i < list.length; i++) {
            var s = list[i];
            if (s.resting) continue;
            if (this.reduced) {
                s.x = s.target; s.v = 0; s.resting = true;
            } else {
                this.integrate(s, s.slowable ? real * this.timeScale : real);
                if (Math.abs(s.x - s.target) < s.eps && Math.abs(s.v) < s.eps * 6) {
                    s.x = s.target; s.v = 0; s.resting = true;
                } else {
                    active = true;
                }
            }
            if (s.onUpdate) s.onUpdate(s.x);
        }
        for (var j = 0; j < this.hooks.length; j++) this.hooks[j]();
        if (active) {
            this._raf = global.requestAnimationFrame(this._frame);
        } else {
            this.running = false;
        }
    };

    // ======================================================================
    // 3. NİTELİK MATEMATİĞİ (karakter istatistiğine bağlı dinamik olasılık)
    // ======================================================================
    var AttributeModel = {
        derive: function (a) {
            a = a || {};
            var speed = num(a.speed, 50), dribbling = num(a.dribbling, 50), passing = num(a.passing, 50);
            var shooting = num(a.shooting, 50), physical = num(a.physical, 50);
            var stamina = num(a.kondisyon, 100), morale = num(a.moral, 100), chem = num(a.takimUyumu, 50);
            return {
                pace: speed,
                agility: dribbling * 0.6 + speed * 0.4,
                vision: passing * 0.7 + chem * 0.15 + dribbling * 0.15,
                passing: passing,
                shooting: shooting,
                physical: physical,
                form: clamp(0.86 + stamina * 0.0009 + morale * 0.0005, 0.80, 1.0)
            };
        },
        kindOf: function (text) {
            var t = String(text || "").toLocaleLowerCase("tr");
            if (/verkaç|depar|hız|sıyrıl|birebir/.test(t)) return "burst";
            if (/ara pas|kilit|asist|orta\b|pas\b/.test(t)) return "killer_pass";
            if (/şut|vuruş|plase|röveşata|aşırtma|füze/.test(t)) return "long_shot";
            if (/kayarak|müdahale|omuz|sindir|kademe|pres/.test(t)) return "defend";
            if (/çalım|dribl|ikili/.test(t)) return "dribble";
            return "generic";
        },
        estimate: function (kind, attrs) {
            var d = AttributeModel.derive(attrs);
            var p;
            switch (kind) {
                case "burst":       p = 0.22 + 0.0062 * (d.pace * 0.55 + d.agility * 0.45); break;
                case "killer_pass": p = 0.20 + 0.0066 * (d.vision * 0.6 + d.passing * 0.4); break;
                case "long_shot":   p = 0.08 + 0.0050 * d.shooting + 0.0007 * d.physical; break;
                case "defend":      p = 0.24 + 0.0058 * (d.physical * 0.6 + d.pace * 0.4); break;
                case "dribble":     p = 0.20 + 0.0064 * d.agility; break;
                default:            p = 0.30 + 0.0040 * ((d.pace + d.passing + d.shooting + d.physical) / 4);
            }
            return clamp(p * d.form, 0.12, 0.90);
        }
    };

    // ======================================================================
    // 4. DURUM KORUYUCU (State Guard) + OLAY SINIFLANDIRICI
    // ======================================================================
    var RE_GOAL = /(?<!\p{L})(?:G?O{2,}L|GOL)(?!\p{L})/u;   // yalnızca büyük harfli gol çığlıkları
    var RE_CONCEDED = /MAALESEF GOL|GOL YED[İI]K|ağlarımıza|ağlarımız/iu;
    var RE_VAR = /(?<!\p{L})VAR(?!\p{L})|[Hh]akem kulaklığına/u;
    var RE_RED = /KIRMIZI KART|ihraç|oyundan atıl/iu;
    var RE_YELLOW = /SARI KART/iu;
    var RE_TURNOVER = /TELAŞLI TOP KAYBI/iu;
    var RE_DEFENSE = /kurtardı|kurtarış|kaleci|müdahale|direk|engelledi/iu;
    var RE_FOUL = /faul|tehlikeli|duran top|serbest vuruş|korner|köşe vuruşu/iu;
    var RE_TACTIC = /taktik|hoca|teknik direktör|değişiklik|oyuncu değiş/iu;

    function classify(text) {
        var t = String(text || "");
        if (RE_TURNOVER.test(t)) return "turnover";
        if (RE_RED.test(t)) return "red";
        if (RE_YELLOW.test(t)) return "yellow";
        if (RE_VAR.test(t)) return "var";
        if (RE_CONCEDED.test(t)) return "conceded";
        if (RE_GOAL.test(t)) return "goal";
        if (RE_DEFENSE.test(t)) return "defense";
        if (RE_FOUL.test(t)) return "foul";
        if (RE_TACTIC.test(t)) return "tactic";
        return "normal";
    }

    function StateGuard() {
        this.size = 14;
        this.keys = new Array(this.size);
        this.mins = new Int16Array(this.size);
        this.types = new Array(this.size);
        this.head = 0;
        this.count = 0;
        this.lastNormalMin = -99;
        this.lastNormalKey = "";
    }
    StateGuard.prototype.reset = function () {
        this.head = 0; this.count = 0; this.lastNormalMin = -99; this.lastNormalKey = "";
    };
    /** true dönerse olay akışa alınır; false ise jenerik tekrar olarak elenir. */
    StateGuard.prototype.admit = function (min, type, key) {
        if (!key) return false;
        var i, idx, eventThisMinute = false;
        for (i = 0; i < this.count; i++) {
            idx = (this.head - 1 - i + this.size) % this.size;
            if (this.keys[idx] === key) return false;                 // birebir tekrar
            if (this.mins[idx] === min) eventThisMinute = true;
        }
        if (type === "normal") {
            if (eventThisMinute) return false;                        // aynı dakikada ikinci jenerik yok
            if (min - this.lastNormalMin < 3) return false;           // jenerik anlatım aralığı
            if (this.lastNormalKey && key.slice(0, 26) === this.lastNormalKey.slice(0, 26)) return false;
            this.lastNormalMin = min;
            this.lastNormalKey = key;
        }
        idx = this.head;
        this.keys[idx] = key;
        this.mins[idx] = min;
        this.types[idx] = type;
        this.head = (this.head + 1) % this.size;
        if (this.count < this.size) this.count++;
        return true;
    };

    // ======================================================================
    // 5. PROSEDÜREL SES MOTORU (Web Audio API - harici dosya yok)
    // ======================================================================
    function SynthAudio(isMuted) {
        this.isMuted = isMuted || function () { return false; };
        this.ctx = null;
        this.master = null;
        this._pink = null;
        this._ir = null;
        this._reverbIn = null;
        this._hb = null;
        this._hbTimer = 0;
        this._hbIntensity = function () { return 0; };
        var self = this;
        this._beat = function () { self._scheduleBeat(); };
        try {
            var Ctor = global.AudioContext || global.webkitAudioContext;
            if (Ctor) {
                this.ctx = new Ctor();
                this.master = this.ctx.createGain();
                this.master.gain.value = 0.9;
                var comp = this.ctx.createDynamicsCompressor();
                comp.threshold.value = -14; comp.ratio.value = 6; comp.attack.value = 0.004; comp.release.value = 0.25;
                this.master.connect(comp);
                comp.connect(this.ctx.destination);
                this._comp = comp;
            }
        } catch (e) { this.ctx = null; }
    }
    SynthAudio.prototype.ready = function () {
        if (!this.ctx || this.isMuted()) return false;
        if (this.ctx.state === "suspended") { try { this.ctx.resume(); } catch (e) { /* sessiz */ } }
        return true;
    };
    SynthAudio.prototype.unlock = function () {
        if (this.ctx && this.ctx.state === "suspended") { try { this.ctx.resume(); } catch (e) { /* sessiz */ } }
    };
    SynthAudio.prototype._pinkBuffer = function () {
        if (this._pink) return this._pink;
        var c = this.ctx, len = Math.floor(c.sampleRate * 2);
        var buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
        var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (var i = 0; i < len; i++) {                      // Paul Kellet pembe gürültü
            var w = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
            b2 = 0.96900 * b2 + w * 0.1538520; b3 = 0.86650 * b3 + w * 0.3104856;
            b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
            d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
            b6 = w * 0.115926;
        }
        this._pink = buf;
        return buf;
    };
    SynthAudio.prototype._reverb = function () {
        if (this._reverbIn) return this._reverbIn;
        var c = this.ctx, len = Math.floor(c.sampleRate * 2.4);
        var ir = c.createBuffer(2, len, c.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = ir.getChannelData(ch);
            for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
        }
        var conv = c.createConvolver(); conv.buffer = ir;
        var wet = c.createGain(); wet.gain.value = 0.34;
        var input = c.createGain(); input.gain.value = 1;
        input.connect(conv); conv.connect(wet); wet.connect(this.master);
        this._ir = ir; this._reverbIn = input;
        return input;
    };

    /** Kalp atışı: 52Hz sinüs, değişken rezonanslı low-pass, tansiyona göre hızlanan nabız. */
    SynthAudio.prototype.startHeartbeat = function (intensityFn) {
        if (!this.ready()) return;
        this.stopHeartbeat();
        var c = this.ctx;
        var osc = c.createOscillator(), filter = c.createBiquadFilter(), gain = c.createGain();
        osc.type = "sine"; osc.frequency.value = 52;
        filter.type = "lowpass"; filter.frequency.value = 120; filter.Q.value = 3;
        gain.gain.value = 0.0001;
        osc.connect(filter); filter.connect(gain); gain.connect(this.master);
        osc.start();
        this._hb = { osc: osc, filter: filter, gain: gain };
        if (intensityFn) this._hbIntensity = intensityFn;
        this._scheduleBeat();
    };
    SynthAudio.prototype._scheduleBeat = function () {
        var hb = this._hb;
        if (!hb || !this.ctx) return;
        var c = this.ctx, t = c.currentTime + 0.02, k = clamp(this._hbIntensity(), 0, 1);
        hb.filter.frequency.setTargetAtTime(110 + 100 * k, t, 0.02);
        hb.filter.Q.setTargetAtTime(3 + 7 * k, t, 0.02);          // değişken rezonans
        var g = hb.gain.gain;
        g.cancelScheduledValues(t);
        g.setValueAtTime(0.0001, t);
        g.linearRampToValueAtTime(0.5 + 0.25 * k, t + 0.025);       // "lub"
        g.exponentialRampToValueAtTime(0.0001, t + 0.19);
        g.setValueAtTime(0.0001, t + 0.21);
        g.linearRampToValueAtTime(0.34 + 0.2 * k, t + 0.235);       // "dub"
        g.exponentialRampToValueAtTime(0.0001, t + 0.40);
        hb.osc.frequency.setValueAtTime(58, t);
        hb.osc.frequency.exponentialRampToValueAtTime(48, t + 0.18);
        hb.osc.frequency.setValueAtTime(56, t + 0.21);
        hb.osc.frequency.exponentialRampToValueAtTime(47, t + 0.38);
        this._hbTimer = global.setTimeout(this._beat, 1100 - 480 * k);
    };
    SynthAudio.prototype.stopHeartbeat = function () {
        if (this._hbTimer) { global.clearTimeout(this._hbTimer); this._hbTimer = 0; }
        var hb = this._hb;
        if (!hb) return;
        this._hb = null;
        try {
            var t = this.ctx.currentTime;
            hb.gain.gain.cancelScheduledValues(t);
            hb.gain.gain.setTargetAtTime(0.0001, t, 0.03);
            hb.osc.onended = function () {
                try { hb.osc.disconnect(); hb.filter.disconnect(); hb.gain.disconnect(); } catch (e) { /* sessiz */ }
            };
            hb.osc.stop(t + 0.2);
        } catch (e) { /* sessiz */ }
    };

    /** Krampon darbesi: filtrelenmiş pembe gürültü patlaması + 80Hz darbe osilatörü. */
    SynthAudio.prototype.kramponStrike = function () {
        if (!this.ready()) return;
        var c = this.ctx, t = c.currentTime;
        var osc = c.createOscillator(), og = c.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.exponentialRampToValueAtTime(34, t + 0.15);
        og.gain.setValueAtTime(0.7, t);
        og.gain.exponentialRampToValueAtTime(0.001, t + 0.17);
        osc.connect(og); og.connect(this.master);
        osc.start(t); osc.stop(t + 0.18);

        var src = c.createBufferSource(), lp = c.createBiquadFilter(), ng = c.createGain();
        src.buffer = this._pinkBuffer();
        lp.type = "lowpass"; lp.frequency.value = 1400; lp.Q.value = 0.7;
        ng.gain.setValueAtTime(0.55, t);
        ng.gain.exponentialRampToValueAtTime(0.001, t + 0.075);
        src.connect(lp); lp.connect(ng); ng.connect(this.master);
        src.start(t, Math.random() * 1.5, 0.09);
        src.onended = function () { try { src.disconnect(); lp.disconnect(); ng.disconnect(); } catch (e) { /* sessiz */ } };
    };

    /** Gol uğultusu: çift tonlu frekans süpürmesi + stadyum yankısı + kalabalık dalgası. */
    SynthAudio.prototype.goalSurge = function () {
        if (!this.ready()) return;
        var c = this.ctx, t = c.currentTime;
        var bus = c.createGain(), lp = c.createBiquadFilter();
        bus.gain.setValueAtTime(0.0001, t);
        bus.gain.exponentialRampToValueAtTime(0.72, t + 0.55);
        bus.gain.exponentialRampToValueAtTime(0.0001, t + 2.7);
        lp.type = "lowpass"; lp.Q.value = 0.8;
        lp.frequency.setValueAtTime(260, t);
        lp.frequency.exponentialRampToValueAtTime(950, t + 0.9);
        lp.connect(bus); bus.connect(this.master); bus.connect(this._reverb());

        var a = c.createOscillator(), b = c.createOscillator();
        a.type = "sine"; b.type = "triangle";
        a.frequency.setValueAtTime(42, t); a.frequency.exponentialRampToValueAtTime(96, t + 0.9);
        b.frequency.setValueAtTime(63, t); b.frequency.exponentialRampToValueAtTime(148, t + 0.9);
        a.connect(lp); b.connect(lp);
        a.start(t); b.start(t); a.stop(t + 2.8); b.stop(t + 2.8);

        var crowd = c.createBufferSource(), bp = c.createBiquadFilter(), cg = c.createGain();
        crowd.buffer = this._pinkBuffer(); crowd.loop = true;
        bp.type = "bandpass"; bp.frequency.value = 720; bp.Q.value = 0.6;
        cg.gain.setValueAtTime(0.0001, t);
        cg.gain.exponentialRampToValueAtTime(0.24, t + 0.8);
        cg.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);
        crowd.connect(bp); bp.connect(cg); cg.connect(this.master); cg.connect(this._reverb());
        crowd.start(t); crowd.stop(t + 2.6);
        a.onended = function () { try { a.disconnect(); b.disconnect(); lp.disconnect(); bus.disconnect(); } catch (e) { /* sessiz */ } };
        crowd.onended = function () { try { crowd.disconnect(); bp.disconnect(); cg.disconnect(); } catch (e) { /* sessiz */ } };
    };

    SynthAudio.prototype.concededThud = function () {
        if (!this.ready()) return;
        var c = this.ctx, t = c.currentTime;
        var osc = c.createOscillator(), lp = c.createBiquadFilter(), g = c.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(74, t); osc.frequency.exponentialRampToValueAtTime(32, t + 0.55);
        lp.type = "lowpass"; lp.frequency.value = 170;
        g.gain.setValueAtTime(0.55, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        osc.connect(lp); lp.connect(g); g.connect(this.master);
        osc.start(t); osc.stop(t + 0.62);
        osc.onended = function () { try { osc.disconnect(); lp.disconnect(); g.disconnect(); } catch (e) { /* sessiz */ } };
    };

    SynthAudio.prototype.pressureSwell = function () {
        if (!this.ready()) return;
        var c = this.ctx, t = c.currentTime;
        var osc = c.createOscillator(), g = c.createGain();
        osc.type = "sine"; osc.frequency.value = 52;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.16, t + 0.7);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
        osc.connect(g); g.connect(this.master);
        osc.start(t); osc.stop(t + 1.55);
        osc.onended = function () { try { osc.disconnect(); g.disconnect(); } catch (e) { /* sessiz */ } };
    };

    SynthAudio.prototype.dispose = function () {
        this.stopHeartbeat();
        var c = this.ctx;
        this.ctx = null;
        this._pink = null; this._ir = null; this._reverbIn = null;
        if (c) { try { c.close(); } catch (e) { /* sessiz */ } }
    };

    // ======================================================================
    // 6. DİNAMİK CSS (kendi stilini enjekte eder)
    // ======================================================================
    var NOISE = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

    var CSS = [
        ".rgmc-root{--rg-obsidian:#090a0d;--rg-ti-1:#161a22;--rg-ti-2:#232936;--rg-gold:#c5a059;--rg-gold-hi:#dfba73;--rg-emerald:#153e28;--rg-ruby:#6b1418;--rg-text:#ebe7de;--rg-muted:#8d94a1;--rg-edge:rgba(255,255,255,.08);position:relative;display:flex;flex-direction:column;gap:10px;flex:1 1 auto;min-height:0;width:100%;overflow:hidden;color:var(--rg-text);font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;user-select:none;-webkit-user-select:none;touch-action:manipulation}",
        ".rgmc-legacy-hidden{display:none!important}",
        ".rgmc-stage{display:flex;flex-direction:column;gap:10px;flex:1 1 auto;min-height:0;transition:filter .45s cubic-bezier(.2,.8,.2,1)}",
        ".rgmc-stage.rgmc-dim{filter:blur(10px) brightness(.5);pointer-events:none}",
        ".performance-mode .rgmc-stage.rgmc-dim{filter:brightness(.45)}",
        ".rgmc-root[data-state='CLUTCH_DECISION'] ~ #match-continue-banner, .rgmc-stage.rgmc-dim ~ #match-continue-banner{display:none!important;visibility:hidden!important;pointer-events:none!important}",
        ".broadcast-continue-banner{position:absolute!important;bottom:14px!important;left:16px!important;right:16px!important;z-index:5!important;display:flex;padding:12px 16px;margin:0!important;border:1px solid rgba(212,175,55,.35);background:linear-gradient(135deg,rgba(139,30,36,.45) 0%,rgba(18,22,30,.96) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.85);align-items:center;justify-content:space-between;gap:12px}",

        /* --- 3 katmanlı glassmorphism --- */
        ".rgmc-glass{position:relative;isolation:isolate;overflow:hidden;border:1px solid var(--rg-edge);border-radius:16px;background:linear-gradient(180deg,rgba(35,41,54,.58) 0%,rgba(9,10,13,.82) 100%);backdrop-filter:blur(28px) saturate(180%);-webkit-backdrop-filter:blur(28px) saturate(180%);box-shadow:0 18px 48px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.08),inset 0 -1px 0 rgba(0,0,0,.5)}",
        ".performance-mode .rgmc-glass{backdrop-filter:none;-webkit-backdrop-filter:none;background:linear-gradient(180deg,#1b2029,#0c0d11)}",
        ".rgmc-glass::before{content:'';position:absolute;inset:0;z-index:-2;pointer-events:none;opacity:.07;mix-blend-mode:overlay;background-image:" + NOISE + ",repeating-linear-gradient(90deg,rgba(255,255,255,.5) 0,rgba(255,255,255,.5) 1px,transparent 1px,transparent 3px)}",
        ".rgmc-glass::after,.rgmc-plaque::after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:var(--rgmc-sheen,0);transition:opacity .35s ease;background:radial-gradient(240px circle at var(--rgmc-mx,50%) var(--rgmc-my,0%),rgba(223,186,115,.13),transparent 62%),linear-gradient(112deg,transparent calc(var(--rgmc-mx,50%) - 70px),rgba(255,255,255,.07) calc(var(--rgmc-mx,50%) - 8px),rgba(223,186,115,.10) var(--rgmc-mx,50%),transparent calc(var(--rgmc-mx,50%) + 70px))}",

        /* --- Skor panosu --- */
        ".rgmc-scoreboard{padding:10px 12px 12px;display:flex;flex-direction:column;gap:9px}",
        ".rgmc-scoreboard::selection{background:transparent}",
        ".rgmc-ribbon{display:flex;align-items:center;justify-content:center;gap:7px;padding-bottom:7px;border-bottom:1px solid transparent;border-image:linear-gradient(90deg,transparent,rgba(197,160,89,.55),rgba(255,255,255,.18),rgba(197,160,89,.55),transparent) 1}",
        ".rgmc-comp-icon{font-size:12px;filter:saturate(.6)}",
        ".rgmc-comp-name{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--rg-muted)}",
        ".rgmc-score-row{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px}",
        ".rgmc-side-left{display:flex;justify-content:flex-start}",
        ".rgmc-side-right{display:flex;justify-content:flex-end;min-height:24px}",
        ".rgmc-live{display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,rgba(107,20,24,.55),rgba(60,10,13,.7));font-size:10px;font-weight:800;letter-spacing:.12em;color:#f1e4e4;box-shadow:inset 0 1px 0 rgba(255,255,255,.1)}",
        ".rgmc-live-dot{width:7px;height:7px;border-radius:50%;background:#b3262c;box-shadow:0 0 0 3px rgba(107,20,24,.45);animation:rgmc-breathe 2.4s ease-in-out infinite}",
        ".rgmc-live-min{font-variant-numeric:tabular-nums;color:var(--rg-gold-hi)}",
        ".rgmc-score{display:flex;align-items:center;gap:8px;padding:2px 14px;border-radius:12px;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.25));border:1px solid var(--rg-edge)}",
        ".rgmc-digit{display:inline-block;min-width:26px;text-align:center;font-size:34px;line-height:1.05;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:var(--rg-gold-hi);text-shadow:0 1px 0 rgba(0,0,0,.6),0 0 14px rgba(197,160,89,.18);will-change:transform}",
        ".rgmc-colon{font-size:24px;font-weight:700;color:rgba(197,160,89,.55);transform:translateY(-2px)}",
        ".rgmc-extra{display:none;padding:5px 10px;border-radius:8px;font-size:12px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--rg-gold-hi);background:linear-gradient(180deg,#2a3040,#171b24);border:1px solid rgba(197,160,89,.35);box-shadow:inset 0 1px 0 rgba(255,255,255,.1)}",
        ".rgmc-extra.rgmc-on{display:inline-block}",
        ".rgmc-teams-row{display:flex;align-items:center;justify-content:space-between;gap:10px}",
        ".rgmc-team{display:flex;align-items:center;gap:8px;min-width:0;flex:1 1 0}",
        ".rgmc-team.rgmc-away{flex-direction:row-reverse;text-align:right}",
        ".rgmc-crest{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,255,255,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 2px 6px rgba(0,0,0,.5);font-size:10px;font-weight:800;color:#fff;letter-spacing:.02em}",
        ".rgmc-team-name{font-size:12px;font-weight:700;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",

        /* --- Momentum şeridi --- */
        ".rgmc-momentum{position:relative;height:6px;border-radius:99px;overflow:hidden;background:linear-gradient(90deg,#3a1317,#1f232b);border:1px solid rgba(255,255,255,.06)}",
        ".rgmc-mom-fill{position:absolute;inset:0;transform-origin:left center;transform:scaleX(.5);will-change:transform}",
        ".rgmc-mom-layer{position:absolute;inset:0;transition:opacity .7s ease}",
        ".rgmc-mom-a{background:linear-gradient(90deg,#153e28,#2c6a47 55%,#c5a059);opacity:1}",
        ".rgmc-mom-b{background:linear-gradient(90deg,#1b1f27,#33383f 55%,#6b1418);opacity:0}",
        ".rgmc-momentum.rgmc-away-lead .rgmc-mom-a{opacity:0}",
        ".rgmc-momentum.rgmc-away-lead .rgmc-mom-b{opacity:1}",
        ".rgmc-momentum::after{content:'';position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(255,255,255,.28)}",
        ".rgmc-root[data-state='PRESSURE_BUILDUP'] .rgmc-momentum{border-color:rgba(197,160,89,.5)}",
        ".rgmc-telemetry{display:flex;align-items:center;justify-content:center;gap:8px;font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--rg-muted);font-variant-numeric:tabular-nums;white-space:nowrap}",
        ".rgmc-telemetry b{font-weight:800;color:var(--rg-text)}",
        ".rgmc-tele-sep{color:rgba(197,160,89,.5)}",

        /* --- Oyuncu reyting plaketi (EA FC) --- */
        ".rgmc-hud{display:flex;align-items:stretch;gap:8px}",
        ".rgmc-rating{position:relative;overflow:hidden;flex:1.5 1 0;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 12px;border-radius:11px;border:1px solid rgba(197,160,89,.28);background:linear-gradient(135deg,#2b3140 0%,#161a22 55%,#232936 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),inset 0 -1px 0 rgba(0,0,0,.5),0 6px 16px rgba(0,0,0,.4);transition:filter .5s ease,border-color .5s ease}",
        ".rgmc-rating-sheen{position:absolute;inset:0;pointer-events:none;opacity:0;background:linear-gradient(115deg,transparent 34%,rgba(223,186,115,.34) 50%,transparent 66%);transform:translateX(-120%)}",
        ".rgmc-rating.rgmc-elite{border-color:rgba(223,186,115,.7)}",
        ".rgmc-rating.rgmc-elite .rgmc-rating-sheen{opacity:1;animation:rgmc-sheen 3.6s ease-in-out infinite}",
        ".rgmc-rating.rgmc-elite .rgmc-rating-val{color:var(--rg-gold-hi)}",
        ".rgmc-rating.rgmc-poor{filter:grayscale(.55) brightness(.78);border-color:rgba(255,255,255,.08);background:linear-gradient(135deg,#272a31,#14161b)}",
        ".rgmc-rating-label{font-size:9.5px;font-weight:800;letter-spacing:.16em;color:var(--rg-muted)}",
        ".rgmc-rating-right{display:flex;align-items:baseline;gap:6px}",
        ".rgmc-rating-val{font-size:21px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--rg-text);line-height:1}",
        ".rgmc-rating-delta{font-size:10px;font-weight:800;opacity:0;min-width:26px;font-variant-numeric:tabular-nums}",
        ".rgmc-rating-delta.rgmc-up{color:#9fc7a6}.rgmc-rating-delta.rgmc-down{color:#c98a8d}",
        ".rgmc-rating-delta.rgmc-on{animation:rgmc-delta 1.6s ease-out}",
        ".rgmc-chip{flex:1 1 0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:5px 8px;border-radius:11px;border:1px solid var(--rg-edge);background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.25))}",
        ".rgmc-chip-label{font-size:8.5px;font-weight:800;letter-spacing:.14em;color:var(--rg-muted)}",
        ".rgmc-chip-val{font-size:15px;font-weight:800;font-variant-numeric:tabular-nums}",
        ".rgmc-speed{flex:0 0 auto;min-width:46px;padding:0 10px;border-radius:11px;border:1px solid rgba(197,160,89,.35);background:linear-gradient(180deg,#232936,#12151b);color:var(--rg-gold-hi);font:800 12px 'Inter',sans-serif;letter-spacing:.06em;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.1);transition:transform .12s ease}",
        ".rgmc-speed:active{transform:translateY(1px) scale(.97)}",

        /* --- Canlı anlatım --- */
        ".rgmc-feed{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;padding:10px 12px 8px;gap:8px}",
        ".rgmc-feed-head{display:flex;align-items:center;gap:8px;font-size:10px;font-weight:800;letter-spacing:.16em;color:var(--rg-gold)}",
        ".rgmc-feed-dot{width:6px;height:6px;border-radius:50%;background:var(--rg-gold);animation:rgmc-breathe 2.8s ease-in-out infinite}",
        ".rgmc-feed-state{margin-left:auto;font-weight:700;color:var(--rg-muted)}",
        ".rgmc-feed-viewport{position:relative;flex:1 1 auto;min-height:0;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,#000 84%,transparent);mask-image:linear-gradient(180deg,#000 84%,transparent)}",

        ".rgmc-card{position:absolute;left:0;right:0;top:0;box-sizing:border-box;padding:9px 12px 10px 14px;border-radius:12px;border:1px solid var(--rg-edge);background:linear-gradient(180deg,rgba(30,35,46,.9),rgba(14,16,21,.92));box-shadow:0 8px 22px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06);will-change:transform,opacity;opacity:0;visibility:hidden;overflow:hidden}",
        ".rgmc-card.rgmc-used{visibility:visible}",
        ".rgmc-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#505865,#2a303b)}",
        ".rgmc-card-head{display:flex;align-items:center;gap:8px;margin-bottom:4px}",
        ".rgmc-card-min{font-size:11px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--rg-gold)}",
        ".rgmc-card-badge{font-size:9px;font-weight:800;letter-spacing:.12em;padding:2px 7px;border-radius:5px;background:rgba(255,255,255,.06);color:var(--rg-text);display:none}",
        ".rgmc-card-badge.rgmc-on{display:inline-block}",
        ".rgmc-card-body{font-size:12.5px;line-height:1.42;color:#d4d1c9;font-weight:500}",
        ".rgmc-t-normal .rgmc-card-body{color:#aeb3bd}",
        ".rgmc-t-goal{background:linear-gradient(135deg,#6b1418 0%,#3a0b0e 60%,#1a0a0c 100%);border-color:rgba(197,160,89,.4)}",
        ".rgmc-t-goal::before{width:4px;background:linear-gradient(180deg,#e7cb8f,#c5a059 45%,#8a6a2c)}",
        ".rgmc-t-goal .rgmc-card-body{color:var(--rg-gold-hi);font-weight:700;font-size:13.5px;letter-spacing:.01em}",
        ".rgmc-t-goal .rgmc-card-badge{background:rgba(197,160,89,.18);color:var(--rg-gold-hi)}",
        ".rgmc-t-conceded{background:linear-gradient(135deg,#1c1f26,#101217)}",
        ".rgmc-t-conceded::before{background:linear-gradient(180deg,#8d2227,#4a1115)}",
        ".rgmc-t-conceded .rgmc-card-badge{background:rgba(107,20,24,.45);color:#e5c4c6}",
        ".rgmc-t-var{border-color:rgba(176,124,38,.6);background:linear-gradient(135deg,#231d10 0%,#14161b 100%)}",
        ".rgmc-t-var::before{background:linear-gradient(180deg,#c28a2c,#7e5718)}",
        ".rgmc-t-var .rgmc-card-badge{background:rgba(194,138,44,.2);color:#e0b567}",
        ".rgmc-t-var .rgmc-card-body{color:#b9c1cf;letter-spacing:.015em}",
        ".rgmc-t-red{border-color:rgba(107,20,24,.8);background:linear-gradient(135deg,#3a0b0e,#14090b)}",
        ".rgmc-t-red::before{background:#8d2227}.rgmc-t-red .rgmc-card-badge{background:rgba(141,34,39,.4);color:#f0d3d4}",
        ".rgmc-t-yellow::before{background:linear-gradient(180deg,#c9a24a,#8a6b25)}.rgmc-t-yellow .rgmc-card-badge{background:rgba(201,162,74,.2);color:#e0c27d}",
        ".rgmc-t-foul{background:linear-gradient(135deg,#1b1c20,#101114)}",
        ".rgmc-t-foul::before{background:linear-gradient(180deg,#b08d57,#6e5732)}",
        ".rgmc-t-foul .rgmc-card-badge{background:rgba(176,141,87,.18);color:#c9a971}",
        ".rgmc-t-defense{background:linear-gradient(135deg,#232936,#13171e);border-color:rgba(160,172,190,.2)}",
        ".rgmc-t-defense::before{background:linear-gradient(180deg,#9aa6b8,#566073)}",
        ".rgmc-t-defense .rgmc-card-badge{background:rgba(154,166,184,.15);color:#b4bfd0}",
        ".rgmc-t-tactic::before{background:linear-gradient(180deg,#7d8798,#454e5e)}",
        ".rgmc-t-turnover{background:linear-gradient(135deg,#1d1517,#101114);border-color:rgba(107,20,24,.55)}",
        ".rgmc-t-turnover::before{background:linear-gradient(180deg,#8d2227,#4a1115)}",
        ".rgmc-t-turnover .rgmc-card-badge{background:rgba(107,20,24,.4);color:#e5c4c6}",
        ".rgmc-t-result{border-color:rgba(197,160,89,.28);background:linear-gradient(135deg,#252b38,#12151b)}",
        ".rgmc-t-result::before{background:linear-gradient(180deg,#dfba73,#8a6a2c)}",
        ".rgmc-t-result .rgmc-card-badge{background:rgba(197,160,89,.14);color:var(--rg-gold-hi)}",
        ".rgmc-t-result .rgmc-card-body{color:#e4dfd2;font-weight:600}",

        /* --- Baskı vinyeti --- */
        ".rgmc-vignette{position:absolute;inset:-8px;z-index:3;pointer-events:none;opacity:0;transition:opacity .8s ease;border-radius:18px;box-shadow:inset 0 0 70px rgba(107,20,24,.55),inset 0 0 0 1px rgba(197,160,89,.18)}",
        ".rgmc-root[data-state='PRESSURE_BUILDUP'] .rgmc-vignette{opacity:.8}",

        /* --- Karar merkezi --- */
        ".rgmc-clutch{position:absolute;left:0;right:0;bottom:0;z-index:20;padding:0 0 14px;visibility:hidden;will-change:transform;border-color:rgba(197,160,89,.35);background:linear-gradient(180deg,rgba(26,30,41,.98) 0%,rgba(9,10,13,.99) 100%);box-shadow:0 -12px 50px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.1)}",
        ".rgmc-fuse{position:relative;height:4px;margin-top:3px;background:rgba(255,255,255,.05);overflow:visible}",
        ".rgmc-fuse-fill{position:absolute;inset:0;transform-origin:left center;background:linear-gradient(90deg,#dfba73,#c5a059 55%,#a8602a);will-change:transform}",
        ".rgmc-fuse-head{position:absolute;top:-2px;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:#e0a867;box-shadow:0 0 8px 2px rgba(176,96,40,.55);will-change:left}",
        ".rgmc-fuse.rgmc-urgent .rgmc-fuse-fill{background:linear-gradient(90deg,#c5a059,#a8602a 60%,#8d2227)}",
        ".rgmc-clutch-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px 6px}",
        ".rgmc-clutch-badge{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10px;font-weight:800;letter-spacing:.14em;color:var(--rg-gold-hi);padding:4px 9px;border-radius:6px;border:1px solid rgba(197,160,89,.4);background:rgba(197,160,89,.08)}",
        ".rgmc-clutch-timer{flex:0 0 auto;font-size:13px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--rg-text);padding:3px 10px;border-radius:7px;background:rgba(0,0,0,.35);border:1px solid var(--rg-edge)}",
        ".rgmc-clutch-timer.rgmc-urgent{color:#e1b5b7;border-color:rgba(141,34,39,.6);background:rgba(107,20,24,.35)}",
        ".rgmc-clutch-desc{margin:0;padding:2px 14px 10px;font-size:13px;line-height:1.45;font-weight:600;color:var(--rg-text)}",
        ".rgmc-plaques{display:flex;flex-direction:column;gap:8px;padding:0 12px}",
        ".rgmc-plaque-wrap{will-change:transform,opacity}",
        ".rgmc-plaque-wrap.rgmc-off{display:none}",
        ".rgmc-plaque{position:relative;isolation:isolate;overflow:hidden;display:flex;align-items:center;gap:11px;width:100%;box-sizing:border-box;padding:11px 14px 11px 16px;border-radius:12px;border:1px solid var(--rg-edge);text-align:left;color:var(--rg-text);font-family:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;background:linear-gradient(180deg,#232936 0%,#12151b 38%,#0b0c10 100%);box-shadow:0 6px 16px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.1),inset 0 -1px 0 rgba(0,0,0,.6);transition:transform .09s ease,box-shadow .09s ease}",
        ".rgmc-plaque:active,.rgmc-plaque.rgmc-pressed{transform:translateY(2px) scale(.98);box-shadow:0 2px 6px rgba(0,0,0,.5),inset 0 2px 6px rgba(0,0,0,.55)}",
        ".rgmc-plaque:focus-visible{outline:1px solid var(--rg-gold);outline-offset:2px}",
        ".rgmc-plaque-bar{position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--rgmc-tier,#c5a059)}",
        ".rgmc-tier-safe{--rgmc-tier:linear-gradient(180deg,#2c6a47,#153e28)}",
        ".rgmc-tier-balanced{--rgmc-tier:linear-gradient(180deg,#e0c27d,#a88340)}",
        ".rgmc-tier-high{--rgmc-tier:linear-gradient(180deg,#8d2227,#5a1015)}",
        ".rgmc-plaque-ico{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid var(--rg-edge);font-size:15px}",
        ".rgmc-plaque-main{display:flex;flex-direction:column;gap:3px;min-width:0}",
        ".rgmc-plaque-title{font-size:13.5px;font-weight:700;line-height:1.3}",
        ".rgmc-plaque-sub{font-size:11px;font-weight:600;color:var(--rg-gold);letter-spacing:.02em}",

        /* --- Animasyonlar --- */
        "@keyframes rgmc-breathe{0%,100%{opacity:.55;transform:scale(.88)}50%{opacity:1;transform:scale(1.08)}}",
        "@keyframes rgmc-sheen{0%{transform:translateX(-120%)}55%,100%{transform:translateX(120%)}}",
        "@keyframes rgmc-delta{0%{opacity:0;transform:translateY(5px)}15%{opacity:1;transform:translateY(0)}80%{opacity:1}100%{opacity:0}}",
        "@media (prefers-reduced-motion:reduce){.rgmc-live-dot,.rgmc-feed-dot,.rgmc-rating.rgmc-elite .rgmc-rating-sheen{animation:none}}"
    ].join("\n");

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;
        var st = document.createElement("style");
        st.id = STYLE_ID;
        st.textContent = CSS;
        document.head.appendChild(st);
    }

    // ======================================================================
    // 7. OLAY AKIŞI (12'lik nesne havuzu + yay kaydırma)
    // ======================================================================
    function EventFeed(mc, viewport) {
        this.mc = mc;
        this.viewport = viewport;
        this.cards = new Array(POOL_SIZE);
        this.order = new Array(POOL_SIZE);    // en yeni -> en eski (sabit uzunluk, yerinde döner)
        this.used = 0;
        var self = this;
        for (var i = 0; i < POOL_SIZE; i++) {
            var node = el("div", CARD_CLASS.normal);
            var head = el("div", "rgmc-card-head");
            var min = el("span", "rgmc-card-min");
            var badge = el("span", "rgmc-card-badge");
            var body = el("div", "rgmc-card-body");
            head.appendChild(min); head.appendChild(badge);
            node.appendChild(head); node.appendChild(body);
            viewport.appendChild(node);
            var card = { el: node, minEl: min, badgeEl: badge, bodyEl: body, h: 0, inUse: false, dirty: false, type: "normal" };
            card.y = new Spring(mc.world, { x: 0, onUpdate: this._dirtier(card) });
            card.enter = new Spring(mc.world, { x: 1, target: 1, onUpdate: this._dirtier(card) });
            card.op = new Spring(mc.world, { x: 0, target: 0, onUpdate: this._dirtier(card) });
            this.cards[i] = card;
            this.order[i] = card;
        }
        mc.world.hooks.push(function () { self.flush(); });
    }
    EventFeed.prototype._dirtier = function (card) {
        return function () { card.dirty = true; };
    };
    EventFeed.prototype.flush = function () {
        for (var i = 0; i < this.cards.length; i++) {
            var c = this.cards[i];
            if (!c.dirty) continue;
            c.dirty = false;
            var s = 0.94 + 0.06 * c.enter.x;
            c.el.style.transform = "translate3d(0," + c.y.x.toFixed(2) + "px,0) scale(" + s.toFixed(4) + ")";
            c.el.style.opacity = clamp(c.op.x, 0, 1).toFixed(3);
        }
    };
    EventFeed.prototype.push = function (min, type, text) {
        // Havuz: boş kart varsa onu, yoksa en eski kartı geri dönüştür.
        var card = null, i;
        if (this.used < POOL_SIZE) {
            for (i = 0; i < POOL_SIZE; i++) { if (!this.cards[i].inUse) { card = this.cards[i]; break; } }
            this.used++;
        } else {
            card = this.order[POOL_SIZE - 1];
        }
        // order[] içinde kartı başa al (yerinde kaydırma, yeni dizi yok)
        var pos = POOL_SIZE - 1;
        for (i = 0; i < POOL_SIZE; i++) { if (this.order[i] === card) { pos = i; break; } }
        for (i = pos; i > 0; i--) this.order[i] = this.order[i - 1];
        this.order[0] = card;

        card.inUse = true;
        card.type = type;
        card.el.className = CARD_CLASS[type] + " rgmc-used";
        card.minEl.textContent = min + "'";
        var badge = BADGE_TEXT[type];
        card.badgeEl.textContent = badge;
        card.badgeEl.className = badge ? "rgmc-card-badge rgmc-on" : "rgmc-card-badge";
        card.bodyEl.textContent = text;
        card.h = card.el.offsetHeight;

        card.y.snap(-(card.h * 0.6));
        card.enter.snap(0);
        card.op.snap(0);
        card.enter.set(1);
        if (type === "goal") card.enter.kick(6);   // gol kartı daha tok yaylanır
        this.relayout();
    };
    EventFeed.prototype.relayout = function () {
        var y = 0;
        for (var i = 0; i < POOL_SIZE; i++) {
            var c = this.order[i];
            if (!c.inUse) break;
            c.y.set(y);
            c.op.set(i === 0 ? 1 : Math.max(0.38, 1 - i * 0.075));
            y += c.h + FEED_GAP;
        }
    };
    EventFeed.prototype.remeasure = function () {
        var any = false;
        for (var i = 0; i < POOL_SIZE; i++) {
            var c = this.cards[i];
            if (!c.inUse) continue;
            var h = c.el.offsetHeight;
            if (h !== c.h) { c.h = h; any = true; }
        }
        if (any) this.relayout();
    };
    EventFeed.prototype.clear = function () {
        for (var i = 0; i < POOL_SIZE; i++) {
            var c = this.cards[i];
            c.inUse = false;
            c.el.className = CARD_CLASS.normal;
            c.op.snap(0);
        }
        this.used = 0;
    };

    // ======================================================================
    // 8. MAÇ MERKEZİ
    // ======================================================================
    function MatchCenter(container, matchData) {
        matchData = matchData || {};
        this.container = container;
        this.data = matchData;
        this.engine = matchData.engine || global.MatchEngine;
        if (!this.engine) throw new Error("initMatchCenter: matchData.engine (MatchEngine) bulunamadı.");

        this.state = STATE.IDLE;
        this.destroyed = false;
        this.min = 0;
        this.score = { player: 0, opponent: 0 };
        this.poss = 50;
        this.xgH = 0;
        this.xgA = 0;
        this._lastShots = 0;
        this._lastXgMin = -1;
        this._halfEvents = [0, 0];
        this._resolveMin = -1;
        this._locked = false;
        this._choiceData = null;
        this._speed = 1;
        this._ratingTarget = 6.0;
        this._ratingShown = "";
        this._guard = new StateGuard();
        this._sheenPanel = null;
        this._sheenX = 0; this._sheenY = 0; this._sheenRaf = 0;
        this._fuseRaf = 0; this._fuseTimeout = 0; this._fuseDeadline = 0; this._fuseUrgent = false;
        this._fuseRemaining = 6;
        this._attrs = null;
        this._hidden = [];
        this._listeners = [];
        this._lastTimerText = "";

        var self = this;
        this._onFuseFrame = function () { self._fuseFrame(); };
        this._onFuseExpire = function () { self._fuseExpire(); };
        this._applySheen = function () { self._doSheen(); };

        injectStyle();
        this.world = new SpringWorld();
        this.audio = new SynthAudio(matchData.isMuted);
        this._build();
        this._hookInput();
        this._initValues();
    }

    // ---------- İnşa ----------
    MatchCenter.prototype._build = function () {
        var d = this.data, self = this, i;
        var root = el("div", "rgmc-root");
        root.setAttribute("data-state", STATE.IDLE);
        this.root = root;

        var stage = el("div", "rgmc-stage");
        this.stage = stage;

        // Skor panosu
        var sb = el("div", "rgmc-glass rgmc-scoreboard");
        var ribbon = el("div", "rgmc-ribbon");
        this.compIcon = el("span", "rgmc-comp-icon", "🏆");
        this.compName = el("span", "rgmc-comp-name", "TFF SÜPER LİG");
        ribbon.appendChild(this.compIcon); ribbon.appendChild(this.compName);
        sb.appendChild(ribbon);

        var row = el("div", "rgmc-score-row");
        var left = el("div", "rgmc-side-left");
        var live = el("div", "rgmc-live");
        live.appendChild(el("span", "rgmc-live-dot"));
        this.liveLabel = el("span", "rgmc-live-label", "CANLI");
        this.liveMin = el("span", "rgmc-live-min", "0'");
        live.appendChild(this.liveLabel); live.appendChild(this.liveMin);
        left.appendChild(live);
        var scoreBox = el("div", "rgmc-score");
        this.digitH = el("span", "rgmc-digit", "0");
        this.digitA = el("span", "rgmc-digit", "0");
        scoreBox.appendChild(this.digitH); scoreBox.appendChild(el("span", "rgmc-colon", ":")); scoreBox.appendChild(this.digitA);
        var right = el("div", "rgmc-side-right");
        this.extra = el("div", "rgmc-extra", "+0");
        right.appendChild(this.extra);
        row.appendChild(left); row.appendChild(scoreBox); row.appendChild(right);
        sb.appendChild(row);

        var teams = el("div", "rgmc-teams-row");
        var th = el("div", "rgmc-team");
        this.crestH = el("span", "rgmc-crest");
        this.nameH = el("span", "rgmc-team-name");
        th.appendChild(this.crestH); th.appendChild(this.nameH);
        var ta = el("div", "rgmc-team rgmc-away");
        this.crestA = el("span", "rgmc-crest");
        this.nameA = el("span", "rgmc-team-name");
        ta.appendChild(this.crestA); ta.appendChild(this.nameA);
        teams.appendChild(th); teams.appendChild(ta);
        sb.appendChild(teams);

        // Momentum şeridi + telemetri
        this.momentum = el("div", "rgmc-momentum");
        this.momFill = el("div", "rgmc-mom-fill");
        this.momFill.appendChild(el("div", "rgmc-mom-layer rgmc-mom-a"));
        this.momFill.appendChild(el("div", "rgmc-mom-layer rgmc-mom-b"));
        this.momentum.appendChild(this.momFill);
        sb.appendChild(this.momentum);
        var tele = el("div", "rgmc-telemetry");
        this.telePoss = el("span", "", "TOPLA OYNAMA: %50 - %50");
        this.teleXg = el("span", "", "xG: 0.00 - 0.00");
        tele.appendChild(this.telePoss); tele.appendChild(el("span", "rgmc-tele-sep", "|")); tele.appendChild(this.teleXg);
        sb.appendChild(tele);

        // HUD: reyting + gol + asist + hız
        var hud = el("div", "rgmc-hud");
        this.rating = el("div", "rgmc-rating");
        this.rating.appendChild(el("span", "rgmc-rating-sheen"));
        this.rating.appendChild(el("span", "rgmc-rating-label", "REYTİNG"));
        var rr = el("span", "rgmc-rating-right");
        this.ratingDelta = el("span", "rgmc-rating-delta", "");
        this.ratingVal = el("span", "rgmc-rating-val", "6.0");
        rr.appendChild(this.ratingDelta); rr.appendChild(this.ratingVal);
        this.rating.appendChild(rr);
        hud.appendChild(this.rating);
        var cg = el("div", "rgmc-chip");
        cg.appendChild(el("span", "rgmc-chip-label", "GOL"));
        this.chipGoals = el("span", "rgmc-chip-val", "0");
        cg.appendChild(this.chipGoals);
        var ca = el("div", "rgmc-chip");
        ca.appendChild(el("span", "rgmc-chip-label", "ASİST"));
        this.chipAssists = el("span", "rgmc-chip-val", "0");
        ca.appendChild(this.chipAssists);
        hud.appendChild(cg); hud.appendChild(ca);
        this.speedBtn = el("button", "rgmc-speed", "1x");
        this.speedBtn.type = "button";
        this.speedBtn.setAttribute("aria-label", "Maç hızı");
        hud.appendChild(this.speedBtn);
        sb.appendChild(hud);
        stage.appendChild(sb);

        // Canlı anlatım
        var feed = el("div", "rgmc-glass rgmc-feed");
        var fh = el("div", "rgmc-feed-head");
        fh.appendChild(el("span", "rgmc-feed-dot"));
        fh.appendChild(el("span", "", "CANLI MAÇ ANLATIMI"));
        this.feedState = el("span", "rgmc-feed-state", STATE_LABEL.IDLE);
        fh.appendChild(this.feedState);
        feed.appendChild(fh);
        this.viewport = el("div", "rgmc-feed-viewport");
        this.viewport.setAttribute("role", "log");
        this.viewport.setAttribute("aria-live", "polite");
        feed.appendChild(this.viewport);
        stage.appendChild(feed);
        root.appendChild(stage);

        root.appendChild(el("div", "rgmc-vignette"));

        // Karar merkezi
        var cl = el("div", "rgmc-glass rgmc-clutch");
        cl.setAttribute("role", "dialog");
        cl.setAttribute("aria-live", "assertive");
        this.clutch = cl;
        this.fuse = el("div", "rgmc-fuse");
        this.fuseFill = el("div", "rgmc-fuse-fill");
        this.fuseHead = el("div", "rgmc-fuse-head");
        this.fuse.appendChild(this.fuseFill); this.fuse.appendChild(this.fuseHead);
        cl.appendChild(this.fuse);
        var ch = el("div", "rgmc-clutch-head");
        this.clutchBadge = el("span", "rgmc-clutch-badge", "KRİTİK POZİSYON");
        this.clutchTimer = el("span", "rgmc-clutch-timer", "6.00s");
        ch.appendChild(this.clutchBadge); ch.appendChild(this.clutchTimer);
        cl.appendChild(ch);
        this.clutchDesc = el("p", "rgmc-clutch-desc");
        cl.appendChild(this.clutchDesc);
        var pl = el("div", "rgmc-plaques");
        this.plaques = new Array(MAX_OPTIONS);
        for (i = 0; i < MAX_OPTIONS; i++) {
            var wrap = el("div", "rgmc-plaque-wrap rgmc-off");
            var btn = el("button", "rgmc-plaque");
            btn.type = "button";
            var bar = el("span", "rgmc-plaque-bar");
            var ico = el("span", "rgmc-plaque-ico", "◆");
            var main = el("span", "rgmc-plaque-main");
            var title = el("span", "rgmc-plaque-title");
            var sub = el("span", "rgmc-plaque-sub");
            main.appendChild(title); main.appendChild(sub);
            btn.appendChild(bar); btn.appendChild(ico); btn.appendChild(main);
            wrap.appendChild(btn);
            pl.appendChild(wrap);
            var p = { wrap: wrap, btn: btn, ico: ico, title: title, sub: sub, idx: i };
            p.spring = this._plaqueSpring(p);
            btn._rgIdx = i;
            this.plaques[i] = p;
        }
        cl.appendChild(pl);
        root.appendChild(cl);

        // Yay çözücüye bağlı canlı değerler
        this.sheet = new Spring(this.world, {
            x: 1, target: 1, slowable: false,
            onUpdate: function (x) {
                var closed = x >= 0.98;
                self.clutch.style.transform = "translate3d(0," + (x * 115).toFixed(2) + "%,0)";
                self.clutch.style.visibility = closed ? "hidden" : "visible";
                self.clutch.style.pointerEvents = closed ? "none" : "auto";
            }
        });
        this.momSpring = new Spring(this.world, {
            x: 0.5, target: 0.5,
            onUpdate: function (x) { self.momFill.style.transform = "scaleX(" + clamp(x, 0.02, 1).toFixed(4) + ")"; }
        });
        this.ratingSpring = new Spring(this.world, {
            x: 6.0, target: 6.0, eps: 0.004,
            onUpdate: function (x) {
                var txt = clamp(x, 3, 10).toFixed(1);
                if (txt !== self._ratingShown) { self._ratingShown = txt; self.ratingVal.textContent = txt; }
            }
        });
        this.popH = new Spring(this.world, {
            x: 0, target: 0,
            onUpdate: function (x) { self.digitH.style.transform = "scale(" + (1 + x).toFixed(4) + ")"; }
        });
        this.popA = new Spring(this.world, {
            x: 0, target: 0,
            onUpdate: function (x) { self.digitA.style.transform = "scale(" + (1 + x).toFixed(4) + ")"; }
        });
        this.sheet.snap(1);

        this.feed = new EventFeed(this, this.viewport);

        // Ana kapsayıcıya yerleştir; eski arayüz elemanlarını gizle
        var anchor = this.container.querySelector("#match-continue-banner");
        if (anchor && anchor.parentNode === this.container) this.container.insertBefore(root, anchor);
        else this.container.appendChild(root);
        var sel = d.legacySelectors || [".broadcast-scoreboard", ".broadcast-ticker-ribbon", "#match-terminal", "#match-decision-card"];
        for (i = 0; i < sel.length; i++) {
            var found = this.container.querySelectorAll(sel[i]);
            for (var j = 0; j < found.length; j++) {
                if (root.contains(found[j])) continue;
                found[j].classList.add("rgmc-legacy-hidden");
                this._hidden.push(found[j]);
            }
        }

        if (typeof global.ResizeObserver === "function") {
            this._ro = new global.ResizeObserver(function () { self.feed.remeasure(); });
            this._ro.observe(this.viewport);
        }
    };

    MatchCenter.prototype._plaqueSpring = function (p) {
        return new Spring(this.world, {
            x: 1, target: 0, slowable: false,
            onUpdate: function (x) {
                p.wrap.style.transform = "translate3d(0," + (x * 22).toFixed(2) + "px,0)";
                p.wrap.style.opacity = clamp(1 - x, 0, 1).toFixed(3);
            }
        });
    };

    MatchCenter.prototype._initValues = function () {
        var d = this.data, h = d.homeTeam || {}, a = d.awayTeam || {}, comp = d.competition || {};
        this.nameH.textContent = String(h.name || "KULÜBÜM").toLocaleUpperCase("tr");
        this.nameA.textContent = String(a.name || "RAKİP").toLocaleUpperCase("tr");
        this._setCrest(this.crestH, h);
        this._setCrest(this.crestA, a);
        if (comp.icon) this.compIcon.textContent = comp.icon;
        if (comp.name) this.compName.textContent = comp.name;

        // Başlangıç topla oynama: takım güçlerinden (deterministik)
        var e = this.engine, tp = e.teamPlayer || h, to = e.teamOpponent || a;
        var pw = (num(tp.att, 50) + num(tp.mid, 50) + num(tp.def, 50)) / 3;
        var ow = (num(to.att, 50) + num(to.mid, 50) + num(to.def, 50)) / 3;
        var base = (typeof d.basePossession === "number") ? d.basePossession : Math.round(pw / (pw + ow) * 100);
        this.basePoss = clamp(base, 35, 65);
        this.poss = this.basePoss;
        this._renderTelemetry();
        this.momSpring.snap(this.basePoss / 100);
        this._ratingTarget = num(d.baseRating, 6.0);
        this.ratingSpring.snap(this._ratingTarget);
        this._applyRatingClass();
        this._setStateUi(STATE.IDLE);
    };

    MatchCenter.prototype._setCrest = function (node, team) {
        var name = String(team.name || "");
        var ini = team.initials || name.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0); }).join("");
        node.textContent = String(ini || "FC").toLocaleUpperCase("tr").slice(0, 3);
        node.style.backgroundColor = team.color || "#455a64";
    };

    // ---------- Girdi ----------
    MatchCenter.prototype._listen = function (target, type, fn, opts) {
        target.addEventListener(type, fn, opts);
        this._listeners.push([target, type, fn, opts]);
    };

    MatchCenter.prototype._hookInput = function () {
        var self = this;
        this._listen(this.root, "pointermove", function (e) { self._queueSheen(e, false); }, { passive: true });
        this._listen(this.root, "pointerdown", function (e) {
            self.audio.unlock();
            self._queueSheen(e, true);
            var t = e.target && e.target.closest ? e.target.closest(".rgmc-plaque") : null;
            if (t && self._canChoose()) { t.classList.add("rgmc-pressed"); vibrate(25); }
        }, { passive: true });
        var release = function (e) {
            var pressed = self.root.querySelectorAll(".rgmc-pressed");
            for (var i = 0; i < pressed.length; i++) pressed[i].classList.remove("rgmc-pressed");
            if (self._sheenPanel && e && e.pointerType && e.pointerType !== "mouse") {
                self._sheenPanel.style.setProperty("--rgmc-sheen", "0");
            }
        };
        this._listen(this.root, "pointerup", release, { passive: true });
        this._listen(this.root, "pointercancel", release, { passive: true });
        this._listen(this.root, "pointerleave", function () {
            if (self._sheenPanel) self._sheenPanel.style.setProperty("--rgmc-sheen", "0");
        }, { passive: true });
        this._listen(this.clutch, "click", function (e) {
            var b = e.target && e.target.closest ? e.target.closest(".rgmc-plaque") : null;
            if (b && typeof b._rgIdx === "number") self._choose(b._rgIdx);
        });
        this._listen(this.speedBtn, "click", function () {
            self._speed = self._speed === 1 ? 2 : (self._speed === 2 ? 4 : 1);
            self.speedBtn.textContent = self._speed + "x";
            try { self.engine.setSpeed(self._speed); } catch (err) { /* sessiz */ }
            if (typeof self.data.onSpeedChange === "function") self.data.onSpeedChange(self._speed);
        });
    };

    MatchCenter.prototype._queueSheen = function (e, force) {
        if (!e.target || !e.target.closest) return;
        var p = e.target.closest(".rgmc-glass, .rgmc-plaque");
        if (!p) return;
        this._sheenX = e.clientX; this._sheenY = e.clientY;
        this._pendingPanel = p;
        if (!this._sheenRaf) this._sheenRaf = global.requestAnimationFrame(this._applySheen);
    };

    MatchCenter.prototype._doSheen = function () {
        this._sheenRaf = 0;
        var p = this._pendingPanel;
        if (!p || this.destroyed) return;
        var r = p.getBoundingClientRect();
        p.style.setProperty("--rgmc-mx", (this._sheenX - r.left).toFixed(1) + "px");
        p.style.setProperty("--rgmc-my", (this._sheenY - r.top).toFixed(1) + "px");
        p.style.setProperty("--rgmc-sheen", "1");
        if (this._sheenPanel && this._sheenPanel !== p) this._sheenPanel.style.setProperty("--rgmc-sheen", "0");
        this._sheenPanel = p;
    };

    // ---------- Durum makinesi ----------
    MatchCenter.prototype.transition = function (next) {
        if (this.state === next) return true;
        var allowed = TRANSITIONS[this.state];
        if (!allowed || allowed.indexOf(next) < 0) {
            if (global.console) console.warn("[MatchCenter] Geçersiz durum geçişi: " + this.state + " -> " + next);
            return false;
        }
        var prev = this.state;
        this.state = next;
        this.root.setAttribute("data-state", next);
        this._setStateUi(next, prev);
        return true;
    };

    MatchCenter.prototype._setStateUi = function (next, prev) {
        this.feedState.textContent = STATE_LABEL[next] || "";
        this.world.timeScale = (next === STATE.CLUTCH_DECISION) ? 0.35 : 1;   // sinematik yavaşlama
        if (next === STATE.PRESSURE_BUILDUP && prev !== STATE.PRESSURE_BUILDUP) this.audio.pressureSwell();
    };

    MatchCenter.prototype.getState = function () { return this.state; };

    // ---------- Motor köprüsü ----------
    /**
     * MatchEngine.simulate callback nesnesi üretir. Görsel olarak yönetilen
     * onMinuteUpdate/onMatchChoice/onMatchFinish sarılır; diğer her şey (kutlama,
     * duraklatma bandı, 3D düello...) legacy callback'lere aynen aktarılır.
     */
    MatchCenter.prototype.bind = function (legacy) {
        var self = this;
        legacy = legacy || {};
        var out = {};
        for (var k in legacy) { if (Object.prototype.hasOwnProperty.call(legacy, k)) out[k] = legacy[k]; }

        out.onMinuteUpdate = function (min, score, comment) {
            try { self._onMinute(min, score, comment); } catch (err) { if (global.console) console.error("[MatchCenter] onMinute", err); }
            if (typeof legacy.onMinuteUpdate === "function") return legacy.onMinuteUpdate.apply(legacy, arguments);
        };
        out.onMatchChoice = function (minute, choiceData) {
            if (choiceData && choiceData.isNssDuel) {
                self._onExternalMoment(minute);
                if (typeof legacy.onMatchChoice === "function") return legacy.onMatchChoice.apply(legacy, arguments);
                return undefined;
            }
            try {
                self._onChoice(minute, choiceData);
            } catch (err) {
                if (global.console) console.error("[MatchCenter] onChoice", err);
                self._failSafeResume();
            }
            return undefined;
        };
        out.onEventPause = function (title, msg, onContinue) {
            if (self.state === STATE.CLUTCH_DECISION) {
                if (typeof onContinue === "function") {
                    self._pendingContinue = onContinue;
                }
                return;
            }
            if (typeof legacy.onEventPause === "function") {
                return legacy.onEventPause.call(legacy, title, msg, function () {
                    var cb = document.getElementById("match-continue-banner");
                    if (cb) {
                        cb.style.display = "none";
                        cb.style.visibility = "hidden";
                    }
                    if (typeof onContinue === "function") onContinue();
                });
            }
            if (typeof onContinue === "function") onContinue();
        };
        out.onMatchFinish = function (result) {
            try { self._onFinish(result); } catch (err) { if (global.console) console.error("[MatchCenter] onFinish", err); }
            if (typeof legacy.onMatchFinish === "function") return legacy.onMatchFinish.apply(legacy, arguments);
        };
        return out;
    };

    MatchCenter.prototype._onExternalMoment = function (minute) {
        this._resolveMin = minute;
        if (this.state === STATE.KICKOFF || this.state === STATE.LIVE_TICK || this.state === STATE.PRESSURE_BUILDUP) {
            this.transition(STATE.RESOLVING_OUTCOME);
        }
    };

    MatchCenter.prototype._onMinute = function (min, score, comment) {
        if (this.destroyed) return;
        var prevMin = this.min;
        this.min = min;
        var homeGoal = score.player > this.score.player;
        var awayGoal = score.opponent > this.score.opponent;

        if (this.state === STATE.IDLE) this.transition(STATE.KICKOFF);
        else if (this.state === STATE.KICKOFF && min >= 1) this.transition(STATE.LIVE_TICK);
        else if (this.state === STATE.RESOLVING_OUTCOME && min > this._resolveMin) this.transition(STATE.LIVE_TICK);

        if (homeGoal || awayGoal) {
            this._resolveMin = min;
            if (this.state === STATE.KICKOFF || this.state === STATE.LIVE_TICK || this.state === STATE.PRESSURE_BUILDUP) {
                this.transition(STATE.RESOLVING_OUTCOME);
            }
        }

        this._applyScore(score, homeGoal, awayGoal);
        this._updateClock(min);
        this._updateTelemetry(min, prevMin, score);
        this._updateRating();

        // Baskı fazı: bir sonraki kritik pozisyon 1-2 dakika uzaktaysa
        if (this.state === STATE.LIVE_TICK || this.state === STATE.PRESSURE_BUILDUP) {
            var near = this._nearChoice(min);
            if (near && this.state === STATE.LIVE_TICK) this.transition(STATE.PRESSURE_BUILDUP);
            else if (!near && this.state === STATE.PRESSURE_BUILDUP) this.transition(STATE.LIVE_TICK);
        }

        if (comment) this._ingest(min, comment, homeGoal, awayGoal);
    };

    MatchCenter.prototype._nearChoice = function (min) {
        var arr = this.engine.choiceMinutes;
        if (!arr || !arr.length) return false;
        for (var i = 0; i < arr.length; i++) {
            var d = arr[i] - min;
            if (d > 0 && d <= 2) return true;
        }
        return false;
    };

    MatchCenter.prototype._applyScore = function (score, homeGoal, awayGoal) {
        if (score.player !== this.score.player) {
            this.digitH.textContent = String(score.player);
            if (homeGoal) this.popH.kick(7);
        }
        if (score.opponent !== this.score.opponent) {
            this.digitA.textContent = String(score.opponent);
            if (awayGoal) this.popA.kick(7);
        }
        if (homeGoal) this.audio.goalSurge();
        else if (awayGoal) this.audio.concededThud();
        this.score.player = score.player;
        this.score.opponent = score.opponent;
    };

    MatchCenter.prototype._updateClock = function (min) {
        this.liveMin.textContent = min + "'";
        var add = 0;
        if (min >= 44 && min <= 45) add = clamp(1 + this._halfEvents[0], 1, 5);
        else if (min >= 88) add = clamp(2 + this._halfEvents[1], 2, 7);
        if (add > 0) {
            this.extra.textContent = "+" + add;
            this.extra.className = "rgmc-extra rgmc-on";
        } else if (this.extra.className !== "rgmc-extra") {
            this.extra.className = "rgmc-extra";
        }
    };

    MatchCenter.prototype._updateTelemetry = function (min, prevMin, score) {
        var e = this.engine, ps = e.playerStats || {};
        var diff = score.player - score.opponent;
        var boost = num(e.momentumBoost, 0);
        var target = this.basePoss + diff * 2 + Math.sin(min * 0.3) * 3 + Math.min(8, boost * 0.25);
        target = clamp(target, 30, 70);
        this.poss = clamp(Math.round(this.poss + (target - this.poss) * 0.5), 30, 70);

        // xG: her yeni dakikada bir kez, deterministik birikim (azalmaz)
        if (min > this._lastXgMin) {
            this._lastXgMin = min;
            this.xgH += 0.010 + 0.0006 * (this.poss - 50);
            this.xgA += 0.009 - 0.0006 * (this.poss - 50);
        }
        var shots = num(ps.shots, 0);
        if (shots > this._lastShots) { this.xgH += 0.11 * (shots - this._lastShots); this._lastShots = shots; }
        if (this.xgH < score.player * 0.62) this.xgH = score.player * 0.62;
        if (this.xgA < score.opponent * 0.60) this.xgA = score.opponent * 0.60;
        if (this.xgA < 0.01) this.xgA = 0.01;

        var dom = 0.5 + (this.poss - 50) / 100 * 1.4 + (this.xgH - this.xgA) * 0.05;
        dom = clamp(dom, 0.08, 0.92);
        this.momSpring.set(dom);
        var awayLead = dom < 0.46;
        var has = this.momentum.classList.contains("rgmc-away-lead");
        if (awayLead && !has) this.momentum.classList.add("rgmc-away-lead");
        else if (!awayLead && dom > 0.5 && has) this.momentum.classList.remove("rgmc-away-lead");
        this._renderTelemetry();
    };

    MatchCenter.prototype._renderTelemetry = function () {
        this.telePoss.textContent = "TOPLA OYNAMA: %" + this.poss + " - %" + (100 - this.poss);
        this.teleXg.textContent = "xG: " + this.xgH.toFixed(2) + " - " + this.xgA.toFixed(2);
    };

    MatchCenter.prototype._computeRating = function () {
        var e = this.engine, s = e.playerStats || {};
        var r = 6.0 + num(s.goals, 0) * 1.5 + num(s.assists, 0) * 0.9 + num(s.tackles, 0) * 0.4 + num(s.passes, 0) * 0.08
            - (e.hasYellowCard ? 0.4 : 0) - (e.isSentOff ? 2.0 : 0);
        return clamp(r, 3.0, 10.0);
    };

    MatchCenter.prototype._updateRating = function () {
        var s = this.engine.playerStats || {};
        var next = this._computeRating();
        var prev = this._ratingTarget;
        if (Math.abs(next - prev) >= 0.05) {
            var dlt = next - prev;
            this.ratingDelta.textContent = (dlt > 0 ? "+" : "") + dlt.toFixed(1);
            this.ratingDelta.className = "rgmc-rating-delta " + (dlt > 0 ? "rgmc-up" : "rgmc-down");
            void this.ratingDelta.offsetWidth;      // animasyonu yeniden başlat
            this.ratingDelta.classList.add("rgmc-on");
            this._ratingTarget = next;
            this.ratingSpring.set(next);
            this._applyRatingClass();
        }
        this.chipGoals.textContent = String(num(s.goals, 0));
        this.chipAssists.textContent = String(num(s.assists, 0));
    };

    MatchCenter.prototype._applyRatingClass = function () {
        var r = this._ratingTarget;
        this.rating.className = "rgmc-rating" + (r >= 7.5 ? " rgmc-elite" : (r < 6.0 ? " rgmc-poor" : ""));
    };

    // ---------- Olay akışı ----------
    MatchCenter.prototype._ingest = function (min, comment, homeGoal, awayGoal) {
        var text = stripEmoji(comment);
        if (!text) return;
        var type = classify(comment);
        if (homeGoal && type !== "var") type = "goal";
        else if (awayGoal && type !== "var") type = "conceded";
        else if (type === "normal" && this.state === STATE.RESOLVING_OUTCOME && min === this._resolveMin) type = "result";
        this._admit(min, type, text);
    };

    /** Dışarıdan olay eklemek için: { min, type?, text } (State Guard'dan geçer). */
    MatchCenter.prototype.pushEvent = function (evt) {
        if (!evt || this.destroyed) return false;
        var min = num(evt.min, this.min);
        var text = stripEmoji(evt.text);
        var type = CARD_CLASS[evt.type] ? evt.type : classify(evt.text);
        return this._admit(min, type, text);
    };

    MatchCenter.prototype._admit = function (min, type, text) {
        var key = normalizeKey(text);
        if (!this._guard.admit(min, type, key)) return false;
        if (IMPORTANT[type]) this._halfEvents[min <= 45 ? 0 : 1]++;
        this.feed.push(min, type, text);
        return true;
    };

    // ---------- Karar merkezi ----------
    MatchCenter.prototype._canChoose = function () {
        return this.state === STATE.CLUTCH_DECISION && !this._locked;
    };

    MatchCenter.prototype._onChoice = function (minute, choiceData) {
        if (this.destroyed) return;
        var cb = document.getElementById("match-continue-banner");
        if (cb) {
            cb.style.display = "none";
            cb.style.visibility = "hidden";
        }
        if (this.state === STATE.CLUTCH_DECISION) this._closeClutch();
        this._choiceData = choiceData;
        this._locked = false;
        this._resolveMin = minute;
        this._attrs = typeof this.data.getAttributes === "function" ? this.data.getAttributes() : (this.data.attributes || {});

        var rawTitle = stripEmoji(choiceData.title || "").replace(/[!]+$/, "");
        this.clutchBadge.textContent = minute + "' " + (rawTitle ? rawTitle.toLocaleUpperCase("tr") : "KRİTİK POZİSYON");
        this.clutchDesc.textContent = choiceData.description || "";

        var opts = choiceData.options || [];
        var n = Math.min(opts.length, MAX_OPTIONS);
        var isDispute = /hakem|kart/i.test(String(choiceData.title || "") + " " + String(choiceData.description || ""));
        var i;
        for (i = 0; i < MAX_OPTIONS; i++) {
            var p = this.plaques[i];
            if (i >= n) { p.wrap.className = "rgmc-plaque-wrap rgmc-off"; continue; }
            var opt = opts[i] || {};
            var raw = String(opt.text || "");
            var kind = AttributeModel.kindOf(raw + " " + String(opt.effect || ""));
            var chance;
            if (typeof opt.successChance === "number" && isFinite(opt.successChance)) {
                chance = opt.successChance;                    // Motorun stat tabanlı hesabı esastır
            } else {
                chance = AttributeModel.estimate(kind, this._attrs);   // Yoksa nitelik modeli devreye girer
                opt.successChance = chance;                     // makeChoice() sayısal değer bekler
            }
            var tier = chance >= 0.70 ? "safe" : (chance < 0.50 ? "high" : "balanced");
            var icon = RE_LEAD_ICON.exec(raw);
            p.ico.textContent = icon ? icon[0] : "◆";
            p.title.textContent = raw.replace(RE_LEAD_JUNK, "").trim() || raw;
            p.sub.textContent = "Ödül: " + this._reward(opt, kind, tier, isDispute);
            p.wrap.className = "rgmc-plaque-wrap";
            p.btn.className = "rgmc-plaque rgmc-tier-" + tier;
            p.btn.setAttribute("data-idx", String(i));
            p.spring.snap(1 + i * 0.35);     // kademeli giriş
            p.spring.set(0);
        }

        this.transition(STATE.CLUTCH_DECISION);
        this.stage.classList.add("rgmc-dim");
        this.sheet.snap(1);
        this.sheet.set(0);
        this._startFuse();
        var self = this;
        this.audio.startHeartbeat(function () { return 1 - self._fuseRemaining / (CLUTCH_MS / 1000); });
    };

    MatchCenter.prototype._reward = function (opt, kind, tier, isDispute) {
        var t = (String(opt.text || "") + " " + String(opt.effect || "")).toLocaleLowerCase("tr");
        if (kind === "long_shot" || /şut|vuruş|aşırtma|röveşata/.test(t)) return tier === "high" ? "90'a Jeneriklik Gol" : "Net Skor Fırsatı";
        if (kind === "killer_pass" || /ara pas|kilit|orta\b|asist/.test(t)) return "Net Asist Şansı";
        if (kind === "burst" || /verkaç|depar|birebir|sıyrıl/.test(t)) return "Birebir Kaleci Fırsatı";
        if (kind === "defend") return "Kritik Savunma Müdahalesi";
        if (kind === "dribble") return "Boşalan Alan ve Hücum Fırsatı";
        if (isDispute) return "Hoca ve Takım Tepkisi";
        var eff = stripEmoji(opt.effect);
        if (eff && eff.indexOf("%") < 0) return eff;       // yüzde içeren metinler gösterilmez
        return "Tehlikeli Hücum Fırsatı";
    };

    MatchCenter.prototype._startFuse = function () {
        this._clearFuseTimers();
        this._fuseDeadline = nowMs() + CLUTCH_MS;
        this._fuseUrgent = false;
        this._fuseRemaining = CLUTCH_MS / 1000;
        this.fuse.classList.remove("rgmc-urgent");
        this.clutchTimer.classList.remove("rgmc-urgent");
        this._renderFuse(1, this._fuseRemaining);
        this._fuseTimeout = global.setTimeout(this._onFuseExpire, CLUTCH_MS);   // yetkili süre dolumu
        this._fuseRaf = global.requestAnimationFrame(this._onFuseFrame);
    };

    MatchCenter.prototype._clearFuseTimers = function () {
        if (this._fuseTimeout) { global.clearTimeout(this._fuseTimeout); this._fuseTimeout = 0; }
        if (this._fuseRaf) { global.cancelAnimationFrame(this._fuseRaf); this._fuseRaf = 0; }
    };

    MatchCenter.prototype._fuseFrame = function () {
        this._fuseRaf = 0;
        if (this.state !== STATE.CLUTCH_DECISION || this.destroyed) return;
        var rem = Math.max(0, (this._fuseDeadline - nowMs()) / 1000);
        this._fuseRemaining = rem;
        this._renderFuse(rem / (CLUTCH_MS / 1000), rem);
        if (!this._fuseUrgent && rem <= 3) {
            this._fuseUrgent = true;
            this.fuse.classList.add("rgmc-urgent");
            this.clutchTimer.classList.add("rgmc-urgent");
        }
        if (rem > 0) this._fuseRaf = global.requestAnimationFrame(this._onFuseFrame);
    };

    MatchCenter.prototype._renderFuse = function (frac, remaining) {
        frac = clamp(frac, 0, 1);
        this.fuseFill.style.transform = "scaleX(" + frac.toFixed(4) + ")";
        this.fuseHead.style.left = (frac * 100).toFixed(2) + "%";
        var txt = remaining.toFixed(2) + "s";
        if (txt !== this._lastTimerText) { this._lastTimerText = txt; this.clutchTimer.textContent = txt; }
    };

    MatchCenter.prototype._closeClutch = function () {
        this._clearFuseTimers();
        this.audio.stopHeartbeat();
        this.stage.classList.remove("rgmc-dim");
        this.sheet.set(1);
        var cb = document.getElementById("match-continue-banner");
        if (cb) {
            cb.style.display = "none";
            cb.style.visibility = "hidden";
        }
        var self = this;
        global.setTimeout(function () {
            if (self.state !== STATE.CLUTCH_DECISION && self.clutch) {
                self.clutch.style.visibility = "hidden";
            }
        }, 220);
        if (typeof this._pendingContinue === "function") {
            var pending = this._pendingContinue;
            this._pendingContinue = null;
            try { pending(); } catch (e) {}
        }
    };

    MatchCenter.prototype._choose = function (idx) {
        if (!this._canChoose()) return;
        var data = this._choiceData;
        if (!data || !data.options || !data.options[idx]) return;
        this._locked = true;
        this._closeClutch();
        this.audio.kramponStrike();
        this.transition(STATE.RESOLVING_OUTCOME);
        var eng = this.engine;
        try {
            eng.makeChoice(idx);
        } catch (err) {
            if (global.console) console.error("[MatchCenter] makeChoice", err);
        }
        // makeChoice sonuçlanmadıysa (geçersiz durum) maçın donmaması için güvenli devam
        if (eng.activeChoice === data) this._failSafeResume();
        this._choiceData = null;
    };

    MatchCenter.prototype._fuseExpire = function () {
        this._fuseTimeout = 0;
        if (this.state !== STATE.CLUTCH_DECISION || this._locked || this.destroyed) return;
        this._locked = true;
        this._closeClutch();
        vibrate([80, 50, 80]);
        this.audio.concededThud();
        this.transition(STATE.RESOLVING_OUTCOME);
        var minute = this._resolveMin;
        this.pushEvent({
            min: minute,
            type: "turnover",
            text: "Karar süresi doldu; baskı altında bocaladın ve rakip savunma araya girip topu kaptı!"
        });
        var ps = this.engine.playerStats;
        if (ps) ps.passes = Math.max(0, num(ps.passes, 0) - 1);
        this._choiceData = null;
        this._failSafeResume(true);
    };

    /** Motoru güvenle yeniden başlatır (tick döngüsü duraklarken kendiliğinden devam etmez). */
    MatchCenter.prototype._failSafeResume = function (delayed) {
        var eng = this.engine;
        eng.isPausedForChoice = false;
        eng.activeChoice = null;
        if (eng.timer) global.clearTimeout(eng.timer);
        var speed = Math.max(1, num(eng.currentSpeed, 1));
        eng.timer = global.setTimeout(function () {
            if (typeof eng.resumeTick === "function") eng.resumeTick();
        }, (delayed ? 2000 : 600) / speed);
    };

    MatchCenter.prototype._onFinish = function (result) {
        if (this.destroyed) return;
        var cb = document.getElementById("match-continue-banner");
        if (cb) {
            cb.style.display = "none";
            cb.style.visibility = "hidden";
        }
        if (this.state === STATE.CLUTCH_DECISION) this._closeClutch();
        this.transition(STATE.FULLTIME);
        this.liveLabel.textContent = "BİTTİ";
        this.liveMin.textContent = "90'";
        var ps = result && result.playerStats;
        if (ps && typeof ps.rating === "number") {
            this._ratingTarget = ps.rating;
            this.ratingSpring.set(ps.rating);
            this._applyRatingClass();
        }
        var sc = (result && result.score) || this.score;
        this.pushEvent({ min: 90, type: "tactic", text: "Maç sona erdi. Final skoru " + sc.player + " - " + sc.opponent + "." });
        this.audio.stopHeartbeat();
        this.world.timeScale = 1;
        var audio = this.audio;
        global.setTimeout(function () { audio.dispose(); }, 3500);
    };

    // ---------- Temizlik ----------
    MatchCenter.prototype.destroy = function () {
        if (this.destroyed) return;
        this.destroyed = true;
        this._clearFuseTimers();
        if (this._sheenRaf) global.cancelAnimationFrame(this._sheenRaf);
        for (var i = 0; i < this._listeners.length; i++) {
            var l = this._listeners[i];
            l[0].removeEventListener(l[1], l[2], l[3]);
        }
        this._listeners.length = 0;
        if (this._ro) { try { this._ro.disconnect(); } catch (e) { /* sessiz */ } }
        this.audio.dispose();
        this.world.dispose();
        for (var j = 0; j < this._hidden.length; j++) this._hidden[j].classList.remove("rgmc-legacy-hidden");
        this._hidden.length = 0;
        if (this.root.parentNode) this.root.parentNode.removeChild(this.root);
        if (this.container && this.container.__rgMatchCenter === this) delete this.container.__rgMatchCenter;
    };

    // ======================================================================
    // 9. TEK ÇAĞRILIK GİRİŞ NOKTASI
    // ======================================================================
    function initMatchCenter(container, matchData) {
        if (typeof container === "string") container = document.querySelector(container);
        if (!container) throw new Error("initMatchCenter: container bulunamadı.");
        if (container.__rgMatchCenter) { try { container.__rgMatchCenter.destroy(); } catch (e) { /* sessiz */ } }
        var mc = new MatchCenter(container, matchData);
        container.__rgMatchCenter = mc;
        return mc;
    }

    var api = {
        initMatchCenter: initMatchCenter,
        MatchCenter: MatchCenter,
        STATE: STATE,
        AttributeModel: AttributeModel,
        StateGuard: StateGuard,
        classify: classify,
        SpringWorld: SpringWorld,
        Spring: Spring,
        SynthAudio: SynthAudio
    };

    global.initMatchCenter = initMatchCenter;
    global.RGMatchCenter = api;
    if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
