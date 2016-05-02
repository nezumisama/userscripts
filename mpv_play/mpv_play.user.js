// ==UserScript==
// @name        MpvPlay
// @namespace   nez
// @description Add an link (eject symbol) on youtube video pages opening the video in MPV (or similar).
// @include     /^https?://(?:www)?\.youtube\.com/
// @version     0.2
// @grant       GM_addStyle
// ==/UserScript==

// Add styling rules for the element.
GM_addStyle('#mpvlink { font-size: 50%; vertical-align: middle; } #mpvlink:hover { color: #77aadd; text-decoration: none; }');

// Create the link.
var mpvlink = document.createElement('a');
mpvlink.id = 'mpvlink';
mpvlink.href = 'mpv://' + document.location.href;
mpvlink.title = 'Play the video in MPV.';
mpvlink.text = '⏏';
// Pause the on-page video when clicked.
mpvlink.onclick = function(e) { document.getElementsByTagName('video')[0].pause(); }

var add_link_if_possible = function () {
  mpv_lnk = document.getElementById('mpvlink');
  tit = document.getElementById('eow-title');
  // If the title element exists and the link doesn't,
  // add the link in title.
  if(!mpv_lnk && tit) {
    tit.parentElement.appendChild(mpvlink);
  }
}

add_link_if_possible();
// Repeatedly try adding.
window.setInterval(add_link_if_possible, 2000);
