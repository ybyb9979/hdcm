var MobileUA = ( function() {
	var ua = navigator.userAgent.toLowerCase();
	var mua = {
		IOS: /ipod|iphone|ipad/.test(ua),
		IPHONE: /iphone/.test(ua),
		IPAD: /ipad/.test(ua),
		ANDROID: /android/.test(ua),
		WINDOWS: /windows/.test(ua),
		TOUCH_DEVICE: ('ontouchstart' in window) || /touch/.test(ua),
		MOBILE: /mobile/.test(ua), 
		ANDROID_TABLET: false,
		WINDOWS_TABLET: false,
		TABLET: false,
		SMART_PHONE: false,
        SB : /samsungbrowser/.test(ua)
	};
	
	mua.ANDROID_TABLET = mua.ANDROID && !mua.MOBILE;
	mua.WINDOWS_TABLET = mua.WINDOWS && /tablet/.test(ua);
	mua.TABLET = mua.IPAD || mua.ANDROID_TABLET || mua.WINDOWS_TABLET;
	mua.SMART_PHONE = mua.MOBILE && !mua.TABLET;
	
	return mua;
}());

function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + cValue   + '; path=/ ';
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

function setCookieTimeZero(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
	expire.setHours(0,0,0,0);
    cookies = cName + '=' + cValue   + '; path=/ ';
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

function getCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName); var cValue = '';
	if (start != -1) {
		start += cName.length;
		var end = cookieData.indexOf(';', start); if(end == -1) end = cookieData.length; cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}

function getSearchParams(search) {

	var query = search.split("?")[1];
    
    // result_obj = { status, pg, cid, (ERROR) }
    var result_obj = new Object();
    
	if (query === undefined) {
        result_obj.status = 0;
		result_obj.ERROR = 'ERROR: undefined query string';
	} else {
        result_obj.status = 1;
        
		var queryArr = query.split("&");
		
		for (i in queryArr) {
			var key = queryArr[i].split("=")[0];
			var value = queryArr[i].split("=")[1];
			result_obj[key] = value;
		}
	}
    
    return result_obj;
}


// 18.06.07
// ???????????? ?????? ?????? ??? ??????????????? ????????? applink ??? ????????? ?????? ?????? ??????
// dtm js ?????? ?????????????????? ???????????? ?????? ?????? ?????? ?????? ????????????...
// setTimeout ??? ?????? ?????? ?????? ???????????????

// 18.06.11
// ptx3p ?????? --> window.open(link, '_blank') ????????? ??? ?????????
// base ?????? window.open('http://app.hyundaicard.com','_self') ??? ????????????
// applink click ??? ???????????? ????????? ??????
function callDyanamicLink(link) {
    console.log('dw3 : call dynamic link');
    window.open(link, '_blank');
    window.open('http://app.hyundaicard.com', '_self');
}


function redirect(params) {
	var link;
    if (params["pg"] === undefined && params["cid"] === undefined) {
        defaultRedirect();
        return;
    } else {
		link = LINK(MobileUA, params["pg"], params["cid"]);
    }
    console.log('dw3 : get redirect link', link);
    console.log(MobileUA);
	// 2018.05.29 tablet ????????? ??????????????? ??????
	if (MobileUA.MOBILE && MobileUA.IOS) {
	
        if (link.indexOf("hyundaicardappcard://") === -1 && link.indexOf("hyundaicardbill://") === -1) {
			// if dynamic link call
			// location.href = link;
            callDyanamicLink(link);
		} else {
			// if scheme call
            console.log('dw3 : call scheme link');
			setTimeout(function() {
				if (!document.webkitHidden) {
					location.href = "http://itunes.apple.com/kr/app/id702653088?mt=8&utm_campaign="+Applink_CID;
				}
			}, 25);
			location.href = link;
		}
		
	} else if (MobileUA.MOBILE && MobileUA.ANDROID) {
		
		if (link.indexOf("intent://") === -1) {
			// if dynamic link call
			callDyanamicLink(link);
		} else {
			// if scheme call
            console.log('dw3 : call scheme link');
			location.href = link;
			setTimeout(function() {
				location.href = "https://play.google.com/store/apps/details?id=com.hyundaicard.appcard&utm_campaign="+Applink_CID;
			}, 500);
		}
		
	}
}
