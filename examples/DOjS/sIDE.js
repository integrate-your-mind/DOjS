/*
MIT License

Copyright (c) 2019-2021 Andre Seidelt <superilu@yahoo.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
Damit kommen wir zur Entwicklungsumgebung selber. DOjS hat seit Maerz 2019 einen eingebauten Editor, die ersten beiden Releases davor mussten noch ohne auskommen.
Einen Monat spaeter habe ich rudimentaeres Syntaxhighlighting eingebaut und ein halbes jahr spaeter dann Cut, Copy und Paste.

Zudem gibt es eine eingebaute Kurzreferenz die sogar kontextsensitiv ist. 

Neben der Kurzreferenz gibt es eine ausfuehrliche API-Dokumentation als HTML-Seiten.

Es gibt ein Logfile in das das System waerend der Programmausfuehrung Meldungen schreiben kann und der Inhalt kann direkt in der Entwicklungsumgebung angezeigt werden.

Zudem gibt es die Moeglichkeit die Logausgaben ueber ein IPX Netzwerk an einen zweiten Rechner zu senden und dort waerend der Sketch laeuft anzusehen.
Der Remote-Logviewer ist nichts weiter als ein DOjS-Sketch der dieempfangenen Meldungen auf den Bildschirm zeichnet.
*/

var dotPos = 10;
var inc = true;
var edit;

exports.prepare = function () {
	edit = loadImage("examples/DOjS/edit.bmp");

	textAlign(LEFT, TOP);
	imageMode(CORNER);
};

exports.present = function () {
	var yPos = 10;

	background(0);

	colorMode(RGB);
	fill(222);
	textFont(fontHeader);
	text("IDE", 10, yPos);
	yPos += fontHeader.height + 5;

	colorMode(HSB);
	strokeWeight(2);
	stroke(frameCount % 255, 255, 255);
	line(10, yPos, width - 10, yPos);

	colorMode(RGB);
	fill(222, 0, 0, 128);
	noStroke();
	circle(dotPos, yPos, 10);
	if (inc) {
		if (dotPos < width - 10) {
			dotPos += 2;
		} else {
			inc = false;
		}
	} else {
		if (dotPos > 10) {
			dotPos -= 2;
		} else {
			inc = true;
		}
	}
	yPos += 5;

	colorMode(RGB);
	fill(222);
	textFont(fontSubheader);
	text("Builtin editor w/ syntax highlight", 10, yPos);

	image(edit, 0, 80);
};

exports.keyHook = function (key) { };
exports.exitHook = function () {
	edit = null;
};
