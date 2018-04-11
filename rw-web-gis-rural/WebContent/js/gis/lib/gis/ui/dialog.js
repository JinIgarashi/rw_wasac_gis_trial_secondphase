gis.ui.dialog = function(spec,my){
	my = my || {};

	var that = gis.ui(spec,my);

	my.divid = spec.divid;

	my.dialogId = spec.divid + '-dialog';

	my.isInit = false;

	my.getHtml = function(){
		return "";
	};

	my.beforeOpen = function(){

	};
	
	my.postCreate = function(){

	};

	my.addOptions = function(option){
		return option;
	};

	my.set_bounds = function(object){
		if (!object){
			my.selected_bounds = null;
		}
		my.selected_bounds = [[object.ymin,object.xmin],[object.ymax,object.xmax]];
		my.map.flyToBounds(my.selected_bounds);
	}
	
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