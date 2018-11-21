
// this stuff makes a context menu:
// _______________________________________

var activeTab;

var querying = browser.tabs.query({active: true, currentWindow: true});
querying.then(getActiveTab);

function getActiveTab(tabs) {
  for (let tab of tabs) {
    activeTab = tabs[0];
  }
}

runScriptInActiveTab();

function runScriptInActiveTab(){

	browser.contextMenus.removeAll();
	browser.contextMenus.create({

		id: "generate",
		title: "Note-ify!"
	});	

	browser.contextMenus.onClicked.addListener(function(info, tab) {

		browser.tabs.insertCSS({file: "styles.css"});
		// console.log(tab);
		// console.log(activeTab);

			if (info.menuItemId == "generate") {
		   		browser.tabs.executeScript({
		    		file: "generate.js"
		    	});
		  //   	// browser.webNavigation.onCommitted.addListener(committed);
				// // browser.contextMenus.remove("generate")
			 //    browser.contextMenus.create({
				// 	id: "stop",
				// 	title: "Turn Off Note-ifications!"
				// });	
		  	}

		  // 	else if (info.menuItemId == "stop") {

		  // 		// browser.webNavigation.onCommitted.removeListener(committed);
		  // 		browser.contextMenus.remove("stop")
		  // 		browser.contextMenus.create({

				// 	id: "generate",
				// 	title: "Note-ify!"

				// });
		  // 		browser.tabs.reload();
		  // 	}
	});
}
// add feature that allows for multiple tabs/windows to be note-ified at the same time !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// listen to tab switching
// browser.tabs.onCreated.addListener(runScriptInActiveTab);
browser.windows.onCreated.addListener(runScriptInActiveTab);
// listen to tab URL changes
// browser.tabs.onUpdated.addListener(runScriptInActiveTab);

// listen to tab switching
// browser.tabs.onActivated.addListener(runScriptInActiveTab);

// listen for window switching
// browser.windows.onFocusChanged.addListener(runScriptInActiveTab);


// this stuff makes a browser button:
// _______________________________________

// var pageIsNotified = false;
// var currentTab;

// function updateIcon() {
// 	if (pageIsNotified) {
// 		browser.browserAction.setIcon({path: "images/icon3.png"});
// 		browser.browserAction.setTitle({title: "Turn off Note-ifications!"})
// 	} else {
// 		browser.browserAction.setIcon({
// 			path: "images/icon.png"
// 		});
// 		browser.browserAction.setTitle({
// 			title: "Turn off Note-ifications!"
// 		})
// 	}
// }

// function toggleNotify(){
// 	browser.browserAction.setBadgeBackgroundColor({color: "pink"});
// 	if (!pageIsNotified) {
// 		browser.tabs.insertCSS({file: "styles.css"});
// 		browser.tabs.executeScript({file: "generate.js" });
// 		pageIsNotified = true;
// 	} else {
// 		browser.tabs.reload();
// 		pageIsNotified = false;
// 	}
// 	updateIcon();
// }

// browser.browserAction.onClicked.addListener(toggleNotify);



// how does the extenstion respond when the user navigates to a new page or refreshes the current page ???








