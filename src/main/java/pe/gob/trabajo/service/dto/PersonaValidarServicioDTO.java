package pe.gob.trabajo.service.dto;

public class PersonaValidarServicioDTO {

    private String vNumdoc;
    private String vApepat;
    private String vApemat;
    private String TipoDoc;  
    private boolean Resultado;
    private String vNombres;
    private String dFecnac;
    private String genero;
    private String estadoCivil;
    private String codigo;
    private String coddep;
    private String codpro;
    private String coddist;
    private String direccion;

    public PersonaValidarServicioDTO(){
    }

    public boolean getResultado() {
        return Resultado;
    }

    public String getNombres()
    {
      return this.vNombres;
    }
    
    public void setNombres(String nombres)
    {
      this.vNombres = nombres;
    }

    /**
     * @param NumeroDoc the NumeroDoc to set
     */
    public void setResultado(Boolean Resultado) {
        this.Resultado = Resultado;
    }

    public String getNumeroDoc() {
        return vNumdoc;
    }

    /**
     * @param NumeroDoc the NumeroDoc to set
     */
    public void setNumeroDoc(String NumeroDoc) {
        this.vNumdoc = NumeroDoc;
    }

    /**
     * @return the ApePaterno
     */
    public String getApePaterno() {
        return vApepat;
    }

    /**
     * @param ApePaterno the ApePaterno to set
     */
    public void setApePaterno(String ApePaterno) {
        this.vApepat = ApePaterno;
    }

    /**
     * @return the ApeMaterno
     */
    public String getApeMaterno() {
        return vApemat;
    }

    /**
     * @param ApeMaterno the ApeMaterno to set
     */
    public void setApeMaterno(String ApeMaterno) {
        this.vApemat = ApeMaterno;
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

    public String getFechaNacimiento()
    {
      return this.dFecnac;
    }
    
    public void setFechaNacimiento(String fechaNacimiento)
    {
      this.dFecnac = fechaNacimiento;
    }
    
    public String getGenero()
    {
      return this.genero;
    }
    
    public void setGenero(String genero)
    {
      this.genero = genero;
    }
    
    public String getEstadoCivil()
    {
      return this.estadoCivil;
    }
    
    public void setEstadoCivil(String estadoCivil)
    {
      this.estadoCivil = estadoCivil;
    }

    public String getCodigo()
    {
      return this.codigo;
    }
    
    public void setCodigo(String codigo)
    {
      this.codigo = codigo;
    }
    
    public String getCoddep()
    {
      return this.coddep;
    }
    
    public void setCoddep(String coddep)
    {
      this.coddep = coddep;
    }
    
    public String getCodpro()
    {
      return this.codpro;
    }
    
    public void setCodpro(String codpro)
    {
      this.codpro = codpro;
    }
    
    public String getCoddist()
    {
      return this.coddist;
    }
    
    public void setCoddist(String coddist)
    {
      this.coddist = coddist;
    }
    
    public String getDireccion()
    {
      return this.direccion;
    }
    
    public void setDireccion(String direccion)
    {
      this.direccion = direccion;
    }
}