gis.util = function(spec,my){
	var that= {};
	my = my || {};
	that.CLASS_NAME =  "gis.util";
	return that;
};

/**
 * ajax呼び出し用（GET）
 */
gis.util.ajaxGet = function(url,callback,dataType){
	gis.util.ajax(url,'GET',callback,null,dataType);
};

/**
 * ajax呼び出し用（GET）
 */
gis.util.ajaxGetAsync = function(url,callback,dataType){
	gis.util.ajax(url,'GET',callback,null,dataType,false);
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
gis.util.ajax = function(url,type,callback,data,dataType,async){
	if (!dataType){
		dataType = 'json';
	}
	$.ajax({
		url : url,
		type : type,
		data : data,
		dataType : dataType,
		async : async
	})
	.done(callback)
	.fail(function(xhr){
		console.log(xhr.status + ';' + xhr.statusText);
		return false;
	});
};