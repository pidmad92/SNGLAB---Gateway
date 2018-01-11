
package pe.gob.trabajo.service.wstramite;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the pe.gob.trabajo.service.wstramite package. 
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
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: pe.gob.trabajo.service.wstramite
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
     * Create an instance of {@link ExpedienteWSDto }
     * 
     */
    public ExpedienteWSDto createExpedienteWSDto() {
        return new ExpedienteWSDto();
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
