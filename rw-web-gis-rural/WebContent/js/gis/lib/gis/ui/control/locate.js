gis.ui.control.locate = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.locate(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.locate";
	return that;
};