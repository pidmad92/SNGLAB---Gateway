
package pe.gob.trabajo.service.wsstd;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para vucdFactura complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="vucdFactura">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="nombreProveedor" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeFactura" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vucdFacturaDetalless" type="{http://ws.web.bs.std.mef.gob.pe/}vucdFacturaDetalle" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "vucdFactura", propOrder = {
    "nombreProveedor",
    "numeFactura",
    "vucdFacturaDetalless"
})
public class VucdFactura {

    protected String nombreProveedor;
    protected String numeFactura;
    @XmlElement(nillable = true)
    protected List<VucdFacturaDetalle> vucdFacturaDetalless;

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
     * Gets the value of the vucdFacturaDetalless property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the vucdFacturaDetalless property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getVucdFacturaDetalless().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link VucdFacturaDetalle }
     * 
     * 
     */
    public List<VucdFacturaDetalle> getVucdFacturaDetalless() {
        if (vucdFacturaDetalless == null) {
            vucdFacturaDetalless = new ArrayList<VucdFacturaDetalle>();
        }
        return this.vucdFacturaDetalless;
    }

}
