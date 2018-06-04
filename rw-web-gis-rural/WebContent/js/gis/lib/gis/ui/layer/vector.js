gis.ui.layer.vector = function(spec,my){
	my = my || {};
	var that = gis.ui.layer(spec,my);
	
	my.createPopupEditControl = function(fid, name,val,editableFields){
		var control = val;
		if (editableFields && editableFields[name]){
			var editable = editableFields[name];
			var ctrl_id = fid.replace('.','-') + "-" + name;
			var prmReadonly = "";
			if (editable.readonly){
				prmReadonly = "readonly";
			};
			switch(editable.type){
			case "combobox":
				control = "<select id='" + ctrl_id + "'>";
				for (var i in editable.value){
					var item = editable.value[i];
					var _default = "";
					if (val === item){
						_default = "default";
					};
					control += "<option value=" + item + " " + _default +" "+ prmReadonly +">" + item + "</option>";
				};
				control += "</select>";
				break;
			case "textarea":
				control = "<textarea id='" + ctrl_id + "' "+ prmReadonly +">" + val + "</textarea>";
				break;
			case "textbox":
				control = "<input type='text' id='" + ctrl_id + "' value='" + val + "' "+ prmReadonly +">";
				break;
			};
		};
		var html = "<tr><th>" + name + "</th><td>" + control + "</td></tr>";
		return html;
	};
	
	my.createPopupHtml = function(id, properties,editableFields){
		var html = "";
		for (var name in properties){
    		var val = properties[name];
    		if (!val){
    			val = "";
    		};
    		if (name === "contents"){
    			var con_values = JSON.parse(val);
    			for (var con_id in con_values){
    				html += my.createPopupEditControl(id, con_id,con_values[con_id],editableFields);
    			};
    		}else{
    			html += my.createPopupEditControl(id, name,val,editableFields);
    		};
    	};
        if (html === ""){
        	return html;
        };
        html = "<table class='leaflet-tilelayer-wmts-getfeatureinfo'>" + html + "</table>";
        return html;
	};
	
	my.create_profile = function(layer){
		var latlngs = layer._latlngs;
		if (latlngs.length === 0){
			return;
		};
		var coords = latlngs[0];
		if (coords.length === 0){
			return;
		};
	    var wkt = "";
	    for (var i in coords){
	    	var coord = coords[i];
	    	if ( i > 0){
	    		wkt += ",";
	    	};
	    	wkt += coord.lng + " " + coord.lat;
	    };
	    wkt = "LineString(" + wkt + ")";
	    var params ={
	    		wkt : wkt
	    };
	    gis.util.ajaxPut('./rest/Elevation/LineString', getLineWithElevation,params);
	    
	    function getLineWithElevation(json){
	    	var geojson = {"name":"NewFeatureType","type":"FeatureCollection","features":[{"type":"Feature","geometry":json}]};
	    	if (!my.controlLoader){
	    		return;
	    	};
	    	var el = my.controlLoader.getControl('elevation');
	    	if (!el){
	    		return;
	    	};
	    	el.clear();
	    	el._expand();
	    	
	    	if (my.elevjson){
	    		my.map.removeLayer(my.elevjson);
	    		my.elevjson = null;
	    	};
	    	my.elevjson = L.geoJson(geojson,{
			    onEachFeature: el.addData.bind(el) //working on a better solution
			}).addTo(my.map);
	    };
	};
	
	that.CLASS_NAME =  "gis.ui.layer.vector";
	return that;
};