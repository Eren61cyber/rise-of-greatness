import { initSquadBuilder } from './squadBuilder.js';
import { renderMatchPredictions } from './predict.js';
import { renderStatsCharts } from './stats.js';
import { fillTeamFilter } from './filter.js';
import { renderPoll } from './poll.js';
import { renderSummary, renderStandings, renderBoards, renderPlayers, renderAwards } from './render.js';
import { renderSquadTeams } from './squad.js';
import { initAmbientMusic } from './music.js';
import { fillTeamCompareOptions, fillCompareOptions, renderComparison, renderTeamComparison } from './comparison.js';
import { renderThemes } from './theme.js';


export function initWelcomeSplash() {
  const splash = document.getElementById("welcomeSplash");
  if (!splash) return;

  // After page fully loaded, begin fade-out sequence
  const dismiss = () => {
    splash.classList.add("fade-out");
    splash.addEventListener("transitionend", () => splash.remove(), { once: true });
    // Fallback remove if transition doesn't fire
    setTimeout(() => { if (splash.parentNode) splash.remove(); }, 1200);
  };

  // Give a bit of time to show the splash, then auto-dismiss
  setTimeout(dismiss, 2800);

  // Also allow early dismiss on click
  splash.addEventListener("click", dismiss);
f
}