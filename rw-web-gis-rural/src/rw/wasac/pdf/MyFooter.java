package rw.wasac.pdf;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * Manage of Footer
 * @author Jin Igarashi
 * @version 1.0
 */
public class MyFooter extends PdfPageEventHelper {
	/**
	 * Font for header and footer
	 */
	Font ffont = new Font(Font.FontFamily.UNDEFINED, 10, Font.BOLD);

	/**
	 * text for left side of header
	 */
	private String _header_left = "";
	
	/**
	 * text for center of header
	 */
	private String _header_centre = "";
	
	/**
	 * text for right side of header
	 */
	private String _header_right = "";
	
	/**
	 * text for left side of footer
	 */
	private String _footer_left = "";
	
	/**
	 * text for center of footer
	 */
	private String _footer_centre = "";
	
	/**
	 * text for right side of footer
	 */
	private String _footer_right = "";
	
	/**
	 * a flug for page number. If true, to put page number.
	 */
	private Boolean _isNeedPageNo = false;

	/**
	 * Constructor
	 * @param header_left text for left side of header
	 * @param header_centre text for center of header
	 * @param header_right text for right side of header
	 * @param footer_left text for left side of footer
	 * @param footer_centre text for center of footer
	 * @param footer_right text for right side of footer
	 * @param isNeedPageNo a flug for page number. If true, to put page number.
	 */
	public MyFooter(String header_left, String header_centre, String header_right, String footer_left,
			String footer_centre, String footer_right, Boolean isNeedPageNo) {
		_header_left = header_left;
		_header_centre = header_centre;
		_header_right = header_right;
		_footer_left = footer_left;
		_footer_centre = footer_centre;
		_footer_right = footer_right;
		_isNeedPageNo = isNeedPageNo;
	}

	/**
	 * this event will be happened after creating each page. Header and footer will be created in this event.
	 */
	public void onEndPage(PdfWriter writer, Document document) {
		PdfContentByte cb = writer.getDirectContent();

		Phrase header_left = new Phrase(_header_left, ffont);
		ColumnText.showTextAligned(cb, Element.ALIGN_LEFT, header_left, document.left() + document.leftMargin() + 50,
				document.top() + 10, 0);

		Phrase header_centre = new Phrase(_header_centre, ffont);
		ColumnText.showTextAligned(cb, Element.ALIGN_CENTER, header_centre,
				(document.right() - document.left()) / 2 + document.leftMargin(), document.top() + 10, 0);

		Phrase header_right = new Phrase(_header_right, ffont);
		ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT, header_right,
				document.right() + document.rightMargin() - 50, document.top() + 10, 0);

		Phrase footer_left = new Phrase(_footer_left, ffont);
		ColumnText.showTextAligned(cb, Element.ALIGN_LEFT, footer_left, document.left() + document.leftMargin() + 50,
				document.bottom() - 10, 0);

		Phrase footer_centre = new Phrase(_footer_centre, ffont);
		ColumnText.showTextAligned(cb, Element.ALIGN_CENTER, footer_centre,
				(document.right() - document.left()) / 2 + document.leftMargin(), document.bottom() - 10, 0);

		Phrase footer_right = new Phrase(_footer_right, ffont);
		ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT, footer_right,
				document.right() + document.rightMargin() - 50, document.bottom() - 10, 0);

		if (_isNeedPageNo == true) {
			Phrase pageno = new Phrase("Page No:" + String.valueOf(writer.getPageNumber()), ffont);
			Integer pageno_location = 10;
			if (!_footer_left.equals("")) {
				pageno_location = 20;
			}
			ColumnText.showTextAligned(cb, Element.ALIGN_LEFT, pageno, document.left() + document.leftMargin() + 50,
					document.bottom() - pageno_location, 0);
		}
	}
}
