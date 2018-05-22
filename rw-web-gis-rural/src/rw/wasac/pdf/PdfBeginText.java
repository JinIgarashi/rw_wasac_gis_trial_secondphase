/**
 *
 */
package rw.wasac.pdf;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfBeginText class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfBeginText extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfBeginText() {
		super("beginText");
	}

	/**
	 * To start drawing text
	 * the parameters are as follows
	 * <br>method:beginText
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		cb.beginText();
	}

}
