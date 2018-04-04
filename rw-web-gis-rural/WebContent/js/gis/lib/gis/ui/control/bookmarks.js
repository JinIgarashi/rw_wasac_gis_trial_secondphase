gis.ui.control.bookmarks = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	my.url = './rest/Bookmarks/';
	
	my.storage = {
	        getItem: function(id, callback){
	        	gis.util.ajaxGet(my.url + id,callback);
	        },
	        setItem: function(id, value, callback){
	        	gis.util.ajaxPut(my.url + id,callback,value);
	        },
	        removeItem: function(id, callback){
	        	gis.util.ajaxDelete(my.url + id,callback);
	        },
	        getAllItems: function(callback){
	        	gis.util.ajaxGet(my.url,callback);
	        }
	};
	
	my.options = spec.options || {};
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.options['storage'] = my.storage;
		my.control=new L.Control.Bookmarks(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.bookmarks";
	return that;
};