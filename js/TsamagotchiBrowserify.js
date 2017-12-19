// Expose the Tsamagotchi class to the window
var tsama = window.tsama || {};
const { Tsamagotchi } = require("tsamagotchi");
tsama.Tsamagotchi = Tsamagotchi;
window.tsama = tsama;
