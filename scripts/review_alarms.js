// populate the table with saved data on page load
window.onload = function() {
	browser.storage.local.get()
		.then(populateTable, onError)
		.then( function() {
			var allSites = document.getElementsByClassName('edit-site');
			var siteCount = allSites.length;
			for( var index=0; index<siteCount; index++ ) {
				allSites[index].onclick = editFunction;
				allSites[index].nextSibling.onclick = deleteFunction;
			}
		}, function(error) {
			console.error(error);
		});
};

function onError(error) {
	console.error(error);
}

function editFunction(evnt) {
	var newWindow = window.open('set_options.html');
	newWindow.siteToEdit = evnt.target.parentNode.id;
};

function deleteFunction(evnt) {
	if( window.confirm("Do you really want to delete this alarm?") ) {
		browser.storage.local.get()
			.then( function(allData) {
				var siteToDelete = evnt.target.parentNode.id;
				var index = allData.id.indexOf(siteToDelete);
				if( index > -1 ) {
					allData.id.splice(index, 1);
					var id = {id: allData.id};
					browser.storage.local.remove(siteToDelete)
						.then( function() {
							browser.storage.local.set(id)
								.then( function() {
									location.reload();
								}, function() {
									console.error(error);
								});
						}, function() {
							console.error(error);
						});
				}
			}, function(error) {
				console.error(error);
			});
	}
}

const populateTable = (allData) => {
	return new Promise((resolve, reject) => {
		var elementData = "";
		if( typeof allData.id !== 'undefined' && allData.id.length ) {
			var siteCount = allData.id.length;
			for( var index=0; index<siteCount; index++) {
				var rowBackground = (index % 2) ? 'even-row' : 'odd-row';
				var currentSiteData = allData[allData.id[index]];
				elementData +=	('<tr id="' + allData.id[index] + '" class="' + rowBackground + '">' +
									'<td class="edit-site">Edit</td>' +
									'<td class="delete-site">Delete</td>' +
									'<td><a href="' + currentSiteData.url + '" target="_blank">' + currentSiteData.url + '</a></td>' +
									'<td>' + currentSiteData.startDate + '</td>' +
									'<td>' + currentSiteData.startTime + '</td>' +
									'<td>' + currentSiteData.repeat.charAt(0).toUpperCase() + currentSiteData.repeat.slice(1) + '</td>' +
								'</tr>');
			}
		} else {
			elementData = '<tr><td colspan="6">No records found. Please add a site to alarm first.</td></tr>';
		}
		(document.getElementById('data-table').children[0].children[1]).innerHTML = elementData;
		resolve();
	});
}
