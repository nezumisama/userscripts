// ==UserScript==
// @name        MpvPlay
// @namespace   nez
// @description Add an link (eject symbol) on youtube video pages opening the video in MPV (or similar).
// @include     /^https?://(?:www)?\.youtube\.com/
// @version     0.5
// @grant       none
// ==/UserScript==

var add_style = function(css_text) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css_text));
  document.getElementsByTagName('head')[0].appendChild(style);
}

var add_or_update_link = function () {
  self = add_or_update_link;
  if (!self.link) {
    self.link = document.createElement('a');
    self.link.id = 'mpvlink';
    self.link.title = 'Play the video in MPV.';
    self.link.text = '⏏';
    click = e => document.getElementsByTagName('video')[0].pause()
    self.link.addEventListener('click', click);
  }
  self.link.href = 'mpv://' + document.location.href;
  var title = document.querySelector(
    'h1.title.ytd-video-primary-info-renderer'
  );
  if (title && title.childNodes[title.childNodes.length - 1] !== self.link) {
    title.appendChild(self.link);
  }
  window.setTimeout(self, 1000);
}

add_style(
  '#mpvlink { color: inherit; text-decoration: none; } '+
  '#mpvlink:hover { color: #77aadd; text-decoration: none; }'
);
add_or_update_link();