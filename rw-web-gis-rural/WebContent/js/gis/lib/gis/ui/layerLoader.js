gis.ui.layerLoader = function(spec,my){
	var that= {};

	my = my || {};
	
	my.map = spec.map;
	my.defineurl = spec.defineurl;
	
	my.baseMaps = [];
	my.overlays = {};
	
	my.wmssource = L.WMS.Source.extend({
		'ajax': function(url, callback) {
	        $.ajax(url, {
	            'context': this,
	            'success': function(result) {
	            	callback.call(this, result);
	             }
	        });
	    },
	    'showFeatureInfo': function(latlng, info) {
	        if (!this._map) {
	            return;
	        }
	        if (info && info.length === 0){
	        	return;
	        }
	        var html = "";
	        for (var i in info.features){
	        	var f = info.features[i];
	        	for (var name in f.properties){
	        		var val = f.properties[name];
	        		if (!val){
	        			val = "";
	        		}
	        		html += "<tr><th>" + name + "</th><td>" + val + "</td></tr>"
	        	}
	        	
	        }
	        if (html === ""){
	        	return;
	        }
	        html = "<table class='popup-table-wms-getfeatureinfo'>" + html + "</table>";
	        this._map.openPopup(html, latlng);
	    }
    });
	
	my.legends = [];
	
	my.addLegend = function(legend,title){
		if (legend) {
			my.legends.push({
				title : title,
				elements : legend.elements
			});
		}
	};
	
	my.setLayerControl = function(e,layer,name){
		if (e.isBaseLayer && e.isBaseLayer === true){
			my.baseMaps.push({
				title: name,
				layer:layer,
				icon:e.icon
			});
		}else{
			if (!e.group){
				my.overlays[name] = layer;
			}else{
				if (!my.overlays[e.group]){
					my.overlays[e.group] = {};
				}
				my.overlays[e.group][name] = layer;
			}
		}

		if (e.visible === true){
			my.map.addLayer(layer);
		}else{
			my.map.removeLayer(layer);
		}
	};
	
	my.createLayer = function(e){
		if (e.type === "WMS"){
			var _layer = L.tileLayer.wms(e.url,e.options);
			my.addLegend(e.legend,e.name);
			my.setLayerControl(e,_layer,e.name);
		}else if (e.type === "WMS_getFeatureInfo"){
			var source = new my.wmssource(e.url, e.options);
			for (var i in e.layers){
				var _layer = source.getLayer(e.layers[i].name);
				my.addLegend(e.layers[i].legend,e.layers[i].title);
				my.setLayerControl(e,_layer,e.layers[i].title);
			}
		}else if (e.type === "TMS"){
			var _layer = L.tileLayer(e.url, e.options);
			my.addLegend(e.legend,e.name);
			my.setLayerControl(e,_layer,e.name);
		}else if (e.type === "WMTS"){
			var _layer = new L.TileLayer.WMTS(e.url, e.options);
			my.addLegend(e.legend,e.name);
			my.setLayerControl(e,_layer,e.name);
		}else if (e.type === "GeoJSON"){
			gis.util.ajaxGetAsync(e.url, function(geojson){
				var options = {
					onEachFeature : function(feature,layer){
						if (!feature.properties) {
					        return;
					    }
						
						var html = "";
						for (var name in feature.properties){
			        		var val = feature.properties[name];
			        		if (!val){
			        			val = "";
			        		}
			        		html += "<tr><th>" + name + "</th><td>" + val + "</td></tr>"
			        	}
				        if (html === ""){
				        	return;
				        }
				        html = "<table class='popup-table-wms-getfeatureinfo'>" + html + "</table>";
						layer.bindPopup(html);
					}
				};
				if (e.style.type === "icon"){
					options.pointToLayer = function (feature, latlng) {
				        return L.marker(latlng, {
				            icon : L.icon(e.style.options)
				        });
				    };
				}
				var _layer = L.geoJSON(geojson,options);
				markers = L.markerClusterGroup();
				markers.addLayer(_layer);
				my.addLegend(e.legend,e.name);
				my.setLayerControl(e,markers,e.name);
			});
		}
	};

	that.init = function(){
		gis.util.ajaxGetAsync(my.defineurl,function(layers_define){
			for (var i in layers_define){
				my.createLayer(layers_define[i]);
			}

			if (my.baseMaps.length > 0){
				var iconLayersControl = new L.Control.IconLayers(my.baseMaps, {
			        position: 'bottomleft',
			        maxLayersInRow: 5
			    }).addTo(my.map);
			}
			
			if (my.legends.length>0){
				var html = "<h1>LEGEND</h1>";
				for (var i in my.legends){
					var legend = my.legends[i];
					html += "<hr>"
					html += "<h2>" + legend.title + "</h2>";
					html += legend.elements[0].html;
				}
				L.control.slideMenu(html,{
					position:'topright',
					menuposition: 'topright'
				}).addTo(my.map);
			}
			
			L.control.groupedLayers({},my.overlays,{
				exclusiveGroups: ["Area"],
				groupCheckboxes: true
			}).addTo(my.map);
		});
	};

	that.CLASS_NAME =  "gis.ui.layerLoader";
	return that;
};