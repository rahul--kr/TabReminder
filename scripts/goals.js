// add/update goals

(function() {
	var today = new Date();
	// var dd = today.getDate();
	// var mm = today.getMonth()+1; //January is 0!
	// var yyyy = today.getFullYear();
	// var todayFormatted = mm+'/'+dd+'/'+yyyy;

	if( ( ((today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear() ) == $("#ucAddGoal_dtGoalDate_label").html() ) &&
		( $("#lblGoalDate").html().indexOf('Saturday') <= 0 || $("#lblGoalDate").html().indexOf('Sunday') <= 0 ) ) {
		var goalCount = $("#dgGoals tbody tr").length;
		var now = new Date();

		if( goalCount < 2 ) {
			// add a new goal
			$("#ucAddGoal_txtAddGoal").html("check mails and messages");
			$("#ucAddGoal_btnAddGoal").click();
		} else if( goalCount < 6 && now.getHours() > 16 ) {
			// add unachieved goals from the previous day to current goal sheet
			if( $("#cmbUnachievedGoals option").length ) {
				$("#btnCarryOver").click();
			} else {
				alert("add more goals");
			}

			// add 5 more goals (bakchodi goals: to make them invisible to public uncomment the next if-else block)
			// $("#ucAddGoal_txtAddGoal").html("check \n all \n mails \n and \n messages");
			// $("#ucAddGoal_btnAddGoal").click();
		} else if( now.getHours() > 16 && $("#dgGoals tbody tr")[goalCount-1].cells[1].children[0].textContent == 'messages' && $("#dgGoals tbody tr")[goalCount-1].cells[3].children[1].checked ) {
			// make last 5 goals in the goal-sheet invisible to public if the last goal is "messages"
			if( $("#dgGoals tbody tr")[goalCount-1].cells[1].children[0].textContent == 'messages' ) {
				for( var i=goalCount-1; i>goalCount-6; i-- ) {
					$("#dgGoals tbody tr")[i].cells[3].children[1].checked = false;
				}
				$("#btnUpdate").click();
			}
		} else if( now.getHours() > 18 && !$("#dgGoals tbody tr")[1].cells[0].children[1].checked ) {
			// mark the first goal as complete
			$("#dgGoals tbody tr")[1].cells[0].children[1].checked = true;
			$("#btnUpdate").click();
		}
	}
})();
