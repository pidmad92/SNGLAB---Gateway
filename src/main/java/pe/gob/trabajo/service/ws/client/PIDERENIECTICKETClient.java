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
import javax.xml.soap.SOAPHeader;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;
import org.apache.log4j.Logger;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import pe.gob.trabajo.service.ws.bean.ConsultRENIECBean;

public class PIDERENIECTICKETClient
  extends Client
{
  private static final Properties properties = new Properties();
  
  static
  {
    try
    {
      properties.load(PIDERENIECTICKETClient.class.getResourceAsStream("/pe/gob/trabajo/service/ws/config/parameters.properties"));
    }
    catch (FileNotFoundException e)
    {
      log.error("error " + e.getMessage(), e);
    }
    catch (IOException e)
    {
      log.error("error " + e.getMessage(), e);
    }
  }
  
  public static ConsultRENIECBean ticketreniec()
    throws SOAPException, IOException
  {
    ConsultRENIECBean message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      String usuario = properties.get("ws.reniec.pcm.user").toString().trim();
      String clave = properties.get("ws.reniec.pcm.pass").toString().trim();
      SOAPMessage soapRequest = buildSoapRequest(usuario, clave);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection(properties.get("ws.reniec.pcm.urlticket").toString().trim(), 5000, 5000));
      message = createContent(soapResponse);
    }
    catch (SOAPException e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException(e.getMessage());
    }
    catch (IOException e)
    {
      log.error("error " + e.getMessage(), e);
      throw new IOException(e.getMessage());
    }
    finally
    {
      if (soapConnection != null) {
        soapConnection.close();
      }
    }
    return message;
  }
  
  private static SOAPMessage buildSoapRequest(String usuario, String clave)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("ws", "http://WSAuthentication_wsdl.wsauth.reniec.gob.pe/");
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("getTicket", "ws");
    SOAPElement xUsuario = soaService.addChildElement("user");
    xUsuario.addTextNode(usuario);
    SOAPElement xClave = soaService.addChildElement("password");
    xClave.addTextNode(clave);
    soapMessage.saveChanges();
    return soapMessage;
  }
  
  private static ConsultRENIECBean createContent(SOAPMessage soapResponse)
    throws SOAPException
  {
    ConsultRENIECBean message = new ConsultRENIECBean();
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList xCodigoRespuesta = elem.getElementsByTagName("return");
      if (xCodigoRespuesta.item(0).getNodeType() == 1)
      {
        Node node = xCodigoRespuesta.item(0);
        if (node.getNodeType() == 1)
        {
          Node NodeCode = node.getFirstChild();
          message.setTicketreniec(NodeCode.getTextContent());
        }
      }
    }
    return message;
  }
}
