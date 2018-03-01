gis.ui.control.zoomToAreas = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.dialogWss = gis.ui.dialog.zoomToWss({ divid : "dialogZoomToWss", map : my.map });
		my.dialogWss.create();
		
		my.dialogAdmin = gis.ui.dialog.zoomToAdmin({ divid : "dialogZoomToAdmin", map : my.map });
		my.dialogAdmin.create();
		
		my.control = L.easyBar([
			L.easyButton( 'fa-map-pin', function(){
				my.dialogWss.open();
			},'Zoom To WSS'),
			L.easyButton( 'fa-map-o', function(){
				my.dialogAdmin.open();
			},'Zoom To Administrative Boundary')
		]);
	};

	that.CLASS_NAME =  "gis.ui.control.zoomToAreas";
	return that;
};