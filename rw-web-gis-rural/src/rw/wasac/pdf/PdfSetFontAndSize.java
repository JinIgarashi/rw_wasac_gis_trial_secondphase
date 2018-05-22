package rw.wasac.pdf;

import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfSetFontAndSize class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfSetFontAndSize extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfSetFontAndSize() {
		super("setFontAndSize");
	}

	/**
	 * To set font and size of iText
	 * the parameters are as follows。
	 * <br>method:setFontAndSize
	 * <br>fontname: Name of font
	 * <br>   HeiseiKakuGo-W5； gothic
	 * <br>   HeiseiMin-W3: Mincho
	 * <br>fontencoding: Type of ENCODE
	 * <br>   UniJIS-UCS2-H:Adobe UniCode for Japanese language
	 * <br>   UniJIS-UCS2-V:UniJIS-UCS2-Hの縦書きエンコーディング
	 * <br>   UniJIS-UCS2-HW-H:UniJIS-UCS2-Hのうち、プロポーショナル文字のみ半角文字に変更したエンコーディング
	 * <br>   UniJIS-UCS2-HW-V:UniJIS-UCS2-HW-Hの縦書きエンコーディング
	 * <br>fontsize:Size of font(pt)
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		String fontname = CmdParams.get("fontname");
		String fontencoding = CmdParams.get("fontencoding");
		Integer fontsize =Integer.valueOf(CmdParams.get("fontsize"));
		BaseFont bf = BaseFont.createFont();
		if (! fontname.equals("") == true && fontencoding.equals("") == true){
			bf = BaseFont.createFont(fontname, fontencoding, BaseFont.NOT_EMBEDDED);
		}
		cb.setFontAndSize(bf, fontsize);
	}

}
