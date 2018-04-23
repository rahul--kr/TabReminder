// handle save button click functionality
document.querySelector('#save-button').onclick = function() {
	saveData();
	alert("Site saved to be opened later!");
	window.close();
}

// handle reset button click functionality
document.querySelector('#reset-button').onclick = function() {
	setDefaultValues();
	setTodayDateInCalendarUI();
}

// handle cancel button click functionality
document.querySelector('#cancel-button').onclick = function() {
	window.close(); // close the popup without saving
}

// handle review button click functionality
document.querySelector('#review-button').onclick = function() {
	window.open("review_alarms.html", "_blank");
	window.close();
}
