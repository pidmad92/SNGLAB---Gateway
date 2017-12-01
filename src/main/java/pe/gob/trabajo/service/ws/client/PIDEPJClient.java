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
import pe.gob.trabajo.service.ws.bean.ConsultAntecedentePJBean;

public class PIDEPJClient
  extends Client
{
  private static final Properties properties = new Properties();
  
  static
  {
    try
    {
      properties.load(PIDEPJClient.class.getResourceAsStream("/pe/gob/trabajo/service/ws/config/parameters.properties"));
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
  
  public static ConsultAntecedentePJBean verificarAntecedentePJ(String dni, String apaterno, String amaterno, String nombre1, String nombre2, String nombre3)
    throws SOAPException, IOException
  {
    ConsultAntecedentePJBean message = null;
    SOAPConnection soapConnection = null;
    
    SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
    soapConnection = soapConnectionFactory.createConnection();
    SOAPMessage soapRequest = buildSoapRequest(dni, apaterno, amaterno, nombre1, nombre2, nombre3);
    SOAPMessage soapResponse = soapConnection.call(soapRequest, "http://ws3.pide.gob.pe/services/PJAntecedentesPenales");
    
    soapResponse.writeTo(System.out);
    
    return message;
  }
  
  private static SOAPMessage buildSoapRequest(String dni, String apaterno, String amaterno, String nombre1, String nombre2, String nombre3)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("ws", "http://ws.verificacionAntecedentesPenalesWS.pj.gob.pe");
    
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("verificarAntecedentesPenales", "ws");
    SOAPElement xApellidoPaterno = soaService.addChildElement("xApellidoPaterno");
    xApellidoPaterno.addTextNode(apaterno);
    SOAPElement xApellidoMaterno = soaService.addChildElement("xApellidoMaterno");
    if (amaterno == null) {
      amaterno = "";
    }
    xApellidoMaterno.addTextNode(amaterno);
    SOAPElement xNombre1 = soaService.addChildElement("xNombre1");
    xNombre1.addTextNode(nombre1);
    SOAPElement xNombre2 = soaService.addChildElement("xNombre2");
    if (nombre2 == null) {
      nombre2 = "";
    }
    xNombre2.addTextNode(nombre2);
    SOAPElement xNombre3 = soaService.addChildElement("xNombre3");
    if (nombre3 == null) {
      nombre3 = "";
    }
    xNombre3.addTextNode(nombre3);
    SOAPElement xDni = soaService.addChildElement("xDni");
    xDni.addTextNode(dni);
    SOAPElement xMotivoConsulta = soaService.addChildElement("xMotivoConsulta");
    xMotivoConsulta.addTextNode(properties.get("ws.pj.requestAuditoria.motivo").toString().trim());
    SOAPElement xProcesoEntidadConsultante = soaService.addChildElement("xProcesoEntidadConsultante");
    xProcesoEntidadConsultante.addTextNode(properties.get("ws.pj.requestAuditoria.rucMintra").toString().trim());
    SOAPElement xRucEntidadConsultante = soaService.addChildElement("xRucEntidadConsultante");
    xRucEntidadConsultante.addTextNode(properties.get("ws.pj.requestAuditoria.rucMintra").toString().trim());
    SOAPElement xDniPersonaConsultante = soaService.addChildElement("xDniPersonaConsultante");
    xDniPersonaConsultante.addTextNode(properties.get("ws.pj.requestAuditoria.dniMintra").toString().trim());
    
    SOAPElement xAudNombrePC = soaService.addChildElement("xAudNombrePC");
    xAudNombrePC.addTextNode(properties.get("ws.pj.requestAuditoria.pcName").toString().trim());
    SOAPElement xAudIP = soaService.addChildElement("xAudIP");
    xAudIP.addTextNode(properties.get("ws.pj.requestAuditoria.ipPc").toString().trim());
    SOAPElement xAudNombreUsuario = soaService.addChildElement("xAudNombreUsuario");
    xAudNombreUsuario.addTextNode(properties.get("ws.pj.requestAuditoria.usuarioSis").toString().trim());
    SOAPElement xAudDireccionMAC = soaService.addChildElement("xAudDireccionMAC");
    xAudDireccionMAC.addTextNode(properties.get("ws.pj.requestAuditoria.macAddressPc").toString().trim());
    soapMessage.saveChanges();
    return soapMessage;
  }
  
  private static ConsultAntecedentePJBean createContent(SOAPMessage soapResponse)
    throws SOAPException
  {
    ConsultAntecedentePJBean message = new ConsultAntecedentePJBean();
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList xCodigoRespuesta = elem.getElementsByTagName("xCodigoRespuesta");
      if (xCodigoRespuesta.item(0).getNodeType() == 1)
      {
        Node node = xCodigoRespuesta.item(0);
        if (node.getNodeType() == 1)
        {
          Node NodeCode = node.getFirstChild();
          message.setCodigo(NodeCode.getTextContent());
        }
      }
      NodeList xMensajeRespuesta = elem.getElementsByTagName("xMensajeRespuesta");
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