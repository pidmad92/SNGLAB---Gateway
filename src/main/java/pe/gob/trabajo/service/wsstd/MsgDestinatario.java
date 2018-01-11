
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para msgDestinatario complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="msgDestinatario">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="administrado" type="{http://ws.web.bs.std.mef.gob.pe/}administrado" minOccurs="0"/>
 *         &lt;element name="asunto" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idClase" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="nivelSegu" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="noDocumento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numFolios" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="numeroExpediente" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="paraNombre" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoDespacho" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "msgDestinatario", propOrder = {
    "administrado",
    "asunto",
    "idClase",
    "nivelSegu",
    "noDocumento",
    "numFolios",
    "numeroExpediente",
    "paraNombre",
    "tipoDespacho"
})
public class MsgDestinatario {

    protected Administrado administrado;
    protected String asunto;
    protected Long idClase;
    protected String nivelSegu;
    protected String noDocumento;
    protected Long numFolios;
    protected String numeroExpediente;
    protected String paraNombre;
    protected String tipoDespacho;

    /**
     * Obtiene el valor de la propiedad administrado.
     * 
     * @return
     *     possible object is
     *     {@link Administrado }
     *     
     */
    public Administrado getAdministrado() {
        return administrado;
    }

    /**
     * Define el valor de la propiedad administrado.
     * 
     * @param value
     *     allowed object is
     *     {@link Administrado }
     *     
     */
    public void setAdministrado(Administrado value) {
        this.administrado = value;
    }

    /**
     * Obtiene el valor de la propiedad asunto.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAsunto() {
        return asunto;
    }

    /**
     * Define el valor de la propiedad asunto.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAsunto(String value) {
        this.asunto = value;
    }

    /**
     * Obtiene el valor de la propiedad idClase.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdClase() {
        return idClase;
    }

    /**
     * Define el valor de la propiedad idClase.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdClase(Long value) {
        this.idClase = value;
    }

    /**
     * Obtiene el valor de la propiedad nivelSegu.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNivelSegu() {
        return nivelSegu;
    }

    /**
     * Define el valor de la propiedad nivelSegu.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNivelSegu(String value) {
        this.nivelSegu = value;
    }

    /**
     * Obtiene el valor de la propiedad noDocumento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoDocumento() {
        return noDocumento;
    }

    /**
     * Define el valor de la propiedad noDocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoDocumento(String value) {
        this.noDocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad numFolios.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getNumFolios() {
        return numFolios;
    }

    /**
     * Define el valor de la propiedad numFolios.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setNumFolios(Long value) {
        this.numFolios = value;
    }

    /**
     * Obtiene el valor de la propiedad numeroExpediente.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroExpediente() {
        return numeroExpediente;
    }

    /**
     * Define el valor de la propiedad numeroExpediente.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroExpediente(String value) {
        this.numeroExpediente = value;
    }

    /**
     * Obtiene el valor de la propiedad paraNombre.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getParaNombre() {
        return paraNombre;
    }

    /**
     * Define el valor de la propiedad paraNombre.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setParaNombre(String value) {
        this.paraNombre = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoDespacho.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoDespacho() {
        return tipoDespacho;
    }

    /**
     * Define el valor de la propiedad tipoDespacho.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoDespacho(String value) {
        this.tipoDespacho = value;
    }

}
