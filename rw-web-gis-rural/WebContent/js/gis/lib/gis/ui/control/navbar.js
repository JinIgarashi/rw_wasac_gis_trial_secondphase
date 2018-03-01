gis.ui.control.navbar = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.notRequireSP = spec.notRequireSP || true;
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.navbar(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.navbar";
	return that;
};