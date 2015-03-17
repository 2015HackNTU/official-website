//post [String command, List parameter]

//[GET_NOTIFICATION, [query_month, last_query_time]]
//if lasttime is null, return all Unexpired notification
function getNotifications() {
	var []
}

///[GET_ACTIVITY, [ isSpecific, num, page, activityId]]
function getActivitys() {

}

function getProjects() {

}



// private fuctions
function notificationsHandler(notifications) {
	var noti;
	save(new Date().getTime(), 'hackntu.last_query_noti');
	for (noti in notifications) {
		setNotiInCalender();
	}
}

///[GET_ACTIVITY, [ isSpecific, num, page, activityId]]
function activitysHandler() {

}

function projectsHandler() {

}

function setNotiInCalender(type) {
	
}
