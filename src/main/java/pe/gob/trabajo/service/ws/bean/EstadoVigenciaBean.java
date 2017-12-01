package pe.gob.trabajo.service.ws.bean;

public class EstadoVigenciaBean
{
  private String estado;
  private String solicitud;
  private String fecha;
  private String mensaje;
  private String codigo;
  
  public String getEstado()
  {
    return this.estado;
  }
  
  public void setEstado(String estado)
  {
    this.estado = estado;
  }
  
  public String getSolicitud()
  {
    return this.solicitud;
  }
  
  public void setSolicitud(String solicitud)
  {
    this.solicitud = solicitud;
  }
  
  public String getFecha()
  {
    return this.fecha;
  }
  
  public void setFecha(String fecha)
  {
    this.fecha = fecha;
  }
  
  public String getMensaje()
  {
    return this.mensaje;
  }
  
  public void setMensaje(String mensaje)
  {
    this.mensaje = mensaje;
  }
  
  public String getCodigo()
  {
    return this.codigo;
  }
  
  public void setCodigo(String codigo)
  {
    this.codigo = codigo;
  }
}
