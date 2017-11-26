/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pe.gob.trabajo.service.ws.bean;

import java.io.Serializable;

public class RepresentanteBean
  implements Serializable
{
  private static final long serialVersionUID = 6263833209770686528L;
  private String codCargo;
  private String codDepar;
  private String descDocIdentidad;
  private short numOrdSuc;
  private String cargo;
  private String docIdentidad;
  private String fecActualizacion;
  private String fecNacimiento;
  private String nombre;
  private String nroDoc;
  private String numRuc;
  private String username;
  private String vDesde;
  
  public RepresentanteBean() {}
  
  public RepresentanteBean(String codCargo, String codDepar, String descDocIdentidad, short NumOrdSuc, String Cargo, String DocIdentidad, String fecActualizacion, String rso_fecnac, String rso_nombre, String rso_nrodoc, String rso_numruc, String rso_userna, String rso_vdesde)
  {
    this.codCargo = codCargo;
    this.codDepar = codDepar;
    this.descDocIdentidad = descDocIdentidad;
    this.numOrdSuc = NumOrdSuc;
    this.cargo = Cargo;
    this.docIdentidad = DocIdentidad;
    this.fecActualizacion = fecActualizacion;
    this.fecNacimiento = rso_fecnac;
    this.nombre = rso_nombre;
    this.nroDoc = rso_nrodoc;
    this.numRuc = rso_numruc;
    this.username = rso_userna;
    this.vDesde = rso_vdesde;
  }
  
  public String getCodCargo()
  {
    return this.codCargo;
  }
  
  public void setCodCargo(String codCargo)
  {
    this.codCargo = codCargo;
  }
  
  public String getCodDepar()
  {
    return this.codDepar;
  }
  
  public void setCodDepar(String codDepar)
  {
    this.codDepar = codDepar;
  }
  
  public String getDescDocIdentidad()
  {
    return this.descDocIdentidad;
  }
  
  public void setDescDocIdentidad(String descDocIdentidad)
  {
    this.descDocIdentidad = descDocIdentidad;
  }
  
  public short get()
  {
    return this.numOrdSuc;
  }
  
  public void set(short NumOrdSuc)
  {
    this.numOrdSuc = NumOrdSuc;
  }
  
  public String getCargo()
  {
    return this.cargo;
  }
  
  public void setCargo(String Cargo)
  {
    this.cargo = Cargo;
  }
  
  public String getDocIdentidad()
  {
    return this.docIdentidad;
  }
  
  public void setDocIdentidad(String DocIdentidad)
  {
    this.docIdentidad = DocIdentidad;
  }
  
  public String getFecActualizacion()
  {
    return this.fecActualizacion;
  }
  
  public void setFecactualizacion(String fecActualizacion)
  {
    this.fecActualizacion = fecActualizacion;
  }
  
  public String getFecNacimiento()
  {
    return this.fecNacimiento;
  }
  
  public void setFecNacimiento(String rso_fecnac)
  {
    this.fecNacimiento = rso_fecnac;
  }
  
  public String getNombre()
  {
    return this.nombre;
  }
  
  public void setNombre(String rso_nombre)
  {
    this.nombre = rso_nombre;
  }
  
  public String getNrodoc()
  {
    return this.nroDoc;
  }
  
  public void setNrodoc(String rso_nrodoc)
  {
    this.nroDoc = rso_nrodoc;
  }
  
  public String getNumruc()
  {
    return this.numRuc;
  }
  
  public void setNumruc(String rso_numruc)
  {
    this.numRuc = rso_numruc;
  }
  
  public String getUsername()
  {
    return this.username;
  }
  
  public void setUsername(String rso_userna)
  {
    this.username = rso_userna;
  }
  
  public String getVdesde()
  {
    return this.vDesde;
  }
  
  public void setVdesde(String rso_vdesde)
  {
    this.vDesde = rso_vdesde;
  }
}
