gis.ui.dialog.zoomToWss = function(spec,my){
	my = my || {};

	var that = gis.ui.dialog(spec,my);

	my.map = spec.map;
	my.comboboxPoId = 'cmbPoId_' + my.dialogId;
	my.comboboxDistId = 'cmbDistId_' + my.dialogId;
	my.comboboxWssId = 'cmbWssId_' + my.dialogId;

	my.poid_po_map = {};
	my.distid_dist_map = {};
	my.wssid_wss_map = {};
	
	my.po_wss_map = {};
	my.dist_wss_map = {};
	
	my.getHtml = function(){
		var html = 
			"<label for='"+ my.comboboxPoId +"'>Private Operator</label><select id='" + my.comboboxPoId + "' class='gis-ui-dialog-selectbox'></select>" +
			"<br>" +
			"<label for='"+ my.comboboxDistId +"'>District</label><select id='" + my.comboboxDistId + "' class='gis-ui-dialog-selectbox'></select>" +
			"<br>" +
			"<label for='"+ my.comboboxWssId +"'>WSS</label><select id='" + my.comboboxWssId + "' class='gis-ui-dialog-selectbox'></select>";
		return html;
	};

	my.addOptions = function(option){
		option.title = 'Zoom To WSS';
		option.modal = true;
		option.resizable = false;
		option.position = { my: "center", at: "center", of: window };
		return option;
	};
	
	my.getPos = function(){
		gis.util.ajaxGet('./rest/POs',function(json){
			if (json.code !== 0){
    			alert(json.message);
    			return;
    		};
    		
    		my.poid_po_map = {};
    		
    		var pos = json.value;
    		for (var i in pos){
    			var po = pos[i];
    			my.poid_po_map[po.po_id] = po;
    		};
    		var no_po = {
    				po_id : -1,
    				po_name : "No any operator of WSS"
    		};
    		my.poid_po_map[no_po.po_id] = no_po;
    		
    		$("#" + my.comboboxPoId).append($('<option>').html("Select Private Operator").val(""));
    		for (var po_id in my.poid_po_map){
    			var po = my.poid_po_map[po_id];
    			$("#" + my.comboboxPoId).append($('<option>').html(po.po_name).val(po.po_id));
    		};
    		
    		$("#" + my.comboboxPoId).change(function(){
    			var po_id = $(this).val();
    			$("#" + my.comboboxWssId + " > option").remove();
    			$("#" + my.comboboxWssId).append($('<option>').html("Select WSS").val(""));
    			$("#" + my.comboboxDistId).val("");
    			if (!my.po_wss_map[po_id]){
    				return;
    			};
    			for (var wss_id in my.po_wss_map[po_id]){
    				var wss = my.po_wss_map[po_id][wss_id];
    				$("#" + my.comboboxWssId).append($('<option>').html(wss.wss_name).val(wss.wss_id));
    			};
    		});
		});
	};
	
	my.getDistricts = function(){
		gis.util.ajaxGet('./rest/Districts/ByWss',function(json){
			if (json.code !== 0){
    			alert(json.message);
    			return;
    		};
    		
    		my.distid_dist_map = {};
    		
    		var districts = json.value;
    		for (var i in districts){
    			var district = districts[i];
    			my.distid_dist_map[district.dist_id] = district;
    		};
    		
    		$("#" + my.comboboxDistId).append($('<option>').html("Select District").val(""));
    		for (var dist_id in my.distid_dist_map){
    			var district = my.distid_dist_map[dist_id];
    			$("#" + my.comboboxDistId).append($('<option>').html(district.district).val(district.dist_id));
    		};
    		
    		$("#" + my.comboboxDistId).change(function(){
    			var dist_id = $(this).val();
    			$("#" + my.comboboxWssId + " > option").remove();
    			$("#" + my.comboboxWssId).append($('<option>').html("Select WSS").val(""));
    			$("#" + my.comboboxPoId).val("");
    			if (!my.dist_wss_map[dist_id]){
    				return;
    			};
    			for (var wss_id in my.dist_wss_map[dist_id]){
    				var wss = my.dist_wss_map[dist_id][wss_id];
    				$("#" + my.comboboxWssId).append($('<option>').html(wss.wss_name).val(wss.wss_id));
    			};
    			var district = my.distid_dist_map[dist_id];
    			my.set_bounds(district);
    		});
		});
	};
	
	my.getWSSs = function(){
		gis.util.ajaxGet('./rest/WSS',function(json){
			if (json.code !== 0){
    			alert(json.message);
    			return;
    		};
    		
    		my.wssid_wss_map = {};
    		my.dist_wss_map = {};
    		
    		var wsss = json.value;
    		for (var i in wsss){
    			var wss = wsss[i];
    			if (!my.po_wss_map[wss.po_id]){
    				my.po_wss_map[wss.po_id] = [];
    			};
    			my.po_wss_map[wss.po_id].push(wss);
    			if (!my.dist_wss_map[wss.dist_id]){
    				my.dist_wss_map[wss.dist_id] = [];
    			};
    			my.dist_wss_map[wss.dist_id].push(wss);
    			my.wssid_wss_map[wss.wss_id]=wss;
    		};
    		
    		$("#" + my.comboboxWssId).change(function(){
    			var wss_id = $(this).val();
    			if (wss_id==""){
    				return;
    			};
    			var wss = my.wssid_wss_map[wss_id];
    			my.set_bounds(wss);
    			that.close();
    		});
		});
	};
	
	my.postCreate = function(){
		my.getPos();
		my.getDistricts();
		my.getWSSs();
	};

	that.CLASS_NAME =  "gis.ui.dialog.zoomToWss";
	return that;
};