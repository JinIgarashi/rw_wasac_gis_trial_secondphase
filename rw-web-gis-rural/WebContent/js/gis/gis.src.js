/*

  gis.js -- Web GIS Library

  Copyright (c) 2017 Jin Igarashi
  Kokusai Kogyo, Limited.

  this tool use leafletjs, jquery and jquery-ui.

*/
/* ======================================================================
    gis/singleFile.js
   ====================================================================== */

/**
 * 圧縮された一つのファイルから参照されたときに読みこまれるファイル
 */
var gis = {
    /**
     * Constant: VERSION_NUMBER
     */
    VERSION_NUMBER: "Release 1.0",

    /**
     * Constant: singleFile
     * TODO: remove this in 3.0 when we stop supporting build profiles that
     * include gis.js
     */
    singleFile: true,

    /**
     * Method: _getScriptLocation
     * Return the path to this script. This is also implemented in
     * justice.js
     *
     * Returns:
     * {String} Path to this script
     */
    _getScriptLocation: (function() {
        var r = new RegExp("(^|(.*?\\/))(gis[^\\/]*?\\.js)(\\?|$)"),
            s = document.getElementsByTagName('script'),
            src, m, l = "";
        for(var i=0, len=s.length; i<len; i++) {
            src = s[i].getAttribute('src');
            if(src) {
                m = src.match(r);
                if(m) {
                    l = m[1];
                    break;
                }
            }
        }
        return (function() { return l; });
    })()
};
/* ======================================================================
    gis/ui.js
   ====================================================================== */

gis.ui = function(spec,my){
	var that= {};

	my = my || {};

	my.divid = spec.divid;

	that.CLASS_NAME =  "gis.ui";
	return that;
};
/* ======================================================================
    gis/ui/control.js
   ====================================================================== */

gis.ui.control = function(spec,my){
	my = my || {};
	var that = gis.ui(spec,my);
	
	my.map = spec.map;
	my.options = spec.options || {};

	/**
	 * 当該コントロールがスマホからの閲覧時に不要の場合はフラグを立てる。
	 */
	my.notRequireSP = spec.notRequireSP || false;
	
	/**
	 * コントロールオブジェクト
	 */
	my.control = null;
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		
	};
	
	that.add = function(){
		if (my.control == null){
			return;
		}
		if (gis.util.isSmartphone() == true && my.notRequireSP == true){
			//スマホの時に、スマホ時に不要フラグが立ってたら追加しない。
			return;
		}
		my.control.addTo(my.map);
	};

	that.CLASS_NAME =  "gis.ui.control";
	return that;
};
/* ======================================================================
    gis/ui/dialog.js
   ====================================================================== */

gis.ui.dialog = function(spec,my){
	my = my || {};

	var that = gis.ui(spec,my);

	my.divid = spec.divid;

	my.dialogId = spec.divid + '-dialog';

	my.isInit = false;

	my.getHtml = function(){
		return "";
	};

	my.postCreate = function(){

	};

	my.addOptions = function(option){
		return option;
	};

	/**
	 * Dialogを格納するdivを作成しHTMLをセットする
	 * @param html ダイアログのHTML
	 * @param option jquery-ui-dialogのオプション
	 */
	that.create = function(option){
		option = option || {};
		if (my.isInit === true){
			return;
		}
		$(document.body).append("<div id='" + my.dialogId + "'></div>");
		$("#" + my.dialogId).html(my.getHtml());

		option = my.addOptions(option);
		if (!option){
			option = {};
		}
		if (!option.autoOpen){
			option.autoOpen = false;
		}
		if (!option.modal){
			option.modal = false;
		}
		if (!option.position){
			option.position = [0,0];
		}
		$("#" + my.dialogId).dialog(option);

		my.isInit = true;

		my.postCreate();
	};

	that.open = function(){
		$("#" + my.dialogId).dialog('open');
	};

	that.close = function(){
		$("#" + my.dialogId).dialog('close');
	};

	that.CLASS_NAME =  "gis.ui.dialog";
	return that;
};
/* ======================================================================
    gis/ui/control/coordinates.js
   ====================================================================== */

gis.ui.control.coordinates = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.options = spec.options || {
		position : "bottomright", // optional default "bootomright"
		decimals : 6, // optional default 4
		labelTemplateLat : "Latitude: {y}", // optional default "Lat: {y}"
		labelTemplateLng : "Longitude: {x}", // optional default "Lng: {x}"
	};
	
	my.notRequireSP = spec.notRequireSP || true;
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.coordinates(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.coordinates";
	return that;
};
/* ======================================================================
    gis/ui/control/navbar.js
   ====================================================================== */

gis.ui.control.navbar = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.notRequireSP = spec.notRequireSP || true;
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.navbar(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.navbar";
	return that;
};
/* ======================================================================
    gis/ui/control/graphicScale.js
   ====================================================================== */

gis.ui.control.graphicScale = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.options = spec.options || {
		fill : 'hollow',
		showSubunits : true,
		labelPlacement : 'top'
	};
	
	my.notRequireSP = spec.notRequireSP || true;
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.graphicScale(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.graphicScale";
	return that;
};
/* ======================================================================
    gis/ui/control/locate.js
   ====================================================================== */

gis.ui.control.locate = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.locate(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.locate";
	return that;
};
/* ======================================================================
    gis/ui/control/polylineMeasure.js
   ====================================================================== */

gis.ui.control.polylineMeasure = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.options = spec.options || {showMeasurementsClearControl: true};
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.control.polylineMeasure(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.polylineMeasure";
	return that;
};
/* ======================================================================
    gis/ui/control/easyPrint.js
   ====================================================================== */

gis.ui.control.easyPrint = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	my.options = spec.options || {
		elementsToHide : ['a','button','.leaflet-small-widget','.leaflet-control-coordinates','.leaflet-control-attribution','.leaflet-iconLayers-layer']
	};
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.easyPrint(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.easyPrint";
	return that;
};
/* ======================================================================
    gis/ui/layerLoader.js
   ====================================================================== */

gis.ui.layerLoader = function(spec,my){
	var that= {};

	my = my || {};

	my.map = spec.map;
	my.defineurl = spec.defineurl;

	my.legends = [];
	
	my.getLayer = function(e){
		var layer = null;
		if (e.type === "WMS"){
			layer = L.tileLayer.wms(e.url,e.options).addTo(my.map);
		}else if (e.type === "TMS"){
			layer = L.tileLayer(e.url, e.options).addTo(my.map);
		}
		
		if (e.legend) {
			my.legends.push({
				name : e.name,
				layer : layer,
				elements : e.legend.elements
			});
		}
		
		return layer;
	};

	that.init = function(){
		$.ajax({
			url : my.defineurl,
			type : 'GET',
			dataType : 'json',
			cache : false,
			//async : false
		}).done(function(layers_define) {
			var baseMaps = [];
			var overlays = {};

			for (var i in layers_define){
				var obj = layers_define[i];
				var layer = my.getLayer(obj);

				if (obj.isBaseLayer && obj.isBaseLayer === true){
					baseMaps.push({
						title: obj.name,
						layer:layer,
						icon:obj.icon
					});
				}else{
					if (!obj.group){
						overlays[obj.name] = layer;
					}else{
						if (!overlays[obj.group]){
							overlays[obj.group] = {};
						}
						overlays[obj.group][obj.name] = layer
					}
				}

				if (obj.visible !== true){
					my.map.removeLayer(layer);
				}
			}

			var iconLayersControl = new L.Control.IconLayers(baseMaps, {
		        position: 'bottomleft',
		        maxLayersInRow: 5
		    }).addTo(my.map);
			
			var options = {
					  exclusiveGroups: ["Area"],
					  groupCheckboxes: true
					};
			L.control.groupedLayers({},overlays,options).addTo(my.map);
			
			if (my.legends.length>0){
				L.control.htmllegend({
					position : 'bottomright',
					legends : my.legends,
					collapseSimple : false,
					detectStretched : false,
					collapsedOnInit : false,
				}).addTo(my.map);
			}
		});
	};

	that.CLASS_NAME =  "gis.ui.layerLoader";
	return that;
};
/* ======================================================================
    gis/ui/dialog/zoomToWss.js
   ====================================================================== */

gis.ui.dialog.zoomToWss = function(spec,my){
	my = my || {};

	var that = gis.ui.dialog(spec,my);

	my.map = spec.map;
	my.comboboxDistId = 'cmbDistId_' + my.dialogId;
	my.comboboxWssId = 'cmbWssId_' + my.dialogId;

	my.district_wss = {};
	
	my.getHtml = function(){
		var html = 
			"<label for='"+ my.comboboxDistId +"'>District</label><select id='" + my.comboboxDistId + "' style='width:100%'></select>" +
			"<br>" +
			"<label for='"+ my.comboboxWssId +"'>WSS</label><select id='" + my.comboboxWssId + "' style='width:100%'></select>";
		return html;
	};

	my.addOptions = function(option){
		option.title = 'Zoom To WSS';
		option.modal = true;
		option.position = { my: "center", at: "center", of: window };
		return option;
	};
	
	my.postCreate = function(){
		$.ajax({
			url : './rest/WSS',
			type : 'GET',
			dataType : 'json',
			cache : false
    	}).done(function(json){
    		if (json.code !== 0){
    			alert(json.message);
    			return;
    		}
    		
    		var wsss = json.value;
    		$("#" + my.comboboxDistId).append($('<option>').html("Select District").val(""));
    		for (var i in wsss){
    			var wss = wsss[i];
    			if (!my.district_wss[wss.district]){
    				my.district_wss[wss.district] = [];
    				$("#" + my.comboboxDistId).append($('<option>').html(wss.district).val(wss.district));
    			}
    			my.district_wss[wss.district].push(wss);
    		}
    		
    		$("#" + my.comboboxDistId).change(function(){
    			var district = $(this).val();
    			$("#" + my.comboboxWssId + " > option").remove();
    			$("#" + my.comboboxWssId).append($('<option>').html("Select WSS").val(""));
    			if (!my.district_wss[district]){
    				return;
    			}
    			for (var i in my.district_wss[district]){
    				var wss = my.district_wss[district][i];
    				$("#" + my.comboboxWssId).append($('<option>').html(wss.name).val(JSON.stringify([wss.lat,wss.lng])));
    			}
    		});
    		
    		$("#" + my.comboboxWssId).change(function(){
    			var coordinates = $(this).val();
    			if (coordinates==""){
    				return;
    			}
    			my.map.flyTo(JSON.parse(coordinates),15);
    			that.close();
    		});
    		
    	}).fail(function(xhr){
			console.log(xhr.status + ';' + xhr.statusText);
			return false;
    	});
	};

	that.CLASS_NAME =  "gis.ui.dialog.zoomToWss";
	return that;
};
/* ======================================================================
    gis/ui/controlLoader.js
   ====================================================================== */

gis.ui.controlLoader = function(spec,my){
	var that= {};
	my = my || {};

	my.map = spec.map;
	my.defineurl = spec.defineurl;

	that.init = function(){
		$.ajax({
			url : my.defineurl,
			type : 'GET',
			dataType : 'json',
			cache : false,
			async : false
		}).done(function(ctrls_define) {
			var settings = {map : my.map};
			for (var i in ctrls_define){
				for (var j in ctrls_define[i].settings){
					settings[j] = ctrls_define[i].settings[j];
				}
				var ctrl = gis.ui.control[ctrls_define[i].ctrl](settings);
				ctrl.init();
				ctrl.add();
			}
		});
	};

	that.CLASS_NAME =  "gis.ui.controlLoader";
	return that;
};
/* ======================================================================
    gis/ui/dialog/zoomToAdmin.js
   ====================================================================== */

gis.ui.dialog.zoomToAdmin = function(spec,my){
	my = my || {};

	var that = gis.ui.dialog(spec,my);

	my.map = spec.map;
	my.comboboxProvId = 'cmbProvId_' + my.dialogId;
	my.comboboxDistId = 'cmbDistId_' + my.dialogId;
	my.comboboxSectorId = 'cmbSectId_' + my.dialogId;
	my.comboboxCellId = 'cmbCellId_' + my.dialogId;

	my.provid_prov_map = {};
	my.distid_dist_map = {};
	my.sectid_sect_map = {};
	my.cellid_cell_map = {};
	
	my.prov_dist_map = {};
	my.dist_sector_map = {};
	my.sect_cell_map = {};
	
	my.selected_bounds = null;
	
	my.set_bounds = function(object){
		if (!object){
			my.selected_bounds = null;
		}
		my.selected_bounds = [[object.ymin,object.xmin],[object.ymax,object.xmax]];
		my.map.flyToBounds(my.selected_bounds);
	}
	
	my.getHtml = function(){
		var html = 
			"<label for='"+ my.comboboxProvId +"'>Province</label><select id='" + my.comboboxProvId + "' style='width:100%'></select>" +
			"<br>" +
			"<label for='"+ my.comboboxDistId +"'>District</label><select id='" + my.comboboxDistId + "' style='width:100%'></select>" +
			"<br>" +
			"<label for='"+ my.comboboxSectorId +"'>Sector</label><select id='" + my.comboboxSectorId + "' style='width:100%'></select>" +
			"<br>" +
			"<label for='"+ my.comboboxCellId +"'>Cell</label><select id='" + my.comboboxCellId + "' style='width:100%'></select>";
		
		return html;
	};

	my.addOptions = function(option){
		option.title = 'Zoom To Administrative';
		option.modal = true;
		option.position = { my: "center", at: "center", of: window };
		return option;
	};
	
	my.getDistricts = function(){
		$.ajax({
			url : './rest/Districts',
			type : 'GET',
			dataType : 'json',
			cache : false
    	}).done(function(json){
    		if (json.code !== 0){
    			alert(json.message);
    			return;
    		}
    		
    		my.distid_dist_map = {};
    		my.prov_dist_map = {};
    		
    		var districts = json.value;
    		for (var i in districts){
    			var district = districts[i];
    			if (!my.prov_dist_map[district.prov_id]){
    				my.prov_dist_map[district.prov_id] = [];
    			}
    			my.prov_dist_map[district.prov_id].push(district);
    			my.distid_dist_map[district.dist_id] = district;
    		}
    		
    	}).fail(function(xhr){
			console.log(xhr.status + ';' + xhr.statusText);
			return false;
    	});
	};
	
	my.getSecotrs = function(){
		$.ajax({
			url : './rest/Sectors',
			type : 'GET',
			dataType : 'json',
			cache : false
    	}).done(function(json){
    		if (json.code !== 0){
    			alert(json.message);
    			return;
    		}
    		
    		my.sectid_sect_map = {};
    		my.dist_sector_map = {};
    		
    		var sectors = json.value;
    		for (var i in sectors){
    			var sector = sectors[i];
    			if (!my.dist_sector_map[sector.dist_id]){
    				my.dist_sector_map[sector.dist_id] = [];
    			}
    			my.dist_sector_map[sector.dist_id].push(sector);
    			my.sectid_sect_map[sector.sect_id] = sector;
    		}
    		
    	}).fail(function(xhr){
			console.log(xhr.status + ';' + xhr.statusText);
			return false;
    	});
	};
	
	my.getCells = function(){
		$.ajax({
			url : './rest/Cells',
			type : 'GET',
			dataType : 'json',
			cache : false
    	}).done(function(json){
    		if (json.code !== 0){
    			alert(json.message);
    			return;
    		}
    		
    		my.cellid_cell_map = {};
    		my.sect_cell_map = {};
    		
    		var cells = json.value;
    		for (var i in cells){
    			var cell = cells[i];
    			if (!my.sect_cell_map[cell.sect_id]){
    				my.sect_cell_map[cell.sect_id] = [];
    			}
    			my.sect_cell_map[cell.sect_id].push(cell);
    			my.cellid_cell_map[cell.cell_id]=cell;
    		}
    	}).fail(function(xhr){
			console.log(xhr.status + ';' + xhr.statusText);
			return false;
    	});
	};
	
	my.postCreate = function(){
		my.getDistricts();
		my.getSecotrs();
		my.getCells();
		
		$.ajax({
			url : './rest/Provinces',
			type : 'GET',
			dataType : 'json',
			cache : false
    	}).done(function(json){
    		if (json.code !== 0){
    			alert(json.message);
    			return;
    		}
    		
    		my.provid_prov_map = {};
    		var provinces = json.value;
    		$("#" + my.comboboxProvId).append($('<option>').html("Select Province").val(""));
    		for (var i in provinces){
    			var province = provinces[i];
    			$("#" + my.comboboxProvId).append($('<option>').html(province.prov_name).val(province.prov_id));
    			my.provid_prov_map[province.prov_id] = province;
    		}
    		
    		$("#" + my.comboboxProvId).change(function(){
    			var prov_id = $(this).val();
    			$("#" + my.comboboxDistId + " > option").remove();
    			$("#" + my.comboboxDistId).append($('<option>').html("Select District").val(""));
    			$("#" + my.comboboxSectorId + " > option").remove();
    			$("#" + my.comboboxCellId + " > option").remove();
    			if (prov_id == ""){
    				my.set_bounds();
    				return;
    			}
    			var province = my.provid_prov_map[prov_id];
    			my.set_bounds(province);
    			for (var dist_id in my.prov_dist_map[prov_id]){
    				var district = my.prov_dist_map[prov_id][dist_id];
    				$("#" + my.comboboxDistId).append($('<option>').html(district.district).val(district.dist_id));
    			}
    		});
    		
    		$("#" + my.comboboxDistId).change(function(){
    			var dist_id = $(this).val();
    			$("#" + my.comboboxSectorId + " > option").remove();
    			$("#" + my.comboboxSectorId).append($('<option>').html("Select Sector").val(""));
    			$("#" + my.comboboxCellId + " > option").remove();
    			if (dist_id == ""){
    				var province = my.provid_prov_map[prov_id];
    				my.set_bounds(province);
    				return;
    			}
    			var district = my.distid_dist_map[dist_id];
    			my.set_bounds(district);
    			
    			for (var sect_id in my.dist_sector_map[dist_id]){
    				var sector = my.dist_sector_map[dist_id][sect_id];
    				$("#" + my.comboboxSectorId).append($('<option>').html(sector.sector).val(sector.sect_id));
    			}
    		});
    		
    		$("#" + my.comboboxSectorId).change(function(){
    			var sect_id = $(this).val();
    			$("#" + my.comboboxCellId + " > option").remove();
    			$("#" + my.comboboxCellId).append($('<option>').html("Select Cell").val(""));
    			if (sect_id == ""){
    				var district = my.prov_dist_map[prov_id][dist_id];
    				my.set_bounds(district);
    				return;
    			}
    			var sector = my.sectid_sect_map[sect_id];
    			my.set_bounds(sector);
    			
    			for (var cell_id in my.sect_cell_map[sect_id]){
    				var cell = my.sect_cell_map[sect_id][cell_id];
    				$("#" + my.comboboxCellId).append($('<option>').html(cell.cell).val(cell.cell_id));
    			}
    		});
    		
    		$("#" + my.comboboxCellId).change(function(){
    			var cell_id = $(this).val();
    			if (cell_id == ""){
    				var sector = my.dist_sector_map[dist_id][sect_id];
        			my.set_bounds(sector);
    				return;
    			}
    			var cell = my.cellid_cell_map[cell_id];
    			my.set_bounds(cell);
    			that.close();
    		});
    		
    	}).fail(function(xhr){
			console.log(xhr.status + ';' + xhr.statusText);
			return false;
    	});
	};

	/*my.btnZoom_onClick = function(){
		if (!my.selected_bounds){
			return;
		}
		my.map.flyToBounds(my.selected_bounds);
		that.close();
	};*/

	that.CLASS_NAME =  "gis.ui.dialog.zoomToAdmin";
	return that;
};
/* ======================================================================
    gis/util.js
   ====================================================================== */

gis.util = function(spec,my){
	var that= {};
	my = my || {};
	that.CLASS_NAME =  "gis.util";
	return that;
};

/**
 * スマートフォンかどうかを判定する。スマホの時はTrueを返す。
 */
gis.util.isSmartphone = function(){
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
};
/* ======================================================================
    gis/ui/control/zoomToAreas.js
   ====================================================================== */

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
/* ======================================================================
    gis/ui/control/geocoder.js
   ====================================================================== */

gis.ui.control.geocoder = function(spec,my){
	my = my || {};
	var that = gis.ui.control(spec,my);
	
	/**
	 * 初期化（継承用）
	 */
	that.init = function(){
		my.control = L.Control.geocoder(my.options);
	};

	that.CLASS_NAME =  "gis.ui.control.geocoder";
	return that;
};
