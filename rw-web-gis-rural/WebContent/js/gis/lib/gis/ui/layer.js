gis.ui.layer = function(spec,my){
	my = my || {};
	var that = gis.ui(spec,my);
	
	my.map = spec.map;
	my.config = spec.config;
	my.controlLoader = spec.controlLoader;
	
	my.layer = null;
	
	that.getLayer = function(){
		return my.layer;
	};
	
	that.create = function(callback){
	};
	
	that.CLASS_NAME =  "gis.ui.layer";
	return that;
};