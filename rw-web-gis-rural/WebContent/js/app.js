var app = {

	/** Initialize * */
	init : function() {
		
		var options = {};
		if (gis.util.isSmartphone()===true){
			options.zoomControl = false; //スマホの時はズームコントロールは非表示に
		}
		
		app.map = L.map('map',options).setView([ -1.904962, 30.499550 ], 10);
		
		var controlLoader = new gis.ui.controlLoader({
			map : app.map,
			defineurl : './js/gis/settings/define_controls.json'
		}).init();
		
		var layerLoader = new gis.ui.layerLoader({
			map : app.map,
			defineurl : './js/gis/settings/define_layers.json'
		}).init();
		var hash = new L.Hash(app.map); //URLに座標情報を付与する
	}
};

$(document).ready(function() {
	app.init();
});