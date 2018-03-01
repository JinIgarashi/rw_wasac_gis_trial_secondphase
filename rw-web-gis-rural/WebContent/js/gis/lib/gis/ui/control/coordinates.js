gis.ui.control.coordinates = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.options = spec.options || {
		position : "bottomright", // optional default "bootomright"
		decimals : 6, // optional default 4
		labelTemplateLat : "Latitude: {y}", // optional default "Lat: {y}"
		labelTemplateLng : "Longitude: {x}", // optional default "Lng: {x}"
	};
	
	my.notRequireSP = spec.notRequireSP || true;
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.coordinates(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.coordinates";
	return that;
};