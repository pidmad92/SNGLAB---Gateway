/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pe.gob.trabajo.service.ws.bean;

import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author chuangal
 */
public class EmpresaBean
  implements Serializable
{
  private static final long serialVersionUID = 6478698714875597939L;
  private String cod_dep;
  private String cod_dist;
  private String cod_prov;
  private String ddp_ciiu;
  private String ddp_doble;
  private String ddp_estado;
  private String ddp_fecact;
  private String ddp_fecalt;
  private String ddp_fecbaj;
  private String ddp_flag22;
  private String ddp_identi;
  private String ddp_inter1;
  private String ddp_lllttt;
  private String ddp_mclase;
  private String ddp_nombre;
  private String ddp_nomvia;
  private String ddp_nomzon;
  private String ddp_numer1;
  private String ddp_numreg;
  private String ddp_numruc;
  private String ddp_reacti;
  private String ddp_refer1;
  private int ddp_secuen;
  private String ddp_tamano;
  private String ddp_tipvia;
  private String ddp_tipzon;
  private String ddp_tpoemp;
  private String ddp_ubigeo;
  private String ddp_userna;
  private String desc_ciiu;
  private String desc_dep;
  private String desc_dist;
  private String desc_estado;
  private String desc_flag22;
  private String desc_identi;
  private String desc_numreg;
  private String desc_prov;
  private String desc_tamano;
  private String desc_tipvia;
  private String desc_tipzon;
  private String desc_tpoemp;
  private String domicilioLegal;
  private boolean esActivo;
  private boolean esHabido;
  
  public EmpresaBean() {}
  
  public EmpresaBean(String cod_dep, String cod_dist, String cod_prov, String ddp_ciiu, String ddp_doble, String ddp_estado, String ddp_fecact, String ddp_fecalt, String ddp_fecbaj, String ddp_flag22, String ddp_identi, String ddp_inter1, String ddp_lllttt, String ddp_mclase, String ddp_nombre, String ddp_nomvia, String ddp_nomzon, String ddp_numer1, String ddp_numreg, String ddp_numruc, String ddp_reacti, String ddp_refer1, int ddp_secuen, String ddp_tamano, String ddp_tipvia, String ddp_tipzon, String ddp_tpoemp, String ddp_ubigeo, String ddp_userna, String desc_ciiu, String desc_dep, String desc_dist, String desc_estado, String desc_flag22, String desc_identi, String desc_numreg, String desc_prov, String desc_tamano, String desc_tipvia, String desc_tipzon, String desc_tpoemp, boolean esActivo, boolean esHabido)
  {
    this.cod_dep = cod_dep;
    this.cod_dist = cod_dist;
    this.cod_prov = cod_prov;
    this.ddp_ciiu = ddp_ciiu;
    this.ddp_doble = ddp_doble;
    this.ddp_estado = ddp_estado;
    this.ddp_fecact = ddp_fecact;
    this.ddp_fecalt = ddp_fecalt;
    this.ddp_fecbaj = ddp_fecbaj;
    this.ddp_flag22 = ddp_flag22;
    this.ddp_identi = ddp_identi;
    this.ddp_inter1 = ddp_inter1;
    this.ddp_lllttt = ddp_lllttt;
    this.ddp_mclase = ddp_mclase;
    this.ddp_nombre = ddp_nombre;
    this.ddp_nomvia = ddp_nomvia;
    this.ddp_nomzon = ddp_nomzon;
    this.ddp_numer1 = ddp_numer1;
    this.ddp_numreg = ddp_numreg;
    this.ddp_numruc = ddp_numruc;
    this.ddp_reacti = ddp_reacti;
    this.ddp_refer1 = ddp_refer1;
    this.ddp_secuen = ddp_secuen;
    this.ddp_tamano = ddp_tamano;
    this.ddp_tipvia = ddp_tipvia;
    this.ddp_tipzon = ddp_tipzon;
    this.ddp_tpoemp = ddp_tpoemp;
    this.ddp_ubigeo = ddp_ubigeo;
    this.ddp_userna = ddp_userna;
    this.desc_ciiu = desc_ciiu;
    this.desc_dep = desc_dep;
    this.desc_dist = desc_dist;
    this.desc_estado = desc_estado;
    this.desc_flag22 = desc_flag22;
    this.desc_identi = desc_identi;
    this.desc_numreg = desc_numreg;
    this.desc_prov = desc_prov;
    this.desc_tamano = desc_tamano;
    this.desc_tipvia = desc_tipvia;
    this.desc_tipzon = desc_tipzon;
    this.desc_tpoemp = desc_tpoemp;
    this.esActivo = esActivo;
    this.esHabido = esHabido;
  }
  
  public String getCod_dep()
  {
    return this.cod_dep;
  }
  
  public void setCod_dep(String cod_dep)
  {
    this.cod_dep = cod_dep;
  }
  
  public String getCod_dist()
  {
    return this.cod_dist;
  }
  
  public void setCod_dist(String cod_dist)
  {
    this.cod_dist = cod_dist;
  }
  
  public String getCod_prov()
  {
    return this.cod_prov;
  }
  
  public void setCod_prov(String cod_prov)
  {
    this.cod_prov = cod_prov;
  }
  
  public String getDdp_ciiu()
  {
    return this.ddp_ciiu;
  }
  
  public void setDdp_ciiu(String ddp_ciiu)
  {
    this.ddp_ciiu = ddp_ciiu;
  }
  
  public String getDdp_doble()
  {
    return this.ddp_doble;
  }
  
  public void setDdp_doble(String ddp_doble)
  {
    this.ddp_doble = ddp_doble;
  }
  
  public String getDdp_estado()
  {
    return this.ddp_estado;
  }
  
  public void setDdp_estado(String ddp_estado)
  {
    this.ddp_estado = ddp_estado;
  }
  
  public String getDdp_fecact()
  {
    return this.ddp_fecact;
  }
  
  public void setDdp_fecact(String ddp_fecact)
  {
    this.ddp_fecact = ddp_fecact;
  }
  
  public String getDdp_fecalt()
  {
    return this.ddp_fecalt;
  }
  
  public void setDdp_fecalt(String ddp_fecalt)
  {
    this.ddp_fecalt = ddp_fecalt;
  }
  
  public String getDdp_fecbaj()
  {
    return this.ddp_fecbaj;
  }
  
  public void setDdp_fecbaj(String ddp_fecbaj)
  {
    this.ddp_fecbaj = ddp_fecbaj;
  }
  
  public String getDdp_flag22()
  {
    return this.ddp_flag22;
  }
  
  public void setDdp_flag22(String ddp_flag22)
  {
    this.ddp_flag22 = ddp_flag22;
  }
  
  public String getDdp_identi()
  {
    return this.ddp_identi;
  }
  
  public void setDdp_identi(String ddp_identi)
  {
    this.ddp_identi = ddp_identi;
  }
  
  public String getDdp_inter1()
  {
    return this.ddp_inter1;
  }
  
  public void setDdp_inter1(String ddp_inter1)
  {
    this.ddp_inter1 = ddp_inter1;
  }
  
  public String getDdp_lllttt()
  {
    return this.ddp_lllttt;
  }
  
  public void setDdp_lllttt(String ddp_lllttt)
  {
    this.ddp_lllttt = ddp_lllttt;
  }
  
  public String getDdp_mclase()
  {
    return this.ddp_mclase;
  }
  
  public void setDdp_mclase(String ddp_mclase)
  {
    this.ddp_mclase = ddp_mclase;
  }
  
  public String getDdp_nombre()
  {
    return this.ddp_nombre;
  }
  
  public void setDdp_nombre(String ddp_nombre)
  {
    this.ddp_nombre = ddp_nombre;
  }
  
  public String getDdp_nomvia()
  {
    return this.ddp_nomvia;
  }
  
  public void setDdp_nomvia(String ddp_nomvia)
  {
    this.ddp_nomvia = ddp_nomvia;
  }
  
  public String getDdp_nomzon()
  {
    return this.ddp_nomzon;
  }
  
  public void setDdp_nomzon(String ddp_nomzon)
  {
    this.ddp_nomzon = ddp_nomzon;
  }
  
  public String getDdp_numer1()
  {
    return this.ddp_numer1;
  }
  
  public void setDdp_numer1(String ddp_numer1)
  {
    this.ddp_numer1 = ddp_numer1;
  }
  
  public String getDdp_numreg()
  {
    return this.ddp_numreg;
  }
  
  public void setDdp_numreg(String ddp_numreg)
  {
    this.ddp_numreg = ddp_numreg;
  }
  
  public String getDdp_numruc()
  {
    return this.ddp_numruc;
  }
  
  public void setDdp_numruc(String ddp_numruc)
  {
    this.ddp_numruc = ddp_numruc;
  }
  
  public String getDdp_reacti()
  {
    return this.ddp_reacti;
  }
  
  public void setDdp_reacti(String ddp_reacti)
  {
    this.ddp_reacti = ddp_reacti;
  }
  
  public String getDdp_refer1()
  {
    return this.ddp_refer1;
  }
  
  public void setDdp_refer1(String ddp_refer1)
  {
    this.ddp_refer1 = ddp_refer1;
  }
  
  public int getDdp_secuen()
  {
    return this.ddp_secuen;
  }
  
  public void setDdp_secuen(int ddp_secuen)
  {
    this.ddp_secuen = ddp_secuen;
  }
  
  public String getDdp_tamano()
  {
    return this.ddp_tamano;
  }
  
  public void setDdp_tamano(String ddp_tamano)
  {
    this.ddp_tamano = ddp_tamano;
  }
  
  public String getDdp_tipvia()
  {
    return this.ddp_tipvia;
  }
  
  public void setDdp_tipvia(String ddp_tipvia)
  {
    this.ddp_tipvia = ddp_tipvia;
  }
  
  public String getDdp_tipzon()
  {
    return this.ddp_tipzon;
  }
  
  public void setDdp_tipzon(String ddp_tipzon)
  {
    this.ddp_tipzon = ddp_tipzon;
  }
  
  public String getDdp_tpoemp()
  {
    return this.ddp_tpoemp;
  }
  
  public void setDdp_tpoemp(String ddp_tpoemp)
  {
    this.ddp_tpoemp = ddp_tpoemp;
  }
  
  public String getDdp_ubigeo()
  {
    return this.ddp_ubigeo;
  }
  
  public void setDdp_ubigeo(String ddp_ubigeo)
  {
    this.ddp_ubigeo = ddp_ubigeo;
  }
  
  public String getDdp_userna()
  {
    return this.ddp_userna;
  }
  
  public void setDdp_userna(String ddp_userna)
  {
    this.ddp_userna = ddp_userna;
  }
  
  public String getDesc_ciiu()
  {
    return this.desc_ciiu;
  }
  
  public void setDesc_ciiu(String desc_ciiu)
  {
    this.desc_ciiu = desc_ciiu;
  }
  
  public String getDesc_dep()
  {
    return this.desc_dep;
  }
  
  public void setDesc_dep(String desc_dep)
  {
    this.desc_dep = desc_dep;
  }
  
  public String getDesc_dist()
  {
    return this.desc_dist;
  }
  
  public void setDesc_dist(String desc_dist)
  {
    this.desc_dist = desc_dist;
  }
  
  public String getDesc_estado()
  {
    return this.desc_estado;
  }
  
  public void setDesc_estado(String desc_estado)
  {
    this.desc_estado = desc_estado;
  }
  
  public String getDesc_flag22()
  {
    return this.desc_flag22;
  }
  
  public void setDesc_flag22(String desc_flag22)
  {
    this.desc_flag22 = desc_flag22;
  }
  
  public String getDesc_identi()
  {
    return this.desc_identi;
  }
  
  public void setDesc_identi(String desc_identi)
  {
    this.desc_identi = desc_identi;
  }
  
  public String getDesc_numreg()
  {
    return this.desc_numreg;
  }
  
  public void setDesc_numreg(String desc_numreg)
  {
    this.desc_numreg = desc_numreg;
  }
  
  public String getDesc_prov()
  {
    return this.desc_prov;
  }
  
  public void setDesc_prov(String desc_prov)
  {
    this.desc_prov = desc_prov;
  }
  
  public String getDesc_tamano()
  {
    return this.desc_tamano;
  }
  
  public void setDesc_tamano(String desc_tamano)
  {
    this.desc_tamano = desc_tamano;
  }
  
  public String getDesc_tipvia()
  {
    return this.desc_tipvia;
  }
  
  public void setDesc_tipvia(String desc_tipvia)
  {
    this.desc_tipvia = desc_tipvia;
  }
  
  public String getDesc_tipzon()
  {
    return this.desc_tipzon;
  }
  
  public void setDesc_tipzon(String desc_tipzon)
  {
    this.desc_tipzon = desc_tipzon;
  }
  
  public String getDesc_tpoemp()
  {
    return this.desc_tpoemp;
  }
  
  public void setDesc_tpoemp(String desc_tpoemp)
  {
    this.desc_tpoemp = desc_tpoemp;
  }
  
  public boolean isEsActivo()
  {
    return this.esActivo;
  }
  
  public void setEsActivo(boolean esActivo)
  {
    this.esActivo = esActivo;
  }
  
  public boolean isEsHabido()
  {
    return this.esHabido;
  }
  
  public void setEsHabido(boolean esHabido)
  {
    this.esHabido = esHabido;
  }
  
  public String getDomicilioLegal()
  {
    return this.domicilioLegal;
  }
  
  public void setDomicilioLegal(String domicilioLegal)
  {
    this.domicilioLegal = domicilioLegal;
  }

    
  

    private String vCodemp;
    private Integer nCoremp;
    private String vFlgact;
    private Date dFecini;

    private Date dFecfin;

    private String vRazsoc;
    
    
}