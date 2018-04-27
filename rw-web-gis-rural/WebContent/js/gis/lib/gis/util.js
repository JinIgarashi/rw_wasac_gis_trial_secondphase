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
	};
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

gis.util.ajaxGetFile = function(url){
	$.ajax({
		url : url,
		type:'GET'
	}).done((data, status, jqXHR) => {
	  let downloadData = new Blob([data], {type: 'text/csv'});
	  let filename = 'epanet.inp'

	  if (window.navigator.msSaveBlob) {
	    window.navigator.msSaveBlob(downloadData, filename); // IE用
	  } else {
	    let downloadUrl  = (window.URL || window.webkitURL).createObjectURL(downloadData);
	    let link = document.createElement('a');
	    link.href = downloadUrl;
	    link.download = filename;
	    link.click();
	    (window.URL || window.webkitURL).revokeObjectURL(downloadUrl);
	  }
	}).fail((data, status, jqXHR) => {
	  alert('It failed to download EPANET file.');
	});
};