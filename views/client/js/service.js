//post [String command, List parameter]

// [GET_ACTIVITY, [num, page]]
/*
plase pass list of sth like this, if it isn't fit the current format, please tell me, thx. Abby
{
	'id':
    'type': 'workshop',
    'name': 'make own website',
    'datetime': '2015-3-8',//date().toJSON(),
    'decription' '...',
    'imgs': ['/title/photo1.jpg', '/title/photo2.jpg', '/title/photo3.jpg'],
}
*/

function getActivitys(num, offset) {
	sendAjax('/query', JASON.parse([GET_ACTIVITY, [num, offset]]), activitysHandler);
}

function getSpecificActivitys(activityId) {
	var data = [GET_SPEC_ACTIVITY, [activityId]]
	sendAjax('/query', [,[activityId]], activitysHandler);
}

function getProjects() {

}


///[GET_ACTIVITY, [ isSpecific, num, page, activityId]]
function activitysHandler() {

}

function projectsHandler() {

}