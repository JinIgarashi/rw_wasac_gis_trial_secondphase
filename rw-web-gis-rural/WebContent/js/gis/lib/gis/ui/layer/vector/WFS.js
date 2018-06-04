gis.ui.layer.vector.WFS = function(spec,my){
	my = my || {};
	var that = gis.ui.layer.vector(spec,my);
	
	my.create_filter = function(e){
		if (e.options.filter){
			var filter = e.options.filter;
			switch(filter.method){
			case "PropertyIsEqualTo":
				e.options.filter = new L.Filter.EQ(filter.field, filter.value);
				break;
			case "PropertyIsNotEqualTo":
				e.options.filter = new L.Filter.NotEQ(filter.field, filter.value);
				break;
			case "PropertyIsLessThan":
				e.options.filter = new L.Filter.LT(filter.field, filter.value);
				break;
			case "PropertyIsGreaterThan":
				e.options.filter = new L.Filter.GT(filter.field, filter.value);
				break;
			case "PropertyIsLessThanOrEqualTo":
				e.options.filter = new L.Filter.LEQ(filter.field, filter.value);
				break;
			case "PropertyIsGreaterThanOrEqualTo":
				e.options.filter = new L.Filter.GEQ(filter.field, filter.value);
				break;
			case "PropertyIsLike":
				e.options.filter = new L.Filter.Like(filter.field, filter.expression, filter.attributes);
				break;
			case "PropertyIsNull":
				e.options.filter = new L.Filter.IsNull(filter.field);
				break;
			case "PropertyIsBetween":
				e.options.filter = new L.Filter.IsBetween(filter.field, filter.value1, filter.value2);
				break;
			default:
				break;
			};
		};
	};
	
	my.create_wfs = function(){
		my.config.options.crs = L.CRS[my.config.options.crs];
		my.create_filter(my.config);
		if (my.config.type_feature === 'Point'){	
			my.layer = new L.WFS(my.config.options,new L.Format.GeoJSON({
				crs: my.config.options.crs,
				pointToLayer(feature, latlng) {	
					var html = my.createPopupHtml(feature.id,feature.properties);
					var popup = L.responsivePopup({offset: [40,40], autoPanPadding: [40,40] }).setContent(html);
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
						icon: icon
					}).bindPopup(popup);
					return markerLayer;
				},
			}));
		}else{
			my.layer = new L.WFS(my.config.options);
			my.layer.on({
				'click': function (e) {
					my.create_profile(e.layer);
	  			}
			});
		};
		return my.layer;
	};
	
	that.create = function(callback){
		my.layer = my.create_wfs().addTo(my.map);
		callback(my.config,my.layer,my.config.name);
	};
	
	that.CLASS_NAME =  "gis.ui.layer.vector.WFS";
	return that;
};