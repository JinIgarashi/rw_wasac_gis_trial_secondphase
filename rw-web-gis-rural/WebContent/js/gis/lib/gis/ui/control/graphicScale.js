gis.ui.control.graphicScale = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.options = spec.options || {
		fill : 'hollow',
		showSubunits : true,
		labelPlacement : 'top'
	};
	
	my.notRequireSP = spec.notRequireSP || true;
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.graphicScale(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.graphicScale";
	return that;
};