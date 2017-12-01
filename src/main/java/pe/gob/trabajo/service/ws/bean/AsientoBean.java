package pe.gob.trabajo.service.ws.bean;

import java.util.List;

public class AsientoBean
{
  private String transaccion;
  private Integer nroTotalPag;
  List<AsientoListBean> listAsientos;
  List<AsientoListBean> listFichas;
  List<AsientoListBean> listFolios;
  
  public String getTransaccion()
  {
    return this.transaccion;
  }
  
  public void setTransaccion(String transaccion)
  {
    this.transaccion = transaccion;
  }
  
  public Integer getNroTotalPag()
  {
    return this.nroTotalPag;
  }
  
  public void setNroTotalPag(Integer nroTotalPag)
  {
    this.nroTotalPag = nroTotalPag;
  }
  
  public List<AsientoListBean> getListAsientos()
  {
    return this.listAsientos;
  }
  
  public void setListAsientos(List<AsientoListBean> listAsientos)
  {
    this.listAsientos = listAsientos;
  }
  
  public List<AsientoListBean> getListFichas()
  {
    return this.listFichas;
  }
  
  public void setListFichas(List<AsientoListBean> listFichas)
  {
    this.listFichas = listFichas;
  }
  
  public List<AsientoListBean> getListFolios()
  {
    return this.listFolios;
  }
  
  public void setListFolios(List<AsientoListBean> listFolios)
  {
    this.listFolios = listFolios;
  }
}
