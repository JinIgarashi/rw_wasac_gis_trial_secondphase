package rw.wasac.pdf;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfStroke class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfStroke extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfStroke() {
		super("stroke");
	}

	/**
	 * To draw all of figures on PDF once.
	 * the parameters are as follows
	 * <br>method:stroke
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		cb.stroke();
	}

}
