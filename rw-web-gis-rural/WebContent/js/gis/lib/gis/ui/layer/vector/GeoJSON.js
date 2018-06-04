gis.ui.layer.vector.GeoJSON = function(spec,my){
	my = my || {};
	var that = gis.ui.layer.vector(spec,my);
	
	my.createGeoJSON = function(){
		var options = {
				onEachFeature : function(feature,layer){
					if (!feature.properties) {
				        return;
				    };
				    var html = my.createPopupHtml(feature.id, feature.properties);
			        var popup = L.responsivePopup({offset: [40,40], autoPanPadding: [40,40] }).setContent(html);
					layer.bindPopup(popup);
				}
			};
			options.pointToLayer = function (feature, latlng) {
		        return L.marker(latlng, {
		            icon : Icon[e.icon]
		        });
		    };
			
			my.layer = new L.GeoJSON.AJAX(my.config.url,options);
			if (!my.mcgroup){
				my.mcgroup = L.markerClusterGroup();
				my.mcgroup.addTo(my.map);
			};
			var markers = L.featureGroup.subGroup(my.mcgroup);
			markers.addLayer(my.layer);
			markers.addTo(my.map);
			return markers;
	};
	
	that.create = function(callback){
		my.layer = my.createGeoJSON().addTo(my.map);
		callback(my.config,my.layer,my.config.name);
	};
	
	that.CLASS_NAME =  "gis.ui.layer.vector.GeoJSON";
	return that;
};