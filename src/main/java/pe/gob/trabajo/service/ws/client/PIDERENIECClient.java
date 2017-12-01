package pe.gob.trabajo.service.ws.client;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Iterator;
import java.util.Properties;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
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
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import pe.gob.trabajo.service.ws.bean.ConsultRENIECBean;

public class PIDERENIECClient
  extends Client
{
  private static final Properties properties = new Properties();
  
  static
  {
    try
    {
      properties.load(PIDERENIECClient.class.getResourceAsStream("/pe/gob/trabajo/service/ws/config/parameters.properties"));
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
  
  public static ConsultRENIECBean verificarRENIEC(String dni)
    throws SOAPException, IOException
  {
    ConsultRENIECBean message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequest(dni);
      soapRequest.writeTo(System.out);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection(properties.get("ws.reniec.pcm.url").toString().trim(), 5000, 5000));
      
      message = createContent(soapResponse);
    }
    catch (SOAPException e)
    {
      log.error("error " + e.getMessage(), e);
      message = new ConsultRENIECBean();
      message.setError(65036);
      message.setMensajeerror(getMensajeError(65036));
      log.error("error " + e.getMessage(), e);
    }
    finally
    {
      if (soapConnection != null) {
        soapConnection.close();
      }
    }
    return message;
  }
  
  private static SOAPMessage buildSoapRequest(String dni)
    throws SOAPException, IOException
  {
    ConsultRENIECBean beanreniec = PIDERENIECTICKETClient.ticketreniec();
    System.out.println("TOKEN : " + beanreniec.getTicketreniec());
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("ws", "http://WSDataVerification_wsdl.wsauth.reniec.gob.pe/");
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("getDatavalidate", "ws");
    SOAPElement xmlDocumento = soaService.addChildElement("xmlDocumento");
    String coduser = properties.get("ws.reniec.pcm.coduser").toString().trim();
    String codtransac = properties.get("ws.reniec.pcm.codtransac").toString().trim();
    String codentidad = properties.get("ws.reniec.pcm.codentidad").toString().trim();
    String sesion = beanreniec.getTicketreniec();
    String consulta = "<![CDATA[<IN> <CONSULTA> <DNI>" + dni + "</DNI> " + "</CONSULTA> " + "<IDENTIFICACION> " + "<CODUSER>" + coduser + "</CODUSER> " + "<CODTRANSAC>" + codtransac + "</CODTRANSAC> " + "<CODENTIDAD>" + codentidad + "</CODENTIDAD>" + "<SESION>" + sesion + "</SESION>" + "</IDENTIFICACION>" + "</IN>]]>";
    
    xmlDocumento.addTextNode(consulta);
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
      if ((xCodigoRespuesta.getLength() > 0) && 
        (xCodigoRespuesta.item(0).getNodeType() == 1))
      {
        Node node = xCodigoRespuesta.item(0);
        if (node.getNodeType() == 1)
        {
          int error = 1;
          try
          {
            error = Integer.parseInt(node.getTextContent());
            message.setError(error);
            if (error < 0) {
              message.setMensajeerror(getMensajeError(error));
            }
          }
          catch (DOMException e)
          {
            log.error("error " + e.getMessage(), e);
          }
          catch (NumberFormatException e)
          {
            log.error("error " + e.getMessage(), e);
          }
          if (error > 0) {
            try
            {
              processXML(node.getTextContent(), message);
            }
            catch (DOMException e)
            {
              log.error("error " + e.getMessage(), e);
              message.setError(-6);
              message.setMensajeerror(getMensajeError(message.getError()));
            }
          }
        }
      }
    }
    return message;
  }
  
  public static void processXML(String cad, ConsultRENIECBean message)
    throws SOAPException
  {
    try
    {
      DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
      
      DocumentBuilder builder = factory.newDocumentBuilder();
      StringBuilder xmlStringBuilder = new StringBuilder();
      xmlStringBuilder.append(cad);
      ByteArrayInputStream input = new ByteArrayInputStream(xmlStringBuilder.toString().getBytes("ISO-8859-1"));
      Document doc = builder.parse(input);
      NodeList xNombres = doc.getElementsByTagName("NOMBRES");
      if (xNombres.item(0).getNodeType() == 1)
      {
        Node node = xNombres.item(0);
        if (node.getNodeType() == 1)
        {
          Node NodeCode = node.getFirstChild();
          message.setNombres(NodeCode.getTextContent().trim());
        }
      }
      NodeList xappat = doc.getElementsByTagName("APPAT");
      if (xappat.item(0).getNodeType() == 1)
      {
        Node node = xappat.item(0);
        if (node.getNodeType() == 1)
        {
          Node NodeCode = node.getFirstChild();
          message.setApepater(NodeCode.getTextContent().trim());
        }
      }
      NodeList xapmat = doc.getElementsByTagName("APMAT");
      if (xapmat.item(0).getNodeType() == 1)
      {
        Node node = xapmat.item(0);
        if (node.getNodeType() == 1)
        {
          Node NodeCode = node.getFirstChild();
          message.setApemater(NodeCode.getTextContent().trim());
        }
      }
      NodeList xfecnac = doc.getElementsByTagName("FENAC");
      if (xfecnac.item(0).getNodeType() == 1)
      {
        Node node = xfecnac.item(0);
        if (node.getNodeType() == 1)
        {
          Node NodeCode = node.getFirstChild();
          message.setFecnacimiento(NodeCode.getTextContent().trim());
        }
      }
      NodeList xsexo = doc.getElementsByTagName("SEXO");
      if (xsexo.item(0).getNodeType() == 1)
      {
        Node node = xsexo.item(0);
        if (node.getNodeType() == 1)
        {
          Node NodeCode = node.getFirstChild();
          message.setGenero(NodeCode.getTextContent().trim());
        }
      }
    }
    catch (DOMException e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException(e.getMessage());
    }
    catch (ParserConfigurationException e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException(e.getMessage());
    }
    catch (SAXException e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException(e.getMessage());
    }
    catch (IOException e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException(e.getMessage());
    }
  }
  
  private static String getMensajeError(int num)
  {
    String msj = "";
    switch (num)
    {
    case -1: 
      msj = "Error en el Servidor";
      
      break;
    case -2: 
      msj = "Error en el Servidor";
      
      break;
    case -3: 
      msj = "Excedi�  el  m�ximo  nro  de  consultas  por minuto";
      
      break;
    case -4: 
      msj = "C�digo de operaci�n no existe";
      
      break;
    case -5: 
      msj = "Usuario Invalido";
      
      break;
    case -6: 
      msj = "No se puede acceder  al servicio en esta fecha";
      
      break;
    case -7: 
      msj = "Formato de DNI no valido";
      
      break;
    case -8: 
      msj = "No existe DNI en base de datos";
      
      break;
    case -9: 
      msj = "Formato de DNI no valido";
      
      break;
    case -10: 
      msj = "Formato de DNI no valido";
      
      break;
    case -500: 
      msj = "No esta disponible el servicio de la PCM";
      
      break;
    }
    return msj;
  }
}