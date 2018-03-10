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
			async : true
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