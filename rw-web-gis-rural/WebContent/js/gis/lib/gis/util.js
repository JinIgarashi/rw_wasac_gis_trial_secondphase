gis.util = function(spec,my){
	var that= {};
	my = my || {};
	that.CLASS_NAME =  "gis.util";
	return that;
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