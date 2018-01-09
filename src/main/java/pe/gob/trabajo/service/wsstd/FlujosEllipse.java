
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Clase Java para flujosEllipse complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="flujosEllipse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="esdeSoloConocimiento" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="esmiareaderiva" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="estado" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="estadoImpresion" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="estadotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fechaAtencion" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaCrea" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaDerivacion" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaModif" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaRecepcion" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="folios" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iddoc" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idflujo" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idflujopadre" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idunidadAcroAtiendetxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idunidadAcroDerivatxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idunidadAcroDestinotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idunidadAcroRecepcionatxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idunidadAtiende" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idunidadAtiendetxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idunidadDeriva" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idunidadDerivatxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idunidadDestino" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idunidadDestinotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idunidadRecepciona" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idunidadRecepcionatxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="iduserAtiende" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iduserAtiendetxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="iduserCrea" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iduserDeriva" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iduserDerivatxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="iduserDestino" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iduserDestinotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="iduserModif" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iduserRecepciona" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iduserRecepcionatxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="iidflujo" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="iidflujopadre" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="instruccion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="observacion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="observacionAtencion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="rmtaddress" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="rmtaddressrst" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tiempoestadia" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="tiempotranscurrido" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="tipoFlujo" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "flujosEllipse", propOrder = {
    "esdeSoloConocimiento",
    "esmiareaderiva",
    "estado",
    "estadoImpresion",
    "estadotxt",
    "fechaAtencion",
    "fechaCrea",
    "fechaDerivacion",
    "fechaModif",
    "fechaRecepcion",
    "folios",
    "iddoc",
    "idflujo",
    "idflujopadre",
    "idunidadAcroAtiendetxt",
    "idunidadAcroDerivatxt",
    "idunidadAcroDestinotxt",
    "idunidadAcroRecepcionatxt",
    "idunidadAtiende",
    "idunidadAtiendetxt",
    "idunidadDeriva",
    "idunidadDerivatxt",
    "idunidadDestino",
    "idunidadDestinotxt",
    "idunidadRecepciona",
    "idunidadRecepcionatxt",
    "iduserAtiende",
    "iduserAtiendetxt",
    "iduserCrea",
    "iduserDeriva",
    "iduserDerivatxt",
    "iduserDestino",
    "iduserDestinotxt",
    "iduserModif",
    "iduserRecepciona",
    "iduserRecepcionatxt",
    "iidflujo",
    "iidflujopadre",
    "instruccion",
    "observacion",
    "observacionAtencion",
    "rmtaddress",
    "rmtaddressrst",
    "tiempoestadia",
    "tiempotranscurrido",
    "tipoFlujo"
})
public class FlujosEllipse {

    protected boolean esdeSoloConocimiento;
    protected boolean esmiareaderiva;
    protected Integer estado;
    protected Integer estadoImpresion;
    protected String estadotxt;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaAtencion;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaCrea;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaDerivacion;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaModif;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaRecepcion;
    protected Long folios;
    protected Long iddoc;
    protected Long idflujo;
    protected Long idflujopadre;
    protected String idunidadAcroAtiendetxt;
    protected String idunidadAcroDerivatxt;
    protected String idunidadAcroDestinotxt;
    protected String idunidadAcroRecepcionatxt;
    protected Long idunidadAtiende;
    protected String idunidadAtiendetxt;
    protected Long idunidadDeriva;
    protected String idunidadDerivatxt;
    protected Long idunidadDestino;
    protected String idunidadDestinotxt;
    protected Long idunidadRecepciona;
    protected String idunidadRecepcionatxt;
    protected Long iduserAtiende;
    protected String iduserAtiendetxt;
    protected Long iduserCrea;
    protected Long iduserDeriva;
    protected String iduserDerivatxt;
    protected Long iduserDestino;
    protected String iduserDestinotxt;
    protected Long iduserModif;
    protected Long iduserRecepciona;
    protected String iduserRecepcionatxt;
    protected Integer iidflujo;
    protected Integer iidflujopadre;
    protected String instruccion;
    protected String observacion;
    protected String observacionAtencion;
    protected String rmtaddress;
    protected String rmtaddressrst;
    protected Integer tiempoestadia;
    protected Long tiempotranscurrido;
    protected Integer tipoFlujo;

    /**
     * Obtiene el valor de la propiedad esdeSoloConocimiento.
     * 
     */
    public boolean isEsdeSoloConocimiento() {
        return esdeSoloConocimiento;
    }

    /**
     * Define el valor de la propiedad esdeSoloConocimiento.
     * 
     */
    public void setEsdeSoloConocimiento(boolean value) {
        this.esdeSoloConocimiento = value;
    }

    /**
     * Obtiene el valor de la propiedad esmiareaderiva.
     * 
     */
    public boolean isEsmiareaderiva() {
        return esmiareaderiva;
    }

    /**
     * Define el valor de la propiedad esmiareaderiva.
     * 
     */
    public void setEsmiareaderiva(boolean value) {
        this.esmiareaderiva = value;
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
     * Obtiene el valor de la propiedad estadoImpresion.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getEstadoImpresion() {
        return estadoImpresion;
    }

    /**
     * Define el valor de la propiedad estadoImpresion.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setEstadoImpresion(Integer value) {
        this.estadoImpresion = value;
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
     * Obtiene el valor de la propiedad fechaAtencion.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaAtencion() {
        return fechaAtencion;
    }

    /**
     * Define el valor de la propiedad fechaAtencion.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaAtencion(XMLGregorianCalendar value) {
        this.fechaAtencion = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaCrea.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaCrea() {
        return fechaCrea;
    }

    /**
     * Define el valor de la propiedad fechaCrea.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaCrea(XMLGregorianCalendar value) {
        this.fechaCrea = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaDerivacion.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaDerivacion() {
        return fechaDerivacion;
    }

    /**
     * Define el valor de la propiedad fechaDerivacion.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaDerivacion(XMLGregorianCalendar value) {
        this.fechaDerivacion = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaModif.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaModif() {
        return fechaModif;
    }

    /**
     * Define el valor de la propiedad fechaModif.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaModif(XMLGregorianCalendar value) {
        this.fechaModif = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaRecepcion.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaRecepcion() {
        return fechaRecepcion;
    }

    /**
     * Define el valor de la propiedad fechaRecepcion.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaRecepcion(XMLGregorianCalendar value) {
        this.fechaRecepcion = value;
    }

    /**
     * Obtiene el valor de la propiedad folios.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getFolios() {
        return folios;
    }

    /**
     * Define el valor de la propiedad folios.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setFolios(Long value) {
        this.folios = value;
    }

    /**
     * Obtiene el valor de la propiedad iddoc.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIddoc() {
        return iddoc;
    }

    /**
     * Define el valor de la propiedad iddoc.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIddoc(Long value) {
        this.iddoc = value;
    }

    /**
     * Obtiene el valor de la propiedad idflujo.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdflujo() {
        return idflujo;
    }

    /**
     * Define el valor de la propiedad idflujo.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdflujo(Long value) {
        this.idflujo = value;
    }

    /**
     * Obtiene el valor de la propiedad idflujopadre.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdflujopadre() {
        return idflujopadre;
    }

    /**
     * Define el valor de la propiedad idflujopadre.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdflujopadre(Long value) {
        this.idflujopadre = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadAcroAtiendetxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdunidadAcroAtiendetxt() {
        return idunidadAcroAtiendetxt;
    }

    /**
     * Define el valor de la propiedad idunidadAcroAtiendetxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdunidadAcroAtiendetxt(String value) {
        this.idunidadAcroAtiendetxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadAcroDerivatxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdunidadAcroDerivatxt() {
        return idunidadAcroDerivatxt;
    }

    /**
     * Define el valor de la propiedad idunidadAcroDerivatxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdunidadAcroDerivatxt(String value) {
        this.idunidadAcroDerivatxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadAcroDestinotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdunidadAcroDestinotxt() {
        return idunidadAcroDestinotxt;
    }

    /**
     * Define el valor de la propiedad idunidadAcroDestinotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdunidadAcroDestinotxt(String value) {
        this.idunidadAcroDestinotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadAcroRecepcionatxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdunidadAcroRecepcionatxt() {
        return idunidadAcroRecepcionatxt;
    }

    /**
     * Define el valor de la propiedad idunidadAcroRecepcionatxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdunidadAcroRecepcionatxt(String value) {
        this.idunidadAcroRecepcionatxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadAtiende.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdunidadAtiende() {
        return idunidadAtiende;
    }

    /**
     * Define el valor de la propiedad idunidadAtiende.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdunidadAtiende(Long value) {
        this.idunidadAtiende = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadAtiendetxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdunidadAtiendetxt() {
        return idunidadAtiendetxt;
    }

    /**
     * Define el valor de la propiedad idunidadAtiendetxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdunidadAtiendetxt(String value) {
        this.idunidadAtiendetxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadDeriva.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdunidadDeriva() {
        return idunidadDeriva;
    }

    /**
     * Define el valor de la propiedad idunidadDeriva.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdunidadDeriva(Long value) {
        this.idunidadDeriva = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadDerivatxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdunidadDerivatxt() {
        return idunidadDerivatxt;
    }

    /**
     * Define el valor de la propiedad idunidadDerivatxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdunidadDerivatxt(String value) {
        this.idunidadDerivatxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadDestino.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdunidadDestino() {
        return idunidadDestino;
    }

    /**
     * Define el valor de la propiedad idunidadDestino.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdunidadDestino(Long value) {
        this.idunidadDestino = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadDestinotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdunidadDestinotxt() {
        return idunidadDestinotxt;
    }

    /**
     * Define el valor de la propiedad idunidadDestinotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdunidadDestinotxt(String value) {
        this.idunidadDestinotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadRecepciona.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdunidadRecepciona() {
        return idunidadRecepciona;
    }

    /**
     * Define el valor de la propiedad idunidadRecepciona.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdunidadRecepciona(Long value) {
        this.idunidadRecepciona = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadRecepcionatxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdunidadRecepcionatxt() {
        return idunidadRecepcionatxt;
    }

    /**
     * Define el valor de la propiedad idunidadRecepcionatxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdunidadRecepcionatxt(String value) {
        this.idunidadRecepcionatxt = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserAtiende.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIduserAtiende() {
        return iduserAtiende;
    }

    /**
     * Define el valor de la propiedad iduserAtiende.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIduserAtiende(Long value) {
        this.iduserAtiende = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserAtiendetxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIduserAtiendetxt() {
        return iduserAtiendetxt;
    }

    /**
     * Define el valor de la propiedad iduserAtiendetxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIduserAtiendetxt(String value) {
        this.iduserAtiendetxt = value;
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
     * Obtiene el valor de la propiedad iduserDeriva.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIduserDeriva() {
        return iduserDeriva;
    }

    /**
     * Define el valor de la propiedad iduserDeriva.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIduserDeriva(Long value) {
        this.iduserDeriva = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserDerivatxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIduserDerivatxt() {
        return iduserDerivatxt;
    }

    /**
     * Define el valor de la propiedad iduserDerivatxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIduserDerivatxt(String value) {
        this.iduserDerivatxt = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserDestino.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIduserDestino() {
        return iduserDestino;
    }

    /**
     * Define el valor de la propiedad iduserDestino.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIduserDestino(Long value) {
        this.iduserDestino = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserDestinotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIduserDestinotxt() {
        return iduserDestinotxt;
    }

    /**
     * Define el valor de la propiedad iduserDestinotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIduserDestinotxt(String value) {
        this.iduserDestinotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserModif.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIduserModif() {
        return iduserModif;
    }

    /**
     * Define el valor de la propiedad iduserModif.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIduserModif(Long value) {
        this.iduserModif = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserRecepciona.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIduserRecepciona() {
        return iduserRecepciona;
    }

    /**
     * Define el valor de la propiedad iduserRecepciona.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIduserRecepciona(Long value) {
        this.iduserRecepciona = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserRecepcionatxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIduserRecepcionatxt() {
        return iduserRecepcionatxt;
    }

    /**
     * Define el valor de la propiedad iduserRecepcionatxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIduserRecepcionatxt(String value) {
        this.iduserRecepcionatxt = value;
    }

    /**
     * Obtiene el valor de la propiedad iidflujo.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getIidflujo() {
        return iidflujo;
    }

    /**
     * Define el valor de la propiedad iidflujo.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setIidflujo(Integer value) {
        this.iidflujo = value;
    }

    /**
     * Obtiene el valor de la propiedad iidflujopadre.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getIidflujopadre() {
        return iidflujopadre;
    }

    /**
     * Define el valor de la propiedad iidflujopadre.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setIidflujopadre(Integer value) {
        this.iidflujopadre = value;
    }

    /**
     * Obtiene el valor de la propiedad instruccion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInstruccion() {
        return instruccion;
    }

    /**
     * Define el valor de la propiedad instruccion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInstruccion(String value) {
        this.instruccion = value;
    }

    /**
     * Obtiene el valor de la propiedad observacion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getObservacion() {
        return observacion;
    }

    /**
     * Define el valor de la propiedad observacion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setObservacion(String value) {
        this.observacion = value;
    }

    /**
     * Obtiene el valor de la propiedad observacionAtencion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getObservacionAtencion() {
        return observacionAtencion;
    }

    /**
     * Define el valor de la propiedad observacionAtencion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setObservacionAtencion(String value) {
        this.observacionAtencion = value;
    }

    /**
     * Obtiene el valor de la propiedad rmtaddress.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRmtaddress() {
        return rmtaddress;
    }

    /**
     * Define el valor de la propiedad rmtaddress.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRmtaddress(String value) {
        this.rmtaddress = value;
    }

    /**
     * Obtiene el valor de la propiedad rmtaddressrst.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRmtaddressrst() {
        return rmtaddressrst;
    }

    /**
     * Define el valor de la propiedad rmtaddressrst.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRmtaddressrst(String value) {
        this.rmtaddressrst = value;
    }

    /**
     * Obtiene el valor de la propiedad tiempoestadia.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getTiempoestadia() {
        return tiempoestadia;
    }

    /**
     * Define el valor de la propiedad tiempoestadia.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setTiempoestadia(Integer value) {
        this.tiempoestadia = value;
    }

    /**
     * Obtiene el valor de la propiedad tiempotranscurrido.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getTiempotranscurrido() {
        return tiempotranscurrido;
    }

    /**
     * Define el valor de la propiedad tiempotranscurrido.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setTiempotranscurrido(Long value) {
        this.tiempotranscurrido = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoFlujo.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getTipoFlujo() {
        return tipoFlujo;
    }

    /**
     * Define el valor de la propiedad tipoFlujo.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setTipoFlujo(Integer value) {
        this.tipoFlujo = value;
    }

}
