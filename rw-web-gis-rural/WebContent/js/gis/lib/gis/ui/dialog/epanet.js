gis.ui.dialog.epanet = function(spec,my){
	my = my || {};

	var that = gis.ui.dialog.zoomToWss(spec,my);
	
	my.addOptions = function(option){
		option.title = 'Download EPANET';
		option.modal = true;
		option.resizable = false;
		option.position = { my: "center", at: "center", of: window };
		option.buttons= [
		    {
		        text: "Download",
		        click: function() {
		        	var wss_id = $("#" + my.comboboxWssId).val();
		        	if (wss_id === ""){
		        		return;
		        	};
		        	gis.util.ajaxGetFile('./rest/Epanet?wss_id=' + wss_id);
		        }
		      }
		    ];
		return option;
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
    			//that.close();
    		});
		});
	};

	that.CLASS_NAME =  "gis.ui.dialog.zoomToWss";
	return that;
};