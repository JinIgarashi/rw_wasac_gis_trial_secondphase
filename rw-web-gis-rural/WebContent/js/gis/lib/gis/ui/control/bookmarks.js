gis.ui.control.bookmarks = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.storage = {
	        getItem: function(id, callback){
	            $.ajax({
	                url: './rest/Bookmarks/' + id,
	                type: 'GET',
	                dataType: 'json',
	                success: callback
	            });
	        },
	        setItem: function(id, value, callback){
	        	$.ajax({
	                url: './rest/Bookmarks/' + id,
	                type: 'PUT',
	                data: value,
	                dataType: 'json',
	                success: callback
	            });
	        },
	        removeItem: function(id, callback){
	        	$.ajax({
	                url: './rest/Bookmarks/' + id,
	                type: 'DELETE',
	                dataType: 'json',
	                success: callback
	            });
	        },
	        getAllItems: function(callback){
	            $.ajax({
	                url: './rest/Bookmarks/',
	                type: 'GET',
	                dataType: 'json',
	                success: callback
	            });
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