function sendAjax(uri, jason, callbackfunction) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("post");
	xmlhttp.onreadystatechange = function() {
		var status = xmlhttp.status;
		if (xmlhttp.readyState == 4) {
			if (status >= 200 && status < 300) {
				//handle json, and pass para to callbackfuciton
				var val = xmlhttp.responseText;
				callbackfunction.call(!val || val.length == 0? null: JSON.parse(val));
			} else {
				//handle error status
			}
		}
  	}
}