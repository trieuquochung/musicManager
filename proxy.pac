//-----------------------------------------------------
// isIPAddress
//-----------------------------------------------------
//
function IsIpAddress(ipaddr) {
	var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
	if (re.test(ipaddr)) {
		var parts = ipaddr.split(".");
		if (parseInt(parseFloat(parts[0])) == 0) { 
			return(false); 
		}
		for (var i=0; i<parts.length; i++) {
			if (parseInt(parseFloat(parts[i])) > 255) { 
				return(false); 
			}
		}
		return(true);
	} else {
		return(false);
	}
}


//-----------------------------------------------------
// isLoopbackAddress
//-----------------------------------------------------
//
function isLoopbackAddress(ipaddr) {
	var parts = ipaddr.split(".");
	if (parseInt(parseFloat(parts[0])) == 127) { 
		return(true); 
	}
	return(false);
}


//-----------------------------------------------------
// Rule_DnsMatch
//-----------------------------------------------------
//
function Rule_DnsMatch(host) {
	var match = true;
	var Terminator = "";
	var lastHostIndex = host.length - 1;
	
	for (var i=0; i < this.segments.length; i++) {

 		if (this.segments[i] == Terminator) {
			match = (i > lastHostIndex ? true : false);
 			break;
   		} else if (i > lastHostIndex) {
 			match = false;
			break;
		}
		
		if (shExpMatch(host[i], this.segments[i]) == false) {
 			match = false;
			break;
		}
	}
 	return(match);
}



//-----------------------------------------------------
// Rule_IpMatch
//-----------------------------------------------------
//
function Rule_IpMatch(hostname) {

	var match = true;

	var host = hostname.split('.');
	var addr1 = this.range[0].split('.');
	var addr2 = this.range[1].split('.');

  	for (var i=3; i >= 0; i--) {
 	
	 	var cmp = new Number(host[i]);
	 	var start = new Number(addr1[i]);
		var end = new Number(addr2[i]);

		if (cmp < start || cmp > end) {
 			match = false;
 			break;
 		}  
	}
    
	return(match);
}


//-----------------------------------------------------
// Rule Class
//-----------------------------------------------------
//
function Rule(ruleString, theProxy) {
 	this.range = ruleString.split('-');
	this.segments = ruleString.split('.');
    this.segments.reverse();
    if (theProxy === undefined || theProxy === null) {
        this.proxy = "DIRECT"
    } else {
        this.proxy = theProxy
    }
 	this.DnsMatch = Rule_DnsMatch;
	this.IpMatch = Rule_IpMatch;
}

//-----------------------------------------------------
// Redirection Rules
//-----------------------------------------------------
//
var HostRules = [];
var IpRules = [];
var DEFAULT_PROXY = 'PROXY proxy.tma.com.vn:8080'

//-----------------------------------------------------
// FindProxyForURL
//-----------------------------------------------------
//
function FindProxyForURL(url, host) {
	
	var redirect = false;
	var match = false;
    
  	if (IsIpAddress(host)) {
			
		if (isLoopbackAddress(host)) {
			return("DIRECT");
		}
		// IP rules
		//
		for (var i=0; i < IpRules.length; i++) {
			if (IpRules[i].IpMatch(host) == true) {
				return IpRules[i].proxy;
			}		
		}
	} else {
   		// Hostname Rules
        var hostSegments = host.split('.');
		hostSegments.reverse();
		for (var i=0; i < HostRules.length; i++) {         
			if (HostRules[i].DnsMatch(hostSegments) == true) {               
 				return HostRules[i].proxy;
			}
		}
	}
	//There is no rule, return default proxy
	return DEFAULT_PROXY;
}

//----------------------------------------------------------------
// Redirection Rules
//----------------------------------------------------------------
// If there is no proxy passed to the Rule class, the DIRECT shall be returned
//
HostRules = [
	new Rule("columbia.ind.alcatel.com", "DIRECT"),
	new Rule("*.netaos.com", "DIRECT"),
	new Rule("git.netaos.us", "DIRECT"),
	new Rule("abpsc.app.ale-international.com", "DIRECT"),	
	new Rule("*.tma.com.vn", "DIRECT"),
	new Rule("hangouts.google.com", "PROXY improxy.tma.com.vn:8080")
	new Rule("*.live.com", "PROXY proxy.tma.com.vn:8080")
	new Rule("*.microsoft.com", "PROXY proxy.tma.com.vn:8080")
];

IpRules = [
	new Rule("192.168.70.1-192.168.70.255", "DIRECT"),
	new Rule("192.168.71.1-192.168.71.255", "DIRECT"),
	new Rule("172.16.92.1-172.16.92.255", "DIRECT"),
	new Rule("10.255.200.1-10.255.255.255", "DIRECT"),
	new Rule("10.0.0.1-10.0.20.255", "DIRECT")
];

