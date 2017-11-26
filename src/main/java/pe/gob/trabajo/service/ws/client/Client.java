package pe.gob.trabajo.service.ws.client;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLStreamHandler;
import org.apache.log4j.Logger;

/**
 *
 * @author chuangal
 */
public class Client
{
  protected static final Logger log = Logger.getLogger(Client.class.toString());
  
  public static URL getConnection(String url, int timeTimeout, final int timeRead)
    throws MalformedURLException
  {
    URL endpoint = new URL(null, url, new URLStreamHandler()
    {
      protected URLConnection openConnection(URL url)
        throws IOException
      {
        URL clone_url = new URL(url.toString());
        HttpURLConnection clone_urlconnection = (HttpURLConnection)clone_url.openConnection();
        clone_urlconnection.setConnectTimeout(timeTimeout);
        clone_urlconnection.setReadTimeout(timeRead);
        return clone_urlconnection;
      }
    });
    return endpoint;
  }
}
