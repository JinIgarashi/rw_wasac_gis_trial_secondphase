gis.ui.control.polylineMeasure = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.options = spec.options || {showMeasurementsClearControl: true};
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.polylineMeasure(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.polylineMeasure";
	return that;
};