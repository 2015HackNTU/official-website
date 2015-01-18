val hasDB = false;

function checkDB(alertElem) {//id: warnig-text
	if (typeof(Storage) != "undefined") {
		alertElem.innerHTML = "Sorry, your browser does not support Web Storage. Some function would go wrong."
		alertElem.style.dispaly = 'block';
    } else {
    	hasDB = true;
    }
}

function save(key, value) {
	if (!hasDB)
		return;
    localStorage.setItem(key, value);
}

function getByKey(key) {
	if (!hasDB)
		return null;
	return localStorage.getItem(key);
}