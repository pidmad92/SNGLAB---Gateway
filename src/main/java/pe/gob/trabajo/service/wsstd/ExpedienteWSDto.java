
package pe.gob.trabajo.service.wsstd;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para expedienteWSDto complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="expedienteWSDto">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="anexos" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="asunto" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="courier" type="{http://ws.web.bs.std.mef.gob.pe/}msgDocumentosHojasEnvioWsDto" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="fechahoradeiniciodetramite" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fechahoradeldocumento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fechahorarecepcion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="movimientos" type="{http://ws.web.bs.std.mef.gob.pe/}movimientoWSDto" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="noexpediente" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numerodedocumento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numerodefolios" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="procedimiento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="remitente" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="responsableArea" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="responsableUsuario" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="situacionactual" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipodedocumento" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tupa" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "expedienteWSDto", propOrder = {
    "anexos",
    "asunto",
    "courier",
    "fechahoradeiniciodetramite",
    "fechahoradeldocumento",
    "fechahorarecepcion",
    "movimientos",
    "noexpediente",
    "numerodedocumento",
    "numerodefolios",
    "procedimiento",
    "remitente",
    "responsableArea",
    "responsableUsuario",
    "situacionactual",
    "tipodedocumento",
    "tupa"
})
public class ExpedienteWSDto {

    protected String anexos;
    protected String asunto;
    @XmlElement(nillable = true)
    protected List<MsgDocumentosHojasEnvioWsDto> courier;
    protected String fechahoradeiniciodetramite;
    protected String fechahoradeldocumento;
    protected String fechahorarecepcion;
    @XmlElement(nillable = true)
    protected List<MovimientoWSDto> movimientos;
    protected String noexpediente;
    protected String numerodedocumento;
    protected String numerodefolios;
    protected String procedimiento;
    protected String remitente;
    protected String responsableArea;
    protected String responsableUsuario;
    protected String situacionactual;
    protected String tipodedocumento;
    protected int tupa;

    /**
     * Obtiene el valor de la propiedad anexos.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAnexos() {
        return anexos;
    }

    /**
     * Define el valor de la propiedad anexos.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAnexos(String value) {
        this.anexos = value;
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
     * Gets the value of the courier property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the courier property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCourier().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MsgDocumentosHojasEnvioWsDto }
     * 
     * 
     */
    public List<MsgDocumentosHojasEnvioWsDto> getCourier() {
        if (courier == null) {
            courier = new ArrayList<MsgDocumentosHojasEnvioWsDto>();
        }
        return this.courier;
    }

    /**
     * Obtiene el valor de la propiedad fechahoradeiniciodetramite.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFechahoradeiniciodetramite() {
        return fechahoradeiniciodetramite;
    }

    /**
     * Define el valor de la propiedad fechahoradeiniciodetramite.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFechahoradeiniciodetramite(String value) {
        this.fechahoradeiniciodetramite = value;
    }

    /**
     * Obtiene el valor de la propiedad fechahoradeldocumento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFechahoradeldocumento() {
        return fechahoradeldocumento;
    }

    /**
     * Define el valor de la propiedad fechahoradeldocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFechahoradeldocumento(String value) {
        this.fechahoradeldocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad fechahorarecepcion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFechahorarecepcion() {
        return fechahorarecepcion;
    }

    /**
     * Define el valor de la propiedad fechahorarecepcion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFechahorarecepcion(String value) {
        this.fechahorarecepcion = value;
    }

    /**
     * Gets the value of the movimientos property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the movimientos property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMovimientos().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MovimientoWSDto }
     * 
     * 
     */
    public List<MovimientoWSDto> getMovimientos() {
        if (movimientos == null) {
            movimientos = new ArrayList<MovimientoWSDto>();
        }
        return this.movimientos;
    }

    /**
     * Obtiene el valor de la propiedad noexpediente.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoexpediente() {
        return noexpediente;
    }

    /**
     * Define el valor de la propiedad noexpediente.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoexpediente(String value) {
        this.noexpediente = value;
    }

    /**
     * Obtiene el valor de la propiedad numerodedocumento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumerodedocumento() {
        return numerodedocumento;
    }

    /**
     * Define el valor de la propiedad numerodedocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumerodedocumento(String value) {
        this.numerodedocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad numerodefolios.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumerodefolios() {
        return numerodefolios;
    }

    /**
     * Define el valor de la propiedad numerodefolios.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumerodefolios(String value) {
        this.numerodefolios = value;
    }

    /**
     * Obtiene el valor de la propiedad procedimiento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProcedimiento() {
        return procedimiento;
    }

    /**
     * Define el valor de la propiedad procedimiento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProcedimiento(String value) {
        this.procedimiento = value;
    }

    /**
     * Obtiene el valor de la propiedad remitente.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRemitente() {
        return remitente;
    }

    /**
     * Define el valor de la propiedad remitente.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRemitente(String value) {
        this.remitente = value;
    }

    /**
     * Obtiene el valor de la propiedad responsableArea.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getResponsableArea() {
        return responsableArea;
    }

    /**
     * Define el valor de la propiedad responsableArea.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setResponsableArea(String value) {
        this.responsableArea = value;
    }

    /**
     * Obtiene el valor de la propiedad responsableUsuario.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getResponsableUsuario() {
        return responsableUsuario;
    }

    /**
     * Define el valor de la propiedad responsableUsuario.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setResponsableUsuario(String value) {
        this.responsableUsuario = value;
    }

    /**
     * Obtiene el valor de la propiedad situacionactual.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSituacionactual() {
        return situacionactual;
    }

    /**
     * Define el valor de la propiedad situacionactual.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSituacionactual(String value) {
        this.situacionactual = value;
    }

    /**
     * Obtiene el valor de la propiedad tipodedocumento.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipodedocumento() {
        return tipodedocumento;
    }

    /**
     * Define el valor de la propiedad tipodedocumento.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipodedocumento(String value) {
        this.tipodedocumento = value;
    }

    /**
     * Obtiene el valor de la propiedad tupa.
     * 
     */
    public int getTupa() {
        return tupa;
    }

    /**
     * Define el valor de la propiedad tupa.
     * 
     */
    public void setTupa(int value) {
        this.tupa = value;
    }

}
