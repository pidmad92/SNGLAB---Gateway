package pe.gob.trabajo.service.ws.client;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import pe.gob.trabajo.service.ws.bean.AntecedenteBean;

public class PJClient
  extends Client
{
  private static final Properties properties = new Properties();
  
  static
  {
    try
    {
      properties.load(PJClient.class.getResourceAsStream("/pe/gob/trabajo/service/ws/config/parameters.properties"));
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
  
  public static AntecedenteBean verificarAntecedentePJ(String tipodoc, String nrodoc, String codverificacion)
    throws SOAPException, IOException
  {
    AntecedenteBean message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequest(tipodoc, nrodoc, codverificacion);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection(properties.get("ws.pj.security.url").toString().trim(), 5000, 5000));
      message = createContent(soapResponse);
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
    return message;
  }
  
  private static SOAPMessage buildSoapRequest(String tipodoc, String nrodoc, String codverificacion)
    throws SOAPException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.addNamespaceDeclaration("wsse", "http://ws.antecedentesWS.pj.gob.pe");
    
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    SOAPElement soapElement = soaHeader.addChildElement("Security", "wsse");
    SOAPElement soaUsernameToken = soapElement.addChildElement("UsernameToken", "wsse");
    SOAPElement soaUser = soaUsernameToken.addChildElement("Username", "wsse");
    
    soaUser.addTextNode(properties.get("ws.pj.security.user").toString().trim());
    SOAPElement soaPass = soaUsernameToken.addChildElement("Password", "wsse");
    
    soaPass.addTextNode(properties.get("ws.pj.security.password").toString().trim());
    
    SOAPBody soaBody = soapEnvelope.getBody();
    SOAPElement soaService = soaBody.addChildElement("consultarAntecedentesPenales", "wsse");
    
    SOAPElement requestSeguridad = soaService.addChildElement("requestSeguridad");
    SOAPElement codigoCliente = requestSeguridad.addChildElement("codigoCliente");
    codigoCliente.addTextNode(properties.get("ws.pj.requestSeguridad.codigoCliente").toString().trim());
    SOAPElement codigoAplicativo = requestSeguridad.addChildElement("codigoAplicativo");
    codigoAplicativo.addTextNode(properties.get("ws.pj.requestSeguridad.codigoAplicativo").toString().trim());
    SOAPElement codigoRol = requestSeguridad.addChildElement("codigoRol");
    codigoRol.addTextNode(properties.get("ws.pj.requestSeguridad.codigoRol").toString().trim());
    
    SOAPElement requestAuditoria = soaService.addChildElement("requestAuditoria");
    SOAPElement ipPc = requestAuditoria.addChildElement("ipPc");
    ipPc.addTextNode(properties.get("ws.pj.requestAuditoria.ipPc").toString().trim());
    SOAPElement macAddressPc = requestAuditoria.addChildElement("macAddressPc");
    macAddressPc.addTextNode(properties.get("ws.pj.requestAuditoria.macAddressPc").toString().trim());
    SOAPElement pcName = requestAuditoria.addChildElement("pcName");
    pcName.addTextNode(properties.get("ws.pj.requestAuditoria.pcName").toString().trim());
    SOAPElement usuarioSis = requestAuditoria.addChildElement("usuarioSis");
    usuarioSis.addTextNode(properties.get("ws.pj.requestAuditoria.usuarioSis").toString().trim());
    SOAPElement usuarioRed = requestAuditoria.addChildElement("usuarioRed");
    usuarioRed.addTextNode(properties.get("ws.pj.requestAuditoria.usuarioRed").toString().trim());
    SOAPElement nombreSo = requestAuditoria.addChildElement("nombreSo");
    nombreSo.addTextNode(properties.get("ws.pj.requestAuditoria.nombreSo").toString().trim());
    
    SOAPElement requestConsultarAntecedentesPenales = soaService.addChildElement("requestConsultarAntecedentesPenales");
    SOAPElement tipoDocumento = requestConsultarAntecedentesPenales.addChildElement("tipoDocumento");
    tipoDocumento.addTextNode(tipodoc);
    SOAPElement nroDocumento = requestConsultarAntecedentesPenales.addChildElement("nroDocumento");
    nroDocumento.addTextNode(nrodoc);
    SOAPElement pkAlternativo = requestConsultarAntecedentesPenales.addChildElement("pkAlternativo");
    pkAlternativo.addTextNode(codverificacion);
    soapMessage.saveChanges();
    return soapMessage;
  }
  
  private static AntecedenteBean createContent(SOAPMessage soapResponse)
    throws SOAPException
  {
    AntecedenteBean message = new AntecedenteBean();
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList lista = elem.getElementsByTagName("responseMensaje");
      if (lista.getLength() > 0)
      {
        if (lista.item(0).getNodeType() == 1)
        {
          Node messages = lista.item(0);
          if (messages.getNodeType() == 1)
          {
            Node NodeCode = messages.getFirstChild();
            message.setCode(NodeCode.getTextContent());
            Node NodeMessage = NodeCode.getNextSibling();
            message.setMessage(NodeMessage.getTextContent());
          }
        }
        NodeList data = elem.getElementsByTagName("responseConsultarAntecedentesPenales");
        if ((data.getLength() > 0) && 
          (data.item(0).getNodeType() == 1))
        {
          Node node = data.item(0);
          
          SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-d");
          Node nodeFecha = node.getFirstChild();
          try
          {
            Date date = formatter.parse(nodeFecha.getTextContent());
            message.setFechaCaducidad(date);
          }
          catch (ParseException ex) {}
          Node nodeNombre = nodeFecha.getNextSibling();
          message.setNombres(nodeNombre.getTextContent());
          Node apellidoPaterno = nodeNombre.getNextSibling();
          message.setApellidoPaterno(apellidoPaterno.getTextContent());
          Node apellidoMaterno = apellidoPaterno.getNextSibling();
          message.setApellidoMaterno(apellidoMaterno.getTextContent());
          Node motivoSolicitud = apellidoMaterno.getNextSibling();
          message.setMotivoSolicitud(motivoSolicitud.getTextContent());
          Node nroCertificado = motivoSolicitud.getNextSibling();
          message.setNroCertificado(nroCertificado.getTextContent());
          Node tieneAntecedentes = nroCertificado.getNextSibling();
          message.setTieneAntecedentes(tieneAntecedentes.getTextContent());
        }
      }
      else
      {
        throw new SOAPException("Codigo :E3002,Mensaje : Usuario no se pudo autenticar. Verifique que el usuario y/o password sean correctos. Si el usuario y contrase�a son correctos, verifique el codigo de cliente y/o codigo del aplicativo");
      }
    }
    return message;
  }
}