var allSiteData = {};

(function() {
	setInterval( loadData, 6000 );
})();

function loadData() {
	browser.storage.local.get()
		.then( function(allData) {
			allSiteData = allData;
			if( typeof(allSiteData.id) !== 'undefined' && allSiteData.id.length > 0 ) loadSite();
		}, function(error) {
			console.error(error);
		});
}

function loadSite() {
	var now = new Date();
	var nextRun = new Date();
	var toOpen = false;
	var siteCount = allSiteData.id.length;
	for( var index=0; index<siteCount; index++ ) {
		var currentSiteData = allSiteData[allSiteData.id[index]];
		var dateArray = currentSiteData.startDate.split('-');
		var timeArray = currentSiteData.startTime.split(':');
		var startDateTime = new Date(dateArray[0], dateArray[1]-1, dateArray[2], timeArray[0], timeArray[1], 0);
		/*
			calculate if the site needs to be opened
			by looking at the last open date-time and repeat date-time set
			open the site ONCE
		*/
		toOpen = false;
		switch(currentSiteData.repeat) {
			case 'once':
				if( startDateTime >= currentSiteData.lastRun && !currentSiteData.opened ) toOpen = true;
				break;
			case 'daily':
				currentSiteData.opened ? 
				nextRun.setDate(currentSiteData.lastRun.getDate() + 1) :
				nextRun.setDate(startDateTime.getDate() + 1);
				if( nextRun >= now ) toOpen = true;
				break;
			case 'weekly':
				currentSiteData.opened ? 
				nextRun.setDate(currentSiteData.lastRun.getDate() + 7) :
				nextRun.setDate(startDateTime.getDate() + 7);
				if( nextRun >= now ) toOpen = true;
				break;
			case 'monthly':
				if( currentSiteData.opened ) {
					
				} else {
					
				}
		}
		if( toOpen ) {
			console.log(currentSiteData.url);
		}
	}
}
