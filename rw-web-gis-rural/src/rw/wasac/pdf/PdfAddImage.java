package rw.wasac.pdf;

import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfAddImage class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfAddImage extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfAddImage() {
		super("addImage");
	}

	/**
	 * To add image
	 * the parameters are as follows
	 * <br>method:addImage
	 * <br>path:path of image file
	 * <br>x:x-coodinate of bottom-left.unit is mm.
	 * <br>y:y-coodinate of bottom-left.unit is mm.
	 * <br>width:width(mm) of image
	 * <br>height:height(mm) of image
	 * <br>scaleAbsoluteWidth:width(pixel) of resolution
	 * <br>scaleAbsoluteHeight:height(pixel) of resolution
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		String path = CmdParams.get("path");
		Image img = Image.getInstance(path);
		/*Float scalepercent = Float.valueOf(CmdParams.get("scalepercent"));
		img.scalePercent(scalepercent);*/
		Float scaleAbsoluteWidth = Float.valueOf(CmdParams.get("scaleAbsoluteWidth"));
		Float scaleAbsoluteHeight = Float.valueOf(CmdParams.get("scaleAbsoluteHeight"));
		img.scaleAbsolute(scaleAbsoluteWidth, scaleAbsoluteHeight);

		Float x = Float.valueOf(CmdParams.get("x"));
		Float y = Float.valueOf(CmdParams.get("y"));
		Integer width = Integer.valueOf(CmdParams.get("width"));
		Integer height = Integer.valueOf(CmdParams.get("height"));
		cb.addImage(img, mm2pixel(width), 0, 0, mm2pixel(height), mm2pixel(x), mm2pixel(y));
	}

}
