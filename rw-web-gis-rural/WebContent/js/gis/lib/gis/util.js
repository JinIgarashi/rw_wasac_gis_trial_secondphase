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
 * ajax呼び出し用（POST）
 */
gis.util.ajaxPost = function(url,callback,data){
	gis.util.ajax(url,'POST',callback,data);
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
	  var filename = "";
      var disposition = jqXHR.getAllResponseHeaders('Content-Disposition');
      if (disposition && disposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
      };
	  if (window.navigator.msSaveBlob) {
	    window.navigator.msSaveBlob(downloadData, filename); // IE用
	  } else {
	    let downloadUrl  = (window.URL || window.webkitURL).createObjectURL(downloadData);
	    let link = document.createElement('a');
	    link.href = downloadUrl;
	    link.download = filename;
	    link.click();
	    (window.URL || window.webkitURL).revokeObjectURL(downloadUrl);
	  };
	}).fail((data, status, jqXHR) => {
		alert('It failed to request ajax.');
		console.log(data, status, jqXHR);
	});
};

gis.util.getCurrentDatetime = function(date, format){
	if (!date){
		date = new Date();
	};
	if (!format) {
        format = 'Y-M-D h:m:s';
    };
    format = format.replace(/Y/g, date.getFullYear());
    format = format.replace(/M/g, (date.getMonth() + 1));
    format = format.replace(/D/g, date.getDate());
    format = format.replace(/h/g, date.getHours());
    format = format.replace(/m/g, date.getMinutes());
    format = format.replace(/s/g, date.getSeconds());
    return format;
};