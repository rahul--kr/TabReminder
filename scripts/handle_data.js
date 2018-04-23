// highlight today's date in the calendar displayed in the popup -> works on mousedown+mouseup events
function setTodayDateInCalendarUI() {
	// creating and dispatching simulated mousedown+mouseup events
	var simMousedownEvent = new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window });
	var simMouseupEvent = new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window });
	document.getElementsByClassName('calendar')[0].children[0].children[0].children[1].children[2].dispatchEvent(simMousedownEvent);
	document.getElementsByClassName('calendar')[0].children[0].children[0].children[1].children[2].dispatchEvent(simMouseupEvent);
}

// display fetched data onto console
function displayFetched(item) {
}

// logs the errors in console
function onError(error) {
	console.error(error);
}

// handles successful saving of id to recognize site data saved
function idSaveSuccess() {
	browser.storage.local.get("id")
		.then(displayFetched, onError);
}

// handles successful saving of the site settings/alarm
function dataSaveSuccess() {
	browser.storage.local.get("id")
		.then( function(ids) {
			var siteCount = ids.id.length;
			for( var index=0; index<siteCount; index++) {
				browser.storage.local.get(ids.id[index])
					.then( function(siteData) {
					}, function(error) {
						console.error(error);
					});
			}
		}, function(error) {
			console.error(error);
		});
}

// fetch data from all fields and call the function to save the data and handle the result accordingly
function saveData() {
	// create a new id to save the new record
	var siteData = {};
	var siteId = (typeof(window.siteToEdit) === 'undefined') ?
		Math.random().toString(36).substr(2, 10) :
		window.siteToEdit;
	var siteStartTime = document.getElementById('set-time').children[2].value;
	var siteStartDate = (typeof(window.siteToEdit) === 'undefined') ?
		document.getElementById('embedded-date-field').textContent :
		document.getElementById('calendar-button').textContent;

	// curate data to be saved
	siteData[siteId] = {
		url: document.getElementById('set-url').children[2].value,
		startDate: siteStartDate,
		startTime: siteStartTime,
		repeat: document.getElementById('set-repeat').children[2].value,
		lastRun: new Date(),
		opened: false
	}

	if(typeof(window.siteToEdit) === 'undefined') {
		browser.storage.local.get("id")
			.then( function(item) {
				// defining and setting id
				var id = '';
				if( typeof item.id !== 'undefined' && item.id.length ) {
					id = item;
					id.id.push(siteId);
				}
				else {
					id = {id: [siteId]};
				}
				browser.storage.local.set(id) // save data
					.then(idSaveSuccess, onError); // handle save result
			}, function(error) {
				console.error(error);
			});
	}

	browser.storage.local.set(siteData) // save data
		.then(dataSaveSuccess, onError); // handle save result
}
