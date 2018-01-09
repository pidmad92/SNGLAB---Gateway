
package pe.gob.trabajo.service.wsstd;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the pe.gob.trabajo.service.wsstd package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _ErrorDeServicio_QNAME = new QName("http://ws.web.bs.std.mef.gob.pe/", "ErrorDeServicio");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: pe.gob.trabajo.service.wsstd
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ErrorInfo }
     * 
     */
    public ErrorInfo createErrorInfo() {
        return new ErrorInfo();
    }

    /**
     * Create an instance of {@link CasaComercializadora }
     * 
     */
    public CasaComercializadora createCasaComercializadora() {
        return new CasaComercializadora();
    }

    /**
     * Create an instance of {@link HojaDeRutaEllipse }
     * 
     */
    public HojaDeRutaEllipse createHojaDeRutaEllipse() {
        return new HojaDeRutaEllipse();
    }

    /**
     * Create an instance of {@link VucSTDExpediente }
     * 
     */
    public VucSTDExpediente createVucSTDExpediente() {
        return new VucSTDExpediente();
    }

    /**
     * Create an instance of {@link MsgDocumentosHojasEnvioWsDto }
     * 
     */
    public MsgDocumentosHojasEnvioWsDto createMsgDocumentosHojasEnvioWsDto() {
        return new MsgDocumentosHojasEnvioWsDto();
    }

    /**
     * Create an instance of {@link MovimientoWSDto }
     * 
     */
    public MovimientoWSDto createMovimientoWSDto() {
        return new MovimientoWSDto();
    }

    /**
     * Create an instance of {@link VucmSolicitud }
     * 
     */
    public VucmSolicitud createVucmSolicitud() {
        return new VucmSolicitud();
    }

    /**
     * Create an instance of {@link VucmSolicitudPersona }
     * 
     */
    public VucmSolicitudPersona createVucmSolicitudPersona() {
        return new VucmSolicitudPersona();
    }

    /**
     * Create an instance of {@link HojaDeEnvioWsDto }
     * 
     */
    public HojaDeEnvioWsDto createHojaDeEnvioWsDto() {
        return new HojaDeEnvioWsDto();
    }

    /**
     * Create an instance of {@link VucdProducto }
     * 
     */
    public VucdProducto createVucdProducto() {
        return new VucdProducto();
    }

    /**
     * Create an instance of {@link MsgDestinatarioArray }
     * 
     */
    public MsgDestinatarioArray createMsgDestinatarioArray() {
        return new MsgDestinatarioArray();
    }

    /**
     * Create an instance of {@link VucdTablonArray }
     * 
     */
    public VucdTablonArray createVucdTablonArray() {
        return new VucdTablonArray();
    }

    /**
     * Create an instance of {@link VucdFactura }
     * 
     */
    public VucdFactura createVucdFactura() {
        return new VucdFactura();
    }

    /**
     * Create an instance of {@link VucdFacturaDetalle }
     * 
     */
    public VucdFacturaDetalle createVucdFacturaDetalle() {
        return new VucdFacturaDetalle();
    }

    /**
     * Create an instance of {@link Administrado }
     * 
     */
    public Administrado createAdministrado() {
        return new Administrado();
    }

    /**
     * Create an instance of {@link HojaDeRutaEllipseArray }
     * 
     */
    public HojaDeRutaEllipseArray createHojaDeRutaEllipseArray() {
        return new HojaDeRutaEllipseArray();
    }

    /**
     * Create an instance of {@link VucdTablon }
     * 
     */
    public VucdTablon createVucdTablon() {
        return new VucdTablon();
    }

    /**
     * Create an instance of {@link ExpedienteWSDtoArray }
     * 
     */
    public ExpedienteWSDtoArray createExpedienteWSDtoArray() {
        return new ExpedienteWSDtoArray();
    }

    /**
     * Create an instance of {@link HojaDeEnvioWsDtoArray }
     * 
     */
    public HojaDeEnvioWsDtoArray createHojaDeEnvioWsDtoArray() {
        return new HojaDeEnvioWsDtoArray();
    }

    /**
     * Create an instance of {@link FlujosEllipse }
     * 
     */
    public FlujosEllipse createFlujosEllipse() {
        return new FlujosEllipse();
    }

    /**
     * Create an instance of {@link VucdFacturaArray }
     * 
     */
    public VucdFacturaArray createVucdFacturaArray() {
        return new VucdFacturaArray();
    }

    /**
     * Create an instance of {@link MsgDestinatario }
     * 
     */
    public MsgDestinatario createMsgDestinatario() {
        return new MsgDestinatario();
    }

    /**
     * Create an instance of {@link ExpedienteWSDto }
     * 
     */
    public ExpedienteWSDto createExpedienteWSDto() {
        return new ExpedienteWSDto();
    }

    /**
     * Create an instance of {@link StringArray }
     * 
     */
    public StringArray createStringArray() {
        return new StringArray();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ErrorInfo }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ws.web.bs.std.mef.gob.pe/", name = "ErrorDeServicio")
    public JAXBElement<ErrorInfo> createErrorDeServicio(ErrorInfo value) {
        return new JAXBElement<ErrorInfo>(_ErrorDeServicio_QNAME, ErrorInfo.class, null, value);
    }

}
