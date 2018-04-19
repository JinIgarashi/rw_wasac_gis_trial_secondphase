gis.ui.mapOptionCreator = function(spec,my){
	var that= {};
	my = my || {};

	my.map = null;
	
	my.contextmenu= spec.contextmenu || true;
	my.contextmenuWidth=spec.contextmenuWidth || 150;
	my.contextmenuItems=spec.contextmenuItems || [{
	    text: 'Show coordinates',
	    icon:'css/leaflet/images/comment.png',
	    callback: function(e){
	    	L.popup().setLatLng(e.latlng).setContent(e.latlng.lat + ", " + e.latlng.lng).openOn(my.map);
	    }
	}, {
	    text: 'Center map here',
	    icon: 'css/leaflet/images/pan.png',
	    callback: function(e){
	    	my.map.panTo(e.latlng);
	    }
	}, '-', {
	    text: 'Zoom in',
	    icon: 'css/leaflet/images/zoom-in.png',
	    callback: function(e){
	    	my.map.zoomIn();
	    }
	}, {
	    text: 'Zoom out',
	    icon: 'css/leaflet/images/zoom-out.png',
	    callback: function(e){
	    	my.map.zoomOut();
	    }
	}];
	
	that.create = function(options){
		//Zoom Control
		options.zoomControl = false; //ズームコントロールは非表示に

		//スマホからの閲覧時にレイヤコントロールのスクロール動作等がおかしくなるためドラッグとタップ動作を制限する
	    options.dragging= !L.Browser.mobile;
	    options.tap= !L.Browser.mobile;
		//Contextmenu
		options.contextmenu = my.contextmenu;
		options.contextmenuWidth = my.contextmenuWidth;
		options.contextmenuItems = my.contextmenuItems;
		return that;
	};
	
	that.bind = function(map){
		my.map = map;
	};

	that.CLASS_NAME =  "gis.ui.mapOptionCreator";
	return that;
};