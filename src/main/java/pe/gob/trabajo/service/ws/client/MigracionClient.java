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
import pe.gob.trabajo.service.ws.bean.CarnetExtBean;

public class MigracionClient
  extends Client
{
  private static final Properties properties = new Properties();
  
  static
  {
    try
    {
      properties.load(MigracionClient.class.getResourceAsStream("/pe/gob/trabajo/service/ws/config/parameters.properties"));
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
  
  public static CarnetExtBean obtenerInformacion(String tipodoc, String numero)
    throws SOAPException, IOException
  {
    CarnetExtBean message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequest(tipodoc, numero);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection(properties.get("ws.migracion.pcm.url").toString().trim(), 5000, 5000));
      
      message = createContent(soapResponse);
    }
    catch (SOAPException e)
    {
      log.error("error " + e.getMessage(), e);
      message = null;
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
  
  private static SOAPMessage buildSoapRequest(String tipodoc, String numero)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("ws", properties.get("ws.migracion.pcm.xmlns").toString().trim());
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("consultarDocumento", "ws");
    SOAPElement solicitud = soaService.addChildElement("solicitud");
    
    SOAPElement strCodInstitucion = solicitud.addChildElement("strCodInstitucion");
    strCodInstitucion.setTextContent(properties.get("ws.migracion.pcm.strCodInstitucion").toString().trim());
    SOAPElement strMac = solicitud.addChildElement("strMac");
    strMac.setTextContent(properties.get("ws.migracion.pcm.strMac").toString().trim());
    SOAPElement strNroIp = solicitud.addChildElement("strNroIp");
    strNroIp.setTextContent(properties.get("ws.migracion.pcm.strNroIp").toString().trim());
    
    SOAPElement xtipodoc = solicitud.addChildElement("strNumDocumento");
    xtipodoc.setTextContent(numero);
    SOAPElement xnumero = solicitud.addChildElement("strTipoDocumento");
    xnumero.setTextContent(tipodoc);
    soapMessage.saveChanges();
    
    return soapMessage;
  }
  
  private static CarnetExtBean createContent(SOAPMessage soapResponse)
    throws SOAPException
  {
    CarnetExtBean message = new CarnetExtBean();
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList xMensajeRespuesta = elem.getElementsByTagName("return");
      if (xMensajeRespuesta.item(0).getNodeType() == 1)
      {
        Node node = xMensajeRespuesta.item(0);
        if (node.getNodeType() == 1)
        {
          Node result = node.getFirstChild();
          message.setStrCalidadMigratoria(StringfromObject(result));
          result = result.getNextSibling();
          Node strNombres = result.getFirstChild();
          message.setStrNombres(StringfromObject(strNombres));
          result = result.getNextSibling();
          Node strNumRespuesta = result.getFirstChild();
          message.setStrNumRespuesta(StringfromObject(strNumRespuesta));
          message.setMensaje(getMensajeError(message.getStrNumRespuesta()));
          result = result.getNextSibling();
          Node strPrimerApellido = result.getFirstChild();
          message.setStrPrimerApellido(StringfromObject(strPrimerApellido));
          result = result.getNextSibling();
          Node strSegundoApellido = result.getFirstChild();
          message.setStrSegundoApellido(StringfromObject(strSegundoApellido));
        }
      }
    }
    return message;
  }
  
  private static String getMensajeError(String num)
  {
    String msj = "";
    if ((num != null) && 
      (!num.trim().equals(""))) {
      if (num.equals("00001")) {
        msj = "Sin error, no se encontraron datos del Carnet de Extranjer�a o el Carnet de Extranjer�a no est� vigente";
      } else if (num.equals("00002")) {
        msj = "Con error, sin conexi�n";
      } else if (num.equals("00003")) {
        msj = "Con error, transacci�n no exitosa";
      } else if (num.equals("00004")) {
        msj = "Con error, no est� permitido el uso de valores nulos o vac�os en la consulta";
      } else if (num.equals("00005")) {
        msj = "Con error, no est� permitido realizar la consulta con los valores de IP, MAC ADDRES y CODIGO DE INSTITUCION ingresados";
      } else if (num.equals("00006")) {
        msj = "Con error, el tipo de documento ingresado no es el correcto";
      } else if (num.equals("00007")) {
        msj = "Con error, la informaci�n del documento consultado no puede ser mostrada porque pertenece a un menor de edad";
      }
    }
    return msj;
  }
  
  private static String StringfromObject(Node elementtree)
  {
    if (elementtree != null) {
      return elementtree.getTextContent().trim();
    }
    return null;
  }
}