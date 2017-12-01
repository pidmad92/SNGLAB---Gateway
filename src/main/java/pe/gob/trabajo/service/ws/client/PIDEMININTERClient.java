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
import pe.gob.trabajo.service.ws.bean.ConsultAntecedenteMININTERBean;

public class PIDEMININTERClient
  extends Client
{
  private static final Properties properties = new Properties();
  
  static
  {
    try
    {
      properties.load(PIDEMININTERClient.class.getResourceAsStream("/pe/gob/trabajo/service/ws/config/parameters.properties"));
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
  
  public static ConsultAntecedenteMININTERBean verificarAntecedenteMININTER(String dni)
    throws SOAPException, IOException
  {
    ConsultAntecedenteMININTERBean message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      String usuario = properties.get("ws.mininter.pcm.usuario").toString().trim();
      String clave = properties.get("ws.mininter.pcm.clave").toString().trim();
      String entidadconsulta = properties.get("ws.mininter.pcm.entidadconsulta").toString().trim();
      String dniconsulta = properties.get("ws.mininter.pcm.dniconsulta").toString().trim();
      SOAPMessage soapRequest = buildSoapRequest(usuario, clave, dni, entidadconsulta, dniconsulta);
      
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection(properties.get("ws.mininter.pcm.url").toString().trim(), 5000, 5000));
      
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
  
  private static SOAPMessage buildSoapRequest(String usuario, String clave, String dni, String entidadconsulta, String dniconsulta)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("ws", "http://ws.mi.com/");
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("consultaDniGeneral", "ws");
    SOAPElement xUsuario = soaService.addChildElement("vUsuario");
    xUsuario.addTextNode(usuario);
    SOAPElement xClave = soaService.addChildElement("vClave");
    xClave.addTextNode(clave);
    SOAPElement xDni = soaService.addChildElement("vDNI");
    xDni.addTextNode(dni);
    SOAPElement xEntidadconsulta = soaService.addChildElement("vEntidadconsulta");
    xEntidadconsulta.addTextNode(entidadconsulta);
    SOAPElement xDniconsulta = soaService.addChildElement("vDNIconsulta");
    xDniconsulta.addTextNode(dniconsulta);
    
    soapMessage.saveChanges();
    return soapMessage;
  }
  
  private static ConsultAntecedenteMININTERBean createContent(SOAPMessage soapResponse)
    throws SOAPException
  {
    ConsultAntecedenteMININTERBean message = new ConsultAntecedenteMININTERBean();
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
          message.setCodigo(NodeCode.getTextContent());
        }
      }
    }
    message.setMensaje(getMensajeError(Integer.parseInt(message.getCodigo())));
    return message;
  }
  
  private static String getMensajeError(int num)
  {
    String msj = "";
    switch (num)
    {
    case 0: 
      msj = "El dato consultado no se encuentra registrado con antecedentes policiales vigentes";
      
      break;
    case 1: 
      msj = "El dato consultado se encuentra registrado con antecedentes policiales vigentes";
      
      break;
    case 101: 
      msj = "= Usuario no registrado";
      
      break;
    case 102: 
      msj = "Clave errada";
      
      break;
    case 103: 
      msj = "= DNI incorrecto";
      
      break;
    case 104: 
      msj = "Falta par�metros de ingreso";
      
      break;
    case 105: 
      msj = "Error de servicio";
      
      break;
    case 106: 
      msj = "Falta Entidad de consulta";
      
      break;
    case 107: 
      msj = "Falta DNI de consulta";
      
      break;
    }
    return msj;
  }
}