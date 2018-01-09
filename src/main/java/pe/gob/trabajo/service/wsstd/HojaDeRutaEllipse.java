
package pe.gob.trabajo.service.wsstd;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Clase Java para hojaDeRutaEllipse complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="hojaDeRutaEllipse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="anexos" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="apellidomaterno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="apellidopaterno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="asunto" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="coddist" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="coddisttxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="coddpto" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="coddptotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="codpais" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="codpaistxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="codprov" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="codprovtxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="comentario" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="direccion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="dni" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="estado" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="estadotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fechaCompleto" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaCrea" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaDocFin" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaDocumento" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaFinalizacion" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaModif" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaSuspFin" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="fechaSuspInicio" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="flujosEllipse" type="{http://ws.web.bs.std.mef.gob.pe/}flujosEllipse" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="foliosFin" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="foliosIni" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idarchmed" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idarchmueb" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idclase" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idclaseFin" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idclaseFinSub" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idclaseFinSubtxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idclaseFintxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idclaseSub" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idclaseSubtxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idclaseSup" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idclaseSuptxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idclasetxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="iddoc" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iddocAnexado" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iddocAnexadotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="iddocAnexo" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iddocAnexotxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idgrupo" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idgrupo_txt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idinfocomp" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idinfocomptxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idperson" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idpersontxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idproc" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idproc_cod" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idproc_idunidad" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idproc_idunidad_ini" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idproc_tipo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idprocreqgrp" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idprocreqgrptxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idproctxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idprocunidadtxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idprovee" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idproveeTipo" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="idproveecate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idproveeruc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idproveetxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="idserie" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idubifis" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idunidad" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="idunidadtxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="iduserCrea" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="iduserModif" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="institucionNoReg" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nombres" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numDecLey" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeroAnio" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="numeroDoc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeroDocFin" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeroDocFinSub" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeroDocSub" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeroDocSusp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeroLargoSid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="numeroSid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="observDocFin" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="prioridad" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="prioridadtxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="siglas" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="subtipoexpediente" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="tiempoDiasSupMax" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="tiempoestadia" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="tipoEvaluacion" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="tipoFin" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="tipoFintxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tipoexpediente" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="unidadprovee" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="VCodcom" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="VCodcomtxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="VCodcong" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="VCodcongtxt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "hojaDeRutaEllipse", propOrder = {
    "anexos",
    "apellidomaterno",
    "apellidopaterno",
    "asunto",
    "coddist",
    "coddisttxt",
    "coddpto",
    "coddptotxt",
    "codpais",
    "codpaistxt",
    "codprov",
    "codprovtxt",
    "comentario",
    "direccion",
    "dni",
    "estado",
    "estadotxt",
    "fechaCompleto",
    "fechaCrea",
    "fechaDocFin",
    "fechaDocumento",
    "fechaFinalizacion",
    "fechaModif",
    "fechaSuspFin",
    "fechaSuspInicio",
    "flujosEllipse",
    "foliosFin",
    "foliosIni",
    "idarchmed",
    "idarchmueb",
    "idclase",
    "idclaseFin",
    "idclaseFinSub",
    "idclaseFinSubtxt",
    "idclaseFintxt",
    "idclaseSub",
    "idclaseSubtxt",
    "idclaseSup",
    "idclaseSuptxt",
    "idclasetxt",
    "iddoc",
    "iddocAnexado",
    "iddocAnexadotxt",
    "iddocAnexo",
    "iddocAnexotxt",
    "idgrupo",
    "idgrupoTxt",
    "idinfocomp",
    "idinfocomptxt",
    "idperson",
    "idpersontxt",
    "idproc",
    "idprocCod",
    "idprocIdunidad",
    "idprocIdunidadIni",
    "idprocTipo",
    "idprocreqgrp",
    "idprocreqgrptxt",
    "idproctxt",
    "idprocunidadtxt",
    "idprovee",
    "idproveeTipo",
    "idproveecate",
    "idproveeruc",
    "idproveetxt",
    "idserie",
    "idubifis",
    "idunidad",
    "idunidadtxt",
    "iduserCrea",
    "iduserModif",
    "institucionNoReg",
    "nombres",
    "numDecLey",
    "numeroAnio",
    "numeroDoc",
    "numeroDocFin",
    "numeroDocFinSub",
    "numeroDocSub",
    "numeroDocSusp",
    "numeroLargoSid",
    "numeroSid",
    "observDocFin",
    "prioridad",
    "prioridadtxt",
    "siglas",
    "subtipoexpediente",
    "tiempoDiasSupMax",
    "tiempoestadia",
    "tipoEvaluacion",
    "tipoFin",
    "tipoFintxt",
    "tipoexpediente",
    "unidadprovee",
    "vCodcom",
    "vCodcomtxt",
    "vCodcong",
    "vCodcongtxt"
})
public class HojaDeRutaEllipse {

    protected String anexos;
    protected String apellidomaterno;
    protected String apellidopaterno;
    protected String asunto;
    protected Integer coddist;
    protected String coddisttxt;
    protected Integer coddpto;
    protected String coddptotxt;
    protected Long codpais;
    protected String codpaistxt;
    protected Integer codprov;
    protected String codprovtxt;
    protected String comentario;
    protected String direccion;
    protected String dni;
    protected Integer estado;
    protected String estadotxt;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaCompleto;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaCrea;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaDocFin;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaDocumento;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaFinalizacion;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaModif;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaSuspFin;
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar fechaSuspInicio;
    @XmlElement(nillable = true)
    protected List<FlujosEllipse> flujosEllipse;
    protected Long foliosFin;
    protected Long foliosIni;
    protected Long idarchmed;
    protected Long idarchmueb;
    protected Long idclase;
    protected Long idclaseFin;
    protected Long idclaseFinSub;
    protected String idclaseFinSubtxt;
    protected String idclaseFintxt;
    protected Long idclaseSub;
    protected String idclaseSubtxt;
    protected Long idclaseSup;
    protected String idclaseSuptxt;
    protected String idclasetxt;
    protected Long iddoc;
    protected Long iddocAnexado;
    protected String iddocAnexadotxt;
    protected Long iddocAnexo;
    protected String iddocAnexotxt;
    protected Long idgrupo;
    @XmlElement(name = "idgrupo_txt")
    protected String idgrupoTxt;
    protected Long idinfocomp;
    protected String idinfocomptxt;
    protected Long idperson;
    protected String idpersontxt;
    protected Long idproc;
    @XmlElement(name = "idproc_cod")
    protected String idprocCod;
    @XmlElement(name = "idproc_idunidad")
    protected Long idprocIdunidad;
    @XmlElement(name = "idproc_idunidad_ini")
    protected Long idprocIdunidadIni;
    @XmlElement(name = "idproc_tipo")
    protected String idprocTipo;
    protected Long idprocreqgrp;
    protected String idprocreqgrptxt;
    protected String idproctxt;
    protected String idprocunidadtxt;
    protected Long idprovee;
    protected int idproveeTipo;
    protected String idproveecate;
    protected String idproveeruc;
    protected String idproveetxt;
    protected Long idserie;
    protected Long idubifis;
    protected Long idunidad;
    protected String idunidadtxt;
    protected Long iduserCrea;
    protected Long iduserModif;
    protected String institucionNoReg;
    protected String nombres;
    protected String numDecLey;
    protected Integer numeroAnio;
    protected String numeroDoc;
    protected String numeroDocFin;
    protected String numeroDocFinSub;
    protected String numeroDocSub;
    protected String numeroDocSusp;
    protected String numeroLargoSid;
    protected String numeroSid;
    protected String observDocFin;
    protected Integer prioridad;
    protected String prioridadtxt;
    protected String siglas;
    protected Integer subtipoexpediente;
    protected Integer tiempoDiasSupMax;
    protected Long tiempoestadia;
    protected Integer tipoEvaluacion;
    protected Integer tipoFin;
    protected String tipoFintxt;
    protected Integer tipoexpediente;
    protected String unidadprovee;
    @XmlElement(name = "VCodcom")
    protected Long vCodcom;
    @XmlElement(name = "VCodcomtxt")
    protected String vCodcomtxt;
    @XmlElement(name = "VCodcong")
    protected Long vCodcong;
    @XmlElement(name = "VCodcongtxt")
    protected String vCodcongtxt;

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
     * Obtiene el valor de la propiedad apellidomaterno.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getApellidomaterno() {
        return apellidomaterno;
    }

    /**
     * Define el valor de la propiedad apellidomaterno.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setApellidomaterno(String value) {
        this.apellidomaterno = value;
    }

    /**
     * Obtiene el valor de la propiedad apellidopaterno.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getApellidopaterno() {
        return apellidopaterno;
    }

    /**
     * Define el valor de la propiedad apellidopaterno.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setApellidopaterno(String value) {
        this.apellidopaterno = value;
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
     * Obtiene el valor de la propiedad coddist.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getCoddist() {
        return coddist;
    }

    /**
     * Define el valor de la propiedad coddist.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setCoddist(Integer value) {
        this.coddist = value;
    }

    /**
     * Obtiene el valor de la propiedad coddisttxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCoddisttxt() {
        return coddisttxt;
    }

    /**
     * Define el valor de la propiedad coddisttxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCoddisttxt(String value) {
        this.coddisttxt = value;
    }

    /**
     * Obtiene el valor de la propiedad coddpto.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getCoddpto() {
        return coddpto;
    }

    /**
     * Define el valor de la propiedad coddpto.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setCoddpto(Integer value) {
        this.coddpto = value;
    }

    /**
     * Obtiene el valor de la propiedad coddptotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCoddptotxt() {
        return coddptotxt;
    }

    /**
     * Define el valor de la propiedad coddptotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCoddptotxt(String value) {
        this.coddptotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad codpais.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getCodpais() {
        return codpais;
    }

    /**
     * Define el valor de la propiedad codpais.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setCodpais(Long value) {
        this.codpais = value;
    }

    /**
     * Obtiene el valor de la propiedad codpaistxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodpaistxt() {
        return codpaistxt;
    }

    /**
     * Define el valor de la propiedad codpaistxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodpaistxt(String value) {
        this.codpaistxt = value;
    }

    /**
     * Obtiene el valor de la propiedad codprov.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getCodprov() {
        return codprov;
    }

    /**
     * Define el valor de la propiedad codprov.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setCodprov(Integer value) {
        this.codprov = value;
    }

    /**
     * Obtiene el valor de la propiedad codprovtxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodprovtxt() {
        return codprovtxt;
    }

    /**
     * Define el valor de la propiedad codprovtxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodprovtxt(String value) {
        this.codprovtxt = value;
    }

    /**
     * Obtiene el valor de la propiedad comentario.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getComentario() {
        return comentario;
    }

    /**
     * Define el valor de la propiedad comentario.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setComentario(String value) {
        this.comentario = value;
    }

    /**
     * Obtiene el valor de la propiedad direccion.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * Define el valor de la propiedad direccion.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDireccion(String value) {
        this.direccion = value;
    }

    /**
     * Obtiene el valor de la propiedad dni.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDni() {
        return dni;
    }

    /**
     * Define el valor de la propiedad dni.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDni(String value) {
        this.dni = value;
    }

    /**
     * Obtiene el valor de la propiedad estado.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getEstado() {
        return estado;
    }

    /**
     * Define el valor de la propiedad estado.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setEstado(Integer value) {
        this.estado = value;
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
     * Obtiene el valor de la propiedad fechaCompleto.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaCompleto() {
        return fechaCompleto;
    }

    /**
     * Define el valor de la propiedad fechaCompleto.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaCompleto(XMLGregorianCalendar value) {
        this.fechaCompleto = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaCrea.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaCrea() {
        return fechaCrea;
    }

    /**
     * Define el valor de la propiedad fechaCrea.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaCrea(XMLGregorianCalendar value) {
        this.fechaCrea = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaDocFin.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaDocFin() {
        return fechaDocFin;
    }

    /**
     * Define el valor de la propiedad fechaDocFin.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaDocFin(XMLGregorianCalendar value) {
        this.fechaDocFin = value;
    }

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
     * Obtiene el valor de la propiedad fechaFinalizacion.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaFinalizacion() {
        return fechaFinalizacion;
    }

    /**
     * Define el valor de la propiedad fechaFinalizacion.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaFinalizacion(XMLGregorianCalendar value) {
        this.fechaFinalizacion = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaModif.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaModif() {
        return fechaModif;
    }

    /**
     * Define el valor de la propiedad fechaModif.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaModif(XMLGregorianCalendar value) {
        this.fechaModif = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaSuspFin.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaSuspFin() {
        return fechaSuspFin;
    }

    /**
     * Define el valor de la propiedad fechaSuspFin.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaSuspFin(XMLGregorianCalendar value) {
        this.fechaSuspFin = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaSuspInicio.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFechaSuspInicio() {
        return fechaSuspInicio;
    }

    /**
     * Define el valor de la propiedad fechaSuspInicio.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFechaSuspInicio(XMLGregorianCalendar value) {
        this.fechaSuspInicio = value;
    }

    /**
     * Gets the value of the flujosEllipse property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the flujosEllipse property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFlujosEllipse().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link FlujosEllipse }
     * 
     * 
     */
    public List<FlujosEllipse> getFlujosEllipse() {
        if (flujosEllipse == null) {
            flujosEllipse = new ArrayList<FlujosEllipse>();
        }
        return this.flujosEllipse;
    }

    /**
     * Obtiene el valor de la propiedad foliosFin.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getFoliosFin() {
        return foliosFin;
    }

    /**
     * Define el valor de la propiedad foliosFin.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setFoliosFin(Long value) {
        this.foliosFin = value;
    }

    /**
     * Obtiene el valor de la propiedad foliosIni.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getFoliosIni() {
        return foliosIni;
    }

    /**
     * Define el valor de la propiedad foliosIni.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setFoliosIni(Long value) {
        this.foliosIni = value;
    }

    /**
     * Obtiene el valor de la propiedad idarchmed.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdarchmed() {
        return idarchmed;
    }

    /**
     * Define el valor de la propiedad idarchmed.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdarchmed(Long value) {
        this.idarchmed = value;
    }

    /**
     * Obtiene el valor de la propiedad idarchmueb.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdarchmueb() {
        return idarchmueb;
    }

    /**
     * Define el valor de la propiedad idarchmueb.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdarchmueb(Long value) {
        this.idarchmueb = value;
    }

    /**
     * Obtiene el valor de la propiedad idclase.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdclase() {
        return idclase;
    }

    /**
     * Define el valor de la propiedad idclase.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdclase(Long value) {
        this.idclase = value;
    }

    /**
     * Obtiene el valor de la propiedad idclaseFin.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdclaseFin() {
        return idclaseFin;
    }

    /**
     * Define el valor de la propiedad idclaseFin.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdclaseFin(Long value) {
        this.idclaseFin = value;
    }

    /**
     * Obtiene el valor de la propiedad idclaseFinSub.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdclaseFinSub() {
        return idclaseFinSub;
    }

    /**
     * Define el valor de la propiedad idclaseFinSub.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdclaseFinSub(Long value) {
        this.idclaseFinSub = value;
    }

    /**
     * Obtiene el valor de la propiedad idclaseFinSubtxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdclaseFinSubtxt() {
        return idclaseFinSubtxt;
    }

    /**
     * Define el valor de la propiedad idclaseFinSubtxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdclaseFinSubtxt(String value) {
        this.idclaseFinSubtxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idclaseFintxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdclaseFintxt() {
        return idclaseFintxt;
    }

    /**
     * Define el valor de la propiedad idclaseFintxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdclaseFintxt(String value) {
        this.idclaseFintxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idclaseSub.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdclaseSub() {
        return idclaseSub;
    }

    /**
     * Define el valor de la propiedad idclaseSub.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdclaseSub(Long value) {
        this.idclaseSub = value;
    }

    /**
     * Obtiene el valor de la propiedad idclaseSubtxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdclaseSubtxt() {
        return idclaseSubtxt;
    }

    /**
     * Define el valor de la propiedad idclaseSubtxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdclaseSubtxt(String value) {
        this.idclaseSubtxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idclaseSup.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdclaseSup() {
        return idclaseSup;
    }

    /**
     * Define el valor de la propiedad idclaseSup.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdclaseSup(Long value) {
        this.idclaseSup = value;
    }

    /**
     * Obtiene el valor de la propiedad idclaseSuptxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdclaseSuptxt() {
        return idclaseSuptxt;
    }

    /**
     * Define el valor de la propiedad idclaseSuptxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdclaseSuptxt(String value) {
        this.idclaseSuptxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idclasetxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdclasetxt() {
        return idclasetxt;
    }

    /**
     * Define el valor de la propiedad idclasetxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdclasetxt(String value) {
        this.idclasetxt = value;
    }

    /**
     * Obtiene el valor de la propiedad iddoc.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIddoc() {
        return iddoc;
    }

    /**
     * Define el valor de la propiedad iddoc.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIddoc(Long value) {
        this.iddoc = value;
    }

    /**
     * Obtiene el valor de la propiedad iddocAnexado.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIddocAnexado() {
        return iddocAnexado;
    }

    /**
     * Define el valor de la propiedad iddocAnexado.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIddocAnexado(Long value) {
        this.iddocAnexado = value;
    }

    /**
     * Obtiene el valor de la propiedad iddocAnexadotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIddocAnexadotxt() {
        return iddocAnexadotxt;
    }

    /**
     * Define el valor de la propiedad iddocAnexadotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIddocAnexadotxt(String value) {
        this.iddocAnexadotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad iddocAnexo.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIddocAnexo() {
        return iddocAnexo;
    }

    /**
     * Define el valor de la propiedad iddocAnexo.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIddocAnexo(Long value) {
        this.iddocAnexo = value;
    }

    /**
     * Obtiene el valor de la propiedad iddocAnexotxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIddocAnexotxt() {
        return iddocAnexotxt;
    }

    /**
     * Define el valor de la propiedad iddocAnexotxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIddocAnexotxt(String value) {
        this.iddocAnexotxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idgrupo.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdgrupo() {
        return idgrupo;
    }

    /**
     * Define el valor de la propiedad idgrupo.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdgrupo(Long value) {
        this.idgrupo = value;
    }

    /**
     * Obtiene el valor de la propiedad idgrupoTxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdgrupoTxt() {
        return idgrupoTxt;
    }

    /**
     * Define el valor de la propiedad idgrupoTxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdgrupoTxt(String value) {
        this.idgrupoTxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idinfocomp.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdinfocomp() {
        return idinfocomp;
    }

    /**
     * Define el valor de la propiedad idinfocomp.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdinfocomp(Long value) {
        this.idinfocomp = value;
    }

    /**
     * Obtiene el valor de la propiedad idinfocomptxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdinfocomptxt() {
        return idinfocomptxt;
    }

    /**
     * Define el valor de la propiedad idinfocomptxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdinfocomptxt(String value) {
        this.idinfocomptxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idperson.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdperson() {
        return idperson;
    }

    /**
     * Define el valor de la propiedad idperson.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdperson(Long value) {
        this.idperson = value;
    }

    /**
     * Obtiene el valor de la propiedad idpersontxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdpersontxt() {
        return idpersontxt;
    }

    /**
     * Define el valor de la propiedad idpersontxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdpersontxt(String value) {
        this.idpersontxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idproc.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdproc() {
        return idproc;
    }

    /**
     * Define el valor de la propiedad idproc.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdproc(Long value) {
        this.idproc = value;
    }

    /**
     * Obtiene el valor de la propiedad idprocCod.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdprocCod() {
        return idprocCod;
    }

    /**
     * Define el valor de la propiedad idprocCod.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdprocCod(String value) {
        this.idprocCod = value;
    }

    /**
     * Obtiene el valor de la propiedad idprocIdunidad.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdprocIdunidad() {
        return idprocIdunidad;
    }

    /**
     * Define el valor de la propiedad idprocIdunidad.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdprocIdunidad(Long value) {
        this.idprocIdunidad = value;
    }

    /**
     * Obtiene el valor de la propiedad idprocIdunidadIni.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdprocIdunidadIni() {
        return idprocIdunidadIni;
    }

    /**
     * Define el valor de la propiedad idprocIdunidadIni.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdprocIdunidadIni(Long value) {
        this.idprocIdunidadIni = value;
    }

    /**
     * Obtiene el valor de la propiedad idprocTipo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdprocTipo() {
        return idprocTipo;
    }

    /**
     * Define el valor de la propiedad idprocTipo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdprocTipo(String value) {
        this.idprocTipo = value;
    }

    /**
     * Obtiene el valor de la propiedad idprocreqgrp.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdprocreqgrp() {
        return idprocreqgrp;
    }

    /**
     * Define el valor de la propiedad idprocreqgrp.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdprocreqgrp(Long value) {
        this.idprocreqgrp = value;
    }

    /**
     * Obtiene el valor de la propiedad idprocreqgrptxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdprocreqgrptxt() {
        return idprocreqgrptxt;
    }

    /**
     * Define el valor de la propiedad idprocreqgrptxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdprocreqgrptxt(String value) {
        this.idprocreqgrptxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idproctxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdproctxt() {
        return idproctxt;
    }

    /**
     * Define el valor de la propiedad idproctxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdproctxt(String value) {
        this.idproctxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idprocunidadtxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdprocunidadtxt() {
        return idprocunidadtxt;
    }

    /**
     * Define el valor de la propiedad idprocunidadtxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdprocunidadtxt(String value) {
        this.idprocunidadtxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idprovee.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdprovee() {
        return idprovee;
    }

    /**
     * Define el valor de la propiedad idprovee.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdprovee(Long value) {
        this.idprovee = value;
    }

    /**
     * Obtiene el valor de la propiedad idproveeTipo.
     * 
     */
    public int getIdproveeTipo() {
        return idproveeTipo;
    }

    /**
     * Define el valor de la propiedad idproveeTipo.
     * 
     */
    public void setIdproveeTipo(int value) {
        this.idproveeTipo = value;
    }

    /**
     * Obtiene el valor de la propiedad idproveecate.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdproveecate() {
        return idproveecate;
    }

    /**
     * Define el valor de la propiedad idproveecate.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdproveecate(String value) {
        this.idproveecate = value;
    }

    /**
     * Obtiene el valor de la propiedad idproveeruc.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdproveeruc() {
        return idproveeruc;
    }

    /**
     * Define el valor de la propiedad idproveeruc.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdproveeruc(String value) {
        this.idproveeruc = value;
    }

    /**
     * Obtiene el valor de la propiedad idproveetxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdproveetxt() {
        return idproveetxt;
    }

    /**
     * Define el valor de la propiedad idproveetxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdproveetxt(String value) {
        this.idproveetxt = value;
    }

    /**
     * Obtiene el valor de la propiedad idserie.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdserie() {
        return idserie;
    }

    /**
     * Define el valor de la propiedad idserie.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdserie(Long value) {
        this.idserie = value;
    }

    /**
     * Obtiene el valor de la propiedad idubifis.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdubifis() {
        return idubifis;
    }

    /**
     * Define el valor de la propiedad idubifis.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdubifis(Long value) {
        this.idubifis = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidad.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIdunidad() {
        return idunidad;
    }

    /**
     * Define el valor de la propiedad idunidad.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIdunidad(Long value) {
        this.idunidad = value;
    }

    /**
     * Obtiene el valor de la propiedad idunidadtxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdunidadtxt() {
        return idunidadtxt;
    }

    /**
     * Define el valor de la propiedad idunidadtxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdunidadtxt(String value) {
        this.idunidadtxt = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserCrea.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIduserCrea() {
        return iduserCrea;
    }

    /**
     * Define el valor de la propiedad iduserCrea.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIduserCrea(Long value) {
        this.iduserCrea = value;
    }

    /**
     * Obtiene el valor de la propiedad iduserModif.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIduserModif() {
        return iduserModif;
    }

    /**
     * Define el valor de la propiedad iduserModif.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIduserModif(Long value) {
        this.iduserModif = value;
    }

    /**
     * Obtiene el valor de la propiedad institucionNoReg.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInstitucionNoReg() {
        return institucionNoReg;
    }

    /**
     * Define el valor de la propiedad institucionNoReg.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInstitucionNoReg(String value) {
        this.institucionNoReg = value;
    }

    /**
     * Obtiene el valor de la propiedad nombres.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNombres() {
        return nombres;
    }

    /**
     * Define el valor de la propiedad nombres.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNombres(String value) {
        this.nombres = value;
    }

    /**
     * Obtiene el valor de la propiedad numDecLey.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumDecLey() {
        return numDecLey;
    }

    /**
     * Define el valor de la propiedad numDecLey.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumDecLey(String value) {
        this.numDecLey = value;
    }

    /**
     * Obtiene el valor de la propiedad numeroAnio.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getNumeroAnio() {
        return numeroAnio;
    }

    /**
     * Define el valor de la propiedad numeroAnio.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setNumeroAnio(Integer value) {
        this.numeroAnio = value;
    }

    /**
     * Obtiene el valor de la propiedad numeroDoc.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroDoc() {
        return numeroDoc;
    }

    /**
     * Define el valor de la propiedad numeroDoc.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroDoc(String value) {
        this.numeroDoc = value;
    }

    /**
     * Obtiene el valor de la propiedad numeroDocFin.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroDocFin() {
        return numeroDocFin;
    }

    /**
     * Define el valor de la propiedad numeroDocFin.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroDocFin(String value) {
        this.numeroDocFin = value;
    }

    /**
     * Obtiene el valor de la propiedad numeroDocFinSub.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroDocFinSub() {
        return numeroDocFinSub;
    }

    /**
     * Define el valor de la propiedad numeroDocFinSub.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroDocFinSub(String value) {
        this.numeroDocFinSub = value;
    }

    /**
     * Obtiene el valor de la propiedad numeroDocSub.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroDocSub() {
        return numeroDocSub;
    }

    /**
     * Define el valor de la propiedad numeroDocSub.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroDocSub(String value) {
        this.numeroDocSub = value;
    }

    /**
     * Obtiene el valor de la propiedad numeroDocSusp.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroDocSusp() {
        return numeroDocSusp;
    }

    /**
     * Define el valor de la propiedad numeroDocSusp.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroDocSusp(String value) {
        this.numeroDocSusp = value;
    }

    /**
     * Obtiene el valor de la propiedad numeroLargoSid.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroLargoSid() {
        return numeroLargoSid;
    }

    /**
     * Define el valor de la propiedad numeroLargoSid.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroLargoSid(String value) {
        this.numeroLargoSid = value;
    }

    /**
     * Obtiene el valor de la propiedad numeroSid.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroSid() {
        return numeroSid;
    }

    /**
     * Define el valor de la propiedad numeroSid.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroSid(String value) {
        this.numeroSid = value;
    }

    /**
     * Obtiene el valor de la propiedad observDocFin.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getObservDocFin() {
        return observDocFin;
    }

    /**
     * Define el valor de la propiedad observDocFin.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setObservDocFin(String value) {
        this.observDocFin = value;
    }

    /**
     * Obtiene el valor de la propiedad prioridad.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getPrioridad() {
        return prioridad;
    }

    /**
     * Define el valor de la propiedad prioridad.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setPrioridad(Integer value) {
        this.prioridad = value;
    }

    /**
     * Obtiene el valor de la propiedad prioridadtxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrioridadtxt() {
        return prioridadtxt;
    }

    /**
     * Define el valor de la propiedad prioridadtxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrioridadtxt(String value) {
        this.prioridadtxt = value;
    }

    /**
     * Obtiene el valor de la propiedad siglas.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSiglas() {
        return siglas;
    }

    /**
     * Define el valor de la propiedad siglas.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSiglas(String value) {
        this.siglas = value;
    }

    /**
     * Obtiene el valor de la propiedad subtipoexpediente.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getSubtipoexpediente() {
        return subtipoexpediente;
    }

    /**
     * Define el valor de la propiedad subtipoexpediente.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setSubtipoexpediente(Integer value) {
        this.subtipoexpediente = value;
    }

    /**
     * Obtiene el valor de la propiedad tiempoDiasSupMax.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getTiempoDiasSupMax() {
        return tiempoDiasSupMax;
    }

    /**
     * Define el valor de la propiedad tiempoDiasSupMax.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setTiempoDiasSupMax(Integer value) {
        this.tiempoDiasSupMax = value;
    }

    /**
     * Obtiene el valor de la propiedad tiempoestadia.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getTiempoestadia() {
        return tiempoestadia;
    }

    /**
     * Define el valor de la propiedad tiempoestadia.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setTiempoestadia(Long value) {
        this.tiempoestadia = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoEvaluacion.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getTipoEvaluacion() {
        return tipoEvaluacion;
    }

    /**
     * Define el valor de la propiedad tipoEvaluacion.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setTipoEvaluacion(Integer value) {
        this.tipoEvaluacion = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoFin.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getTipoFin() {
        return tipoFin;
    }

    /**
     * Define el valor de la propiedad tipoFin.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setTipoFin(Integer value) {
        this.tipoFin = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoFintxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTipoFintxt() {
        return tipoFintxt;
    }

    /**
     * Define el valor de la propiedad tipoFintxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTipoFintxt(String value) {
        this.tipoFintxt = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoexpediente.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getTipoexpediente() {
        return tipoexpediente;
    }

    /**
     * Define el valor de la propiedad tipoexpediente.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setTipoexpediente(Integer value) {
        this.tipoexpediente = value;
    }

    /**
     * Obtiene el valor de la propiedad unidadprovee.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUnidadprovee() {
        return unidadprovee;
    }

    /**
     * Define el valor de la propiedad unidadprovee.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUnidadprovee(String value) {
        this.unidadprovee = value;
    }

    /**
     * Obtiene el valor de la propiedad vCodcom.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getVCodcom() {
        return vCodcom;
    }

    /**
     * Define el valor de la propiedad vCodcom.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setVCodcom(Long value) {
        this.vCodcom = value;
    }

    /**
     * Obtiene el valor de la propiedad vCodcomtxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVCodcomtxt() {
        return vCodcomtxt;
    }

    /**
     * Define el valor de la propiedad vCodcomtxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVCodcomtxt(String value) {
        this.vCodcomtxt = value;
    }

    /**
     * Obtiene el valor de la propiedad vCodcong.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getVCodcong() {
        return vCodcong;
    }

    /**
     * Define el valor de la propiedad vCodcong.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setVCodcong(Long value) {
        this.vCodcong = value;
    }

    /**
     * Obtiene el valor de la propiedad vCodcongtxt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVCodcongtxt() {
        return vCodcongtxt;
    }

    /**
     * Define el valor de la propiedad vCodcongtxt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVCodcongtxt(String value) {
        this.vCodcongtxt = value;
    }

}
