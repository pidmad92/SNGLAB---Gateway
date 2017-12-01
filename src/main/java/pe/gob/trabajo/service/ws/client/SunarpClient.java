package pe.gob.trabajo.service.ws.client;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Set;
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
import pe.gob.trabajo.service.ws.bean.AsientoBean;
import pe.gob.trabajo.service.ws.bean.AsientoListBean;
import pe.gob.trabajo.service.ws.bean.AsientoPaginaBean;
import pe.gob.trabajo.service.ws.bean.EstadoVigenciaBean;
import pe.gob.trabajo.service.ws.bean.TitularidadBean;
import pe.gob.trabajo.service.ws.bean.VehiculoBean;

public class SunarpClient
  extends Client
{
  private static final String URL_SUNAT = "http://ws.pide.gob.pe/PIDEWSService";
  private static final Properties properties = new Properties();
  
  static
  {
    try
    {
      properties.load(SunarpClient.class.getResourceAsStream("/pe/gob/trabajo/service/ws/config/parameters.properties"));
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
  
  public static List<TitularidadBean> buscarTitularidad(String tipoParticipante, String apellidoPaterno, String apellidoMaterno, String nombres, String razonSocial)
    throws SOAPException, IOException
  {
    List<TitularidadBean> message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequest(tipoParticipante, apellidoPaterno, apellidoMaterno, nombres, razonSocial);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection("http://ws.pide.gob.pe/PIDEWSService", 20000, 20000));
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
  
  public static AsientoBean listarAsientos(String zona, String oficina, String partida, String registro)
    throws SOAPException, IOException
  {
    AsientoBean message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequestListarAsientos(zona, oficina, partida, registro);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection("http://ws.pide.gob.pe/PIDEWSService", 20000, 20000));
      message = createContentListarAsientos(soapResponse);
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
  
  public static String verAsiento(String transaccion, String idImg, String tipo, String nroTotalPag, String nroPagRef, String pagina)
    throws SOAPException, IOException
  {
    String message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequestVerAsiento(transaccion, idImg, tipo, nroTotalPag, nroPagRef, pagina);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection("http://ws.pide.gob.pe/PIDEWSService", 20000, 20000));
      message = createContentVerAsiento(soapResponse);
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
  
  public static VehiculoBean verVehiculo(String zona, String oficina, String placa)
    throws SOAPException, IOException
  {
    VehiculoBean message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequestVerVehiculo(zona, oficina, placa);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection("http://ws.pide.gob.pe/PIDEWSService", 20000, 20000));
      message = createContentVerVehiculo(soapResponse);
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
  
  public static EstadoVigenciaBean verVigencia(String zona, String oficina, String partida, String asiento, String appPaterno, String appMaterno, String nombres, String cargo, String email)
    throws SOAPException, IOException
  {
    EstadoVigenciaBean message = null;
    SOAPConnection soapConnection = null;
    try
    {
      SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
      soapConnection = soapConnectionFactory.createConnection();
      SOAPMessage soapRequest = buildSoapRequestVerVigencia(zona, oficina, partida, asiento, appPaterno, appMaterno, nombres, cargo, email);
      SOAPMessage soapResponse = soapConnection.call(soapRequest, Client.getConnection("http://ws.pide.gob.pe/PIDEWSService", 20000, 20000));
      message = createContentVerVigencia(soapResponse);
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
  
  private static SOAPMessage buildSoapRequest(String tipoParticipante, String apellidoPaterno, String apellidoMaterno, String nombres, String razonSocial)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("con", "http://ws.pide.gob.pe/PIDEWSService");
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("buscarTitularidad", "con");
    SOAPElement xtipoParticipante = soaService.addChildElement("tipoParticipante");
    xtipoParticipante.setTextContent(tipoParticipante);
    SOAPElement xapellidoPaterno = soaService.addChildElement("apellidoPaterno");
    xapellidoPaterno.setTextContent(apellidoPaterno);
    SOAPElement xapellidoMaterno = soaService.addChildElement("apellidoMaterno");
    xapellidoMaterno.setTextContent(apellidoMaterno);
    SOAPElement xnombres = soaService.addChildElement("nombres");
    xnombres.setTextContent(nombres);
    SOAPElement xrazonSocial = soaService.addChildElement("razonSocial");
    xrazonSocial.setTextContent(razonSocial);
    soapMessage.saveChanges();
    
    return soapMessage;
  }
  
  private static SOAPMessage buildSoapRequestListarAsientos(String zona, String oficina, String partida, String registro)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("con", "http://ws.pide.gob.pe/PIDEWSService");
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("listarAsientos", "con");
    SOAPElement xzona = soaService.addChildElement("zona");
    xzona.setTextContent(zona);
    SOAPElement xoficina = soaService.addChildElement("oficina");
    xoficina.setTextContent(oficina);
    SOAPElement xpartida = soaService.addChildElement("partida");
    xpartida.setTextContent(partida);
    SOAPElement xregistro = soaService.addChildElement("registro");
    xregistro.setTextContent(registro);
    soapMessage.saveChanges();
    
    return soapMessage;
  }
  
  private static SOAPMessage buildSoapRequestVerAsiento(String transaccion, String idImg, String tipo, String nroTotalPag, String nroPagRef, String pagina)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("con", "http://ws.pide.gob.pe/PIDEWSService");
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("verAsiento", "con");
    SOAPElement xtransaccion = soaService.addChildElement("transaccion");
    xtransaccion.setTextContent(transaccion);
    SOAPElement xidImg = soaService.addChildElement("idImg");
    xidImg.setTextContent(idImg);
    SOAPElement xtipo = soaService.addChildElement("tipo");
    xtipo.setTextContent(tipo);
    SOAPElement xnroTotalPag = soaService.addChildElement("nroTotalPag");
    xnroTotalPag.setTextContent(nroTotalPag);
    SOAPElement xnroPagRef = soaService.addChildElement("nroPagRef");
    xnroPagRef.setTextContent(nroPagRef);
    SOAPElement xpagina = soaService.addChildElement("pagina");
    xpagina.setTextContent(pagina);
    soapMessage.saveChanges();
    
    return soapMessage;
  }
  
  private static SOAPMessage buildSoapRequestVerVehiculo(String zona, String oficina, String placa)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("con", "http://ws.pide.gob.pe/PIDEWSService");
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("verDetalleRPV", "con");
    SOAPElement xzona = soaService.addChildElement("zona");
    xzona.setTextContent(zona);
    SOAPElement xoficina = soaService.addChildElement("oficina");
    xoficina.setTextContent(oficina);
    SOAPElement xplaca = soaService.addChildElement("placa");
    xplaca.setTextContent(placa);
    soapMessage.saveChanges();
    return soapMessage;
  }
  
  private static SOAPMessage buildSoapRequestVerVigencia(String zona, String oficina, String partida, String asiento, String appPaterno, String appMaterno, String nombres, String cargo, String email)
    throws SOAPException, IOException
  {
    MessageFactory messageFactory = MessageFactory.newInstance();
    SOAPMessage soapMessage = messageFactory.createMessage();
    soapMessage.getSOAPHeader().setPrefix("soapenv");
    SOAPPart soapPart = soapMessage.getSOAPPart();
    SOAPEnvelope soapEnvelope = soapPart.getEnvelope();
    soapEnvelope.setPrefix("soapenv");
    soapEnvelope.addNamespaceDeclaration("con", "http://ws.pide.gob.pe/PIDEWSService");
    SOAPHeader soaHeader = soapEnvelope.getHeader();
    soaHeader.setPrefix("soapenv");
    SOAPBody soaBody = soapEnvelope.getBody();
    soaBody.setPrefix("soapenv");
    SOAPElement soaService = soaBody.addChildElement("generarVigencia", "con");
    
    SOAPElement xzona = soaService.addChildElement("zona");
    xzona.setTextContent(zona);
    
    SOAPElement xoficina = soaService.addChildElement("oficina");
    xoficina.setTextContent(oficina);
    
    SOAPElement xpartida = soaService.addChildElement("partida");
    xpartida.setTextContent(partida);
    
    SOAPElement xasiento = soaService.addChildElement("asiento");
    xasiento.setTextContent(asiento);
    
    SOAPElement xapPaterno = soaService.addChildElement("apPaterno");
    xapPaterno.setTextContent(appPaterno);
    
    SOAPElement xapMaterno = soaService.addChildElement("apMaterno");
    xapMaterno.setTextContent(appMaterno);
    
    SOAPElement xnombre = soaService.addChildElement("nombre");
    xnombre.setTextContent(nombres);
    
    SOAPElement xcargo = soaService.addChildElement("cargo");
    xcargo.setTextContent(cargo);
    
    SOAPElement xemail = soaService.addChildElement("email");
    xemail.setTextContent(email);
    soapMessage.saveChanges();
    
    return soapMessage;
  }
  
  private static List<TitularidadBean> createContent(SOAPMessage soapResponse)
    throws SOAPException
  {
    List<TitularidadBean> message = new ArrayList();
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList returnmsj = elem.getElementsByTagName("respuestaTitularidad");
      if (returnmsj.getLength() > 1) {
        for (int i = 1; i < returnmsj.getLength(); i++)
        {
          Node node = returnmsj.item(i);
          if (node.getNodeType() == 1)
          {
            TitularidadBean bean = new TitularidadBean();
            NodeList items = node.getChildNodes();
            for (int j = 0; j < items.getLength(); j++)
            {
              Node result = items.item(j);
              if (result.getNodeType() == 1)
              {
                if (result.getNodeName().equals("registro")) {
                  bean.setRegistro(StringfromObject(result));
                }
                if (result.getNodeName().equals("razonSocial")) {
                  bean.setRazonSocial(StringfromObject(result));
                }
                if (result.getNodeName().equals("tipoDocumento")) {
                  bean.setTipoDocumento(StringfromObject(result));
                }
                if (result.getNodeName().equals("numeroDocumento")) {
                  bean.setNumeroDocumento(StringfromObject(result));
                }
                if (result.getNodeName().equals("numeroPartida")) {
                  bean.setNumeroPartida(StringfromObject(result));
                }
                if (result.getNodeName().equals("numeroPlaca")) {
                  bean.setNumeroPlaca(StringfromObject(result));
                }
                if (result.getNodeName().equals("estado")) {
                  bean.setEstado(StringfromObject(result));
                }
                if (result.getNodeName().equals("zona")) {
                  bean.setZona(StringfromObject(result));
                }
                if (result.getNodeName().equals("oficina")) {
                  bean.setOficina(StringfromObject(result));
                }
                if (result.getNodeName().equals("direccion")) {
                  bean.setDireccion(StringfromObject(result));
                }
                if (result.getNodeName().equals("apPaterno")) {
                  bean.setApPaterno(StringfromObject(result));
                }
                if (result.getNodeName().equals("apMaterno")) {
                  bean.setApMaterno(StringfromObject(result));
                }
                if (result.getNodeName().equals("nombre")) {
                  bean.setNombre(StringfromObject(result));
                }
              }
            }
            message.add(bean);
          }
        }
      }
    }
    return message;
  }
  
  private static AsientoBean createContentListarAsientos(SOAPMessage soapResponse)
    throws SOAPException
  {
    AsientoBean message = new AsientoBean();
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList transaccion = elem.getElementsByTagName("transaccion");
      if (transaccion.getLength() > 0) {
        message.setTransaccion(StringfromObject(transaccion.item(0).getFirstChild()));
      }
      NodeList nroTotalPag = elem.getElementsByTagName("nroTotalPag");
      if (nroTotalPag.getLength() > 0) {
        message.setNroTotalPag(StringfromInteger(nroTotalPag.item(0).getFirstChild()));
      }
      NodeList listAsientos = elem.getElementsByTagName("listAsientos");
      if (listAsientos.getLength() > 0)
      {
        List<AsientoListBean> lista = new ArrayList();
        for (int i = 0; i < listAsientos.getLength(); i++)
        {
          Node node = listAsientos.item(i);
          if (node.getNodeType() == 1)
          {
            AsientoListBean bean = new AsientoListBean();
            NodeList items = node.getChildNodes();
            List<AsientoPaginaBean> ListPag = new ArrayList();
            for (int j = 0; j < items.getLength(); j++)
            {
              Node result = items.item(j);
              if (result.getNodeType() == 1)
              {
                if (result.getNodeName().equals("idImgAsiento")) {
                  bean.setIdImg(StringfromObject(result));
                }
                if (result.getNodeName().equals("numPag")) {
                  bean.setNumPag(StringfromInteger(result));
                }
                if (result.getNodeName().equals("tipo")) {
                  bean.setTipo(StringfromObject(result));
                }
                if (result.getNodeName().equals("listPag"))
                {
                  NodeList paginas = result.getChildNodes();
                  
                  AsientoPaginaBean map = new AsientoPaginaBean();
                  for (int k = 0; k < paginas.getLength(); k++)
                  {
                    Node child = paginas.item(k);
                    if (child.getNodeType() == 1)
                    {
                      if (child.getNodeName().equals("nroPagRef")) {
                        map.setNroPagRef(StringfromInteger(child));
                      }
                      if (child.getNodeName().equals("pagina")) {
                        map.setPagina(StringfromInteger(child));
                      }
                    }
                  }
                  ListPag.add(map);
                }
              }
            }
            bean.setListPaginas(ListPag);
            lista.add(bean);
          }
        }
        message.setListAsientos(lista);
      }
      listAsientos = elem.getElementsByTagName("listFichas");
      if (listAsientos.getLength() > 0)
      {
        List<AsientoListBean> lista = new ArrayList();
        for (int i = 0; i < listAsientos.getLength(); i++)
        {
          Node node = listAsientos.item(i);
          if (node.getNodeType() == 1)
          {
            AsientoListBean bean = new AsientoListBean();
            NodeList items = node.getChildNodes();
            List<AsientoPaginaBean> ListPag = new ArrayList();
            for (int j = 0; j < items.getLength(); j++)
            {
              Node result = items.item(j);
              if (result.getNodeType() == 1)
              {
                if (result.getNodeName().equals("idImgFicha")) {
                  bean.setIdImg(StringfromObject(result));
                }
                if (result.getNodeName().equals("numPag")) {
                  bean.setNumPag(StringfromInteger(result));
                }
                if (result.getNodeName().equals("tipo")) {
                  bean.setTipo(StringfromObject(result));
                }
                if (result.getNodeName().equals("listPag"))
                {
                  AsientoPaginaBean map = new AsientoPaginaBean();
                  NodeList paginas = result.getChildNodes();
                  for (int k = 0; k < paginas.getLength(); k++)
                  {
                    Node child = paginas.item(k);
                    if (child.getNodeType() == 1)
                    {
                      if (child.getNodeName().equals("nroPagRef")) {
                        map.setNroPagRef(StringfromInteger(child));
                      }
                      if (child.getNodeName().equals("pagina")) {
                        map.setPagina(StringfromInteger(child));
                      }
                    }
                  }
                  ListPag.add(map);
                }
              }
            }
            bean.setListPaginas(ListPag);
            lista.add(bean);
          }
        }
        message.setListFichas(lista);
      }
      listAsientos = elem.getElementsByTagName("listFolios");
      if (listAsientos.getLength() > 0)
      {
        List<AsientoListBean> lista = new ArrayList();
        for (int i = 0; i < listAsientos.getLength(); i++)
        {
          Node node = listAsientos.item(i);
          if (node.getNodeType() == 1)
          {
            AsientoListBean bean = new AsientoListBean();
            NodeList items = node.getChildNodes();
            List<AsientoPaginaBean> ListPag = new ArrayList();
            for (int j = 0; j < items.getLength(); j++)
            {
              Node result = items.item(j);
              if (result.getNodeType() == 1)
              {
                if (result.getNodeName().equals("idImgFolio")) {
                  bean.setIdImg(StringfromObject(result));
                }
                if (result.getNodeName().equals("numPag")) {
                  bean.setNumPag(StringfromInteger(result));
                }
                if (result.getNodeName().equals("nroPagRef")) {
                  bean.setNroPagRef(StringfromInteger(result));
                }
                if (result.getNodeName().equals("pagina")) {
                  bean.setPagina(StringfromInteger(result));
                }
                if (result.getNodeName().equals("tipo")) {
                  bean.setTipo(StringfromObject(result));
                }
                if (result.getNodeName().equals("listPag"))
                {
                  NodeList paginas = result.getChildNodes();
                  AsientoPaginaBean map = new AsientoPaginaBean();
                  for (int k = 0; k < paginas.getLength(); k++)
                  {
                    Node child = paginas.item(k);
                    if (child.getNodeType() == 1)
                    {
                      if (child.getNodeName().equals("nroPagRef")) {
                        map.setNroPagRef(StringfromInteger(child));
                      }
                      if (child.getNodeName().equals("pagina")) {
                        map.setPagina(StringfromInteger(child));
                      }
                    }
                  }
                  ListPag.add(map);
                }
              }
            }
            bean.setListPaginas(ListPag);
            lista.add(bean);
          }
        }
        message.setListFolios(lista);
      }
    }
    return message;
  }
  
  private static String createContentVerAsiento(SOAPMessage soapResponse)
    throws SOAPException
  {
    String message = null;
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList transaccion = elem.getElementsByTagName("img");
      if (transaccion.getLength() > 0) {
        message = StringfromObject(transaccion.item(0).getFirstChild());
      }
    }
    return message;
  }
  
  private static EstadoVigenciaBean createContentVerVigencia(SOAPMessage soapResponse)
    throws SOAPException
  {
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    EstadoVigenciaBean bean = new EstadoVigenciaBean();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList transaccion = elem.getElementsByTagName("solicitud");
      if (transaccion.getLength() > 0)
      {
        bean.setCodigo(StringfromObject(transaccion.item(0).getFirstChild()));
        if ((bean.getCodigo() != null) && 
          (bean.getCodigo().equals("0"))) {
          bean.setMensaje("No existe vigencia para esta consulta");
        }
      }
      else
      {
        NodeList datosVigencia = elem.getElementsByTagName("datosVigencia");
        if (datosVigencia.getLength() > 0) {
          for (int i = 0; i < datosVigencia.getLength(); i++)
          {
            Node child = datosVigencia.item(i);
            if (child.getNodeType() == 1)
            {
              if (child.getNodeName().equals("estado"))
              {
                bean.setEstado(StringfromObject(child));
                if (bean.getEstado() != null) {
                  if (bean.getEstado().equals("1")) {
                    bean.setEstado("Activo");
                  } else {
                    bean.setEstado("Inactivo");
                  }
                }
              }
              if (child.getNodeName().equals("solicitud")) {
                bean.setSolicitud(StringfromObject(child));
              }
              if (child.getNodeName().equals("fecha")) {
                bean.setFecha(StringfromObject(child));
              }
            }
          }
        }
      }
    }
    return bean;
  }
  
  private static VehiculoBean createContentVerVehiculo(SOAPMessage soapResponse)
    throws SOAPException
  {
    VehiculoBean message = null;
    SOAPEnvelope env = soapResponse.getSOAPPart().getEnvelope();
    SOAPBody soapBody = env.getBody();
    Iterator<?> it = soapBody.getChildElements();
    Node element = (Node)it.next();
    if (element.getNodeType() == 1)
    {
      Element elem = (Element)element;
      NodeList vehiculo = elem.getElementsByTagName("vehiculo");
      if (vehiculo.getLength() > 0)
      {
        Node node = vehiculo.item(0);
        if (node.getNodeType() == 1)
        {
          message = new VehiculoBean();
          Node result = node.getFirstChild();
          message.setPlaca(StringfromObject(result));
          if ((message.getPlaca() != null) && (message.getPlaca().equals(""))) {
            return message;
          }
          result = result.getNextSibling();
          Node serie = result.getFirstChild();
          message.setSerie(StringfromObject(serie));
          result = result.getNextSibling();
          Node vim = result.getFirstChild();
          message.setVin(StringfromObject(vim));
          result = result.getNextSibling();
          Node motor = result.getFirstChild();
          message.setNro_motor(StringfromObject(motor));
          result = result.getNextSibling();
          Node color = result.getFirstChild();
          message.setColor(StringfromObject(color));
          result = result.getNextSibling();
          Node marca = result.getFirstChild();
          message.setMarca(StringfromObject(marca));
          result = result.getNextSibling();
          Node modelo = result.getFirstChild();
          message.setModelo(StringfromObject(modelo));
          
          result = result.getNextSibling();
          Node estado = result.getFirstChild();
          message.setEstado(StringfromObject(estado));
          
          result = result.getNextSibling();
          Node sede = result.getFirstChild();
          message.setSede(StringfromObject(sede));
          result = result.getNextSibling();
          NodeList propietarios = result.getChildNodes();
          for (int i = 0; i < propietarios.getLength(); i++)
          {
            Node dues = propietarios.item(i);
            if (dues.getNodeType() == 1) {
              message.getPropietarios().add(dues.getTextContent());
            }
          }
        }
      }
    }
    return message;
  }
  
  private static String format(int num)
  {
    String time = "";
    if (num < 10) {
      time = "0" + num;
    } else {
      time = "" + num;
    }
    return time;
  }
  
  public static String StringfromObject(Node elementtree)
  {
    if (elementtree != null) {
      return elementtree.getTextContent().trim();
    }
    return null;
  }
  
  public static Integer StringfromInteger(Node elementtree)
  {
    if (elementtree != null) {
      return Integer.valueOf(Integer.parseInt(elementtree.getTextContent().trim()));
    }
    return null;
  }
}
