gis.ui.dialog.zoomToAdmin = function(spec,my){
	my = my || {};

	var that = gis.ui.dialog(spec,my);

	my.map = spec.map;
	my.comboboxProvId = 'cmbProvId_' + my.dialogId;
	my.comboboxDistId = 'cmbDistId_' + my.dialogId;
	my.comboboxSectorId = 'cmbSectId_' + my.dialogId;
	my.comboboxCellId = 'cmbCellId_' + my.dialogId;
	my.comboboxVillId = 'cmbVillId_' + my.dialogId;

	my.provid_prov_map = {};
	my.distid_dist_map = {};
	my.sectid_sect_map = {};
	my.cellid_cell_map = {};
	my.villid_vill_map = {};
	
	my.prov_dist_map = {};
	my.dist_sector_map = {};
	my.sect_cell_map = {};
	my.cell_vill_map = {};
	
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
			"<label for='"+ my.comboboxCellId +"'>Cell</label><select id='" + my.comboboxCellId + "' style='width:100%'></select>"+
			"<br>" +
			"<label for='"+ my.comboboxVillId +"'>Village</label><select id='" + my.comboboxVillId + "' style='width:100%'></select>";
		
		return html;
	};

	my.addOptions = function(option){
		option.title = 'Zoom To Administrative';
		option.modal = true;
		option.resizable = false;
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
	
	my.getVillages = function(){
		$.ajax({
			url : './rest/Villages',
			type : 'GET',
			dataType : 'json',
			cache : false
    	}).done(function(json){
    		if (json.code !== 0){
    			alert(json.message);
    			return;
    		}
    		
    		my.villid_vill_map = {};
    		my.cell_vill_map = {};
    		
    		var villages = json.value;
    		for (var i in villages){
    			var vill = villages[i];
    			if (!my.cell_vill_map[vill.cell_id]){
    				my.cell_vill_map[vill.cell_id] = [];
    			}
    			my.cell_vill_map[vill.cell_id].push(vill);
    			my.villid_vill_map[vill.vill_id]=vill;
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
		my.getVillages();
		
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
    			$("#" + my.comboboxVillId + " > option").remove();
    			$("#" + my.comboboxVillId).append($('<option>').html("Select Village").val(""));
    			if (cell_id == ""){
    				var sector = my.dist_sector_map[dist_id][sect_id];
        			my.set_bounds(sector);
    				return;
    			}
    			var cell = my.cellid_cell_map[cell_id];
    			my.set_bounds(cell);
    			
    			for (var vill_id in my.cell_vill_map[cell_id]){
    				var vill = my.cell_vill_map[cell_id][vill_id];
    				$("#" + my.comboboxVillId).append($('<option>').html(vill.village).val(vill.vill_id));
    			}
    		});
    		
    		$("#" + my.comboboxVillId).change(function(){
    			var vill_id = $(this).val();
    			if (vill_id == ""){
    				var cell = my.sector_cell_map[sect_id][cell_id];
        			my.set_bounds(cell);
    				return;
    			}
    			var vill = my.villid_vill_map[vill_id];
    			my.set_bounds(vill);
    			that.close();
    		});
    		
    	}).fail(function(xhr){
			console.log(xhr.status + ';' + xhr.statusText);
			return false;
    	});
	};

	that.CLASS_NAME =  "gis.ui.dialog.zoomToAdmin";
	return that;
};