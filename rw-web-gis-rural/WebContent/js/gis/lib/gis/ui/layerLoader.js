gis.ui.layerLoader = function(spec,my){
	var that= {};

	my = my || {};
	
	my.map = spec.map;
	my.defineurl = spec.defineurl;
	my.controlLoader = spec.controlLoader || null;
	
	my.layerControlOptions = spec.layerControlOptions || {
		container_width 	: "300px",
		group_maxHeight     : "90%",
		exclusive       	: false,
		group_togglers: {
            show: true,
            labelAll: 'Select All',
            labelNone: 'Deselect All'
        }
	};
	
	my.baseMaps = [];
	my.overlays = [];
	
	my.setLayerControl = function(e,layer,title){
		if (e.isBaseLayer && e.isBaseLayer === true){
			my.baseMaps.push({
				title: title,
				layer:layer,
				icon:e.icon
			});
		}else{
			if (e.legend) {
				//凡例がある場合は凡例を挿入
				title += "<br><div style='width:100%'>" + e.legend.elements[0].html + "</div><hr>";
			};
			var expanded = false;
			if (e.expanded){
				expanded = e.expanded;
			};
			my.layerControl.addOverlay( layer, title, {groupName : e.group,expanded:expanded} );
		};

		if (e.visible !== true){
			my.map.removeLayer(layer);
		};
		my.overlays.push(layer);
	};
	
	my.createLayer = function(e){
		var options = {
				map:my.map,
				config:e,
				controlLoader:my.controlLoader
			};
		var layerObj = gis.ui.layer[e.type];
		if (!layerObj){
			layerObj = gis.ui.layer.vector[e.type];
		};
		if (layerObj){
			layerObj = layerObj(options);
			layerObj.create(my.setLayerControl);
		};
	};

	my.layersetting_onzoomchanged = function(e){
		var currentZoom = my.map.getZoom();
		for (var j in my.overlays){
			var layer = my.overlays[j];
			if (layer instanceof L.WFS || layer instanceof L.WFST){
				var minzoom = layer.options.minZoom;
				var maxzoom = layer.options.maxZoom;
				if (!minzoom || !maxzoom){
					continue;
				};
				var isVisible = false;
				if (currentZoom >= minzoom && currentZoom <= maxzoom){
					isVisible = true;
				};
				if (isVisible){
					layer.disabled = false;
					if (!my.map.hasLayer(layer)){
						my.map.addLayer(layer);
					};
				}else{
					layer.disabled = true;
					if (my.map.hasLayer(layer)){
						my.map.removeLayer(layer);
					};
				};
			};
		};
	};
	
	that.init = function(){
		gis.util.ajaxGetAsync(my.defineurl,function(layers_define){
			my.layerControl = L.Control.styledLayerControl({}, my.overlays, my.layerControlOptions).addTo(my.map);
			
			for (var i in layers_define){
				my.createLayer(layers_define[i]);
			};
			
			if (my.baseMaps.length > 0){
				var iconLayersControl = new L.Control.IconLayers(my.baseMaps, {
			        position: 'bottomleft',
			        maxLayersInRow: 5
			    }).addTo(my.map);
			};
			my.map.on('zoomend', my.layersetting_onzoomchanged);
			my.layersetting_onzoomchanged();
		});
		return that;
	};

	that.CLASS_NAME =  "gis.ui.layerLoader";
	return that;
};