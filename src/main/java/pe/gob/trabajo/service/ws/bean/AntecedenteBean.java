package pe.gob.trabajo.service.ws.bean;

import java.io.Serializable;
import java.util.Date;

public class AntecedenteBean
  implements Serializable
{
  private String code;
  private String message;
  private Date fechaCaducidad;
  private String nombres;
  private String apellidoPaterno;
  private String apellidoMaterno;
  private String motivoSolicitud;
  private String nroCertificado;
  private String tieneAntecedentes;
  
  public String getCode()
  {
    return this.code;
  }
  
  public void setCode(String code)
  {
    this.code = code;
  }
  
  public String getMessage()
  {
    return this.message;
  }
  
  public void setMessage(String message)
  {
    this.message = message;
  }
  
  public Date getFechaCaducidad()
  {
    return this.fechaCaducidad;
  }
  
  public void setFechaCaducidad(Date fechaCaducidad)
  {
    this.fechaCaducidad = fechaCaducidad;
  }
  
  public String getNombres()
  {
    return this.nombres;
  }
  
  public void setNombres(String nombres)
  {
    this.nombres = nombres;
  }
  
  public String getApellidoPaterno()
  {
    return this.apellidoPaterno;
  }
  
  public void setApellidoPaterno(String apellidoPaterno)
  {
    this.apellidoPaterno = apellidoPaterno;
  }
  
  public String getApellidoMaterno()
  {
    return this.apellidoMaterno;
  }
  
  public void setApellidoMaterno(String apellidoMaterno)
  {
    this.apellidoMaterno = apellidoMaterno;
  }
  
  public String getMotivoSolicitud()
  {
    return this.motivoSolicitud;
  }
  
  public void setMotivoSolicitud(String motivoSolicitud)
  {
    this.motivoSolicitud = motivoSolicitud;
  }
  
  public String getNroCertificado()
  {
    return this.nroCertificado;
  }
  
  public void setNroCertificado(String nroCertificado)
  {
    this.nroCertificado = nroCertificado;
  }
  
  public String getTieneAntecedentes()
  {
    return this.tieneAntecedentes;
  }
  
  public void setTieneAntecedentes(String tieneAntecedentes)
  {
    this.tieneAntecedentes = tieneAntecedentes;
  }
}
