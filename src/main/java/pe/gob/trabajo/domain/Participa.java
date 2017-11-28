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
 * A Participa.
 */
@Entity
@Table(name = "DETBC_Participa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "participa")
public class Participa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_codparti", nullable = false)
    private Integer nCodparti;

    @NotNull
    @Column(name = "n_codfperf", nullable = false)
    private Integer nCodfperf;

    @Size(max = 15)
    @Column(name = "v_numdocum", length = 15)
    private String vNumdocum;

    @Size(max = 200)
    @Column(name = "v_razonsoc", length = 200)
    private String vRazonsoc;

    @Size(max = 1)
    @Column(name = "v_tipodoc", length = 1)
    private String vTipodoc;

    @Size(max = 1)
    @Column(name = "v_tipopart", length = 1)
    private String vTipopart;

    @Column(name = "n_porcasig")
    private Double nPorcasig;

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

    public Integer getnCodparti() {
        return nCodparti;
    }

    public Participa nCodparti(Integer nCodparti) {
        this.nCodparti = nCodparti;
        return this;
    }

    public void setnCodparti(Integer nCodparti) {
        this.nCodparti = nCodparti;
    }

    public Integer getnCodfperf() {
        return nCodfperf;
    }

    public Participa nCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
        return this;
    }

    public void setnCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
    }

    public String getvNumdocum() {
        return vNumdocum;
    }

    public Participa vNumdocum(String vNumdocum) {
        this.vNumdocum = vNumdocum;
        return this;
    }

    public void setvNumdocum(String vNumdocum) {
        this.vNumdocum = vNumdocum;
    }

    public String getvRazonsoc() {
        return vRazonsoc;
    }

    public Participa vRazonsoc(String vRazonsoc) {
        this.vRazonsoc = vRazonsoc;
        return this;
    }

    public void setvRazonsoc(String vRazonsoc) {
        this.vRazonsoc = vRazonsoc;
    }

    public String getvTipodoc() {
        return vTipodoc;
    }

    public Participa vTipodoc(String vTipodoc) {
        this.vTipodoc = vTipodoc;
        return this;
    }

    public void setvTipodoc(String vTipodoc) {
        this.vTipodoc = vTipodoc;
    }

    public String getvTipopart() {
        return vTipopart;
    }

    public Participa vTipopart(String vTipopart) {
        this.vTipopart = vTipopart;
        return this;
    }

    public void setvTipopart(String vTipopart) {
        this.vTipopart = vTipopart;
    }

    public Double getnPorcasig() {
        return nPorcasig;
    }

    public Participa nPorcasig(Double nPorcasig) {
        this.nPorcasig = nPorcasig;
        return this;
    }

    public void setnPorcasig(Double nPorcasig) {
        this.nPorcasig = nPorcasig;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Participa vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Participa tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Participa nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Participa nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Participa vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Participa tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Participa nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Formperfil getFormperfil() {
        return formperfil;
    }

    public Participa formperfil(Formperfil formperfil) {
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
        Participa participa = (Participa) o;
        if (participa.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), participa.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Participa{" +
            "id=" + getId() +
            ", nCodparti='" + getnCodparti() + "'" +
            ", nCodfperf='" + getnCodfperf() + "'" +
            ", vNumdocum='" + getvNumdocum() + "'" +
            ", vRazonsoc='" + getvRazonsoc() + "'" +
            ", vTipodoc='" + getvTipodoc() + "'" +
            ", vTipopart='" + getvTipopart() + "'" +
            ", nPorcasig='" + getnPorcasig() + "'" +
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
