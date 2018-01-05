
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para vucmSolicitudPersona complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="vucmSolicitudPersona">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="aceptaNotifelec" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="celularreponsabletecnico" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="correresponsabletecnico" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="domicilio" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="domicilioRepleg" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="email" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="motivoInter" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="motivoInterDetalle" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nidecer" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="nombre" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nombreRepleg" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nombresresponsableestacion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeCelular" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeDocide" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeDocideRepleg" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numePartiregis" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeResolservi" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeTelefono" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="observaciones" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="oficinaRegis" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="plazoPermiso" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="telefonoresponsabletecnico" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoAduana" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoDocide" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoDocideRepleg" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoPersona" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoServicio" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="tipoServicioAutorizado" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoServicioDetalle" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoTramite" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ubigeo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "vucmSolicitudPersona", propOrder = {
    "aceptaNotifelec",
    "celularreponsabletecnico",
    "correresponsabletecnico",
    "domicilio",
    "domicilioRepleg",
    "email",
    "motivoInter",
    "motivoInterDetalle",
    "nidecer",
    "nombre",
    "nombreRepleg",
    "nombresresponsableestacion",
    "numeCelular",
    "numeDocide",
    "numeDocideRepleg",
    "numePartiregis",
    "numeResolservi",
    "numeTelefono",
    "observaciones",
    "oficinaRegis",
    "plazoPermiso",
    "telefonoresponsabletecnico",
    "tipoAduana",
    "tipoDocide",
    "tipoDocideRepleg",
    "tipoPersona",
    "tipoServicio",
    "tipoServicioAutorizado",
    "tipoServicioDetalle",
    "tipoTramite",
    "ubigeo"
})
public class VucmSolicitudPersona {

    protected String aceptaNotifelec;
    protected String celularreponsabletecnico;
    protected String correresponsabletecnico;
    protected String domicilio;
    protected String domicilioRepleg;
    protected String email;
    protected String motivoInter;
    protected String motivoInterDetalle;
    protected Long nidecer;
    protected String nombre;
    protected String nombreRepleg;
    protected String nombresresponsableestacion;
    protected String numeCelular;
    protected String numeDocide;
    protected String numeDocideRepleg;
    protected String numePartiregis;
    protected String numeResolservi;
    protected String numeTelefono;
    protected String observaciones;
    protected String oficinaRegis;
    protected String plazoPermiso;
    protected String telefonoresponsabletecnico;
    protected String tipoAduana;
    protected String tipoDocide;
    protected String tipoDocideRepleg;
    protected String tipoPersona;
    protected Integer tipoServicio;
    protected String tipoServicioAutorizado;
    protected String tipoServicioDetalle;
    protected String tipoTramite;
    protected String ubigeo;

    /**
     * Obtiene el valor de la propiedad aceptaNotifelec.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAceptaNotifelec() {
        return aceptaNotifelec;
    }

    /**
     * Define el valor de la propiedad aceptaNotifelec.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAceptaNotifelec(String value) {
        this.aceptaNotifelec = value;
    }

    /**
     * Obtiene el valor de la propiedad celularreponsabletecnico.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCelularreponsabletecnico() {
        return celularreponsabletecnico;
    }

    /**
     * Define el valor de la propiedad celularreponsabletecnico.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCelularreponsabletecnico(String value) {
        this.celularreponsabletecnico = value;
    }

    /**
     * Obtiene el valor de la propiedad correresponsabletecnico.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCorreresponsabletecnico() {
        return correresponsabletecnico;
    }

    /**
     * Define el valor de la propiedad correresponsabletecnico.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCorreresponsabletecnico(String value) {
        this.correresponsabletecnico = value;
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
     * Obtiene el valor de la propiedad domicilioRepleg.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDomicilioRepleg() {
        return domicilioRepleg;
    }

    /**
     * Define el valor de la propiedad domicilioRepleg.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDomicilioRepleg(String value) {
        this.domicilioRepleg = value;
    }

    /**
     * Obtiene el valor de la propiedad email.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEmail() {
        return email;
    }

    /**
     * Define el valor de la propiedad email.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEmail(String value) {
        this.email = value;
    }

    /**
     * Obtiene el valor de la propiedad motivoInter.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMotivoInter() {
        return motivoInter;
    }

    /**
     * Define el valor de la propiedad motivoInter.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMotivoInter(String value) {
        this.motivoInter = value;
    }

    /**
     * Obtiene el valor de la propiedad motivoInterDetalle.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMotivoInterDetalle() {
        return motivoInterDetalle;
    }

    /**
     * Define el valor de la propiedad motivoInterDetalle.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMotivoInterDetalle(String value) {
        this.motivoInterDetalle = value;
    }

    /**
     * Obtiene el valor de la propiedad nidecer.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getNidecer() {
        return nidecer;
    }

    /**
     * Define el valor de la propiedad nidecer.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setNidecer(Long value) {
        this.nidecer = value;
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
     * Obtiene el valor de la propiedad nombresresponsableestacion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNombresresponsableestacion() {
        return nombresresponsableestacion;
    }

    /**
     * Define el valor de la propiedad nombresresponsableestacion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNombresresponsableestacion(String value) {
        this.nombresresponsableestacion = value;
    }

    /**
     * Obtiene el valor de la propiedad numeCelular.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeCelular() {
        return numeCelular;
    }

    /**
     * Define el valor de la propiedad numeCelular.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeCelular(String value) {
        this.numeCelular = value;
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
     * Obtiene el valor de la propiedad numeDocideRepleg.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeDocideRepleg() {
        return numeDocideRepleg;
    }

    /**
     * Define el valor de la propiedad numeDocideRepleg.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeDocideRepleg(String value) {
        this.numeDocideRepleg = value;
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
     * Obtiene el valor de la propiedad numeResolservi.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeResolservi() {
        return numeResolservi;
    }

    /**
     * Define el valor de la propiedad numeResolservi.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeResolservi(String value) {
        this.numeResolservi = value;
    }

    /**
     * Obtiene el valor de la propiedad numeTelefono.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeTelefono() {
        return numeTelefono;
    }

    /**
     * Define el valor de la propiedad numeTelefono.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeTelefono(String value) {
        this.numeTelefono = value;
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
     * Obtiene el valor de la propiedad oficinaRegis.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOficinaRegis() {
        return oficinaRegis;
    }

    /**
     * Define el valor de la propiedad oficinaRegis.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOficinaRegis(String value) {
        this.oficinaRegis = value;
    }

    /**
     * Obtiene el valor de la propiedad plazoPermiso.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPlazoPermiso() {
        return plazoPermiso;
    }

    /**
     * Define el valor de la propiedad plazoPermiso.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPlazoPermiso(String value) {
        this.plazoPermiso = value;
    }

    /**
     * Obtiene el valor de la propiedad telefonoresponsabletecnico.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTelefonoresponsabletecnico() {
        return telefonoresponsabletecnico;
    }

    /**
     * Define el valor de la propiedad telefonoresponsabletecnico.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTelefonoresponsabletecnico(String value) {
        this.telefonoresponsabletecnico = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoAduana.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoAduana() {
        return tipoAduana;
    }

    /**
     * Define el valor de la propiedad tipoAduana.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoAduana(String value) {
        this.tipoAduana = value;
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
     * Obtiene el valor de la propiedad tipoDocideRepleg.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoDocideRepleg() {
        return tipoDocideRepleg;
    }

    /**
     * Define el valor de la propiedad tipoDocideRepleg.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoDocideRepleg(String value) {
        this.tipoDocideRepleg = value;
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
     * Obtiene el valor de la propiedad tipoServicio.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getTipoServicio() {
        return tipoServicio;
    }

    /**
     * Define el valor de la propiedad tipoServicio.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setTipoServicio(Integer value) {
        this.tipoServicio = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoServicioAutorizado.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoServicioAutorizado() {
        return tipoServicioAutorizado;
    }

    /**
     * Define el valor de la propiedad tipoServicioAutorizado.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoServicioAutorizado(String value) {
        this.tipoServicioAutorizado = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoServicioDetalle.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoServicioDetalle() {
        return tipoServicioDetalle;
    }

    /**
     * Define el valor de la propiedad tipoServicioDetalle.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoServicioDetalle(String value) {
        this.tipoServicioDetalle = value;
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

}
