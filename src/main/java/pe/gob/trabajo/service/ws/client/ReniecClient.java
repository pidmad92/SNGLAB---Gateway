/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pe.gob.trabajo.service.ws.client;


import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Iterator;
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

public final class ReniecClient
  extends Client
{
  private static final String URL_RENIEC = "http://ws.reniec.gob.pe/SRELService/SRELServiceService";
  
  public static String getSession(String usuario, String codigo)
    throws SOAPException, IOException
  {
    SOAPConnection soapConnection = null;
    String session = "";
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapResponse = soapConnection.call(getRequestGetSession(usuario, codigo), Client.getConnection("http://ws.reniec.gob.pe/SRELService/SRELServiceService", 10000, 10000));
      SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
      SOAPBody soapBody = env.getBody();
      Node resultOuter = ((Node)soapBody.getChildElements().next()).getFirstChild();
      Node result = resultOuter.getFirstChild();
      session = result.getTextContent();
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
    return session;
  }
  
  public static PersonaBean getConsolidada(String dni)
    throws SOAPException, IOException
  {
    String usuario = "MINTRAWS";
    String codigo = "MTIzMjYxMTc=";
    String session = getSession(usuario, codigo);
    return getConsolidada(session, usuario, "5", dni);
  }
  
  public static PersonaBean getConsolidada(String session, String usuario, String codigo, String dni)
    throws SOAPException
  {
    PersonaBean persona = new PersonaBean();
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapResponse = soapConnection.call(getRequestGetConsolidada(session, usuario, codigo, dni), Client.getConnection("http://ws.reniec.gob.pe/SRELService/SRELServiceService", 20000, 20000));
      SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
      SOAPBody soapBody = env.getBody();
      Iterator<?> it = soapBody.getChildElements();
      
      Node element = (Node)it.next();
      
      Node result = element.getFirstChild();
      Node content = result.getFirstChild();
      if (content.getTextContent().equals("0000"))
      {
        persona.setCodigo(content.getTextContent());
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setApellidoPaterno(content.getTextContent());
        }
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setApellidoMaterno(content.getTextContent());
        }
        result = result.getNextSibling();
        content = result.getFirstChild();
        
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setNombres(content.getTextContent());
        }
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setCoddep(content.getTextContent());
        }
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setCodpro(content.getTextContent());
        }
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setCoddist(content.getTextContent());
        }
        result = result.getNextSibling();
        content = result.getFirstChild();
        result = result.getNextSibling();
        content = result.getFirstChild();
        result = result.getNextSibling();
        content = result.getFirstChild();
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setDireccion(content.getTextContent());
        }
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setEstadoCivil(content.getTextContent());
        }
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setGenero(content.getTextContent());
        }
        result = result.getNextSibling();
        content = result.getFirstChild();
        result = result.getNextSibling();
        content = result.getFirstChild();
        result = result.getNextSibling();
        content = result.getFirstChild();
        result = result.getNextSibling();
        content = result.getFirstChild();
        result = result.getNextSibling();
        content = result.getFirstChild();
        result = result.getNextSibling();
        content = result.getFirstChild();
        
        result = result.getNextSibling();
        content = result.getFirstChild();
        if (content != null) {
          persona.setFechaNacimiento(content.getTextContent());
        }
      }
      else
      {
        persona.setCodigo("-1");
      }
    }
    catch (SOAPException e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException(e.getMessage());
    }
    catch (MalformedURLException ex)
    {
      log.error("error " + ex.getMessage(), ex);
      throw new SOAPException(ex.getMessage());
    }
    finally
    {
      if (soapConnection != null) {
        soapConnection.close();
      }
    }
    return persona;
  }
  
  public static SOAPMessage getRequestGetSession(String usuario, String codigo)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    SOAPPart soapPart = soapMessage.getSOAPPart();
    String uri = "http://rel.reniec.org/";
    String nameSpace = "rel";
    
    SOAPEnvelope envelope = soapPart.getEnvelope();
    envelope.addNamespaceDeclaration(nameSpace, uri);
    SOAPBody soapBody = envelope.getBody();
    SOAPElement soapBodyElem = soapBody.addChildElement("getSession", nameSpace);
    SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("usuario");
    soapBodyElem1.addTextNode(usuario);
    SOAPElement soapBodyElem2 = soapBodyElem.addChildElement("codigo");
    soapBodyElem2.addTextNode(codigo);
    
    soapMessage.saveChanges();
    
    return soapMessage;
  }
  
  public static SOAPMessage getRequestGetConsolidada(String session, String usuario, String codigo, String dni)
    throws SOAPException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    SOAPPart soapPart = soapMessage.getSOAPPart();
    String uri = "http://rel.reniec.org/";
    String nameSpace = "rel";
    
    SOAPEnvelope envelope = soapPart.getEnvelope();
    envelope.addNamespaceDeclaration(nameSpace, uri);
    SOAPBody soapBody = envelope.getBody();
    SOAPElement soapBodyElem = soapBody.addChildElement("getRegIdentConsolidada2", nameSpace);
    SOAPElement soapBodyElem0 = soapBodyElem.addChildElement("sesion");
    soapBodyElem0.addTextNode(session);
    SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("usuario");
    soapBodyElem1.addTextNode(usuario);
    SOAPElement soapBodyElem2 = soapBodyElem.addChildElement("codTxEmp");
    soapBodyElem2.addTextNode(codigo);
    SOAPElement soapBodyElem3 = soapBodyElem.addChildElement("dniUserEmp");
    soapBodyElem3.addTextNode("10713307");
    SOAPElement soapBodyElem4 = soapBodyElem.addChildElement("dni");
    soapBodyElem4.addTextNode(dni);
    
    soapMessage.saveChanges();
    
    return soapMessage;
  }
}