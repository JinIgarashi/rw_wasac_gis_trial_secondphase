package rw.wasac.rest;

/**
 * RestResult Object
 * @version 1.00
 * @author Igarashi
 */
public class RestResult<T> {

	/**
	 * Return code '0' means OK
	 */
	public static int ok = 0;
	
	/**
	 * Return code '-1' means application error
	 */
	public static int error = -1;
	
	/**
	 * Return code '99' means system error.
	 */
	public static int systemerror = 99;

	/**
	 * Returned code
	 */
	private int code;
	
	/**
	 * Returned message
	 */
	private String message;
	
	/**
	 * Returned value
	 */
	private T value;

	/**
	 * Constructor
	 * @param code returned code
	 * @param message returned message
	 */
	public RestResult(int code, String message){
		this.code = code;
		this.message = message;
	}

	/**
	 * Constructor
	 * @param value Target Class
	 */
	public RestResult(T value){
		this.code = RestResult.ok;
		this.value = value;
	}

	/**
	 * get Code of result
	 * @return {Integer} returned code
	 */
	public int getCode(){
		return this.code;
	}

	/**
	 * get Message of result
	 * @return {String} returned message
	 */
	public String getMessage(){
		return this.message;
	}

	/**
	 * get Object of result
	 * @return {Object} returned object
	 */
	public T getValue(){
		return this.value;
	}

}
