gis.ui.layerLoader = function(spec,my){
	var that= {};

	my = my || {};

	my.map = spec.map;
	my.defineurl = spec.defineurl;

	my.legends = [];
	
	my.getLayer = function(e){
		var layer = null;
		if (e.type === "WMS"){
			layer = L.tileLayer.wms(e.url,e.options).addTo(my.map);
		}else if (e.type === "TMS"){
			layer = L.tileLayer(e.url, e.options).addTo(my.map);
		}
		
		if (e.legend) {
			my.legends.push({
				name : e.name,
				layer : layer,
				elements : e.legend.elements
			});
		}
		
		return layer;
	};

	that.init = function(){
		$.ajax({
			url : my.defineurl,
			type : 'GET',
			dataType : 'json',
			cache : false,
			//async : false
		}).done(function(layers_define) {
			var baseMaps = {};
			var overlays = {};

			for (var i in layers_define){
				var obj = layers_define[i];
				var layer = my.getLayer(obj);

				if (obj.isBaseLayer && obj.isBaseLayer === true){
					baseMaps[obj.name] = layer;
				}else{
					if (!obj.group){
						overlays[obj.name] = layer;
					}else{
						if (!overlays[obj.group]){
							overlays[obj.group] = {};
						}
						overlays[obj.group][obj.name] = layer
					}
				}

				if (obj.visible !== true){
					my.map.removeLayer(layer);
				}
			}

			var options = {
					  exclusiveGroups: ["Area"],
					  groupCheckboxes: true
					};
			
			L.control.groupedLayers(baseMaps,overlays,options).addTo(my.map);
			
			if (my.legends.length>0){
				L.control.htmllegend({
					position : 'bottomright',
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