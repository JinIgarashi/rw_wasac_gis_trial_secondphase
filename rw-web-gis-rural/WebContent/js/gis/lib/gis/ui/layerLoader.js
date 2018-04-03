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
	
	my.addLegend = function(legend,layername,layer){
		if (legend) {
			my.legends.push({
				name : layername,
				layer : layer,
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
				my.overlays[e.group][name] = layer
			}
		}

		if (e.visible !== true){
			my.map.removeLayer(layer);
		}
	};
	
	my.createLayer = function(e){
		var layers = [];
		if (e.type === "WMS"){
			var _layer = L.tileLayer.wms(e.url,e.options).addTo(my.map);
			layers.push(_layer);
			my.addLegend(e.legend,e.name,_layer);
			my.setLayerControl(e,_layer,e.name);
		}else if (e.type === "WMS_getFeatureInfo"){
			var source = new my.wmssource(e.url, e.options);
			for (var i in e.layers){
				var _layer = source.getLayer(e.layers[i].name).addTo(my.map);
				layers.push(_layer);
				my.addLegend(e.layers[i].legend,e.layers[i].title,_layer);
				my.setLayerControl(e,_layer,e.layers[i].title);
			}
		}else if (e.type === "TMS"){
			var _layer = L.tileLayer(e.url, e.options).addTo(my.map);
			layers.push(_layer);
			my.addLegend(e.legend,e.name,_layer);
			my.setLayerControl(e,_layer,e.name);
		}
		return layers;
	};

	that.init = function(){
		$.ajax({
			url : my.defineurl,
			type : 'GET',
			dataType : 'json',
			cache : false,
			//async : false
		}).done(function(layers_define) {
			for (var i in layers_define){
				my.createLayer(layers_define[i]);
			}

			if (my.baseMaps.length > 0){
				var iconLayersControl = new L.Control.IconLayers(my.baseMaps, {
			        position: 'bottomleft',
			        maxLayersInRow: 5
			    }).addTo(my.map);
			}
			
			L.control.groupedLayers({},my.overlays,{
				exclusiveGroups: ["Area"],
				groupCheckboxes: true
			}).addTo(my.map);
			
			if (my.legends.length>0){
				L.control.htmllegend({
					position : 'topright',
					legends : my.legends,
					collapseSimple : false,
					detectStretched : false,
					collapsedOnInit : false,
				}).addTo(my.map);
			}
		});
	};

	that.CLASS_NAME =  "gis.ui.layerLoader";
	return that;
};