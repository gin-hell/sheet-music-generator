browser.contextMenus.create({

	id: "generate",
	title: "Note-ify!"

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
			title: "Turn Off Note-ifications"

		});	
  	}

  	else if (info.menuItemId == "stop") {

  		browser.webNavigation.onCommitted.removeListener(committed);

  		browser.tabs.reload();
  	}

});

function committed(details) {
 	if (details.transitionType === "link"){

		browser.tabs.insertCSS({file: "styles.css"});

		browser.tabs.executeScript({file: "generate.js" });
	}
}





