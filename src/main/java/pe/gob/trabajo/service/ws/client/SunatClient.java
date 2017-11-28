/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;
import org.w3c.dom.Node;
import pe.gob.trabajo.service.ws.bean.EmpresaBean;
import pe.gob.trabajo.service.ws.bean.RepresentanteBean;
/**
 *
 * @author chuangal
 */

public final class SunatClient
  extends Client
{
  private static final String URL_SUNAT = "http://wwss.sunat.gob.pe/jboss-net/services/ConsultaRuc";
  
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
      SOAPMessage soapResponse = soapConnection.call(sOAPMessage, Client.getConnection("http://wwss.sunat.gob.pe/jboss-net/services/ConsultaRuc", 40000, 40000));
      SOAPBody soapBody = soapResponse.getSOAPBody();
      Iterator<?> it = soapBody.getChildElements();
      it.next();
      Node element = (Node)it.next();
      Node lastelement = element.getFirstChild().getNextSibling();
      domicilio = StringfromObject(lastelement);
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
    EmpresaBean empresaDdp = new EmpresaBean();
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage sOAPMessage = getRequestDatosPrincipales(ruc);
      SOAPMessage soapResponse = soapConnection.call(sOAPMessage, Client.getConnection("http://wwss.sunat.gob.pe/jboss-net/services/ConsultaRuc", 40000, 40000));
      SOAPBody soapBody = soapResponse.getSOAPBody();
      
      Iterator<?> it = soapBody.getChildElements();
      it.next();
      it.next();
      Node element3 = (Node)it.next();
      Node result = null;
      
      result = element3.getNextSibling();
      result = result.getFirstChild();
      Node elementtree = result = result.getNextSibling();
      empresaDdp.setCod_dep(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setCod_dist(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setCod_prov(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_ciiu(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_doble(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_estado(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_fecact(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_fecalt(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_fecbaj(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_flag22(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_identi(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_inter1(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_lllttt(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_mclase(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_nombre(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_nomvia(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_nomzon(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_numer1(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_numreg(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_numruc(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_reacti(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_refer1(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_tamano(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_tamano(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_tipvia(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_tipzon(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_tpoemp(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_ubigeo(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDdp_userna(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_ciiu(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_dep(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_dist(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_estado(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_flag22(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_identi(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_numreg(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_prov(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_tamano(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_tipvia(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_tipzon(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setDesc_tpoemp(StringfromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setEsActivo(booleanFromObject(elementtree));
      elementtree = result = result.getNextSibling().getNextSibling();
      empresaDdp.setEsHabido(booleanFromObject(elementtree));
      String domicilioLegal = getDomicilioLegal(ruc);
      empresaDdp.setDomicilioLegal(domicilioLegal);
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
    SOAPPart soapPart = soapMessage.getSOAPPart();
    String uri = "http://wwss.sunat.gob.pe/jboss-net/services/ConsultaRuc";
    String nameSpace = "con";
    SOAPEnvelope envelope = soapPart.getEnvelope();
    envelope.addNamespaceDeclaration("xsd", "http://www.w3.org/2001/XMLSchema");
    envelope.addNamespaceDeclaration("xsi", "http://www.w3.org/2001/XMLSchema-instance");
    envelope.addNamespaceDeclaration(nameSpace, uri);
    SOAPBody soapBody = envelope.getBody();
    SOAPElement soapBodyElem = soapBody.addChildElement("getDatosPrincipales", nameSpace);
    soapBodyElem.setEncodingStyle("http://schemas.xmlsoap.org/soap/encoding/");
    SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("in0", "", "xsd:string");
    soapBodyElem1.addTextNode(ruc);
    
    soapMessage.writeTo(System.out);
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
      SOAPMessage soapResponse = soapConnection.call(sOAPMessage, Client.getConnection("http://wwss.sunat.gob.pe/jboss-net/services/ConsultaRuc", 40000, 40000));
      SOAPBody soapBody = soapResponse.getSOAPBody();
      Iterator<?> it = soapBody.getChildElements();
      Node element = (Node)it.next();
      Node element2 = (Node)it.next();
      Node element3 = (Node)it.next();
      
      RepresentanteBean representanteBean = null;
      int i = 0;
      Node result = null;
      while (it.hasNext())
      {
        element3 = (Node)it.next();
        Node elementtree = result = element3.getFirstChild();
        if (elementtree != null)
        {
          representanteBean = new RepresentanteBean();
          elementtree = result = result.getNextSibling();
          
          representanteBean.setCodCargo(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setCodDepar(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setDescDocIdentidad(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setCargo(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setDocIdentidad(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setFecactualizacion(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setFecNacimiento(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setNombre(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setNrodoc(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setNumruc(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setUsername(StringfromObject(elementtree));
          elementtree = result = result.getNextSibling().getNextSibling();
          representanteBean.setVdesde(StringfromObject(elementtree));
          
          representanteBeans.add(representanteBean);
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
  
  public static SOAPMessage getRequestRepresentanteBeans(String ruc)
    throws SOAPException
  {
    try
    {
      MessageFactory messageFactory = MessageFactory.newInstance();
      SOAPMessage soapMessage = messageFactory.createMessage();
      SOAPPart soapPart = soapMessage.getSOAPPart();
      String uri = "http://wwss.sunat.gob.pe/jboss-net/services/ConsultaRuc";
      String nameSpace = "con";
      SOAPEnvelope envelope = soapPart.getEnvelope();
      envelope.addNamespaceDeclaration("xsd", "http://www.w3.org/2001/XMLSchema");
      envelope.addNamespaceDeclaration("xsi", "http://www.w3.org/2001/XMLSchema-instance");
      envelope.addNamespaceDeclaration(nameSpace, uri);
      SOAPBody soapBody = envelope.getBody();
      SOAPElement soapBodyElem = soapBody.addChildElement("getRepLegales", nameSpace);
      soapBodyElem.setEncodingStyle("http://schemas.xmlsoap.org/soap/encoding/");
      SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("in0", "", "xsd:string");
      soapBodyElem1.addTextNode(ruc);
      soapMessage.writeTo(System.out);
      soapMessage.saveChanges();
      return soapMessage;
    }
    catch (Exception e)
    {
      e.printStackTrace();
      throw new SOAPException();
    }
  }
  
  public static SOAPMessage getRequestDomicilioLegal(String ruc)
    throws SOAPException
  {
    try
    {
      MessageFactory messageFactory = MessageFactory.newInstance();
      SOAPMessage soapMessage = messageFactory.createMessage();
      SOAPPart soapPart = soapMessage.getSOAPPart();
      String uri = "http://wwss.sunat.gob.pe/jboss-net/services/ConsultaRuc";
      String nameSpace = "con";
      SOAPEnvelope envelope = soapPart.getEnvelope();
      envelope.addNamespaceDeclaration("xsd", "http://www.w3.org/2001/XMLSchema");
      envelope.addNamespaceDeclaration("xsi", "http://www.w3.org/2001/XMLSchema-instance");
      envelope.addNamespaceDeclaration(nameSpace, uri);
      SOAPBody soapBody = envelope.getBody();
      SOAPElement soapBodyElem = soapBody.addChildElement("getDomicilioLegal", nameSpace);
      soapBodyElem.setEncodingStyle("http://schemas.xmlsoap.org/soap/encoding/");
      SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("in0", "", "xsd:string");
      soapBodyElem1.addTextNode(ruc);
      soapMessage.writeTo(System.out);
      soapMessage.saveChanges();
      return soapMessage;
    }
    catch (Exception e)
    {
      log.error("error " + e.getMessage(), e);
      throw new SOAPException();
    }
  }
  
  public static String StringfromObject(Node elementtree)
  {
    if (elementtree.hasChildNodes()) {
      return elementtree.getFirstChild().getTextContent();
    }
    return null;
  }
  
  public static boolean booleanFromObject(Node elementtree)
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