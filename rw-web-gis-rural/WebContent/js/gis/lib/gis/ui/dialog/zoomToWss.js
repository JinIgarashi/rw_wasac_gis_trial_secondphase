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
		option.resizable = false;
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