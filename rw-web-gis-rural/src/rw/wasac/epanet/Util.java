package rw.wasac.epanet;

import java.math.BigDecimal;

/**
 * Operation for Util function
 * @author Jin Igarashi
 * @version 1.0
 */
public class Util {
	public static final Integer epsg = 4326;
	public static final Integer epsg_utm = 32736;
	
	public static Double setScale(Double val, Integer precision) {
		BigDecimal x = new BigDecimal(val);
		x = x.setScale(precision, BigDecimal.ROUND_HALF_UP);
		return x.doubleValue();
	}
	
	public static String padding(String val,Integer num) {
		String fillUppedString = val; 
        int len = 0;

        try {
            // SJISでのサイズ取得 
            len = val.getBytes("UTF-8").length;

            if (num <= len) {
                // 引数の桁より少ない場合は引数の桁に切り捨てる
                fillUppedString = new String(val.getBytes("UTF-8"), 0, num, "UTF-8");
            } else {
                for(int i = 0 ; i < (num - len); i++) {
                    fillUppedString = fillUppedString + " ";
                }
            }
        } catch(Exception e) {
          return "";  
        }
        
        return fillUppedString;
	}
}
