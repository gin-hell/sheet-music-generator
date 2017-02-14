




var noteheads = ['q', 'Q', 'h', 'H', 'w', 'E', 'W', 'M', 'O'];

// var text = document.body.innerText;



var textNodes = [];


// ugh --> this doesn't work for text that just sits inside a fucking <div> w/out a <p> tag or whatever
function findTextNodes(current) {
	for (var i = 0; i < current.childNodes.length; i++) {
		var child = current.childNodes[i];
		if (child.nodeValue !== null) {
			textNodes.push(child);
		} else {
			findTextNodes(child);
		}

	}
}

findTextNodes(document.body);

// console.log(textNodes);

console.log("done getting text nodes");


for (var i = 0; i < textNodes.length; i++) {

	var text = textNodes[i].nodeValue;
	console.log(textNodes[i]);

	for (var j = 0; j < text.length; j++) {

		if (noteheads.includes(text[j])) {
			console.log("yay this letter is included in my notehead set")

		} else {

			text = text.substring(0,j) + " " + text.substring(j+1, text.length);

		}

	}

	textNodes[i].nodeValue = text;

};

console.log("done changing letters");


document.body.style.fontFamily = "jenFont";

console.log("done changing font");
