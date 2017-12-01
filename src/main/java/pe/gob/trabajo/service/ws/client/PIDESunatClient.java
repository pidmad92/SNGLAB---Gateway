package pe.gob.trabajo.service.ws.client;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
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
import pe.gob.trabajo.service.ws.bean.EmpresaBean;
import pe.gob.trabajo.service.ws.bean.EstablecimiendoBean;
import pe.gob.trabajo.service.ws.bean.RepresentanteBean;

public final class PIDESunatClient
  extends Client
{
  private static final String URL_SUNAT = "http://ws.pide.gob.pe/ConsultaRuc";
  
  public static String getDomicilioLegal(String ruc)
    throws SOAPException, IOException
  {
    String domicilio = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage sOAPMessage = getRequestDomicilioLegal(ruc);
      SOAPMessage soapResponse = soapConnection.call(sOAPMessage, Client.getConnection("http://ws.pide.gob.pe/ConsultaRuc", 10000, 10000));
      SOAPBody soapBody = soapResponse.getSOAPBody();
      Iterator<?> it = soapBody.getChildElements();
      Node element = (Node)it.next();
      if (element.getNodeType() == 1)
      {
        Element elem = (Element)element;
        NodeList returnmsj = elem.getElementsByTagName("getDomicilioLegalReturn");
        if (returnmsj.item(0).getNodeType() == 1)
        {
          Node item = returnmsj.item(0).getFirstChild();
          domicilio = StringfromObject(item);
        }
      }
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
    return domicilio;
  }
  
  public static EmpresaBean getDatosPrincipales(String ruc)
    throws SOAPException, IOException
  {
    EmpresaBean empresaDdp = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage sOAPMessage = getRequestDatosPrincipales(ruc);
      SOAPMessage soapResponse = soapConnection.call(sOAPMessage, Client.getConnection("http://ws.pide.gob.pe/ConsultaRuc", 10000, 10000));
      SOAPBody soapBody = soapResponse.getSOAPBody();
      Iterator<?> it = soapBody.getChildElements();
      Node element = (Node)it.next();
      element = (Node)it.next();
      Node result = null;
      if (element.getNodeType() == 1)
      {
        Element elem = (Element)element;
        NodeList returnmsj = elem.getChildNodes();
        if (returnmsj.getLength() > 0)
        {
          Node node = returnmsj.item(0);
          if (node.getNodeType() == 1)
          {
            empresaDdp = new EmpresaBean();
            result = node;
            Node elementtree = result.getFirstChild();
            empresaDdp.setCod_dep(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setCod_dist(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setCod_prov(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_ciiu(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_doble(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_estado(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_fecact(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_fecalt(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_fecbaj(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_flag22(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_identi(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_inter1(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_lllttt(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_mclase(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_nombre(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_nomvia(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_nomzon(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_numer1(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_numreg(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_numruc(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_reacti(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_refer1(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_tamano(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_tamano(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_tipvia(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_tipzon(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_tpoemp(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_ubigeo(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDdp_userna(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_ciiu(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_dep(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_dist(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_estado(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_flag22(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_identi(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_numreg(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_prov(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_tamano(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_tipvia(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_tipzon(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setDesc_tpoemp(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setEsActivo(booleanFromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            empresaDdp.setEsHabido(booleanFromObject(elementtree));
            String domicilioLegal = getDomicilioLegal(ruc);
            empresaDdp.setDomicilioLegal(domicilioLegal);
          }
        }
      }
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
    return empresaDdp;
  }
  
  public static SOAPMessage getRequestDatosPrincipales(String ruc)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope envelope = soapPart.getEnvelope();
    envelope.addNamespaceDeclaration("xsi", "http://www.w3.org/2001/XMLSchema-instance");
    envelope.addNamespaceDeclaration("xsd", "http://www.w3.org/2001/XMLSchema");
    envelope.addNamespaceDeclaration("soapenv", "http://schemas.xmlsoap.org/soap/envelope/");
    envelope.addNamespaceDeclaration("ser", "http://service.consultaruc.registro.servicio2.sunat.gob.pe");
    envelope.setPrefix("soapenv");
    
    SOAPHeader soaHeader = envelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soapBody = envelope.getBody();
    soapBody.setPrefix("soapenv");
    SOAPElement soapBodyElem = soapBody.addChildElement("getDatosPrincipales", "ser");
    soapBodyElem.setEncodingStyle("http://schemas.xmlsoap.org/soap/encoding/");
    soapBodyElem.setPrefix("soapenv");
    SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("numruc", "", "xsd:string");
    soapBodyElem1.addTextNode(ruc);
    soapMessage.saveChanges();
    return soapMessage;
  }
  
  public static List<RepresentanteBean> getRepresentantesLegales(String ruc)
    throws SOAPException, IOException
  {
    SOAPConnection soapConnection = null;
    List<RepresentanteBean> representanteBeans = new ArrayList();
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage sOAPMessage = getRequestRepresentanteBeans(ruc);
      SOAPMessage soapResponse = soapConnection.call(sOAPMessage, Client.getConnection("http://ws.pide.gob.pe/ConsultaRuc", 10000, 10000));
      SOAPBody soapBody = soapResponse.getSOAPBody();
      Iterator<?> it = soapBody.getChildElements();
      NodeList nodes = soapBody.getElementsByTagName("multiRef");
      if (nodes.getLength() > 0) {
        for (int i = 0; i < nodes.getLength(); i++)
        {
          Node node = nodes.item(i);
          if (node.getNodeType() == 1)
          {
            Node result = node.getFirstChild();
            RepresentanteBean representanteBean = new RepresentanteBean();
            Node elementtree = result.getFirstChild();
            representanteBean.setCodCargo(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setCodDepar(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setDescDocIdentidad(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setCargo(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setDocIdentidad(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setFecactualizacion(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setFecNacimiento(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setNombre(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setNrodoc(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setNumruc(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setUsername(StringfromObject(elementtree));
            result = result.getNextSibling();
            elementtree = result.getFirstChild();
            representanteBean.setVdesde(StringfromObject(elementtree));
            representanteBeans.add(representanteBean);
          }
        }
      }
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
    return representanteBeans;
  }
  
  public static List<EstablecimiendoBean> getEstablecimientosAnexos(String ruc)
    throws SOAPException, IOException
  {
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage sOAPMessage = getRequestEstablecimientosAnexos(ruc);
      
      SOAPMessage soapResponse = soapConnection.call(sOAPMessage, Client.getConnection("http://ws.pide.gob.pe/ConsultaRuc", 10000, 10000));
      SOAPBody soapBody = soapResponse.getSOAPBody();
      Iterator<?> it = soapBody.getChildElements();
      NodeList nodes = soapBody.getElementsByTagName("multiRef");
      List<EstablecimiendoBean> lista = new ArrayList();
      int i;
      if (nodes.getLength() > 0) {
        for (i = 0; i < nodes.getLength(); i++)
        {
          Node node = nodes.item(i);
          if (node.getNodeType() == 1)
          {
            EstablecimiendoBean bean = new EstablecimiendoBean();
            Node result = node.getFirstChild();
            bean.setCod_dep(StringfromObject(result));
            result = result.getNextSibling();
            Node data = result.getFirstChild();
            bean.setCod_dist(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setCod_prov(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setDesc_dep(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setDesc_dist(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setDesc_prov(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setDesc_tipest(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setDesc_tipvia(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setDesc_tipzon(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setDireccion(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_correl(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_fecact(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_inter1(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_licenc(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_nombre(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_nomvia(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            
            bean.setSpr_nomvia(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_nomzon(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_numer1(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_numruc(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_refer1(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_tipest(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_tipvia(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_tipzon(StringfromObject(data));
            result = result.getNextSibling();
            data = result.getFirstChild();
            bean.setSpr_ubigeo(StringfromObject(data));
            if (result.getNextSibling() != null)
            {
              result = result.getNextSibling();
              data = result.getFirstChild();
              bean.setSpr_userna(StringfromObject(data));
            }
            lista.add(bean);
          }
        }
      }
      return lista;
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
  }
  
  private static SOAPMessage getRequestRepresentanteBeans(String ruc)
    throws SOAPException
  {
    try
    {
      MessageFactory messageFactory = MessageFactory.newInstance();
      SOAPMessage soapMessage = messageFactory.createMessage();
      soapMessage.getSOAPHeader().setPrefix("soapenv");
      
      SOAPPart soapPart = soapMessage.getSOAPPart();
      SOAPEnvelope envelope = soapPart.getEnvelope();
      envelope.addNamespaceDeclaration("xsi", "http://www.w3.org/2001/XMLSchema-instance");
      envelope.addNamespaceDeclaration("xsd", "http://www.w3.org/2001/XMLSchema");
      envelope.addNamespaceDeclaration("soapenv", "http://schemas.xmlsoap.org/soap/envelope/");
      envelope.addNamespaceDeclaration("ser", "http://service.consultaruc.registro.servicio2.sunat.gob.pe");
      envelope.setPrefix("soapenv");
      
      SOAPHeader soaHeader = envelope.getHeader();
      soaHeader.setPrefix("soapenv");
      SOAPBody soapBody = envelope.getBody();
      soapBody.setPrefix("soapenv");
      SOAPElement soapBodyElem = soapBody.addChildElement("getRepLegales", "ser");
      soapBodyElem.setEncodingStyle("http://schemas.xmlsoap.org/soap/encoding/");
      soapBodyElem.setPrefix("soapenv");
      SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("numruc", "", "xsd:string");
      soapBodyElem1.addTextNode(ruc);
      soapMessage.saveChanges();
      return soapMessage;
    }
    catch (Exception e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException();
    }
  }
  
  private static SOAPMessage getRequestDomicilioLegal(String ruc)
    throws SOAPException
  {
    try
    {
      MessageFactory messageFactory = MessageFactory.newInstance();
      SOAPMessage soapMessage = messageFactory.createMessage();
      soapMessage.getSOAPHeader().setPrefix("soapenv");
      
      SOAPPart soapPart = soapMessage.getSOAPPart();
      SOAPEnvelope envelope = soapPart.getEnvelope();
      envelope.addNamespaceDeclaration("xsi", "http://www.w3.org/2001/XMLSchema-instance");
      envelope.addNamespaceDeclaration("xsd", "http://www.w3.org/2001/XMLSchema");
      envelope.addNamespaceDeclaration("soapenv", "http://schemas.xmlsoap.org/soap/envelope/");
      envelope.addNamespaceDeclaration("ser", "http://service.consultaruc.registro.servicio2.sunat.gob.pe");
      envelope.setPrefix("soapenv");
      
      SOAPHeader soaHeader = envelope.getHeader();
      soaHeader.setPrefix("soapenv");
      SOAPBody soapBody = envelope.getBody();
      soapBody.setPrefix("soapenv");
      SOAPElement soapBodyElem = soapBody.addChildElement("getDomicilioLegal", "ser");
      soapBodyElem.setEncodingStyle("http://schemas.xmlsoap.org/soap/encoding/");
      soapBodyElem.setPrefix("soapenv");
      SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("numruc", "", "xsd:string");
      soapBodyElem1.addTextNode(ruc);
      soapMessage.saveChanges();
      return soapMessage;
    }
    catch (Exception e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException();
    }
  }
  
  private static SOAPMessage getRequestEstablecimientosAnexos(String ruc)
    throws SOAPException
  {
    try
    {
      MessageFactory messageFactory = MessageFactory.newInstance();
      SOAPMessage soapMessage = messageFactory.createMessage();
      soapMessage.getSOAPHeader().setPrefix("soapenv");
      
      SOAPPart soapPart = soapMessage.getSOAPPart();
      SOAPEnvelope envelope = soapPart.getEnvelope();
      envelope.addNamespaceDeclaration("xsi", "http://www.w3.org/2001/XMLSchema-instance");
      envelope.addNamespaceDeclaration("xsd", "http://www.w3.org/2001/XMLSchema");
      envelope.addNamespaceDeclaration("soapenv", "http://schemas.xmlsoap.org/soap/envelope/");
      envelope.addNamespaceDeclaration("ser", "http://service.consultaruc.registro.servicio2.sunat.gob.pe");
      envelope.setPrefix("soapenv");
      
      SOAPHeader soaHeader = envelope.getHeader();
      soaHeader.setPrefix("soapenv");
      SOAPBody soapBody = envelope.getBody();
      soapBody.setPrefix("soapenv");
      SOAPElement soapBodyElem = soapBody.addChildElement("getEstablecimientosAnexos", "ser");
      soapBodyElem.setEncodingStyle("http://schemas.xmlsoap.org/soap/encoding/");
      soapBodyElem.setPrefix("soapenv");
      SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("numruc", "", "xsd:string");
      soapBodyElem1.addTextNode(ruc);
      soapMessage.saveChanges();
      return soapMessage;
    }
    catch (Exception e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException();
    }
  }
  
  private static String StringfromObject(Node elementtree)
  {
    if (elementtree != null) {
      return elementtree.getTextContent().trim();
    }
    return null;
  }
  
  private static boolean booleanFromObject(Node elementtree)
  {
    if (elementtree.hasChildNodes())
    {
      if (elementtree.getFirstChild().getTextContent().equals("true")) {
        return true;
      }
      return false;
    }
    return false;
  }
}