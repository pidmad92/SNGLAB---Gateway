package pe.gob.trabajo.service.ws.bean;

import java.util.List;

public class AsientoListBean
{
  private String idImg;
  private Integer numPag;
  private String tipo;
  private Integer nroPagRef;
  private Integer pagina;
  private List<AsientoPaginaBean> listPaginas;
  
  public String getIdImg()
  {
    return this.idImg;
  }
  
  public void setIdImg(String idImg)
  {
    this.idImg = idImg;
  }
  
  public Integer getNumPag()
  {
    return this.numPag;
  }
  
  public void setNumPag(Integer numPag)
  {
    this.numPag = numPag;
  }
  
  public String getTipo()
  {
    return this.tipo;
  }
  
  public void setTipo(String tipo)
  {
    this.tipo = tipo;
  }
  
  public List<AsientoPaginaBean> getListPaginas()
  {
    return this.listPaginas;
  }
  
  public void setListPaginas(List<AsientoPaginaBean> listPaginas)
  {
    this.listPaginas = listPaginas;
  }
  
  public Integer getNroPagRef()
  {
    return this.nroPagRef;
  }
  
  public void setNroPagRef(Integer nroPagRef)
  {
    this.nroPagRef = nroPagRef;
  }
  
  public Integer getPagina()
  {
    return this.pagina;
  }
  
  public void setPagina(Integer pagina)
  {
    this.pagina = pagina;
  }
}
