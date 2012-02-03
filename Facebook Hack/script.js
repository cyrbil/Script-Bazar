// COPYRIGHT CYRBIL 2012
// usage: javascript: *this script*
// 		  into your browser url in facebook.
// or put this script in your browser console :)


	// create xhr object
	var xhr = window.ActiveXObject ?
		function() { // IE
			try {
				return new window.XMLHttpRequest();
			} catch( e ) {
				try {
					return new window.ActiveXObject( "Microsoft.XMLHTTP" );
				} catch( e ) { alert("Your browser can't do ajax request."); }
			}
		} :
		// all other browsers
		new window.XMLHttpRequest();
	
	// add callback after successfull request
	xhr.onreadystatechange = function() {
	   	if(xhr.readyState == 4) {
	    	if(xhr.status == 200)
	    		return next();
	    	else 
	    		alert("Script failed to fetch data ressource")
	    }
	};

	// preg userid
	var p = /([0-9]+)", "c_user/.exec(document.body.innerHTML);
	if( p != undefined && p[1].length < 1 ) alert("Can't find user ID");
	else {
		user = p[1];
		// request facebook (only working from facebook)
		xhr.open("GET", "https://www.facebook.com/ajax/typeahead/search/bootstrap.php?__a=1&filter[0]=user&no_cache=1&viewer="+user+"&__user="+user); // yeah, no tokens bitches !
		xhr.send(null); // go !
	}

	// callback function
	function next() {
		var data = xhr.responseText.substring(29); // remove unecessary data
		data = data.substr(0,data.length - 1); 
		data = eval('('+data+')'); // cast into object
		if( data.entries[0].text == undefined ) // bad data ?
			return alert("Data not fetch");
		
		// ok now create a beautiful table with results
		var end = data.entries.length - 1;
		
		var html = "<html><head><title>FB Hack</title><style type=\"text/css\">table {margin:1em auto;border-collapse:collapse;color: #678197;}td {border:1px solid #E5EFF8;}tr.odd {background: #F4F9FE;}td * {vertical-align: middle;padding: 5px;}td a {color: #678197;text-decoration: none;}td img {max-width: 30px;max-height: 30px;}</style></head><body><table>";
		for (var i = 0; i <= end; i++) {
			var o = data.entries[i];
			var pic =  (o.photo.substr(0,4) == "http") ? o.photo : "//facebook.com"+o.photo;
			
			if(i%3==0) {
				if(i!=0) html += "</tr>";
				if(i!=end) {
					if(i%2==0) html += "<tr class=\"odd\">";
					else html += "<tr>";
				}
			}
			html += "<td><span>"+(i+1)+"</span></td><td><a href=\"//facebook.com"+o.path+"\"><img src=\""+pic+"\">"+o.text+"</a></td>";
		};
		html += "</table></body></html>";
		// show it babe !
		popup=window.open("","popup","menubar=yes,scrollbars=yes,width=1000,height=700,resizable=yes");
		popup.document.writeln(html);
		popup.document.close();
		// all done :)
	}