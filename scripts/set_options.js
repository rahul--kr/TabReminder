// initiate the popup view on opening the extension
Event.observe(window, 'load', function() {
	// setup calendar http://calendarview.org/
	// and show/hide fields as required by the operation
	if( typeof(window.siteToEdit) === 'undefined' ) {
		document.getElementById('edit-site').style.display = "none";
		setupNewSiteCalendar();
	}
	else {
		document.getElementById('new-site').style.display = "none";
		setupEditSiteCalendar();
	}
	setDefaultValues();
});

// calendar setup for adding new site
function setupNewSiteCalendar() {
	Calendar.setup({
		dateField: 'embedded-date-field', // field to store the selected date
		parentElement: 'embedded-calendar' // div to display the whole calendar in
	});
}

// calendar setup for editing a saved site
function setupEditSiteCalendar() {
	Calendar.setup({
		dateField: 'calendar-button',
		triggerElement: 'calendar-button'
	});
}

// set dafault values for all the fields in the extension form
function setDefaultValues() {
	if( typeof(window.siteToEdit) === 'undefined' ) {
		// getting the current tab URL and setting defaults for new site
		browser.tabs.query({currentWindow: true, active: true})
			.then((tabInfo) => {
				var dateNow = new Date();
				document.getElementById('set-time').children[2].value = ("0" + dateNow.getHours().toString()).slice(-2) + ":" + ("0" + dateNow.getMinutes().toString()).slice(-2); // setting time in 'HH:MM' format [24-hour clock]

				document.getElementById('embedded-date-field').innerHTML = dateNow.getFullYear().toString() + "-" + ("0" + (dateNow.getMonth() + 1).toString()).slice(-2) + "-" + ("0" + dateNow.getDate().toString()).slice(-2); // setting date in YYYY-MM-DD format

				document.getElementById('set-repeat').children[2].value = 'once'; // set repeat dropdown
				document.getElementById('set-url').children[2].value = tabInfo[0].url;
			})
			.catch((error) => {
				onError(error);
			});
	} else {
		// loading the current site data and setting saved data to edit
		browser.storage.local.get(window.siteToEdit)
			.then((siteInfo) => {
				document.getElementById('set-time').children[2].value = siteInfo[window.siteToEdit].startTime;
				document.getElementById('calendar-button').innerHTML = siteInfo[window.siteToEdit].startDate;
				document.getElementById('set-repeat').children[2].value = siteInfo[window.siteToEdit].repeat;
				document.getElementById('set-url').children[2].value = siteInfo[window.siteToEdit].url;
			})
			.catch((error) => {
				onError(error);
			});
	}
}
