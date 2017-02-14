browser.contextMenus.create({

	id: "generate",
	title: "Turn This Page Into Sheetmusic!"

});


browser.contextMenus.onClicked.addListener(function(info, tab) {

	var insert = browser.tabs.insertCSS({file: "styles.css"});
	insert.then(null, console.log("error"));

	if (info.menuItemId == "generate") {

   		browser.tabs.executeScript({

    		file: "generate.js"
    	});
  	}
});