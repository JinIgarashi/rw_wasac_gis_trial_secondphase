gis.ui.layer.vector.WFST = function(spec,my){
	my = my || {};
	var that = gis.ui.layer.vector.WFS(spec,my);
	
	my.create_wfst = function(){
		my.config.options.crs = L.CRS[my.config.options.crs];
		my.create_filter(my.config);
		if (my.config.type_feature === 'Point'){	
			my.layer = new L.WFST(my.config.options,new L.Format.GeoJSON({
				crs: my.config.options.crs,
				pointToLayer(feature, latlng) {
					var html = my.createPopupHtml(feature.id, feature.properties, my.config.editableFields);
					var icon = null;
					if (typeof my.config.icon === 'object'){
						for (var typenm in my.config.icon){
							var conf = my.config.icon[typenm];
							if (feature.properties[conf.field] === conf.value){
								icon = Icon[typenm];
							};
						};
					}else{
						icon = Icon[my.config.icon]
					};
					if (!icon){
						return;
					};
					const markerLayer = new L.Marker(latlng, {
						icon: Icon[my.config.icon]
					});
					var popup = L.responsivePopup({offset: [40,40], autoPanPadding: [40,40] }).setContent(html);
					markerLayer.bindPopup(popup);
					markerLayer.on("popupopen",function(p){
						var fid = p.target.feature.id.replace('.','-');
						var properties = p.target.feature.properties;
						for (var name in properties){
							if (my.config.editableFields && my.config.editableFields[name]){
								var ctrl_id = fid + "-" + name;
								$('#' + ctrl_id).val(properties[name]);
							};
						};
					});
					markerLayer.on("popupclose", function (p) {
						var fid = p.target.feature.id.replace('.','-');
						var properties = p.target.feature.properties;
						var valuesforedit = null;
						var defaultvalues = {};
						for (var name in properties){
							if (my.config.editableFields && my.config.editableFields[name]){
								var defaultval = my.config.editableFields[name].defaultval;
								if (defaultval){
									if (defaultval === 'now'){
										defaultvalues[name] = gis.util.getCurrentDatetime();
									};
									defaultvalues[name] = defaultval
								};
								var ctrl_id = fid + "-" + name;
								var newvalue = $('#' + ctrl_id).val();
								if (newvalue === ""){
									newvalue = null;
								};
								if (p.target.getProperty(name) == newvalue){
									continue;
								};
								if (!valuesforedit){
									valuesforedit = {};
								};
								valuesforedit[name] = $('#' + ctrl_id).val();
							};
						};
						if (valuesforedit){
							for (var name in defaultvalues){
								if (!valuesforedit[name]){
									valuesforedit[name] = defaultvalues[name];
								};
							};
							p.target.setProperties(valuesforedit);
							p.target.fire('marker:edited');
							my.layer.save();
						};
					});
					return markerLayer;
				}
			}));
			my.layer.on('load', function (e) {
				 e.target.eachLayer(function (marker) {
					marker.on('marker:edited', function () {
						my.layer.editLayer(marker);
					});
				    marker.on('marker:deleted', function () {
				    	my.layer.removeLayer(marker);
				    });
				    if (!my.layer.hasLayer(marker)) {
				    	my.layer.addLayer(marker);
				    };
				 });
			 });
			my.layer.on('save:success', function (e) {
				 location.reload(false)
			 });
			my.layer.on('save:error', function (data) {
				 alert('WFS-T save error occured. Take a look to console.');
				 console.error('WFS-T save error');
				 console.error(data);
			 });
			
		}else{
			my.layer = new L.WFST(e.options);
			my.layer.on({
				'click': function (e) {
					my.create_profile(e.layer);
	  			}
			});
		};
		return my.layer;
	};
	
	that.create = function(callback){
		my.layer = my.create_wfst().addTo(my.map);
		callback(my.config,my.layer,my.config.name);
	};
	
	that.CLASS_NAME =  "gis.ui.layer.vector.WFST";
	return that;
};