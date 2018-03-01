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