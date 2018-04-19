L.TileLayer.WMTS = L.TileLayer.extend({
    defaultWmtsParams: {
        service: 'WMTS',
        request: 'GetTile',
        version: '1.0.0',
        layers: '',
        styles: '',
        tilematrixSet: '',
        format: 'image/jpeg'
    },
    
    'options': {
        'getfeatureinfo': false,
        'infoformat' : 'text/html'
    },

    initialize: function (url, options) { // (String, Object)
        this._url = url;
        var wmtsParams = L.extend({}, this.defaultWmtsParams);
        var tileSize = options.tileSize || this.options.tileSize;
        if (options.detectRetina && L.Browser.retina) {
            wmtsParams.width = wmtsParams.height = tileSize * 2;
        } else {
            wmtsParams.width = wmtsParams.height = tileSize;
        }
        for (var i in options) {
            // all keys that are not TileLayer options go to WMTS params
            if (!this.options.hasOwnProperty(i) && i!="matrixIds") {
                wmtsParams[i] = options[i];
            }
        }
        this.wmtsParams = wmtsParams;
        this.matrixIds = options.matrixIds||this.getDefaultMatrix();
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._crs = this.options.crs || map.options.crs;
        L.TileLayer.prototype.onAdd.call(this, map);
    },

    getTileUrl: function (coords) { // (Point, Number) -> String
    	var tileSize = this.options.tileSize;
        var nwPoint = coords.multiplyBy(tileSize);
        nwPoint.x+=1;
        nwPoint.y-=1;
        var sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
        var zoom = this._tileZoom;
        var nw = this._crs.project(this._map.unproject(nwPoint, zoom));
        var se = this._crs.project(this._map.unproject(sePoint, zoom));
        tilewidth = se.x-nw.x;
        //zoom = this._map.getZoom();
        var ident = this.matrixIds[zoom].identifier;
        var tilematrix = this.wmtsParams.tilematrixSet + ":" + ident;
        var X0 = this.matrixIds[zoom].topLeftCorner.lng;
        var Y0 = this.matrixIds[zoom].topLeftCorner.lat;
        var tilecol=Math.floor((nw.x-X0)/tilewidth);
        var tilerow=-Math.floor((nw.y-Y0)/tilewidth);
        var url = L.Util.template(this._url, {s: this._getSubdomain(coords)});
        return url + L.Util.getParamString(this.wmtsParams, url) + "&tilematrix=" + tilematrix + "&tilerow=" + tilerow +"&tilecol=" + tilecol;
    },

    setParams: function (params, noRedraw) {
        L.extend(this.wmtsParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    },
    
    getDefaultMatrix : function () {
        /**
         * the matrix3857 represents the projection 
         * for in the IGN WMTS for the google coordinates.
         */
        var matrixIds3857 = new Array(22);
        var res = 156543.03390625;
        for (var i= 0; i<22; i++) {
            if (i>0){
                res = res/2;
            }
            matrixIds3857[i]= {
                identifier    : "" + i,
                topLeftCorner : new L.LatLng(20037508.3428,-20037508.3428),
                resolution :res
            };
        }
        return matrixIds3857;
    },
    
    getEvents: function () {
		var events = {
			viewprereset: this._invalidateAll,
			viewreset: this._resetView,
			zoom: this._resetView,
			moveend: this._onMoveEnd
		};

		if (!this.options.updateWhenIdle) {
			// update tiles on move, but not more often than once per given interval
			if (!this._onMove) {
				this._onMove = L.Util.throttle(this._onMoveEnd, this.options.updateInterval, this);
			}

			events.move = this._onMove;
		}

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}
		if (this.options.getfeatureinfo === true && this.identify) {
    		events['click'] = this.identify
        }
		return events;
	},
    
    identify: function(evt) {
        // Identify map features in response to map clicks. To customize this
        // behavior, create a class extending wmts.Source and override one or
        // more of the following hook functions.
    	var layer = this.options.layer;
        if (!layer) {
            return;
        }
        this.getFeatureInfo(
            evt.containerPoint, evt.latlng, layer,
            this.showFeatureInfo
        );
    },
    
    getFeatureInfo: function(point, latlng, layer, callback) {
        // Request WMTS GetFeatureInfo and call callback with results
        // (split from identify() to faciliate use outside of map events)
        var params = this.getFeatureInfoParams(point,latlng, layer),
            url = this._url + L.Util.getParamString(params, this._url);

        this.showWaiting();
        this.ajax(url, done);

        function done(result) {
            this.hideWaiting();
            var text = this.parseFeatureInfo(result, url);
            callback.call(this, latlng, text);
        }
    },

    ajax: function(url, callback) {
    	if (this.options.infoformat === "application/json"){
    		ajax.call(this, url, function(result) {
            	callback.call(this, result);
            });
    	}else{
    		ajax.call(this, url, callback);
    	}
    },
    
    getFeatureInfoParams: function(point,latlng, layer) {
        // Hook to generate parameters for WMTS service GetFeatureInfo request
        var wmtsParams = this.wmtsParams;
        wmtsParams.layer = layer;
        var tileinfo = this.getTileInfo(latlng);
        var infoParams = {
            'request': 'GetFeatureInfo',
            infoformat : this.options.infoformat
        };
        return L.extend({}, wmtsParams, infoParams,tileinfo);
    },
    
    getTileInfo: function(latlng) {
        var zoom = this._tileZoom;
        var ident = this.matrixIds[zoom].identifier;
        var tilematrix = this.wmtsParams.tilematrixSet + ":" + ident;
        var res = this.matrixIds[zoom].resolution;
        var tileSize = this._tileSize.x;
        var X0 = this.matrixIds[zoom].topLeftCorner.lng;
        var Y0 = this.matrixIds[zoom].topLeftCorner.lat;
        var coords = L.Projection.SphericalMercator.project(latlng);
        var fx = (coords.x - X0) / (res * tileSize);
        var fy = (Y0 - coords.y) / (res * tileSize);
        var tilecol = Math.floor(fx);
        var tilerow = Math.floor(fy);
        
        return {
            tilematrix:tilematrix,
            tilecol: tilecol, 
            tilerow: tilerow,
            i: Math.floor((fx - tilecol) * tileSize),
            j: -Math.floor((tilerow - fy) * tileSize)
        };
    },
    
    parseFeatureInfo: function(result, url) {
        // Hook to handle parsing AJAX response
        if (result == "error") {
            // AJAX failed, possibly due to CORS issues.
            // Try loading content in <iframe>.
            result = "<iframe src='" + url + "' style='border:none'>";
        }
        return result;
    },

    showFeatureInfo: function(latlng, info) {
        // Hook to handle displaying parsed AJAX response to the user
        if (!this._map) {
            return;
        }
        if (this.options.infoformat === "application/json"){
        	info = JSON.parse(info);
        	if (!info){
	        	return;
	        }
	        var html = "";
	        for (var i in info.features){
	        	var f = info.features[i];
	        	for (var name in f.properties){
	        		var val = f.properties[name];
	        		if (!val){
	        			val = "";
	        		}
	        		html += "<tr><th>" + name + "</th><td>" + val + "</td></tr>"
	        	}
	        	
	        }
	        if (html === ""){
	        	return;
	        }
	        html = "<table class='leaflet-tilelayer-wmts-getfeatureinfo'>" + html + "</table>";
	        this._map.openPopup(html, latlng);
        }else{
        	this._map.openPopup(info, latlng);
        }
    },

    showWaiting: function() {
        // Hook to customize AJAX wait animation
        if (!this._map)
            return;
        this._map._container.style.cursor = "progress";
    },

    hideWaiting: function() {
        // Hook to remove AJAX wait animation
        if (!this._map)
            return;
        this._map._container.style.cursor = "default";
    }
});

//Simple AJAX helper (since we can't assume jQuery etc. are present)
function ajax(url, callback) {
    var context = this,
        request = new XMLHttpRequest();
    request.onreadystatechange = change;
    request.open('GET', url);
    request.send();

    function change() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                callback.call(context, request.responseText);
            } else {
                callback.call(context, "error");
            }
        }
    }
}

L.tileLayer.wmts = function (url, options) {
    return new L.TileLayer.WMTS(url, options);
};
