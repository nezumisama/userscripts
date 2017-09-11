// ==UserScript==
// @name        MpvPlay
// @namespace   nez
// @description Add an link (eject symbol) on youtube video pages opening the video in MPV (or similar).
// @include     /^https?://(?:www)?\.youtube\.com/
// @version     0.3
// @grant       GM_addStyle
// ==/UserScript==

// Add styling rules for the element.
GM_addStyle('#mpvlink { color: inherit; text-decoration: none; } #mpvlink:hover { color: #77aadd; text-decoration: none; }');

// Create the link.
var mpvlink = document.createElement('a');
mpvlink.id = 'mpvlink';
mpvlink.title = 'Play the video in MPV.';
mpvlink.text = '⏏';
// Pause the on-page video when clicked.
var onclick = function(e) {
  document.getElementsByTagName('video')[0].pause();
}
mpvlink.addEventListener('click', onclick);

var add_link_if_possible = function () {
  var mpv_lnk = document.getElementById('mpvlink');
  var tit = document.querySelector('h1.title');
  // If the title element exists and the link doesn't,
  // add the link in the title.
  if(!mpv_lnk && tit) {
    mpvlink.href = 'mpv://' + document.location.href;
    tit.appendChild(mpvlink);
    window.clearInterval(interval_id);
  }
}

add_link_if_possible();
// Repeatedly try adding.
var interval_id = window.setInterval(add_link_if_possible, 2000);
