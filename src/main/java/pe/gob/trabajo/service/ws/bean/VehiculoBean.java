package pe.gob.trabajo.service.ws.bean;

import java.util.HashSet;
import java.util.Set;

public class VehiculoBean
{
  private String placa;
  private String serie;
  private String vin;
  private String nro_motor;
  private String color;
  private String marca;
  private String modelo;
  private String estado;
  private String sede;
  private Set<String> propietarios = new HashSet();
  
  public String getPlaca()
  {
    return this.placa;
  }
  
  public void setPlaca(String placa)
  {
    this.placa = placa;
  }
  
  public String getSerie()
  {
    return this.serie;
  }
  
  public void setSerie(String serie)
  {
    this.serie = serie;
  }
  
  public String getVin()
  {
    return this.vin;
  }
  
  public void setVin(String vin)
  {
    this.vin = vin;
  }
  
  public String getNro_motor()
  {
    return this.nro_motor;
  }
  
  public void setNro_motor(String nro_motor)
  {
    this.nro_motor = nro_motor;
  }
  
  public String getColor()
  {
    return this.color;
  }
  
  public void setColor(String color)
  {
    this.color = color;
  }
  
  public String getMarca()
  {
    return this.marca;
  }
  
  public void setMarca(String marca)
  {
    this.marca = marca;
  }
  
  public String getModelo()
  {
    return this.modelo;
  }
  
  public void setModelo(String modelo)
  {
    this.modelo = modelo;
  }
  
  public String getEstado()
  {
    return this.estado;
  }
  
  public void setEstado(String estado)
  {
    this.estado = estado;
  }
  
  public String getSede()
  {
    return this.sede;
  }
  
  public void setSede(String sede)
  {
    this.sede = sede;
  }
  
  public Set<String> getPropietarios()
  {
    return this.propietarios;
  }
  
  public void setPropietarios(Set<String> propietarios)
  {
    this.propietarios = propietarios;
  }
}
