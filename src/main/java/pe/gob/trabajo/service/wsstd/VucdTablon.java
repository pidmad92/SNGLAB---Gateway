
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Clase Java para vucdTablon complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="vucdTablon">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="anio" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="area" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cantidad" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="cantidadDescripcion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cantidadFisica" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="codigoCertifHomolo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="codigoCertificacionHomologacion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="detalleTrazabilidad" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="domicilio" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="error" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="expirationDate" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="expirationDateText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fecIngreso" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaCaducidad" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaCaducidadDescripcion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fechaCertificacionHomologacion" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaEmisionDocumento" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaEstimadaSalida" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaExpediente" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaOficio" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fileBytes" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
 *         &lt;element name="funcion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idArchivo" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idNotificacion" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="iddoc" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idflujo" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="marca" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="modelo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nombre" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nombreArchivo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nombreProveedor" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nombreRepleg" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nroConStanciaInscripcion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nroExpediente" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nroSuce" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="numeDocide" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeDocref" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeDocumento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeFactura" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numePartiregis" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="observaciones" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="partidaArancelaria" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="responsable" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="subarea" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tasa" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
 *         &lt;element name="texto" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="textoSustento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoDocide" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoDocref" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoDocumento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoMensaje" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoPersona" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoTramite" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ubigeo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="unidadMedida" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vigencia" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "vucdTablon", propOrder = {
    "anio",
    "area",
    "cantidad",
    "cantidadDescripcion",
    "cantidadFisica",
    "codigoCertifHomolo",
    "codigoCertificacionHomologacion",
    "detalleTrazabilidad",
    "domicilio",
    "error",
    "expirationDate",
    "expirationDateText",
    "fecIngreso",
    "fechaCaducidad",
    "fechaCaducidadDescripcion",
    "fechaCertificacionHomologacion",
    "fechaEmisionDocumento",
    "fechaEstimadaSalida",
    "fechaExpediente",
    "fechaOficio",
    "fileBytes",
    "funcion",
    "idArchivo",
    "idNotificacion",
    "iddoc",
    "idflujo",
    "marca",
    "modelo",
    "nombre",
    "nombreArchivo",
    "nombreProveedor",
    "nombreRepleg",
    "nroConStanciaInscripcion",
    "nroExpediente",
    "nroSuce",
    "numeDocide",
    "numeDocref",
    "numeDocumento",
    "numeFactura",
    "numePartiregis",
    "observaciones",
    "partidaArancelaria",
    "responsable",
    "subarea",
    "tasa",
    "texto",
    "textoSustento",
    "tipoDocide",
    "tipoDocref",
    "tipoDocumento",
    "tipoMensaje",
    "tipoPersona",
    "tipoTramite",
    "ubigeo",
    "unidadMedida",
    "vigencia"
})
public class VucdTablon {

    protected Integer anio;
    protected String area;
    protected Integer cantidad;
    protected String cantidadDescripcion;
    protected Integer cantidadFisica;
    protected String codigoCertifHomolo;
    protected String codigoCertificacionHomologacion;
    protected String detalleTrazabilidad;
    protected String domicilio;
    protected String error;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar expirationDate;
    protected String expirationDateText;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fecIngreso;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaCaducidad;
    protected String fechaCaducidadDescripcion;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaCertificacionHomologacion;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaEmisionDocumento;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaEstimadaSalida;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaExpediente;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaOficio;
    protected byte[] fileBytes;
    protected String funcion;
    protected Long idArchivo;
    protected Integer idNotificacion;
    protected Long iddoc;
    protected Long idflujo;
    protected String marca;
    protected String modelo;
    protected String nombre;
    protected String nombreArchivo;
    protected String nombreProveedor;
    protected String nombreRepleg;
    protected String nroConStanciaInscripcion;
    protected String nroExpediente;
    protected Long nroSuce;
    protected String numeDocide;
    protected String numeDocref;
    protected String numeDocumento;
    protected String numeFactura;
    protected String numePartiregis;
    protected String observaciones;
    protected String partidaArancelaria;
    protected String responsable;
    protected String subarea;
    protected Float tasa;
    protected String texto;
    protected String textoSustento;
    protected String tipoDocide;
    protected String tipoDocref;
    protected String tipoDocumento;
    protected String tipoMensaje;
    protected String tipoPersona;
    protected String tipoTramite;
    protected String ubigeo;
    protected String unidadMedida;
    protected String vigencia;

    /**
     * Obtiene el valor de la propiedad anio.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getAnio() {
        return anio;
    }

    /**
     * Define el valor de la propiedad anio.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setAnio(Integer value) {
        this.anio = value;
    }

    /**
     * Obtiene el valor de la propiedad area.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getArea() {
        return area;
    }

    /**
     * Define el valor de la propiedad area.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setArea(String value) {
        this.area = value;
    }

    /**
     * Obtiene el valor de la propiedad cantidad.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getCantidad() {
        return cantidad;
    }

    /**
     * Define el valor de la propiedad cantidad.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setCantidad(Integer value) {
        this.cantidad = value;
    }

    /**
     * Obtiene el valor de la propiedad cantidadDescripcion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCantidadDescripcion() {
        return cantidadDescripcion;
    }

    /**
     * Define el valor de la propiedad cantidadDescripcion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCantidadDescripcion(String value) {
        this.cantidadDescripcion = value;
    }

    /**
     * Obtiene el valor de la propiedad cantidadFisica.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getCantidadFisica() {
        return cantidadFisica;
    }

    /**
     * Define el valor de la propiedad cantidadFisica.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setCantidadFisica(Integer value) {
        this.cantidadFisica = value;
    }

    /**
     * Obtiene el valor de la propiedad codigoCertifHomolo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodigoCertifHomolo() {
        return codigoCertifHomolo;
    }

    /**
     * Define el valor de la propiedad codigoCertifHomolo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodigoCertifHomolo(String value) {
        this.codigoCertifHomolo = value;
    }

    /**
     * Obtiene el valor de la propiedad codigoCertificacionHomologacion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodigoCertificacionHomologacion() {
        return codigoCertificacionHomologacion;
    }

    /**
     * Define el valor de la propiedad codigoCertificacionHomologacion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodigoCertificacionHomologacion(String value) {
        this.codigoCertificacionHomologacion = value;
    }

    /**
     * Obtiene el valor de la propiedad detalleTrazabilidad.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDetalleTrazabilidad() {
        return detalleTrazabilidad;
    }

    /**
     * Define el valor de la propiedad detalleTrazabilidad.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDetalleTrazabilidad(String value) {
        this.detalleTrazabilidad = value;
    }

    /**
     * Obtiene el valor de la propiedad domicilio.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDomicilio() {
        return domicilio;
    }

    /**
     * Define el valor de la propiedad domicilio.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDomicilio(String value) {
        this.domicilio = value;
    }

    /**
     * Obtiene el valor de la propiedad error.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getError() {
        return error;
    }

    /**
     * Define el valor de la propiedad error.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setError(String value) {
        this.error = value;
    }

    /**
     * Obtiene el valor de la propiedad expirationDate.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getExpirationDate() {
        return expirationDate;
    }

    /**
     * Define el valor de la propiedad expirationDate.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setExpirationDate(XMLGregorianCalendar value) {
        this.expirationDate = value;
    }

    /**
     * Obtiene el valor de la propiedad expirationDateText.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExpirationDateText() {
        return expirationDateText;
    }

    /**
     * Define el valor de la propiedad expirationDateText.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExpirationDateText(String value) {
        this.expirationDateText = value;
    }

    /**
     * Obtiene el valor de la propiedad fecIngreso.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFecIngreso() {
        return fecIngreso;
    }

    /**
     * Define el valor de la propiedad fecIngreso.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFecIngreso(XMLGregorianCalendar value) {
        this.fecIngreso = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaCaducidad.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaCaducidad() {
        return fechaCaducidad;
    }

    /**
     * Define el valor de la propiedad fechaCaducidad.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaCaducidad(XMLGregorianCalendar value) {
        this.fechaCaducidad = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaCaducidadDescripcion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFechaCaducidadDescripcion() {
        return fechaCaducidadDescripcion;
    }

    /**
     * Define el valor de la propiedad fechaCaducidadDescripcion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFechaCaducidadDescripcion(String value) {
        this.fechaCaducidadDescripcion = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaCertificacionHomologacion.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaCertificacionHomologacion() {
        return fechaCertificacionHomologacion;
    }

    /**
     * Define el valor de la propiedad fechaCertificacionHomologacion.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaCertificacionHomologacion(XMLGregorianCalendar value) {
        this.fechaCertificacionHomologacion = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaEmisionDocumento.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaEmisionDocumento() {
        return fechaEmisionDocumento;
    }

    /**
     * Define el valor de la propiedad fechaEmisionDocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaEmisionDocumento(XMLGregorianCalendar value) {
        this.fechaEmisionDocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaEstimadaSalida.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaEstimadaSalida() {
        return fechaEstimadaSalida;
    }

    /**
     * Define el valor de la propiedad fechaEstimadaSalida.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaEstimadaSalida(XMLGregorianCalendar value) {
        this.fechaEstimadaSalida = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaExpediente.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaExpediente() {
        return fechaExpediente;
    }

    /**
     * Define el valor de la propiedad fechaExpediente.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaExpediente(XMLGregorianCalendar value) {
        this.fechaExpediente = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaOficio.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaOficio() {
        return fechaOficio;
    }

    /**
     * Define el valor de la propiedad fechaOficio.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaOficio(XMLGregorianCalendar value) {
        this.fechaOficio = value;
    }

    /**
     * Obtiene el valor de la propiedad fileBytes.
     * 
     * @return
     *     possible object is
     *     byte[]
     */
    public byte[] getFileBytes() {
        return fileBytes;
    }

    /**
     * Define el valor de la propiedad fileBytes.
     * 
     * @param value
     *     allowed object is
     *     byte[]
     */
    public void setFileBytes(byte[] value) {
        this.fileBytes = value;
    }

    /**
     * Obtiene el valor de la propiedad funcion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFuncion() {
        return funcion;
    }

    /**
     * Define el valor de la propiedad funcion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFuncion(String value) {
        this.funcion = value;
    }

    /**
     * Obtiene el valor de la propiedad idArchivo.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdArchivo() {
        return idArchivo;
    }

    /**
     * Define el valor de la propiedad idArchivo.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdArchivo(Long value) {
        this.idArchivo = value;
    }

    /**
     * Obtiene el valor de la propiedad idNotificacion.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getIdNotificacion() {
        return idNotificacion;
    }

    /**
     * Define el valor de la propiedad idNotificacion.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setIdNotificacion(Integer value) {
        this.idNotificacion = value;
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
     * Obtiene el valor de la propiedad marca.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMarca() {
        return marca;
    }

    /**
     * Define el valor de la propiedad marca.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMarca(String value) {
        this.marca = value;
    }

    /**
     * Obtiene el valor de la propiedad modelo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getModelo() {
        return modelo;
    }

    /**
     * Define el valor de la propiedad modelo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setModelo(String value) {
        this.modelo = value;
    }

    /**
     * Obtiene el valor de la propiedad nombre.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Define el valor de la propiedad nombre.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNombre(String value) {
        this.nombre = value;
    }

    /**
     * Obtiene el valor de la propiedad nombreArchivo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNombreArchivo() {
        return nombreArchivo;
    }

    /**
     * Define el valor de la propiedad nombreArchivo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNombreArchivo(String value) {
        this.nombreArchivo = value;
    }

    /**
     * Obtiene el valor de la propiedad nombreProveedor.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNombreProveedor() {
        return nombreProveedor;
    }

    /**
     * Define el valor de la propiedad nombreProveedor.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNombreProveedor(String value) {
        this.nombreProveedor = value;
    }

    /**
     * Obtiene el valor de la propiedad nombreRepleg.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNombreRepleg() {
        return nombreRepleg;
    }

    /**
     * Define el valor de la propiedad nombreRepleg.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNombreRepleg(String value) {
        this.nombreRepleg = value;
    }

    /**
     * Obtiene el valor de la propiedad nroConStanciaInscripcion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNroConStanciaInscripcion() {
        return nroConStanciaInscripcion;
    }

    /**
     * Define el valor de la propiedad nroConStanciaInscripcion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNroConStanciaInscripcion(String value) {
        this.nroConStanciaInscripcion = value;
    }

    /**
     * Obtiene el valor de la propiedad nroExpediente.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNroExpediente() {
        return nroExpediente;
    }

    /**
     * Define el valor de la propiedad nroExpediente.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNroExpediente(String value) {
        this.nroExpediente = value;
    }

    /**
     * Obtiene el valor de la propiedad nroSuce.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getNroSuce() {
        return nroSuce;
    }

    /**
     * Define el valor de la propiedad nroSuce.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setNroSuce(Long value) {
        this.nroSuce = value;
    }

    /**
     * Obtiene el valor de la propiedad numeDocide.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeDocide() {
        return numeDocide;
    }

    /**
     * Define el valor de la propiedad numeDocide.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeDocide(String value) {
        this.numeDocide = value;
    }

    /**
     * Obtiene el valor de la propiedad numeDocref.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeDocref() {
        return numeDocref;
    }

    /**
     * Define el valor de la propiedad numeDocref.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeDocref(String value) {
        this.numeDocref = value;
    }

    /**
     * Obtiene el valor de la propiedad numeDocumento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeDocumento() {
        return numeDocumento;
    }

    /**
     * Define el valor de la propiedad numeDocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeDocumento(String value) {
        this.numeDocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad numeFactura.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeFactura() {
        return numeFactura;
    }

    /**
     * Define el valor de la propiedad numeFactura.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeFactura(String value) {
        this.numeFactura = value;
    }

    /**
     * Obtiene el valor de la propiedad numePartiregis.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumePartiregis() {
        return numePartiregis;
    }

    /**
     * Define el valor de la propiedad numePartiregis.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumePartiregis(String value) {
        this.numePartiregis = value;
    }

    /**
     * Obtiene el valor de la propiedad observaciones.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getObservaciones() {
        return observaciones;
    }

    /**
     * Define el valor de la propiedad observaciones.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setObservaciones(String value) {
        this.observaciones = value;
    }

    /**
     * Obtiene el valor de la propiedad partidaArancelaria.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPartidaArancelaria() {
        return partidaArancelaria;
    }

    /**
     * Define el valor de la propiedad partidaArancelaria.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPartidaArancelaria(String value) {
        this.partidaArancelaria = value;
    }

    /**
     * Obtiene el valor de la propiedad responsable.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getResponsable() {
        return responsable;
    }

    /**
     * Define el valor de la propiedad responsable.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setResponsable(String value) {
        this.responsable = value;
    }

    /**
     * Obtiene el valor de la propiedad subarea.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSubarea() {
        return subarea;
    }

    /**
     * Define el valor de la propiedad subarea.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSubarea(String value) {
        this.subarea = value;
    }

    /**
     * Obtiene el valor de la propiedad tasa.
     * 
     * @return
     *     possible object is
     *     {@link Float }
     *     
     */
    public Float getTasa() {
        return tasa;
    }

    /**
     * Define el valor de la propiedad tasa.
     * 
     * @param value
     *     allowed object is
     *     {@link Float }
     *     
     */
    public void setTasa(Float value) {
        this.tasa = value;
    }

    /**
     * Obtiene el valor de la propiedad texto.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTexto() {
        return texto;
    }

    /**
     * Define el valor de la propiedad texto.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTexto(String value) {
        this.texto = value;
    }

    /**
     * Obtiene el valor de la propiedad textoSustento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTextoSustento() {
        return textoSustento;
    }

    /**
     * Define el valor de la propiedad textoSustento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTextoSustento(String value) {
        this.textoSustento = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoDocide.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoDocide() {
        return tipoDocide;
    }

    /**
     * Define el valor de la propiedad tipoDocide.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoDocide(String value) {
        this.tipoDocide = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoDocref.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoDocref() {
        return tipoDocref;
    }

    /**
     * Define el valor de la propiedad tipoDocref.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoDocref(String value) {
        this.tipoDocref = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoDocumento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoDocumento() {
        return tipoDocumento;
    }

    /**
     * Define el valor de la propiedad tipoDocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoDocumento(String value) {
        this.tipoDocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoMensaje.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoMensaje() {
        return tipoMensaje;
    }

    /**
     * Define el valor de la propiedad tipoMensaje.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoMensaje(String value) {
        this.tipoMensaje = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoPersona.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoPersona() {
        return tipoPersona;
    }

    /**
     * Define el valor de la propiedad tipoPersona.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoPersona(String value) {
        this.tipoPersona = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoTramite.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoTramite() {
        return tipoTramite;
    }

    /**
     * Define el valor de la propiedad tipoTramite.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoTramite(String value) {
        this.tipoTramite = value;
    }

    /**
     * Obtiene el valor de la propiedad ubigeo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUbigeo() {
        return ubigeo;
    }

    /**
     * Define el valor de la propiedad ubigeo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUbigeo(String value) {
        this.ubigeo = value;
    }

    /**
     * Obtiene el valor de la propiedad unidadMedida.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUnidadMedida() {
        return unidadMedida;
    }

    /**
     * Define el valor de la propiedad unidadMedida.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUnidadMedida(String value) {
        this.unidadMedida = value;
    }

    /**
     * Obtiene el valor de la propiedad vigencia.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVigencia() {
        return vigencia;
    }

    /**
     * Define el valor de la propiedad vigencia.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVigencia(String value) {
        this.vigencia = value;
    }

}
