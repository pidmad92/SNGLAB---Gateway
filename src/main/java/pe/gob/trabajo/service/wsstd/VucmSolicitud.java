
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Clase Java para vucmSolicitud complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="vucmSolicitud">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="fechaDocumento" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="formato" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idTransmision" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="monto_documento" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
 *         &lt;element name="notificacion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeDocumento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeDocumentoRef" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoDocRef" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoDocumento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoMensaje" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "vucmSolicitud", propOrder = {
    "fechaDocumento",
    "formato",
    "idTransmision",
    "montoDocumento",
    "notificacion",
    "numeDocumento",
    "numeDocumentoRef",
    "tipoDocRef",
    "tipoDocumento",
    "tipoMensaje"
})
public class VucmSolicitud {

    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaDocumento;
    protected String formato;
    protected Integer idTransmision;
    @XmlElement(name = "monto_documento")
    protected Float montoDocumento;
    protected String notificacion;
    protected String numeDocumento;
    protected String numeDocumentoRef;
    protected String tipoDocRef;
    protected String tipoDocumento;
    protected String tipoMensaje;

    /**
     * Obtiene el valor de la propiedad fechaDocumento.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaDocumento() {
        return fechaDocumento;
    }

    /**
     * Define el valor de la propiedad fechaDocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaDocumento(XMLGregorianCalendar value) {
        this.fechaDocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad formato.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFormato() {
        return formato;
    }

    /**
     * Define el valor de la propiedad formato.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFormato(String value) {
        this.formato = value;
    }

    /**
     * Obtiene el valor de la propiedad idTransmision.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getIdTransmision() {
        return idTransmision;
    }

    /**
     * Define el valor de la propiedad idTransmision.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setIdTransmision(Integer value) {
        this.idTransmision = value;
    }

    /**
     * Obtiene el valor de la propiedad montoDocumento.
     * 
     * @return
     *     possible object is
     *     {@link Float }
     *     
     */
    public Float getMontoDocumento() {
        return montoDocumento;
    }

    /**
     * Define el valor de la propiedad montoDocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link Float }
     *     
     */
    public void setMontoDocumento(Float value) {
        this.montoDocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad notificacion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNotificacion() {
        return notificacion;
    }

    /**
     * Define el valor de la propiedad notificacion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNotificacion(String value) {
        this.notificacion = value;
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
     * Obtiene el valor de la propiedad numeDocumentoRef.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeDocumentoRef() {
        return numeDocumentoRef;
    }

    /**
     * Define el valor de la propiedad numeDocumentoRef.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeDocumentoRef(String value) {
        this.numeDocumentoRef = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoDocRef.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoDocRef() {
        return tipoDocRef;
    }

    /**
     * Define el valor de la propiedad tipoDocRef.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoDocRef(String value) {
        this.tipoDocRef = value;
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

}
