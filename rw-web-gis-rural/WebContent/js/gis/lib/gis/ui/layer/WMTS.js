gis.ui.layer.WMTS = function(spec,my){
	my = my || {};
	var that = gis.ui.layer(spec,my);
	
	that.create = function(callback){
		my.layer = new L.TileLayer.WMTS(my.config.url, my.config.options).addTo(my.map);
		callback(my.config,my.layer,my.config.name);
	};
	
	that.CLASS_NAME =  "gis.ui.layer.WMTS";
	return that;
};