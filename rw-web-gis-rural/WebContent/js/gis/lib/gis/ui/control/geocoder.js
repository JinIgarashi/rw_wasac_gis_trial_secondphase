gis.ui.control.geocoder = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.Control.geocoder(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.geocoder";
	return that;
};