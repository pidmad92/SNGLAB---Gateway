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
import pe.gob.trabajo.service.ws.bean.ConsultAntecedenteINPEBean;

public class PIDEINPEClient
  extends Client
{
  private static final Properties properties = new Properties();
  
  static
  {
    try
    {
      properties.load(PIDEINPEClient.class.getResourceAsStream("/pe/gob/trabajo/service/ws/config/parameters.properties"));
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
  
  public static ConsultAntecedenteINPEBean verificarAntecedenteINPE(String apepaterno, String apematerno, String nombres)
    throws SOAPException, IOException
  {
    ConsultAntecedenteINPEBean message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequest(apepaterno, apematerno, nombres);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection(properties.get("ws.inpe.pcm.url").toString().trim(), 5000, 5000));
      message = createContent(soapResponse);
    }
    catch (SOAPException e)
    {
      message = null;
      log.error("error " + e.getMessage(), e);
      throw new SOAPException(e.getMessage());
    }
    finally
    {
      if (soapConnection != null) {
        soapConnection.close();
      }
    }
    return message;
  }
  
  private static SOAPMessage buildSoapRequest(String apepaterno, String apematerno, String nombres)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("ws", "http://endpoint.wsantjudiciales.inpe.gob.pe");
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("getAntecedenteJudicial", "ws");
    SOAPElement eapepat = soaService.addChildElement("apepat");
    eapepat.addTextNode(apepaterno);
    SOAPElement eapemat = soaService.addChildElement("apemat");
    eapemat.addTextNode(apematerno);
    SOAPElement enombres = soaService.addChildElement("nombres");
    enombres.addTextNode(nombres);
    soapMessage.saveChanges();
    return soapMessage;
  }
  
  private static ConsultAntecedenteINPEBean createContent(SOAPMessage soapResponse)
    throws SOAPException
  {
    ConsultAntecedenteINPEBean message = new ConsultAntecedenteINPEBean();
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList xMensajeRespuesta = elem.getElementsByTagName("getAntecedenteJudicialReturn");
      if (xMensajeRespuesta.item(0).getNodeType() == 1)
      {
        Node node = xMensajeRespuesta.item(0);
        if (node.getNodeType() == 1)
        {
          Node NodeCode = node.getFirstChild();
          message.setMensaje(NodeCode.getTextContent());
        }
      }
    }
    return message;
  }
}