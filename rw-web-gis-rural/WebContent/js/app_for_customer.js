var app = {
	init : function() {
		app.map = L.map('map',app.create_options()).setView([ -1.904962, 30.499550 ], 10);
		
		var hash = location.hash.replace("#","").split("/");
		if (hash.length === 3){
			app.map.setView([hash[1],hash[2]],Number(hash[0]))
		}
		
		var controlLoader = new gis.ui.controlLoader({
			map : app.map,
			defineurl : './js/gis/settings/define_controls_for_customer.json'
		}).init();
		
		var layerLoader = new gis.ui.layerLoader({
			map : app.map,
			controlLoader : controlLoader,
			defineurl : './js/gis/settings/define_layers_for_customer.json',
			layerControlOptions : {
				container_width 	: "250px",
				group_maxHeight     : "90%",
				expanded : true,
			}
		}).init();
		var hash = new L.Hash(app.map);
	},
	
	create_options : function(){
		return {
			zoomControl : false
		};
	}
};

$(document).ready(function() {
	app.init();
});