browser.contextMenus.create({

	id: "generate",
	title: "Turn This Page Into Sheetmusic!"

});


browser.contextMenus.onClicked.addListener(function(info, tab) {

	browser.tabs.insertCSS({file: "styles.css"});

	if (info.menuItemId == "generate") {

   		browser.tabs.executeScript({

    		file: "generate.js"
    	});

    	browser.webNavigation.onCommitted.addListener(committed);

	    browser.contextMenus.create({

			id: "stop",
			title: "Please no More Sheetmusic!"

		});	
  	}

  	else if (info.menuItemId == "stop") {

  		browser.webNavigation.onCommitted.removeListener(committed);
  	}



});

function committed(details) {
 	if (details.transitionType === "link"){

		browser.tabs.insertCSS({file: "styles.css"});

		browser.tabs.executeScript({file: "generate.js" });
	}
}





