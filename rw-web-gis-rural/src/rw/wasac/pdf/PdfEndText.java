package rw.wasac.pdf;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfEndText class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfEndText extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfEndText() {
		super("endText");
	}

	/**
	 * To end drawing text
	 * the parameters are as follows
	 * <br>method:endText
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		cb.endText();
	}

}
