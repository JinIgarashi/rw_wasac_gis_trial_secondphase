var app = {
	init : function() {
		var options = {};
		var mapOptionObj = gis.ui.mapOptionCreator({}).create(options);
		app.map = L.map('map',options).setView([ -1.904962, 30.499550 ], 10);
		mapOptionObj.bind(app.map);
		
		var layerLoader = new gis.ui.layerLoader({
			map : app.map,
			defineurl : './js/gis/settings/define_layers.json'
		}).init();
		
		var controlLoader = new gis.ui.controlLoader({
			map : app.map,
			defineurl : './js/gis/settings/define_controls.json'
		}).init();
		
		var hash = new L.Hash(app.map); //URLに座標情報を付与する
	}
};

$(document).ready(function() {
	app.init();
});