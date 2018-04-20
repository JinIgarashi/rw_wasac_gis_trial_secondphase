var app = {
	init : function() {
		app.map = L.map('map',app.create_options()).setView([ -1.904962, 30.499550 ], 10);
		
		var hash = location.hash.replace("#","").split("/");
		if (hash.length === 3){
			app.map.setView([hash[1],hash[2]],Number(hash[0]))
		}
		
		var controlLoader = new gis.ui.controlLoader({
			map : app.map,
			defineurl : './js/gis/settings/define_controls.json'
		}).init();
		
		var layerLoader = new gis.ui.layerLoader({
			map : app.map,
			defineurl : './js/gis/settings/define_layers.json'
		}).init();
		var hash = new L.Hash(app.map);
	},
	
	create_options : function(){
		return {
			//ズームコントロールは非表示に
			zoomControl : false, 
			//スマホからの閲覧時にレイヤコントロールのスクロール動作等がおかしくなるためドラッグとタップ動作を制限する
			//dragging : !L.Browser.mobile,
			//tap : !L.Browser.mobile,
			//Contextmenu
			contextmenu : true,
			contextmenuWidth : 150,
			contextmenuItems : [{
			    text: 'Show coordinates',
			    icon:'css/leaflet/images/comment.png',
			    callback: function(e){
			    	L.popup().setLatLng(e.latlng).setContent(e.latlng.lat + ", " + e.latlng.lng).openOn(app.map);
			    }
			}, {
			    text: 'Center map here',
			    icon: 'css/leaflet/images/pan.png',
			    callback: function(e){
			    	app.map.panTo(e.latlng);
			    }
			}, '-', {
			    text: 'Zoom in',
			    icon: 'css/leaflet/images/zoom-in.png',
			    callback: function(e){
			    	app.map.zoomIn();
			    }
			}, {
			    text: 'Zoom out',
			    icon: 'css/leaflet/images/zoom-out.png',
			    callback: function(e){
			    	app.map.zoomOut();
			    }
			}]
		};
	}
};

$(document).ready(function() {
	app.init();
});