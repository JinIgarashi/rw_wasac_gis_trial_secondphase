package rw.wasac.common;

import java.io.FileInputStream;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

/**
 * ServletListener
 * @author Jin Igarashi
 * @version 1.0
 */
public class ServletListener implements ServletContextListener {
	static public ServletContext sc;
	static public Logger logger = Logger.getLogger(ServletListener.class);

	static public String dburl = "";
	static public String dbuser = "";
	static public String dbpassword = "";
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		logger.info("contextDestroyed()");
	}

	@Override
	public void contextInitialized(ServletContextEvent contextevent) {
		try{
			System.out.println(this.getClass().getName()+"#contextInitialized()");

			sc = contextevent.getServletContext();
			String Propertiesfile = sc.getRealPath("/WEB-INF/wasac.properties");
			String log4jPropertiesfile= sc.getRealPath("/WEB-INF/log4j.properties");

			PropertyConfigurator.configure(log4jPropertiesfile);

			logger.info("Propertiesfile:" + Propertiesfile);
			Properties conf = new Properties();
			FileInputStream fis = new FileInputStream(Propertiesfile);
			try{
				conf.load(fis);
			}finally{
				try{fis.close();}catch(Exception e){;}
			}

			dburl = conf.getProperty("dburl");
			dbuser = conf.getProperty("dbuser");
			dbpassword = conf.getProperty("dbpassword");
			
			logger.info("dburl:" + dburl);
			logger.info("dbuser:" + dbuser);
			logger.info("dbpassword:" + dbpassword);
			
		}catch(Throwable ex) {
			logger.error("contextInitialized()> failure.", ex);
			System.err.println("**** contextInitialized ERROR!!! **** ");
			System.err.println(ex.getMessage());
			ex.printStackTrace();
		}
	}
}
