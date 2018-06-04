gis.ui.layer.WMS_getFeatureInfo = function(spec,my){
	my = my || {};
	var that = gis.ui.layer(spec,my);
	
	that.create = function(callback){
		var source = new L.WMS.Source(my.config.url, my.config.options);
		my.layer = [];
		for (var i in my.config.layers){
			var _layer = source.getLayer(my.config.layers[i].name).addTo(my.map);
			my.layer.push(_layer);
			callback(my.config,_layer,my.config.layers[i].title);
		};
	};
	
	that.CLASS_NAME =  "gis.ui.layer.WMS_getFeatureInfo";
	return that;
};