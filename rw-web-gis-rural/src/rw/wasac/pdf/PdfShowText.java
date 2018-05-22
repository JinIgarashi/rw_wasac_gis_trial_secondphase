package rw.wasac.pdf;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfShowText class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfShowText extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfShowText() {
		super("showText");
	}

	/**
	 * To draw text
	 * the parameters are as follows
	 * <br>method:showText
	 * <br>text:text drawn
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		String text = CmdParams.get("text");
		cb.showText(text);
	}

}
