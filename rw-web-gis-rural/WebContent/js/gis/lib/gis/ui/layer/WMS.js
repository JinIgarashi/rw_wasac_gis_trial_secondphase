gis.ui.layer.WMS = function(spec,my){
	my = my || {};
	var that = gis.ui.layer(spec,my);
	
	that.create = function(callback){
		my.layer = L.tileLayer.wms(my.config.url,my.config.options).addTo(my.map);
		callback(my.config,my.layer,my.config.name);
	};
	
	that.CLASS_NAME =  "gis.ui.layer.WMS";
	return that;
};