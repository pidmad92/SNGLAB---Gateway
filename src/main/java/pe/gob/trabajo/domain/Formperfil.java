package pe.gob.trabajo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Formperfil.
 */
@Entity
@Table(name = "DETBC_Formperfil")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "formperfil")
public class Formperfil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_codfperf", nullable = false)
    private Integer nCodfperf;

    @Size(max = 200)
    @Column(name = "v_nomcomer", length = 200)
    private String vNomcomer;

    @Size(max = 200)
    @Column(name = "v_desemple", length = 200)
    private String vDesemple;

    @Size(max = 10)
    @Column(name = "v_codciiu", length = 10)
    private String vCodciiu;

    @Size(max = 50)
    @Column(name = "v_partreg", length = 50)
    private String vPartreg;

    @Size(max = 100)
    @Column(name = "v_gruecono", length = 100)
    private String vGruecono;

    @Size(max = 50)
    @Column(name = "v_sector", length = 50)
    private String vSector;

    @Size(max = 10)
    @Column(name = "v_plancont", length = 10)
    private String vPlancont;

    @Size(max = 10)
    @Column(name = "v_reglabo", length = 10)
    private String vReglabo;

    @NotNull
    @Size(max = 20)
    @Column(name = "v_usuareg", length = 20, nullable = false)
    private String vUsuareg;

    @NotNull
    @Column(name = "t_fecreg", nullable = false)
    private Instant tFecreg;

    @NotNull
    @Column(name = "n_flgactivo", nullable = false)
    private Boolean nFlgactivo;

    @NotNull
    @Column(name = "n_sedereg", nullable = false)
    private Integer nSedereg;

    @Size(max = 20)
    @Column(name = "v_usuaupd", length = 20)
    private String vUsuaupd;

    @Column(name = "t_fecupd")
    private Instant tFecupd;

    @Column(name = "n_sedeupd")
    private Integer nSedeupd;

    @OneToMany(mappedBy = "formperfil")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Direccion> direccions = new HashSet<>();

    @OneToMany(mappedBy = "formperfil")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Hechoinver> hechoInversions = new HashSet<>();

    @OneToMany(mappedBy = "formperfil")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Anexlaboral> anexoLaborals = new HashSet<>();

    @OneToMany(mappedBy = "formperfil")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Undnegocio> unidadNegocios = new HashSet<>();

    @OneToMany(mappedBy = "formperfil")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Respinforma> respInfos = new HashSet<>();

    @OneToMany(mappedBy = "formperfil")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Resulnegoc> resulNegociacions = new HashSet<>();

    @OneToMany(mappedBy = "formperfil")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Participa> participacions = new HashSet<>();

    @OneToMany(mappedBy = "formperfil")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Negocolect> negColectivas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getnCodfperf() {
        return nCodfperf;
    }

    public Formperfil nCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
        return this;
    }

    public void setnCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
    }

    public String getvNomcomer() {
        return vNomcomer;
    }

    public Formperfil vNomcomer(String vNomcomer) {
        this.vNomcomer = vNomcomer;
        return this;
    }

    public void setvNomcomer(String vNomcomer) {
        this.vNomcomer = vNomcomer;
    }

    public String getvDesemple() {
        return vDesemple;
    }

    public Formperfil vDesemple(String vDesemple) {
        this.vDesemple = vDesemple;
        return this;
    }

    public void setvDesemple(String vDesemple) {
        this.vDesemple = vDesemple;
    }

    public String getvCodciiu() {
        return vCodciiu;
    }

    public Formperfil vCodciiu(String vCodciiu) {
        this.vCodciiu = vCodciiu;
        return this;
    }

    public void setvCodciiu(String vCodciiu) {
        this.vCodciiu = vCodciiu;
    }

    public String getvPartreg() {
        return vPartreg;
    }

    public Formperfil vPartreg(String vPartreg) {
        this.vPartreg = vPartreg;
        return this;
    }

    public void setvPartreg(String vPartreg) {
        this.vPartreg = vPartreg;
    }

    public String getvGruecono() {
        return vGruecono;
    }

    public Formperfil vGruecono(String vGruecono) {
        this.vGruecono = vGruecono;
        return this;
    }

    public void setvGruecono(String vGruecono) {
        this.vGruecono = vGruecono;
    }

    public String getvSector() {
        return vSector;
    }

    public Formperfil vSector(String vSector) {
        this.vSector = vSector;
        return this;
    }

    public void setvSector(String vSector) {
        this.vSector = vSector;
    }

    public String getvPlancont() {
        return vPlancont;
    }

    public Formperfil vPlancont(String vPlancont) {
        this.vPlancont = vPlancont;
        return this;
    }

    public void setvPlancont(String vPlancont) {
        this.vPlancont = vPlancont;
    }

    public String getvReglabo() {
        return vReglabo;
    }

    public Formperfil vReglabo(String vReglabo) {
        this.vReglabo = vReglabo;
        return this;
    }

    public void setvReglabo(String vReglabo) {
        this.vReglabo = vReglabo;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Formperfil vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Formperfil tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Formperfil nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Formperfil nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Formperfil vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Formperfil tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Formperfil nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Set<Direccion> getDireccions() {
        return direccions;
    }

    public Formperfil direccions(Set<Direccion> direccions) {
        this.direccions = direccions;
        return this;
    }

    public Formperfil addDireccion(Direccion direccion) {
        this.direccions.add(direccion);
        direccion.setFormperfil(this);
        return this;
    }

    public Formperfil removeDireccion(Direccion direccion) {
        this.direccions.remove(direccion);
        direccion.setFormperfil(null);
        return this;
    }

    public void setDireccions(Set<Direccion> direccions) {
        this.direccions = direccions;
    }

    public Set<Hechoinver> getHechoInversions() {
        return hechoInversions;
    }

    public Formperfil hechoInversions(Set<Hechoinver> hechoinvers) {
        this.hechoInversions = hechoinvers;
        return this;
    }

    public Formperfil addHechoInversion(Hechoinver hechoinver) {
        this.hechoInversions.add(hechoinver);
        hechoinver.setFormperfil(this);
        return this;
    }

    public Formperfil removeHechoInversion(Hechoinver hechoinver) {
        this.hechoInversions.remove(hechoinver);
        hechoinver.setFormperfil(null);
        return this;
    }

    public void setHechoInversions(Set<Hechoinver> hechoinvers) {
        this.hechoInversions = hechoinvers;
    }

    public Set<Anexlaboral> getAnexoLaborals() {
        return anexoLaborals;
    }

    public Formperfil anexoLaborals(Set<Anexlaboral> anexlaborals) {
        this.anexoLaborals = anexlaborals;
        return this;
    }

    public Formperfil addAnexoLaboral(Anexlaboral anexlaboral) {
        this.anexoLaborals.add(anexlaboral);
        anexlaboral.setFormperfil(this);
        return this;
    }

    public Formperfil removeAnexoLaboral(Anexlaboral anexlaboral) {
        this.anexoLaborals.remove(anexlaboral);
        anexlaboral.setFormperfil(null);
        return this;
    }

    public void setAnexoLaborals(Set<Anexlaboral> anexlaborals) {
        this.anexoLaborals = anexlaborals;
    }

    public Set<Undnegocio> getUnidadNegocios() {
        return unidadNegocios;
    }

    public Formperfil unidadNegocios(Set<Undnegocio> undnegocios) {
        this.unidadNegocios = undnegocios;
        return this;
    }

    public Formperfil addUnidadNegocio(Undnegocio undnegocio) {
        this.unidadNegocios.add(undnegocio);
        undnegocio.setFormperfil(this);
        return this;
    }

    public Formperfil removeUnidadNegocio(Undnegocio undnegocio) {
        this.unidadNegocios.remove(undnegocio);
        undnegocio.setFormperfil(null);
        return this;
    }

    public void setUnidadNegocios(Set<Undnegocio> undnegocios) {
        this.unidadNegocios = undnegocios;
    }

    public Set<Respinforma> getRespInfos() {
        return respInfos;
    }

    public Formperfil respInfos(Set<Respinforma> respinformas) {
        this.respInfos = respinformas;
        return this;
    }

    public Formperfil addRespInfo(Respinforma respinforma) {
        this.respInfos.add(respinforma);
        respinforma.setFormperfil(this);
        return this;
    }

    public Formperfil removeRespInfo(Respinforma respinforma) {
        this.respInfos.remove(respinforma);
        respinforma.setFormperfil(null);
        return this;
    }

    public void setRespInfos(Set<Respinforma> respinformas) {
        this.respInfos = respinformas;
    }

    public Set<Resulnegoc> getResulNegociacions() {
        return resulNegociacions;
    }

    public Formperfil resulNegociacions(Set<Resulnegoc> resulnegocs) {
        this.resulNegociacions = resulnegocs;
        return this;
    }

    public Formperfil addResulNegociacion(Resulnegoc resulnegoc) {
        this.resulNegociacions.add(resulnegoc);
        resulnegoc.setFormperfil(this);
        return this;
    }

    public Formperfil removeResulNegociacion(Resulnegoc resulnegoc) {
        this.resulNegociacions.remove(resulnegoc);
        resulnegoc.setFormperfil(null);
        return this;
    }

    public void setResulNegociacions(Set<Resulnegoc> resulnegocs) {
        this.resulNegociacions = resulnegocs;
    }

    public Set<Participa> getParticipacions() {
        return participacions;
    }

    public Formperfil participacions(Set<Participa> participas) {
        this.participacions = participas;
        return this;
    }

    public Formperfil addParticipacion(Participa participa) {
        this.participacions.add(participa);
        participa.setFormperfil(this);
        return this;
    }

    public Formperfil removeParticipacion(Participa participa) {
        this.participacions.remove(participa);
        participa.setFormperfil(null);
        return this;
    }

    public void setParticipacions(Set<Participa> participas) {
        this.participacions = participas;
    }

    public Set<Negocolect> getNegColectivas() {
        return negColectivas;
    }

    public Formperfil negColectivas(Set<Negocolect> negocolects) {
        this.negColectivas = negocolects;
        return this;
    }

    public Formperfil addNegColectiva(Negocolect negocolect) {
        this.negColectivas.add(negocolect);
        negocolect.setFormperfil(this);
        return this;
    }

    public Formperfil removeNegColectiva(Negocolect negocolect) {
        this.negColectivas.remove(negocolect);
        negocolect.setFormperfil(null);
        return this;
    }

    public void setNegColectivas(Set<Negocolect> negocolects) {
        this.negColectivas = negocolects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Formperfil formperfil = (Formperfil) o;
        if (formperfil.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formperfil.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Formperfil{" +
            "id=" + getId() +
            ", nCodfperf='" + getnCodfperf() + "'" +
            ", vNomcomer='" + getvNomcomer() + "'" +
            ", vDesemple='" + getvDesemple() + "'" +
            ", vCodciiu='" + getvCodciiu() + "'" +
            ", vPartreg='" + getvPartreg() + "'" +
            ", vGruecono='" + getvGruecono() + "'" +
            ", vSector='" + getvSector() + "'" +
            ", vPlancont='" + getvPlancont() + "'" +
            ", vReglabo='" + getvReglabo() + "'" +
            ", vUsuareg='" + getvUsuareg() + "'" +
            ", tFecreg='" + gettFecreg() + "'" +
            ", nFlgactivo='" + isnFlgactivo() + "'" +
            ", nSedereg='" + getnSedereg() + "'" +
            ", vUsuaupd='" + getvUsuaupd() + "'" +
            ", tFecupd='" + gettFecupd() + "'" +
            ", nSedeupd='" + getnSedeupd() + "'" +
            "}";
    }
}
