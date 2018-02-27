var app = {

	/** Initialize * */
	init : function() {
		
		var options = {};
		if (app.isSmartphone()===true){
			//スマホの時はズームコントロールは非表示に
			options.zoomControl = false;
		}
		
		app.map = L.map('map',options).setView([ -1.904962, 30.499550 ], 10);
		app.initControls();

		var layerLoader = new gis.ui.layerLoader({
			map : app.map,
			defineurl : './js/gis/settings/define.json'
		}).init();
		var hash = new L.Hash(app.map);
	},
	
	initControls : function(){
		//Top-Right Controls
		L.Control.geocoder().addTo(app.map);
		
		//Top-Left Controls
		if (app.isSmartphone()===false){
			//PCの時のみナビゲーションバーを追加
			L.control.navbar().addTo(app.map);
		}
		
		L.control.polylineMeasure({
			showMeasurementsClearControl: true
		}).addTo(app.map);
		
		L.easyPrint({
			elementsToHide : ['a','button','.leaflet-small-widget','.leaflet-control-coordinates','.leaflet-control-attribution']
		}).addTo(app.map);
		L.control.locate().addTo(app.map);
		
		app.dialogWss = gis.ui.dialog.zoomToWss({ divid : "dialogZoomToWss", map : app.map });
		app.dialogWss.create();
		
		app.dialogAdmin = gis.ui.dialog.zoomToAdmin({ divid : "dialogZoomToAdmin", map : app.map });
		app.dialogAdmin.create();
		
		L.easyBar([
			L.easyButton( 'fa-map-pin', function(){
				app.dialogWss.open();
			},'Zoom To WSS'),
			L.easyButton( 'fa-map-o', function(){
				app.dialogAdmin.open();
			},'Zoom To Administrative Boundary')
		]).addTo(app.map);
		
		if (app.isSmartphone()===false){
			//PCの時のみ縮尺バーと座標コントロールを追加
			//Bottom-Left Controls
			L.control.graphicScale({
				fill : 'hollow',
				showSubunits : true,
				labelPlacement : 'top'
			}).addTo(app.map);

			//Bottom-Right Controls
			L.control.coordinates({
				position : "bottomright", // optional default "bootomright"
				decimals : 6, // optional default 4
				labelTemplateLat : "Latitude: {y}", // optional default "Lat: {y}"
				labelTemplateLng : "Longitude: {x}", // optional default "Lng: {x}"
			}).addTo(app.map);
		}
	},
	
	/**
	 * スマートフォンかどうかを判定する。スマホの時はTrueを返す。
	 */
	isSmartphone : function(){
		var isSmartPhone = false;
		var ua = navigator.userAgent;
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
	        // スマートフォン用コード
	    	isSmartPhone=true;
	    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
	        // タブレット用コード
	    	isSmartPhone=true;
	    } else {
	        // PC用コード
	    	isSmartPhone=false;
	    }
	    return isSmartPhone;
	}
};

$(document).ready(function() {
	app.init();
});