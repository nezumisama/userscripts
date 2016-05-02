This script adds a link (eject symbol) on youtube video pages allowing you to
open the video in MPV, or another player supporting youtube links (for example
Mplayer 2 or VLC).

This however requires some additional, albeit easy steps:

1. Install this script.

2. Write a program (script) that will work as a frontend for your player.
This program will be ran with it’s first argument in the form:
mpv://<youtube url>, so you likely need to adopt this for your player.
Example in bash (for mpv):

        #!/bin/sh
        URL="${1:6}"
        mpv --osd-status-msg='${time-pos} / ${length}  ⛶ ${width}×${height}\n    ‹ ${media-title} ›' --osd-level=3 "$URL"

3. You can use for this any player that understands youtube links (those are
at least MPV, Mplayer 2 and VLC). I'll later change the script to send the
actual video url taken from viewtube. This program has to be executable by Firefox.

4. Follow the instructions here: http://kb.mozillazine.org/Register_protocol
and register a new protocol called "mpv" (or it can be another name, but you have
to change the line with "mpvlink.href" in the script and the adapter script above).
Set the program made before as the handler. If needed, open any youtube video page
and click on the link added by this script, to get a dialog asking for the program’s
path (be sure to tick permanent association there).
