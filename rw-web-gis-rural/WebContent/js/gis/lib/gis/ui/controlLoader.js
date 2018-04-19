gis.ui.controlLoader = function(spec,my){
	var that= {};
	my = my || {};

	my.map = spec.map;
	my.defineurl = spec.defineurl;

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
			ctrl = L.control.polylineMeasure(options);
			break;
		case 'zoomToAreas':				
			ctrl = my.createZoomToArea(options);
			break;
		};
		return ctrl;
	};
	
	my.createBookmarks = function(options){
		options.getItem = function(id, callback){
        	gis.util.ajaxGet('./rest/Bookmarks/' + id,callback);
        };
        options.setItem = function(id, value, callback){
        	gis.util.ajaxPut('./rest/Bookmarks/' + id,callback,value);
        };
        options.removeItem = function(id, callback){
        	gis.util.ajaxDelete('./rest/Bookmarks/' + id,callback);
        };
        options.getAllItems = function(callback){
        	gis.util.ajaxGet('./rest/Bookmarks/',callback);
        };
		
		return new L.Control.Bookmarks(options);
	};
	
	my.createZoomToArea = function(options){
		my.dialogWss = gis.ui.dialog.zoomToWss({ divid : "dialogZoomToWss", map : my.map });
		my.dialogWss.create();
		
		my.dialogAdmin = gis.ui.dialog.zoomToAdmin({ divid : "dialogZoomToAdmin", map : my.map });
		my.dialogAdmin.create();
		
		return L.easyBar([
			L.easyButton( 'fa-tint', function(){
				my.dialogWss.open();
			},'Zoom To WSS'),
			L.easyButton( 'fa-sitemap', function(){
				my.dialogAdmin.open();
			},'Zoom To Administrative Boundary')
		],options);
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
	};

	that.CLASS_NAME =  "gis.ui.controlLoader";
	return that;
};