
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para vucSTDExpediente complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="vucSTDExpediente">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="nroExpediente" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ntasa" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "vucSTDExpediente", propOrder = {
    "nroExpediente",
    "ntasa"
})
public class VucSTDExpediente {

    protected String nroExpediente;
    protected Double ntasa;

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
     * Obtiene el valor de la propiedad ntasa.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getNtasa() {
        return ntasa;
    }

    /**
     * Define el valor de la propiedad ntasa.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setNtasa(Double value) {
        this.ntasa = value;
    }

}
