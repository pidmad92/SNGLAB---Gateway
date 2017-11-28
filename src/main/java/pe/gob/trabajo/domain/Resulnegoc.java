package pe.gob.trabajo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Resulnegoc.
 */
@Entity
@Table(name = "DETBC_Resulnegoc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "resulnegoc")
public class Resulnegoc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "n_codreneg", nullable = false)
    private Integer nCodreneg;

    @NotNull
    @Column(name = "n_codfperf", nullable = false)
    private Integer nCodfperf;

    @Column(name = "t_fecreneg")
    private Instant tFecreneg;

    @Column(name = "n_aumento")
    private Double nAumento;

    @Column(name = "n_clausula")
    private Double nClausula;

    @Column(name = "n_gratifica")
    private Double nGratifica;

    @Column(name = "n_alimentac")
    private Double nAlimentac;

    @Column(name = "n_movilidad")
    private Double nMovilidad;

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

    @ManyToOne
    private Formperfil formperfil;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getnCodreneg() {
        return nCodreneg;
    }

    public Resulnegoc nCodreneg(Integer nCodreneg) {
        this.nCodreneg = nCodreneg;
        return this;
    }

    public void setnCodreneg(Integer nCodreneg) {
        this.nCodreneg = nCodreneg;
    }

    public Integer getnCodfperf() {
        return nCodfperf;
    }

    public Resulnegoc nCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
        return this;
    }

    public void setnCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
    }

    public Instant gettFecreneg() {
        return tFecreneg;
    }

    public Resulnegoc tFecreneg(Instant tFecreneg) {
        this.tFecreneg = tFecreneg;
        return this;
    }

    public void settFecreneg(Instant tFecreneg) {
        this.tFecreneg = tFecreneg;
    }

    public Double getnAumento() {
        return nAumento;
    }

    public Resulnegoc nAumento(Double nAumento) {
        this.nAumento = nAumento;
        return this;
    }

    public void setnAumento(Double nAumento) {
        this.nAumento = nAumento;
    }

    public Double getnClausula() {
        return nClausula;
    }

    public Resulnegoc nClausula(Double nClausula) {
        this.nClausula = nClausula;
        return this;
    }

    public void setnClausula(Double nClausula) {
        this.nClausula = nClausula;
    }

    public Double getnGratifica() {
        return nGratifica;
    }

    public Resulnegoc nGratifica(Double nGratifica) {
        this.nGratifica = nGratifica;
        return this;
    }

    public void setnGratifica(Double nGratifica) {
        this.nGratifica = nGratifica;
    }

    public Double getnAlimentac() {
        return nAlimentac;
    }

    public Resulnegoc nAlimentac(Double nAlimentac) {
        this.nAlimentac = nAlimentac;
        return this;
    }

    public void setnAlimentac(Double nAlimentac) {
        this.nAlimentac = nAlimentac;
    }

    public Double getnMovilidad() {
        return nMovilidad;
    }

    public Resulnegoc nMovilidad(Double nMovilidad) {
        this.nMovilidad = nMovilidad;
        return this;
    }

    public void setnMovilidad(Double nMovilidad) {
        this.nMovilidad = nMovilidad;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Resulnegoc vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Resulnegoc tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Resulnegoc nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Resulnegoc nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Resulnegoc vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Resulnegoc tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Resulnegoc nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Formperfil getFormperfil() {
        return formperfil;
    }

    public Resulnegoc formperfil(Formperfil formperfil) {
        this.formperfil = formperfil;
        return this;
    }

    public void setFormperfil(Formperfil formperfil) {
        this.formperfil = formperfil;
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
        Resulnegoc resulnegoc = (Resulnegoc) o;
        if (resulnegoc.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resulnegoc.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Resulnegoc{" +
            "id=" + getId() +
            ", nCodreneg='" + getnCodreneg() + "'" +
            ", nCodfperf='" + getnCodfperf() + "'" +
            ", tFecreneg='" + gettFecreneg() + "'" +
            ", nAumento='" + getnAumento() + "'" +
            ", nClausula='" + getnClausula() + "'" +
            ", nGratifica='" + getnGratifica() + "'" +
            ", nAlimentac='" + getnAlimentac() + "'" +
            ", nMovilidad='" + getnMovilidad() + "'" +
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
