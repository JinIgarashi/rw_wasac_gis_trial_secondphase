gis.util = function(spec,my){
	var that= {};
	my = my || {};
	that.CLASS_NAME =  "gis.util";
	return that;
};

/**
 * ajax呼び出し用（GET）
 */
gis.util.ajaxGet = function(url,callback){
	gis.util.ajax(url,'GET',callback);
};

/**
 * ajax呼び出し用（PUT）
 */
gis.util.ajaxPut = function(url,callback,data){
	gis.util.ajax(url,'PUT',callback,data);
};

/**
 * ajax呼び出し用（DELETE）
 */
gis.util.ajaxDelete = function(url,callback){
	gis.util.ajax(url,'DELETE',callback);
};

/**
 * ajax呼び出し用共通部品
 */
gis.util.ajax = function(url,type,callback,data){
	$.ajax({
		url : url,
		type : type,
		data : data,
		dataType : 'json'
	})
	.done(callback)
	.fail(function(xhr){
		console.log(xhr.status + ';' + xhr.statusText);
		return false;
	});
};

/**
 * スマートフォンかどうかを判定する。スマホの時はTrueを返す。
 */
gis.util.isSmartphone = function(){
	var isSmartPhone = false;
	var ua = navigator.userAgent;
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        // スマートフォン用コード
    	isSmartPhone=true;
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        // タブレット用コード
    	isSmartPhone=true;
    } else {
        // PC用コード
    	isSmartPhone=false;
    }
    return isSmartPhone;
};