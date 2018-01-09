
package pe.gob.trabajo.service.wsstd;

import javax.xml.ws.WebFault;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.8
 * Generated source version: 2.2
 * 
 */
@WebFault(name = "ErrorDeServicio", targetNamespace = "http://ws.web.bs.std.mef.gob.pe/")
public class ErrorDeServicio
    extends Exception
{

    /**
     * Java type that goes as soapenv:Fault detail element.
     * 
     */
    private ErrorInfo faultInfo;

    /**
     * 
     * @param faultInfo
     * @param message
     */
    public ErrorDeServicio(String message, ErrorInfo faultInfo) {
        super(message);
        this.faultInfo = faultInfo;
    }

    /**
     * 
     * @param faultInfo
     * @param cause
     * @param message
     */
    public ErrorDeServicio(String message, ErrorInfo faultInfo, Throwable cause) {
        super(message, cause);
        this.faultInfo = faultInfo;
    }

    /**
     * 
     * @return
     *     returns fault bean: pe.gob.trabajo.service.wsstd.ErrorInfo
     */
    public ErrorInfo getFaultInfo() {
        return faultInfo;
    }

}
