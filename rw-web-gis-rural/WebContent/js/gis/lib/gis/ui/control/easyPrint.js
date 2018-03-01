gis.ui.control.easyPrint = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.options = spec.options || {
		elementsToHide : ['a','button','.leaflet-small-widget','.leaflet-control-coordinates','.leaflet-control-attribution','.leaflet-iconLayers-layer']
	};
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.easyPrint(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.easyPrint";
	return that;
};