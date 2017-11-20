


var picURL = browser.extension.getURL("images/5-line-staff.png")



var noteheads = ['q', 'Q', 'h', 'H', 'w', 'E', 'W', 'm', 'T', 'O', '?', 'B', 'C', 'X', 
					'x', 'b', 'c', '&', 'U', ' " ', '/', '%', ' ‘ ', '_', 'œ', ' '];


var textNodes = [];


function findTextNodes(current) {
	for (var i = 0; i < current.childNodes.length; i++) {
		var child = current.childNodes[i];

		if (child.nodeValue !== null ) {
			textNodes.push(child);
			
		} else {
			child.style.fontSize = ( Math.random()*36 + 12 ) + "px";
			child.style.fontFamily = "inherit";

			if (Math.random() > 0.9) {
				child.style.backgroundImage = "url(" + picURL +")";
				child.style.backgroundRepeat = "no-repeat";
			}

			findTextNodes(child);
		}
	}
}

document.body.style.fontFamily = "jenFont";
findTextNodes(document.body);

for (var i = 0; i < textNodes.length; i++) {

	var text = textNodes[i].textContent;

	for (var j = 0; j < text.length; j++) {

		if (noteheads.includes(text[j])) {

		} else {

			text = text.substring(0,j) + "\x0D" + text.substring(j+1, text.length);

		}		
	}
	textNodes[i].nodeValue = text;
};





//-----------------------------------------------

var processor = null;
function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.05;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 0;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

	// Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);


    // console.log(this.clipping);
	if (this.clipping) {
		// var elements = document.getElementsByTagName("div");
		// elements[Math.floor(Math.random()*elements.length)].remove();

		textNodes[Math.floor(Math.random()*textNodes.length)].remove();

		// for (var i = 0; i < textNodes.length; i++) {
		// 	var text = textNodes[i].textContent;
		// 	for (var j = 0; j < text.length; j++) {
		// 		if (noteheads.includes(text[j])) {

		// 		} else {

		// 			text = text.substring(0,j) + "\x0D" + text.substring(j+1, text.length);

		// 		}		
		// 	}
		// 	textNodes[i].nodeValue = text;
	}


    processor.checkClipping();
}



//-----------------------------------------------

var audioContext = null;
var meter = null;

window.onload = function() {
	
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}

function didntGetStream() {
    alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
}

// console.log(meter.volume);
window.onload();

