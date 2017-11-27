package pe.gob.trabajo.service.dto;

public class PersonaValidarServicioDTO {

    private String NumeroDoc;
    private String ApePaterno;
    private String ApeMaterno;
    private String TipoDoc;  
    private boolean Resultado;

    public PersonaValidarServicioDTO(){
    }

    public boolean getResultado() {
        return Resultado;
    }

    /**
     * @param NumeroDoc the NumeroDoc to set
     */
    public void setResultado(Boolean Resultado) {
        this.Resultado = Resultado;
    }

    public String getNumeroDoc() {
        return NumeroDoc;
    }

    /**
     * @param NumeroDoc the NumeroDoc to set
     */
    public void setNumeroDoc(String NumeroDoc) {
        this.NumeroDoc = NumeroDoc;
    }

    /**
     * @return the ApePaterno
     */
    public String getApePaterno() {
        return ApePaterno;
    }

    /**
     * @param ApePaterno the ApePaterno to set
     */
    public void setApePaterno(String ApePaterno) {
        this.ApePaterno = ApePaterno;
    }

    /**
     * @return the ApeMaterno
     */
    public String getApeMaterno() {
        return ApeMaterno;
    }

    /**
     * @param ApeMaterno the ApeMaterno to set
     */
    public void setApeMaterno(String ApeMaterno) {
        this.ApeMaterno = ApeMaterno;
    }

    /**
     * @return the TipoDoc
     */
    public String getTipoDoc() {
        return TipoDoc;
    }

    /**
     * @param TipoDoc the TipoDoc to set
     */
    public void setTipoDoc(String TipoDoc) {
        this.TipoDoc = TipoDoc;
    }
}