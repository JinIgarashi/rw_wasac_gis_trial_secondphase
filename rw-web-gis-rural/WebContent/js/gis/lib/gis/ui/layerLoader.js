gis.ui.layerLoader = function(spec,my){
	var that= {};

	my = my || {};
	
	my.map = spec.map;
	my.defineurl = spec.defineurl;
	
	my.baseMaps = [];
	
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
	
	my.setLayerControl = function(e,layer,name){
		if (e.isBaseLayer && e.isBaseLayer === true){
			my.baseMaps.push({
				title: name,
				layer:layer,
				icon:e.icon
			});
		}else{
			var title = name;
			if (e.legend) {
				//凡例がある場合は凡例を挿入
				title += "<br><div style='width:100%'>" + e.legend.elements[0].html + "</div><hr>";
			}
			my.layerControl.addOverlay( layer, title, {groupName : e.group} );
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
			my.setLayerControl(e,_layer,e.name);
		}else if (e.type === "WMS_getFeatureInfo"){
			var source = new my.wmssource(e.url, e.options);
			for (var i in e.layers){
				var _layer = source.getLayer(e.layers[i].name);
				my.setLayerControl(e,_layer,e.layers[i].title);
			}
		}else if (e.type === "TMS"){
			var _layer = L.tileLayer(e.url, e.options);
			my.setLayerControl(e,_layer,e.name);
		}else if (e.type === "WMTS"){
			var _layer = new L.TileLayer.WMTS(e.url, e.options);
			my.setLayerControl(e,_layer,e.name);
		}else if (e.type === "GeoJSON"){
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
				        var popup = L.responsivePopup({offset: [40,40], autoPanPadding: [40,40] }).setContent(html);
						layer.bindPopup(popup);
					}
				};
				if (e.style.type === "icon"){
					options.pointToLayer = function (feature, latlng) {
				        return L.marker(latlng, {
				            icon : L.icon(e.style.options)
				        });
				    };
				}
			
			var _layer = new L.GeoJSON.AJAX(e.url,options);
			if (!my.mcgroup){
				my.mcgroup = L.markerClusterGroup();
				my.mcgroup.addTo(my.map);
			}
			var markers = L.featureGroup.subGroup(my.mcgroup);
			markers.addLayer(_layer);
			markers.addTo(my.map);
			my.setLayerControl(e,markers,e.name);
		}
	};

	that.init = function(){
		gis.util.ajaxGetAsync(my.defineurl,function(layers_define){
			my.layerControl = L.Control.styledLayerControl({}, my.overlays, {
					container_width 	: "300px",
					group_maxHeight     : "90%",
					exclusive       	: false,
					group_togglers: {
			            show: true,
			            labelAll: 'Select All',
			            labelNone: 'Deselect All'
			        },
				}
			).addTo(my.map);
			//レイヤコントロールを開いている間は地図のスクロールは制限する
			L.DomEvent.on(my.layerControl._container, 'mouseenter', function(){
				my.map.scrollWheelZoom.disable();
			});
			L.DomEvent.on(my.layerControl._container, 'mouseleave', function(){
				my.map.scrollWheelZoom.enable();
			});
			
			for (var i in layers_define){
				my.createLayer(layers_define[i]);
			}

			if (my.baseMaps.length > 0){
				var iconLayersControl = new L.Control.IconLayers(my.baseMaps, {
			        position: 'bottomleft',
			        maxLayersInRow: 5
			    }).addTo(my.map);
			}
		});
	};

	that.CLASS_NAME =  "gis.ui.layerLoader";
	return that;
};