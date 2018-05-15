gis.ui.controlLoader = function(spec,my){
	var that= {};
	my = my || {};

	my.map = spec.map;
	my.defineurl = spec.defineurl;
	
	my.controlMap = {};

	my.getControl = function(ctrltype, options){
		switch(ctrltype) {
	    case 'bookmarks':			
			ctrl = my.createBookmarks(options);
	        break;
	    case 'easyPrint':
	    	ctrl = L.easyPrint(options);
	        break;
		case 'geocoder':
			ctrl = L.Control.geocoder(options);
			break;
		case 'graphicScale':
			ctrl = L.control.graphicScale(options);
			break;
		case 'locate':
			ctrl = L.control.locate(options);
			break;
		case 'navbar':
			ctrl = L.control.navbar(options);
			break;
		case 'polylineMeasure':
			if (!L.Browser.mobile) {
				options.measure_addpoint = my.measure_addpoint;
				options.measure_cleared = my.measure_cleared;
			};
			ctrl = L.control.polylineMeasure(options);
			break;
		case 'zoomToAreas':				
			ctrl = my.createZoomToArea(options);
			break;
		case 'elevation':
			ctrl = L.control.elevation(options);
			break;
		case 'feedback':
			ctrl = L.easyButton('fa-comment', function(btn, map){
			    my.map.locate();
			    my.map.on('locationfound', my.onLocationFound, this);
			    my.map.on('locationerror', my.onLocationError, this);
			});
		};
		if (ctrl){
			my.controlMap[ctrltype] = ctrl;
		}
		return ctrl;
	};
	
	my.onLocationFound = function(e){
		var lat = e.latlng.lat;
		var lng = e.latlng.lng;
		window.open('./survey.html?lat=' + lat + '&lng=' + lng, '_blank');
	};
	
	my.onLocationError = function(e){
		window.open('./survey.html', '_blank');
	};
	
	my.createBookmarks = function(options){
		options.storage = {
				getItem : function(id, callback){
		        	gis.util.ajaxGet('./rest/Bookmarks/' + id,callback);
		        },
		        setItem : function(id, value, callback){
		        	gis.util.ajaxPut('./rest/Bookmarks/' + id,callback,value);
		        },
		        removeItem : function(id, callback){
		        	gis.util.ajaxDelete('./rest/Bookmarks/' + id,callback);
		        },
		        getAllItems : function(callback){
		        	gis.util.ajaxGet('./rest/Bookmarks/',callback);
		        }
		};
		
		return new L.Control.Bookmarks(options);
	};
	
	my.createZoomToArea = function(options){
		my.dialogWss = gis.ui.dialog.zoomToWss({ divid : "dialogZoomToWss", map : my.map });
		my.dialogWss.create();
		
		my.dialogAdmin = gis.ui.dialog.zoomToAdmin({ divid : "dialogZoomToAdmin", map : my.map });
		my.dialogAdmin.create();
		
		my.dialogEpanet = gis.ui.dialog.epanet({ divid : "dialogEpanet", map : my.map });
		my.dialogEpanet.create();
		
		return L.easyBar([
			L.easyButton( 'fa-tint', function(){
				my.dialogWss.open();
			},'Zoom To WSS'),
			L.easyButton( 'fa-sitemap', function(){
				my.dialogAdmin.open();
			},'Zoom To Administrative Boundary'),
			L.easyButton( 'fa-download', function(){
				my.dialogEpanet.open();
			},'Download Epanet File')
		],options);
	};
	
	my.measure_addpoint = function(e){
		var coordinates = e.polylinePath._latlngs;
		if (coordinates.length === 0){
			return;
		};
	    var wkt = "";
	    for (var i in coordinates){
	    	var coord = coordinates[i];
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
	    	var el = my.controlMap['elevation'];
	    	el.clear();
	    	el._expand();
	    	if (my.elevjson){
	    		my.map.removeLayer(my.elevjson);
	    		my.elevjson = null;
	    	};
	    	my.elevjson = L.geoJson(geojson,{
			    onEachFeature: el.addData.bind(el) //working on a better solution
			}).addTo(my.map);
	    }
	},
	
	my.measure_cleared = function(e){
		var el = my.controlMap['elevation'];
    	el.clear();
    	if (my.elevjson){
    		my.map.removeLayer(my.elevjson);
    		my.elevjson = null;
    	};
	};
	
	that.init = function(){
		gis.util.ajaxGet(my.defineurl,function(ctrls_define){
			var settings = {map : my.map};
			for (var i in ctrls_define){
				for (var j in ctrls_define[i].settings){
					settings[j] = ctrls_define[i].settings[j];
				};
				if (L.Browser.mobile && settings.notRequireSP == true){
					continue;
				};
				var ctrl = my.getControl(ctrls_define[i].ctrl, settings.options);
				if (!ctrl){
					continue;
				};
				ctrl.addTo(my.map);
			};
		});
		return that;
	};
	
	that.getControl = function(name){
		return my.controlMap[name];
	};

	that.CLASS_NAME =  "gis.ui.controlLoader";
	return that;
};