


var picURL = browser.extension.getURL("images/5-line-staff.png")



var noteheads = ['q', 'Q', 'h', 'H', 'w', 'E', 'W', 'm', 'T', 'O', '?', 'B', 'C', 'X', 'x', 'b', 'c', '&', 'U', ' " ', '/', '%', ' ‘ ', '_', 'œ', ' '];


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
				// current.appendChild(staff)
				child.style.backgroundImage = "url(" + picURL +")";
				child.style.backgroundRepeat = "no-repeat";
				// console.log("boop! i changed the background of " + child +" !")
			}

			findTextNodes(child);
		}
	}
}

document.body.style.fontFamily = "jenFont";
console.log("done changing font");

findTextNodes(document.body);
console.log(textNodes);
console.log("done getting text nodes");

for (var i = 0; i < textNodes.length; i++) {

	var text = textNodes[i].textContent;
	// console.log(textNodes[i]);

	for (var j = 0; j < text.length; j++) {

		if (noteheads.includes(text[j])) {

		} else {

			text = text.substring(0,j) + "\x0D" + text.substring(j+1, text.length);

		}		
	}
	textNodes[i].nodeValue = text;
};
console.log("done changing letters");


