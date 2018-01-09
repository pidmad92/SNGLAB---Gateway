
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para vucdProducto complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="vucdProducto">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="codigoFcc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="direccionFabricante" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="funcion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="marca" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="modelo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nombreFabricante" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="paisFabricante" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="uso" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "vucdProducto", propOrder = {
    "codigoFcc",
    "direccionFabricante",
    "funcion",
    "marca",
    "modelo",
    "nombreFabricante",
    "paisFabricante",
    "uso"
})
public class VucdProducto {

    protected String codigoFcc;
    protected String direccionFabricante;
    protected String funcion;
    protected String marca;
    protected String modelo;
    protected String nombreFabricante;
    protected String paisFabricante;
    protected String uso;

    /**
     * Obtiene el valor de la propiedad codigoFcc.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodigoFcc() {
        return codigoFcc;
    }

    /**
     * Define el valor de la propiedad codigoFcc.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodigoFcc(String value) {
        this.codigoFcc = value;
    }

    /**
     * Obtiene el valor de la propiedad direccionFabricante.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDireccionFabricante() {
        return direccionFabricante;
    }

    /**
     * Define el valor de la propiedad direccionFabricante.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDireccionFabricante(String value) {
        this.direccionFabricante = value;
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
     * Obtiene el valor de la propiedad nombreFabricante.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNombreFabricante() {
        return nombreFabricante;
    }

    /**
     * Define el valor de la propiedad nombreFabricante.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNombreFabricante(String value) {
        this.nombreFabricante = value;
    }

    /**
     * Obtiene el valor de la propiedad paisFabricante.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPaisFabricante() {
        return paisFabricante;
    }

    /**
     * Define el valor de la propiedad paisFabricante.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPaisFabricante(String value) {
        this.paisFabricante = value;
    }

    /**
     * Obtiene el valor de la propiedad uso.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUso() {
        return uso;
    }

    /**
     * Define el valor de la propiedad uso.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUso(String value) {
        this.uso = value;
    }

}
