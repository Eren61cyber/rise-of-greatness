const fs = require('fs');

// 1. game.js
let gameJs = fs.readFileSync('game.js', 'utf8');
gameJs = gameJs.replace('isSuspended: false,', 'suspendedWeeks: 0,');
gameJs = gameJs.replace('typeof this.state.isSuspended', 'typeof this.state.suspendedWeeks');
gameJs = gameJs.replace('this.state.isSuspended = false;', 'this.state.suspendedWeeks = 0;');

const oldAdvanceWeekLogic = `        if (this.state.isSuspended) {
            this.state.isSuspended = false;
            this.addSocialPost("@spor_manset", "Spor Manşetleri", \`Cezası bitti! Kırmızı kart cezası sona eren genç yetenek \${this.state.playerName} yeniden formasına kavuşuyor.\`);
        }`;

const newAdvanceWeekLogic = `        if (this.state.suspendedWeeks > 0) {
            this.state.suspendedWeeks--;
            if (this.state.suspendedWeeks === 0) {
                this.addSocialPost("@spor_manset", "Spor Manşetleri", \`Cezası bitti! Kırmızı kart cezası sona eren genç yetenek \${this.state.playerName} yeniden formasına kavuşuyor.\`);
            }
        }`;

gameJs = gameJs.replace(oldAdvanceWeekLogic, newAdvanceWeekLogic);
fs.writeFileSync('game.js', gameJs, 'utf8');


// 2. matchEngine.js
let matchEngine = fs.readFileSync('matchEngine.js', 'utf8');
matchEngine = matchEngine.split('GAME.state.isSuspended = true;').join('');
matchEngine = matchEngine.split('this.isSentOff = true;').join('this.isSentOff = true;\n                        GAME.state.suspendedWeeks = 2;');
fs.writeFileSync('matchEngine.js', matchEngine, 'utf8');


// 3. index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('GAME.state.isSuspended = true; // Suspended from playing matches this season', 'GAME.state.suspendedWeeks = 34; // Suspended from playing matches this season');
indexHtml = indexHtml.split('GAME.state.isSuspended = true;').join('GAME.state.suspendedWeeks = 2;');
indexHtml = indexHtml.split('GAME.state.isSuspended').join('GAME.state.suspendedWeeks > 0');
fs.writeFileSync('index.html', indexHtml, 'utf8');

console.log("Fixes applied successfully.");
