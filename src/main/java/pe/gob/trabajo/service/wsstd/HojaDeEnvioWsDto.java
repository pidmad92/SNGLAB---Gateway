
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Clase Java para hojaDeEnvioWsDto complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="hojaDeEnvioWsDto">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="aplicPenCargo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="aplicPenEntrega" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ddoFchnotificacion" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="ddoFchrecojo" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="ddoFchretorno" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="direcciontxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doAnio" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="doCostoEnvioFinal" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doCostoParcial" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doCostoTotal" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doCostoenvio" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doDesc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doDiasatrasocargo" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doDiasatrasoentrega" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doFchrecojoMes" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doIdclasetxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doIddestinatariotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doIddocNoAnioSid" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="doIddocNoSid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doIddoctxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doIdremitareatxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doIdremitareatxtacro" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doIdremitareatxtcod" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doIdremtusutxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doIduserproveedor" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="doIduserproveedortxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNivelsegu" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNodoc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNofolios" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="doNohe" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNohetxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNoordenpedido" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNoremito" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNoremitoAnio" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="doNoservicio" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doObservacionFin" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doParaNombre" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doPenalidadCargo" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doPenalidadEnvio" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doPesoUnitario" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doPesokg" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="doTipoDestinatario" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="doTsidtipse" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="doTsidtipsetxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doUbgdir" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doUbgdisttxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doUbgdptotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doUbgpaistxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doUbgprovtxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="domcId" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="drIddirreco" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="drIddirrecotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="eslocal" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="estado" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="estadoReporte" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="estadotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="iduserCrea" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="motivoNoEntrega" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="resultadisierror" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="seleccionado" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="tsCaracter" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tsDespacho" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tsIdtipacceso" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="tsIdtipaccesotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="dFechaCrea" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "hojaDeEnvioWsDto", propOrder = {
    "aplicPenCargo",
    "aplicPenEntrega",
    "ddoFchnotificacion",
    "ddoFchrecojo",
    "ddoFchretorno",
    "direcciontxt",
    "doAnio",
    "doCostoEnvioFinal",
    "doCostoParcial",
    "doCostoTotal",
    "doCostoenvio",
    "doDesc",
    "doDiasatrasocargo",
    "doDiasatrasoentrega",
    "doFchrecojoMes",
    "doIdclasetxt",
    "doIddestinatariotxt",
    "doIddocNoAnioSid",
    "doIddocNoSid",
    "doIddoctxt",
    "doIdremitareatxt",
    "doIdremitareatxtacro",
    "doIdremitareatxtcod",
    "doIdremtusutxt",
    "doIduserproveedor",
    "doIduserproveedortxt",
    "doNivelsegu",
    "doNodoc",
    "doNofolios",
    "doNohe",
    "doNohetxt",
    "doNoordenpedido",
    "doNoremito",
    "doNoremitoAnio",
    "doNoservicio",
    "doObservacionFin",
    "doParaNombre",
    "doPenalidadCargo",
    "doPenalidadEnvio",
    "doPesoUnitario",
    "doPesokg",
    "doTipoDestinatario",
    "doTsidtipse",
    "doTsidtipsetxt",
    "doUbgdir",
    "doUbgdisttxt",
    "doUbgdptotxt",
    "doUbgpaistxt",
    "doUbgprovtxt",
    "domcId",
    "drIddirreco",
    "drIddirrecotxt",
    "eslocal",
    "estado",
    "estadoReporte",
    "estadotxt",
    "iduserCrea",
    "motivoNoEntrega",
    "resultadisierror",
    "seleccionado",
    "tsCaracter",
    "tsDespacho",
    "tsIdtipacceso",
    "tsIdtipaccesotxt",
    "dFechaCrea"
})
public class HojaDeEnvioWsDto {

    protected String aplicPenCargo;
    protected String aplicPenEntrega;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar ddoFchnotificacion;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar ddoFchrecojo;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar ddoFchretorno;
    protected String direcciontxt;
    protected Integer doAnio;
    protected Double doCostoEnvioFinal;
    protected Double doCostoParcial;
    protected Double doCostoTotal;
    protected Double doCostoenvio;
    protected String doDesc;
    protected Double doDiasatrasocargo;
    protected Double doDiasatrasoentrega;
    protected String doFchrecojoMes;
    protected String doIdclasetxt;
    protected String doIddestinatariotxt;
    protected Integer doIddocNoAnioSid;
    protected String doIddocNoSid;
    protected String doIddoctxt;
    protected String doIdremitareatxt;
    protected String doIdremitareatxtacro;
    protected String doIdremitareatxtcod;
    protected String doIdremtusutxt;
    protected Long doIduserproveedor;
    protected String doIduserproveedortxt;
    protected String doNivelsegu;
    protected String doNodoc;
    protected Long doNofolios;
    protected String doNohe;
    protected String doNohetxt;
    protected String doNoordenpedido;
    protected String doNoremito;
    protected Integer doNoremitoAnio;
    protected String doNoservicio;
    protected String doObservacionFin;
    protected String doParaNombre;
    protected Double doPenalidadCargo;
    protected Double doPenalidadEnvio;
    protected Double doPesoUnitario;
    protected Double doPesokg;
    protected Integer doTipoDestinatario;
    protected Long doTsidtipse;
    protected String doTsidtipsetxt;
    protected String doUbgdir;
    protected String doUbgdisttxt;
    protected String doUbgdptotxt;
    protected String doUbgpaistxt;
    protected String doUbgprovtxt;
    protected Long domcId;
    protected Long drIddirreco;
    protected String drIddirrecotxt;
    protected boolean eslocal;
    protected Integer estado;
    protected String estadoReporte;
    protected String estadotxt;
    protected Long iduserCrea;
    protected String motivoNoEntrega;
    protected String resultadisierror;
    protected boolean seleccionado;
    protected String tsCaracter;
    protected String tsDespacho;
    protected Long tsIdtipacceso;
    protected String tsIdtipaccesotxt;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar dFechaCrea;

    /**
     * Obtiene el valor de la propiedad aplicPenCargo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAplicPenCargo() {
        return aplicPenCargo;
    }

    /**
     * Define el valor de la propiedad aplicPenCargo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAplicPenCargo(String value) {
        this.aplicPenCargo = value;
    }

    /**
     * Obtiene el valor de la propiedad aplicPenEntrega.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAplicPenEntrega() {
        return aplicPenEntrega;
    }

    /**
     * Define el valor de la propiedad aplicPenEntrega.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAplicPenEntrega(String value) {
        this.aplicPenEntrega = value;
    }

    /**
     * Obtiene el valor de la propiedad ddoFchnotificacion.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getDdoFchnotificacion() {
        return ddoFchnotificacion;
    }

    /**
     * Define el valor de la propiedad ddoFchnotificacion.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setDdoFchnotificacion(XMLGregorianCalendar value) {
        this.ddoFchnotificacion = value;
    }

    /**
     * Obtiene el valor de la propiedad ddoFchrecojo.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getDdoFchrecojo() {
        return ddoFchrecojo;
    }

    /**
     * Define el valor de la propiedad ddoFchrecojo.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setDdoFchrecojo(XMLGregorianCalendar value) {
        this.ddoFchrecojo = value;
    }

    /**
     * Obtiene el valor de la propiedad ddoFchretorno.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getDdoFchretorno() {
        return ddoFchretorno;
    }

    /**
     * Define el valor de la propiedad ddoFchretorno.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setDdoFchretorno(XMLGregorianCalendar value) {
        this.ddoFchretorno = value;
    }

    /**
     * Obtiene el valor de la propiedad direcciontxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDirecciontxt() {
        return direcciontxt;
    }

    /**
     * Define el valor de la propiedad direcciontxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDirecciontxt(String value) {
        this.direcciontxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doAnio.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getDoAnio() {
        return doAnio;
    }

    /**
     * Define el valor de la propiedad doAnio.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setDoAnio(Integer value) {
        this.doAnio = value;
    }

    /**
     * Obtiene el valor de la propiedad doCostoEnvioFinal.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoCostoEnvioFinal() {
        return doCostoEnvioFinal;
    }

    /**
     * Define el valor de la propiedad doCostoEnvioFinal.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoCostoEnvioFinal(Double value) {
        this.doCostoEnvioFinal = value;
    }

    /**
     * Obtiene el valor de la propiedad doCostoParcial.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoCostoParcial() {
        return doCostoParcial;
    }

    /**
     * Define el valor de la propiedad doCostoParcial.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoCostoParcial(Double value) {
        this.doCostoParcial = value;
    }

    /**
     * Obtiene el valor de la propiedad doCostoTotal.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoCostoTotal() {
        return doCostoTotal;
    }

    /**
     * Define el valor de la propiedad doCostoTotal.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoCostoTotal(Double value) {
        this.doCostoTotal = value;
    }

    /**
     * Obtiene el valor de la propiedad doCostoenvio.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoCostoenvio() {
        return doCostoenvio;
    }

    /**
     * Define el valor de la propiedad doCostoenvio.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoCostoenvio(Double value) {
        this.doCostoenvio = value;
    }

    /**
     * Obtiene el valor de la propiedad doDesc.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoDesc() {
        return doDesc;
    }

    /**
     * Define el valor de la propiedad doDesc.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoDesc(String value) {
        this.doDesc = value;
    }

    /**
     * Obtiene el valor de la propiedad doDiasatrasocargo.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoDiasatrasocargo() {
        return doDiasatrasocargo;
    }

    /**
     * Define el valor de la propiedad doDiasatrasocargo.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoDiasatrasocargo(Double value) {
        this.doDiasatrasocargo = value;
    }

    /**
     * Obtiene el valor de la propiedad doDiasatrasoentrega.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoDiasatrasoentrega() {
        return doDiasatrasoentrega;
    }

    /**
     * Define el valor de la propiedad doDiasatrasoentrega.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoDiasatrasoentrega(Double value) {
        this.doDiasatrasoentrega = value;
    }

    /**
     * Obtiene el valor de la propiedad doFchrecojoMes.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoFchrecojoMes() {
        return doFchrecojoMes;
    }

    /**
     * Define el valor de la propiedad doFchrecojoMes.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoFchrecojoMes(String value) {
        this.doFchrecojoMes = value;
    }

    /**
     * Obtiene el valor de la propiedad doIdclasetxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoIdclasetxt() {
        return doIdclasetxt;
    }

    /**
     * Define el valor de la propiedad doIdclasetxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoIdclasetxt(String value) {
        this.doIdclasetxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doIddestinatariotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoIddestinatariotxt() {
        return doIddestinatariotxt;
    }

    /**
     * Define el valor de la propiedad doIddestinatariotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoIddestinatariotxt(String value) {
        this.doIddestinatariotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doIddocNoAnioSid.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getDoIddocNoAnioSid() {
        return doIddocNoAnioSid;
    }

    /**
     * Define el valor de la propiedad doIddocNoAnioSid.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setDoIddocNoAnioSid(Integer value) {
        this.doIddocNoAnioSid = value;
    }

    /**
     * Obtiene el valor de la propiedad doIddocNoSid.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoIddocNoSid() {
        return doIddocNoSid;
    }

    /**
     * Define el valor de la propiedad doIddocNoSid.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoIddocNoSid(String value) {
        this.doIddocNoSid = value;
    }

    /**
     * Obtiene el valor de la propiedad doIddoctxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoIddoctxt() {
        return doIddoctxt;
    }

    /**
     * Define el valor de la propiedad doIddoctxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoIddoctxt(String value) {
        this.doIddoctxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doIdremitareatxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoIdremitareatxt() {
        return doIdremitareatxt;
    }

    /**
     * Define el valor de la propiedad doIdremitareatxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoIdremitareatxt(String value) {
        this.doIdremitareatxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doIdremitareatxtacro.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoIdremitareatxtacro() {
        return doIdremitareatxtacro;
    }

    /**
     * Define el valor de la propiedad doIdremitareatxtacro.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoIdremitareatxtacro(String value) {
        this.doIdremitareatxtacro = value;
    }

    /**
     * Obtiene el valor de la propiedad doIdremitareatxtcod.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoIdremitareatxtcod() {
        return doIdremitareatxtcod;
    }

    /**
     * Define el valor de la propiedad doIdremitareatxtcod.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoIdremitareatxtcod(String value) {
        this.doIdremitareatxtcod = value;
    }

    /**
     * Obtiene el valor de la propiedad doIdremtusutxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoIdremtusutxt() {
        return doIdremtusutxt;
    }

    /**
     * Define el valor de la propiedad doIdremtusutxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoIdremtusutxt(String value) {
        this.doIdremtusutxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doIduserproveedor.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getDoIduserproveedor() {
        return doIduserproveedor;
    }

    /**
     * Define el valor de la propiedad doIduserproveedor.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setDoIduserproveedor(Long value) {
        this.doIduserproveedor = value;
    }

    /**
     * Obtiene el valor de la propiedad doIduserproveedortxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoIduserproveedortxt() {
        return doIduserproveedortxt;
    }

    /**
     * Define el valor de la propiedad doIduserproveedortxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoIduserproveedortxt(String value) {
        this.doIduserproveedortxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doNivelsegu.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoNivelsegu() {
        return doNivelsegu;
    }

    /**
     * Define el valor de la propiedad doNivelsegu.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoNivelsegu(String value) {
        this.doNivelsegu = value;
    }

    /**
     * Obtiene el valor de la propiedad doNodoc.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoNodoc() {
        return doNodoc;
    }

    /**
     * Define el valor de la propiedad doNodoc.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoNodoc(String value) {
        this.doNodoc = value;
    }

    /**
     * Obtiene el valor de la propiedad doNofolios.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getDoNofolios() {
        return doNofolios;
    }

    /**
     * Define el valor de la propiedad doNofolios.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setDoNofolios(Long value) {
        this.doNofolios = value;
    }

    /**
     * Obtiene el valor de la propiedad doNohe.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoNohe() {
        return doNohe;
    }

    /**
     * Define el valor de la propiedad doNohe.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoNohe(String value) {
        this.doNohe = value;
    }

    /**
     * Obtiene el valor de la propiedad doNohetxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoNohetxt() {
        return doNohetxt;
    }

    /**
     * Define el valor de la propiedad doNohetxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoNohetxt(String value) {
        this.doNohetxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doNoordenpedido.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoNoordenpedido() {
        return doNoordenpedido;
    }

    /**
     * Define el valor de la propiedad doNoordenpedido.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoNoordenpedido(String value) {
        this.doNoordenpedido = value;
    }

    /**
     * Obtiene el valor de la propiedad doNoremito.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoNoremito() {
        return doNoremito;
    }

    /**
     * Define el valor de la propiedad doNoremito.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoNoremito(String value) {
        this.doNoremito = value;
    }

    /**
     * Obtiene el valor de la propiedad doNoremitoAnio.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getDoNoremitoAnio() {
        return doNoremitoAnio;
    }

    /**
     * Define el valor de la propiedad doNoremitoAnio.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setDoNoremitoAnio(Integer value) {
        this.doNoremitoAnio = value;
    }

    /**
     * Obtiene el valor de la propiedad doNoservicio.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoNoservicio() {
        return doNoservicio;
    }

    /**
     * Define el valor de la propiedad doNoservicio.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoNoservicio(String value) {
        this.doNoservicio = value;
    }

    /**
     * Obtiene el valor de la propiedad doObservacionFin.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoObservacionFin() {
        return doObservacionFin;
    }

    /**
     * Define el valor de la propiedad doObservacionFin.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoObservacionFin(String value) {
        this.doObservacionFin = value;
    }

    /**
     * Obtiene el valor de la propiedad doParaNombre.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoParaNombre() {
        return doParaNombre;
    }

    /**
     * Define el valor de la propiedad doParaNombre.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoParaNombre(String value) {
        this.doParaNombre = value;
    }

    /**
     * Obtiene el valor de la propiedad doPenalidadCargo.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoPenalidadCargo() {
        return doPenalidadCargo;
    }

    /**
     * Define el valor de la propiedad doPenalidadCargo.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoPenalidadCargo(Double value) {
        this.doPenalidadCargo = value;
    }

    /**
     * Obtiene el valor de la propiedad doPenalidadEnvio.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoPenalidadEnvio() {
        return doPenalidadEnvio;
    }

    /**
     * Define el valor de la propiedad doPenalidadEnvio.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoPenalidadEnvio(Double value) {
        this.doPenalidadEnvio = value;
    }

    /**
     * Obtiene el valor de la propiedad doPesoUnitario.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoPesoUnitario() {
        return doPesoUnitario;
    }

    /**
     * Define el valor de la propiedad doPesoUnitario.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoPesoUnitario(Double value) {
        this.doPesoUnitario = value;
    }

    /**
     * Obtiene el valor de la propiedad doPesokg.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getDoPesokg() {
        return doPesokg;
    }

    /**
     * Define el valor de la propiedad doPesokg.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setDoPesokg(Double value) {
        this.doPesokg = value;
    }

    /**
     * Obtiene el valor de la propiedad doTipoDestinatario.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getDoTipoDestinatario() {
        return doTipoDestinatario;
    }

    /**
     * Define el valor de la propiedad doTipoDestinatario.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setDoTipoDestinatario(Integer value) {
        this.doTipoDestinatario = value;
    }

    /**
     * Obtiene el valor de la propiedad doTsidtipse.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getDoTsidtipse() {
        return doTsidtipse;
    }

    /**
     * Define el valor de la propiedad doTsidtipse.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setDoTsidtipse(Long value) {
        this.doTsidtipse = value;
    }

    /**
     * Obtiene el valor de la propiedad doTsidtipsetxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoTsidtipsetxt() {
        return doTsidtipsetxt;
    }

    /**
     * Define el valor de la propiedad doTsidtipsetxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoTsidtipsetxt(String value) {
        this.doTsidtipsetxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doUbgdir.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoUbgdir() {
        return doUbgdir;
    }

    /**
     * Define el valor de la propiedad doUbgdir.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoUbgdir(String value) {
        this.doUbgdir = value;
    }

    /**
     * Obtiene el valor de la propiedad doUbgdisttxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoUbgdisttxt() {
        return doUbgdisttxt;
    }

    /**
     * Define el valor de la propiedad doUbgdisttxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoUbgdisttxt(String value) {
        this.doUbgdisttxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doUbgdptotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoUbgdptotxt() {
        return doUbgdptotxt;
    }

    /**
     * Define el valor de la propiedad doUbgdptotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoUbgdptotxt(String value) {
        this.doUbgdptotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doUbgpaistxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoUbgpaistxt() {
        return doUbgpaistxt;
    }

    /**
     * Define el valor de la propiedad doUbgpaistxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoUbgpaistxt(String value) {
        this.doUbgpaistxt = value;
    }

    /**
     * Obtiene el valor de la propiedad doUbgprovtxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDoUbgprovtxt() {
        return doUbgprovtxt;
    }

    /**
     * Define el valor de la propiedad doUbgprovtxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDoUbgprovtxt(String value) {
        this.doUbgprovtxt = value;
    }

    /**
     * Obtiene el valor de la propiedad domcId.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getDomcId() {
        return domcId;
    }

    /**
     * Define el valor de la propiedad domcId.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setDomcId(Long value) {
        this.domcId = value;
    }

    /**
     * Obtiene el valor de la propiedad drIddirreco.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getDrIddirreco() {
        return drIddirreco;
    }

    /**
     * Define el valor de la propiedad drIddirreco.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setDrIddirreco(Long value) {
        this.drIddirreco = value;
    }

    /**
     * Obtiene el valor de la propiedad drIddirrecotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDrIddirrecotxt() {
        return drIddirrecotxt;
    }

    /**
     * Define el valor de la propiedad drIddirrecotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDrIddirrecotxt(String value) {
        this.drIddirrecotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad eslocal.
     * 
     */
    public boolean isEslocal() {
        return eslocal;
    }

    /**
     * Define el valor de la propiedad eslocal.
     * 
     */
    public void setEslocal(boolean value) {
        this.eslocal = value;
    }

    /**
     * Obtiene el valor de la propiedad estado.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getEstado() {
        return estado;
    }

    /**
     * Define el valor de la propiedad estado.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setEstado(Integer value) {
        this.estado = value;
    }

    /**
     * Obtiene el valor de la propiedad estadoReporte.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEstadoReporte() {
        return estadoReporte;
    }

    /**
     * Define el valor de la propiedad estadoReporte.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEstadoReporte(String value) {
        this.estadoReporte = value;
    }

    /**
     * Obtiene el valor de la propiedad estadotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEstadotxt() {
        return estadotxt;
    }

    /**
     * Define el valor de la propiedad estadotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEstadotxt(String value) {
        this.estadotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserCrea.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIduserCrea() {
        return iduserCrea;
    }

    /**
     * Define el valor de la propiedad iduserCrea.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIduserCrea(Long value) {
        this.iduserCrea = value;
    }

    /**
     * Obtiene el valor de la propiedad motivoNoEntrega.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMotivoNoEntrega() {
        return motivoNoEntrega;
    }

    /**
     * Define el valor de la propiedad motivoNoEntrega.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMotivoNoEntrega(String value) {
        this.motivoNoEntrega = value;
    }

    /**
     * Obtiene el valor de la propiedad resultadisierror.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getResultadisierror() {
        return resultadisierror;
    }

    /**
     * Define el valor de la propiedad resultadisierror.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setResultadisierror(String value) {
        this.resultadisierror = value;
    }

    /**
     * Obtiene el valor de la propiedad seleccionado.
     * 
     */
    public boolean isSeleccionado() {
        return seleccionado;
    }

    /**
     * Define el valor de la propiedad seleccionado.
     * 
     */
    public void setSeleccionado(boolean value) {
        this.seleccionado = value;
    }

    /**
     * Obtiene el valor de la propiedad tsCaracter.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTsCaracter() {
        return tsCaracter;
    }

    /**
     * Define el valor de la propiedad tsCaracter.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTsCaracter(String value) {
        this.tsCaracter = value;
    }

    /**
     * Obtiene el valor de la propiedad tsDespacho.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTsDespacho() {
        return tsDespacho;
    }

    /**
     * Define el valor de la propiedad tsDespacho.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTsDespacho(String value) {
        this.tsDespacho = value;
    }

    /**
     * Obtiene el valor de la propiedad tsIdtipacceso.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getTsIdtipacceso() {
        return tsIdtipacceso;
    }

    /**
     * Define el valor de la propiedad tsIdtipacceso.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setTsIdtipacceso(Long value) {
        this.tsIdtipacceso = value;
    }

    /**
     * Obtiene el valor de la propiedad tsIdtipaccesotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTsIdtipaccesotxt() {
        return tsIdtipaccesotxt;
    }

    /**
     * Define el valor de la propiedad tsIdtipaccesotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTsIdtipaccesotxt(String value) {
        this.tsIdtipaccesotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad dFechaCrea.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getDFechaCrea() {
        return dFechaCrea;
    }

    /**
     * Define el valor de la propiedad dFechaCrea.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setDFechaCrea(XMLGregorianCalendar value) {
        this.dFechaCrea = value;
    }

}
