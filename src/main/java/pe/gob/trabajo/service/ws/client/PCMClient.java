package pe.gob.trabajo.service.ws.client;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Iterator;
import java.util.Properties;
import javax.xml.soap.MessageFactory;
import javax.xml.soap.SOAPBody;
import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;
import javax.xml.soap.SOAPElement;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;
import org.apache.log4j.Logger;
import org.w3c.dom.Node;

public class PCMClient
  extends Client
{
  private static final Properties properties = new Properties();
  
  static
  {
    try
    {
      properties.load(PCMClient.class.getResourceAsStream("/pe/gob/trabajo/service/ws/config/parameters.properties"));
    }
    catch (FileNotFoundException e)
    {
      log.error("load file properties " + e.getMessage(), e);
    }
    catch (IOException e)
    {
      log.error("load file properties " + e.getMessage(), e);
    }
  }
  
  public static String envioMensajeTexto(String nrocel, String text)
    throws SOAPException, IOException
  {
    String sendOK = "FAILT";
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequest(nrocel, text);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection(properties.get("ws.pcm.mensaje.url").toString().trim(), 40000, 40000));
      sendOK = createContent(soapResponse);
    }
    catch (SOAPException e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException(e.getMessage());
    }
    finally
    {
      if (soapConnection != null) {
        soapConnection.close();
      }
    }
    return sendOK;
  }
  
  private static SOAPMessage buildSoapRequest(String nrocell, String text)
    throws SOAPException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.addNamespaceDeclaration("app", "http://appbinomio.com/");
    
    SOAPBody soaBody = soapEnvelope.getBody();
    SOAPElement master = soaBody.addChildElement("envioSMS", "app");
    SOAPElement nodeUser = master.addChildElement("usuario", "app");
    nodeUser.addTextNode(properties.get("ws.pcm.mensaje.user").toString().trim());
    SOAPElement nodePass = master.addChildElement("keyws", "app");
    nodePass.addTextNode(properties.get("ws.pcm.mensaje.pass").toString().trim());
    SOAPElement nroPhones = master.addChildElement("celular", "app");
    nroPhones.addTextNode(nrocell);
    SOAPElement message = master.addChildElement("mensaje", "app");
    message.addTextNode(text);
    soapMessage.saveChanges();
    return soapMessage;
  }
  
  private static String createContent(SOAPMessage soapResponse)
    throws SOAPException
  {
    String msj = "";
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if ((element.getNodeType() == 1) && 
      (element.getNodeName().equals("envioSMSResponse"))) {
      if (element.getTextContent().equals("OK")) {
        msj = element.getTextContent();
      } else {
        throw new SOAPException("Error: Mensaje debe contener como minimo 1 caracter y maximo 160 caracteres");
      }
    }
    return msj;
  }
}