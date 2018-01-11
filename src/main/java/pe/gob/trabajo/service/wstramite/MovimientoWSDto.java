
package pe.gob.trabajo.service.wstramite;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para movimientoWSDto complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="movimientoWSDto">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="apellidoMaternoDestino" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="apellidoPaternoDestino" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="estado" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fechadederivacion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fechadeestado" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nombreDestino" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="observacion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="observacionAtencion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="perfil" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="remitente" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="unidaddestino" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="usuarioDestino" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "movimientoWSDto", propOrder = {
    "apellidoMaternoDestino",
    "apellidoPaternoDestino",
    "estado",
    "fechadederivacion",
    "fechadeestado",
    "nombreDestino",
    "observacion",
    "observacionAtencion",
    "perfil",
    "remitente",
    "unidaddestino",
    "usuarioDestino"
})
public class MovimientoWSDto {

    protected String apellidoMaternoDestino;
    protected String apellidoPaternoDestino;
    protected String estado;
    protected String fechadederivacion;
    protected String fechadeestado;
    protected String nombreDestino;
    protected String observacion;
    protected String observacionAtencion;
    protected String perfil;
    protected String remitente;
    protected String unidaddestino;
    protected String usuarioDestino;

    /**
     * Obtiene el valor de la propiedad apellidoMaternoDestino.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getApellidoMaternoDestino() {
        return apellidoMaternoDestino;
    }

    /**
     * Define el valor de la propiedad apellidoMaternoDestino.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setApellidoMaternoDestino(String value) {
        this.apellidoMaternoDestino = value;
    }

    /**
     * Obtiene el valor de la propiedad apellidoPaternoDestino.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getApellidoPaternoDestino() {
        return apellidoPaternoDestino;
    }

    /**
     * Define el valor de la propiedad apellidoPaternoDestino.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setApellidoPaternoDestino(String value) {
        this.apellidoPaternoDestino = value;
    }

    /**
     * Obtiene el valor de la propiedad estado.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEstado() {
        return estado;
    }

    /**
     * Define el valor de la propiedad estado.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEstado(String value) {
        this.estado = value;
    }

    /**
     * Obtiene el valor de la propiedad fechadederivacion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFechadederivacion() {
        return fechadederivacion;
    }

    /**
     * Define el valor de la propiedad fechadederivacion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFechadederivacion(String value) {
        this.fechadederivacion = value;
    }

    /**
     * Obtiene el valor de la propiedad fechadeestado.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFechadeestado() {
        return fechadeestado;
    }

    /**
     * Define el valor de la propiedad fechadeestado.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFechadeestado(String value) {
        this.fechadeestado = value;
    }

    /**
     * Obtiene el valor de la propiedad nombreDestino.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNombreDestino() {
        return nombreDestino;
    }

    /**
     * Define el valor de la propiedad nombreDestino.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNombreDestino(String value) {
        this.nombreDestino = value;
    }

    /**
     * Obtiene el valor de la propiedad observacion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getObservacion() {
        return observacion;
    }

    /**
     * Define el valor de la propiedad observacion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setObservacion(String value) {
        this.observacion = value;
    }

    /**
     * Obtiene el valor de la propiedad observacionAtencion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getObservacionAtencion() {
        return observacionAtencion;
    }

    /**
     * Define el valor de la propiedad observacionAtencion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setObservacionAtencion(String value) {
        this.observacionAtencion = value;
    }

    /**
     * Obtiene el valor de la propiedad perfil.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPerfil() {
        return perfil;
    }

    /**
     * Define el valor de la propiedad perfil.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPerfil(String value) {
        this.perfil = value;
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
     * Obtiene el valor de la propiedad unidaddestino.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUnidaddestino() {
        return unidaddestino;
    }

    /**
     * Define el valor de la propiedad unidaddestino.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUnidaddestino(String value) {
        this.unidaddestino = value;
    }

    /**
     * Obtiene el valor de la propiedad usuarioDestino.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUsuarioDestino() {
        return usuarioDestino;
    }

    /**
     * Define el valor de la propiedad usuarioDestino.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUsuarioDestino(String value) {
        this.usuarioDestino = value;
    }

}
