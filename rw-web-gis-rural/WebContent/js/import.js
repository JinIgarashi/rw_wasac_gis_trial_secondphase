function importJS() {
	var jsFiles = [
        './js/external/jquery-3.3.1.min.js',
        './js/external/jquery-ui.min.js',
        './js/external/leaflet/leaflet.js',
        './js/external/leaflet/leaflet-hash.js',
        './js/external/leaflet/Leaflet.NavBar.js',
        './js/external/leaflet/Leaflet.PolylineMeasure.js',
        './js/external/leaflet/Leaflet.Coordinates-0.1.5.min.js',
        './js/external/leaflet/leaflet.easyPrint.js',
        './js/external/leaflet/leaflet.groupedlayercontrol.js',
        './js/external/leaflet/L.Control.Locate.js',
        './js/external/leaflet/Leaflet.GraphicScale.min.js',
        './js/external/leaflet/easy-button.js',
        './js/external/leaflet/iconLayers.js',
        './js/external/leaflet/Control.Geocoder.js',
        './js/external/leaflet/Leaflet.Bookmarks.min.js',
        './js/external/leaflet/leaflet.contextmenu.min.js',
        './js/external/leaflet/L.Control.SlideMenu.js',
        './js/external/leaflet/leaflet.wms.js',
        //'./js/gis/lib/gis.js',
        './js/gis/gis.min.js',
        './js/app.js',
        ];
	var scriptTags = [];
	for (var i=0; i<jsFiles.length; i++) {scriptTags.push("<script src='" + jsFiles[i] + "'><\/script>");}
	if (scriptTags.length > 0) {document.write(scriptTags.join(""));}
}
importJS();