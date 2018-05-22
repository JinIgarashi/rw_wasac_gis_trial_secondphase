package rw.wasac.pdf;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfShowTextAligned class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfShowTextAligned extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfShowTextAligned() {
		super("showTextAligned");
	}

	/**
	 * To draw text at target position by target style
	 * the parameters are as follows。
	 * <br>method:showTextAligned
	 * <br>text:text drawn
	 * <br>x:x-coordinate. unit is mm.
	 * <br>y:y-coordinate. unit is mm.
	 * <br>rotation:rotation of text.
	 * <br>align:position of text Center/Right/Left
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		String text = CmdParams.get("text");
		Float x = Float.valueOf(CmdParams.get("x"));
		Float y = Float.valueOf(CmdParams.get("y"));
		Float rotation = Float.valueOf(CmdParams.get("rotation"));
		String align = CmdParams.get("align");
		Integer iTextAlign = PdfContentByte.ALIGN_LEFT;
		if (align.equals("Center")){
			iTextAlign = PdfContentByte.ALIGN_CENTER;
		}else if (align.equals("Right")){
			iTextAlign = PdfContentByte.ALIGN_RIGHT;
		}
		cb.showTextAligned(iTextAlign, text, mm2pixel(x), mm2pixel(y), rotation);
	}

}
