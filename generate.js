


var picURL = browser.extension.getURL("images/5-line-staff.png")



var noteheads = ['q', 'Q', 'h', 'H', 'w', 'E', 'W', 'm', 'T', 'O', '?', 'B', 'C', 'X', 
					'x', 'b', 'c', '&', 'U', ' " ', '/', '%', ' ‘ ', '_', 'œ', ' '];

// var noteheads = ['q', 'Q', 'h', 'H', 'w', 'E', 'W', '&', '?', ' ', 'r', 'm'];

var textNodes = [];


function findTextNodes(current) {
	for (var i = 0; i < current.childNodes.length; i++) {
		var child = current.childNodes[i];

		if (child.nodeValue !== null ) {
			textNodes.push(child);
		} else {
			child.style.fontSize = ( Math.random()*36 + 24 ) + "px";
			child.style.fontFamily = "inherit";

			// if (Math.random() > 0.9) {
			// 	child.style.color = "transparent";
			// }

			if (Math.random() > 0.96) {
				child.style.backgroundImage = "url(" + picURL +")";
				child.style.backgroundRepeat = "no-repeat";

				// child.style.backgroundColor = "red";
			}

			findTextNodes(child);
		}
	}

	// var images = document.getElementsByTagName("img");
	// for (var i = 0; i < images.length; i++) {
	// 	images[i].style.display = "none";
	// }
	var iframes = document.getElementsByTagName("iframe");
	for (var i = 0; i < iframes.length; i++) {
		iframes[i].style.display = "none";
	}
	var lists = document.getElementsByTagName("ul");
	for (var i = 0; i < lists.length; i++) {
		lists[i].style.display = "none";
	}
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].style.display = "none";
	}
	var selectors = document.getElementsByTagName("selector");
	for (var i = 0; i < selectors.length; i++) {
		selectors[i].style.display = "none";
	}
	var objects = document.getElementsByTagName("object");
	for (var i = 0; i < objects.length; i++) {
		objects[i].style.display = "none";
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



