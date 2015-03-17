function send_Ajax(uri, callbackfunction) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", uri, true);
	xmlhttp.onreadystatechange = function() {
		var status = xmlhttp.status;
		if (xmlhttp.readyState == 4) {
			if (status >= 200 && status < 300) {
				//handle json, and pass para to callbackfuciton
				var val = xmlhttp.responseText;
				var data = JSON.parse(val);
				callbackfunction(data);
			}
		}
  	}
  	xmlhttp.send();
}