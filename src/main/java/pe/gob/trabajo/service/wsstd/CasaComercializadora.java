
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para casaComercializadora complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="casaComercializadora">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="documentosNombre" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fpCorreoRemitente" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fpDocumentoNumero" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fpFechaDocumento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fpMesDeInicio" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fpMesFin" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fpNoBanco" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fpNoCertOmologacion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fpObservacionClient" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fpPersona" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idsVehiculos" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="linkCambio" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="linkDocInicio" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numPartidaRegistral" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="placas" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="soats" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoAereo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoLicencia" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fPidCasaComer" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "casaComercializadora", propOrder = {
    "documentosNombre",
    "fpCorreoRemitente",
    "fpDocumentoNumero",
    "fpFechaDocumento",
    "fpMesDeInicio",
    "fpMesFin",
    "fpNoBanco",
    "fpNoCertOmologacion",
    "fpObservacionClient",
    "fpPersona",
    "idsVehiculos",
    "linkCambio",
    "linkDocInicio",
    "numPartidaRegistral",
    "placas",
    "soats",
    "tipoAereo",
    "tipoLicencia",
    "fPidCasaComer"
})
public class CasaComercializadora {

    protected String documentosNombre;
    protected String fpCorreoRemitente;
    protected String fpDocumentoNumero;
    protected String fpFechaDocumento;
    protected String fpMesDeInicio;
    protected String fpMesFin;
    protected String fpNoBanco;
    protected String fpNoCertOmologacion;
    protected String fpObservacionClient;
    protected String fpPersona;
    protected String idsVehiculos;
    protected String linkCambio;
    protected String linkDocInicio;
    protected String numPartidaRegistral;
    protected String placas;
    protected String soats;
    protected String tipoAereo;
    protected String tipoLicencia;
    protected String fPidCasaComer;

    /**
     * Obtiene el valor de la propiedad documentosNombre.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDocumentosNombre() {
        return documentosNombre;
    }

    /**
     * Define el valor de la propiedad documentosNombre.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDocumentosNombre(String value) {
        this.documentosNombre = value;
    }

    /**
     * Obtiene el valor de la propiedad fpCorreoRemitente.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFpCorreoRemitente() {
        return fpCorreoRemitente;
    }

    /**
     * Define el valor de la propiedad fpCorreoRemitente.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFpCorreoRemitente(String value) {
        this.fpCorreoRemitente = value;
    }

    /**
     * Obtiene el valor de la propiedad fpDocumentoNumero.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFpDocumentoNumero() {
        return fpDocumentoNumero;
    }

    /**
     * Define el valor de la propiedad fpDocumentoNumero.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFpDocumentoNumero(String value) {
        this.fpDocumentoNumero = value;
    }

    /**
     * Obtiene el valor de la propiedad fpFechaDocumento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFpFechaDocumento() {
        return fpFechaDocumento;
    }

    /**
     * Define el valor de la propiedad fpFechaDocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFpFechaDocumento(String value) {
        this.fpFechaDocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad fpMesDeInicio.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFpMesDeInicio() {
        return fpMesDeInicio;
    }

    /**
     * Define el valor de la propiedad fpMesDeInicio.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFpMesDeInicio(String value) {
        this.fpMesDeInicio = value;
    }

    /**
     * Obtiene el valor de la propiedad fpMesFin.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFpMesFin() {
        return fpMesFin;
    }

    /**
     * Define el valor de la propiedad fpMesFin.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFpMesFin(String value) {
        this.fpMesFin = value;
    }

    /**
     * Obtiene el valor de la propiedad fpNoBanco.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFpNoBanco() {
        return fpNoBanco;
    }

    /**
     * Define el valor de la propiedad fpNoBanco.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFpNoBanco(String value) {
        this.fpNoBanco = value;
    }

    /**
     * Obtiene el valor de la propiedad fpNoCertOmologacion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFpNoCertOmologacion() {
        return fpNoCertOmologacion;
    }

    /**
     * Define el valor de la propiedad fpNoCertOmologacion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFpNoCertOmologacion(String value) {
        this.fpNoCertOmologacion = value;
    }

    /**
     * Obtiene el valor de la propiedad fpObservacionClient.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFpObservacionClient() {
        return fpObservacionClient;
    }

    /**
     * Define el valor de la propiedad fpObservacionClient.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFpObservacionClient(String value) {
        this.fpObservacionClient = value;
    }

    /**
     * Obtiene el valor de la propiedad fpPersona.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFpPersona() {
        return fpPersona;
    }

    /**
     * Define el valor de la propiedad fpPersona.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFpPersona(String value) {
        this.fpPersona = value;
    }

    /**
     * Obtiene el valor de la propiedad idsVehiculos.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdsVehiculos() {
        return idsVehiculos;
    }

    /**
     * Define el valor de la propiedad idsVehiculos.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdsVehiculos(String value) {
        this.idsVehiculos = value;
    }

    /**
     * Obtiene el valor de la propiedad linkCambio.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLinkCambio() {
        return linkCambio;
    }

    /**
     * Define el valor de la propiedad linkCambio.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLinkCambio(String value) {
        this.linkCambio = value;
    }

    /**
     * Obtiene el valor de la propiedad linkDocInicio.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLinkDocInicio() {
        return linkDocInicio;
    }

    /**
     * Define el valor de la propiedad linkDocInicio.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLinkDocInicio(String value) {
        this.linkDocInicio = value;
    }

    /**
     * Obtiene el valor de la propiedad numPartidaRegistral.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumPartidaRegistral() {
        return numPartidaRegistral;
    }

    /**
     * Define el valor de la propiedad numPartidaRegistral.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumPartidaRegistral(String value) {
        this.numPartidaRegistral = value;
    }

    /**
     * Obtiene el valor de la propiedad placas.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPlacas() {
        return placas;
    }

    /**
     * Define el valor de la propiedad placas.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPlacas(String value) {
        this.placas = value;
    }

    /**
     * Obtiene el valor de la propiedad soats.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSoats() {
        return soats;
    }

    /**
     * Define el valor de la propiedad soats.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSoats(String value) {
        this.soats = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoAereo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoAereo() {
        return tipoAereo;
    }

    /**
     * Define el valor de la propiedad tipoAereo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoAereo(String value) {
        this.tipoAereo = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoLicencia.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoLicencia() {
        return tipoLicencia;
    }

    /**
     * Define el valor de la propiedad tipoLicencia.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoLicencia(String value) {
        this.tipoLicencia = value;
    }

    /**
     * Obtiene el valor de la propiedad fPidCasaComer.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFPidCasaComer() {
        return fPidCasaComer;
    }

    /**
     * Define el valor de la propiedad fPidCasaComer.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFPidCasaComer(String value) {
        this.fPidCasaComer = value;
    }

}
