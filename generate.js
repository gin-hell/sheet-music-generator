




var noteheads = ['q', 'Q', 'h', 'H', 'w', 'E', 'W'];

// var text = document.body.innerText;

var nodes = document.body.childNodes;

var textNodes = [];


for (var i = 0; i < nodes.length; i++) {
	var child = nodes[i];
	if (child.nodeType == 1 && child.type !== "text/javascript") {
		textNodes.push(child)
	}

};



for (var i = 0; i < textNodes.length; i++) {
	var text = textNodes[i].innerText;

	for (var j = 0; j < text.length; j++) {
		if ( noteheads.includes(text[j]) ) {

		} else {

			text = text.substring(0, j) + "	" + text.substring(j+1, text.length);

		}

		textNodes[i].innerText = text;

	};
};

document.body.style.fontFamily = "jenFont";