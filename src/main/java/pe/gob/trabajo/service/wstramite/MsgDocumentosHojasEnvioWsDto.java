
package pe.gob.trabajo.service.wstramite;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para msgDocumentosHojasEnvioWsDto complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="msgDocumentosHojasEnvioWsDto">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="direcciontxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doAnio" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="doDesc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doId" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="doNodoc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNohe" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNohetxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="doNoordenpedido" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="estadotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fechaCrea" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "msgDocumentosHojasEnvioWsDto", propOrder = {
    "direcciontxt",
    "doAnio",
    "doDesc",
    "doId",
    "doNodoc",
    "doNohe",
    "doNohetxt",
    "doNoordenpedido",
    "estadotxt",
    "fechaCrea"
})
public class MsgDocumentosHojasEnvioWsDto {

    protected String direcciontxt;
    protected Integer doAnio;
    protected String doDesc;
    protected Long doId;
    protected String doNodoc;
    protected String doNohe;
    protected String doNohetxt;
    protected String doNoordenpedido;
    protected String estadotxt;
    protected String fechaCrea;

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
     * Obtiene el valor de la propiedad doId.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getDoId() {
        return doId;
    }

    /**
     * Define el valor de la propiedad doId.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setDoId(Long value) {
        this.doId = value;
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
     * Obtiene el valor de la propiedad fechaCrea.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFechaCrea() {
        return fechaCrea;
    }

    /**
     * Define el valor de la propiedad fechaCrea.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFechaCrea(String value) {
        this.fechaCrea = value;
    }

}
