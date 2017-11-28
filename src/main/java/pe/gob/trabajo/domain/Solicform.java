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
 * A Solicform.
 */
@Entity
@Table(name = "DETBC_Solicform")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "solicform")
public class Solicform implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_codsform", nullable = false)
    private Integer nCodsform;

    @NotNull
    @Column(name = "n_codsolic", nullable = false)
    private Integer nCodsolic;

    @Column(name = "n_codffina")
    private Integer nCodffina;

    @Column(name = "n_codfarch")
    private Integer nCodfarch;

    @Column(name = "n_codfperf")
    private Integer nCodfperf;

    @Size(max = 100)
    @Column(name = "v_nomform", length = 100)
    private String vNomform;

    @Size(max = 1)
    @Column(name = "v_tipoform", length = 1)
    private String vTipoform;

    @Column(name = "n_flgoblig")
    private Boolean nFlgoblig;

    @Size(max = 1)
    @Column(name = "v_flgest", length = 1)
    private String vFlgest;

    @Size(max = 200)
    @Column(name = "v_observa", length = 200)
    private String vObserva;

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
    @JoinColumn(name="n_codfarch",insertable=false,updatable=false)
    private Formarchivo formarchivo;

    @ManyToOne
    @JoinColumn(name="n_codffina",insertable=false,updatable=false)
    private Formfinanc formfinanc;

    @OneToOne
    @JoinColumn(name="n_codfperf",insertable=false,updatable=false,unique = true)
    private Formperfil formPerfil;

    @ManyToOne
    @JoinColumn(name="n_codsolic",insertable=false,updatable=false)
    private Solicitud solicitud;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getnCodsform() {
        return nCodsform;
    }

    public Solicform nCodsform(Integer nCodsform) {
        this.nCodsform = nCodsform;
        return this;
    }

    public void setnCodsform(Integer nCodsform) {
        this.nCodsform = nCodsform;
    }

    public Integer getnCodsolic() {
        return nCodsolic;
    }

    public Solicform nCodsolic(Integer nCodsolic) {
        this.nCodsolic = nCodsolic;
        return this;
    }

    public void setnCodsolic(Integer nCodsolic) {
        this.nCodsolic = nCodsolic;
    }

    public Integer getnCodffina() {
        return nCodffina;
    }

    public Solicform nCodffina(Integer nCodffina) {
        this.nCodffina = nCodffina;
        return this;
    }

    public void setnCodffina(Integer nCodffina) {
        this.nCodffina = nCodffina;
    }

    public Integer getnCodfarch() {
        return nCodfarch;
    }

    public Solicform nCodfarch(Integer nCodfarch) {
        this.nCodfarch = nCodfarch;
        return this;
    }

    public void setnCodfarch(Integer nCodfarch) {
        this.nCodfarch = nCodfarch;
    }

    public Integer getnCodfperf() {
        return nCodfperf;
    }

    public Solicform nCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
        return this;
    }

    public void setnCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
    }

    public String getvNomform() {
        return vNomform;
    }

    public Solicform vNomform(String vNomform) {
        this.vNomform = vNomform;
        return this;
    }

    public void setvNomform(String vNomform) {
        this.vNomform = vNomform;
    }

    public String getvTipoform() {
        return vTipoform;
    }

    public Solicform vTipoform(String vTipoform) {
        this.vTipoform = vTipoform;
        return this;
    }

    public void setvTipoform(String vTipoform) {
        this.vTipoform = vTipoform;
    }

    public Boolean isnFlgoblig() {
        return nFlgoblig;
    }

    public Solicform nFlgoblig(Boolean nFlgoblig) {
        this.nFlgoblig = nFlgoblig;
        return this;
    }

    public void setnFlgoblig(Boolean nFlgoblig) {
        this.nFlgoblig = nFlgoblig;
    }

    public String getvFlgest() {
        return vFlgest;
    }

    public Solicform vFlgest(String vFlgest) {
        this.vFlgest = vFlgest;
        return this;
    }

    public void setvFlgest(String vFlgest) {
        this.vFlgest = vFlgest;
    }

    public String getvObserva() {
        return vObserva;
    }

    public Solicform vObserva(String vObserva) {
        this.vObserva = vObserva;
        return this;
    }

    public void setvObserva(String vObserva) {
        this.vObserva = vObserva;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Solicform vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Solicform tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Solicform nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Solicform nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Solicform vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Solicform tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Solicform nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Formarchivo getFormarchivo() {
        return formarchivo;
    }

    public Solicform formarchivo(Formarchivo formarchivo) {
        this.formarchivo = formarchivo;
        return this;
    }

    public void setFormarchivo(Formarchivo formarchivo) {
        this.formarchivo = formarchivo;
    }

    public Formfinanc getFormfinanc() {
        return formfinanc;
    }

    public Solicform formfinanc(Formfinanc formfinanc) {
        this.formfinanc = formfinanc;
        return this;
    }

    public void setFormfinanc(Formfinanc formfinanc) {
        this.formfinanc = formfinanc;
    }

    public Formperfil getFormPerfil() {
        return formPerfil;
    }

    public Solicform formPerfil(Formperfil formperfil) {
        this.formPerfil = formperfil;
        return this;
    }

    public void setFormPerfil(Formperfil formperfil) {
        this.formPerfil = formperfil;
    }

    public Solicitud getSolicitud() {
        return solicitud;
    }

    public Solicform solicitud(Solicitud solicitud) {
        this.solicitud = solicitud;
        return this;
    }

    public void setSolicitud(Solicitud solicitud) {
        this.solicitud = solicitud;
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
        Solicform solicform = (Solicform) o;
        if (solicform.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), solicform.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Solicform{" +
            "id=" + getId() +
            ", nCodsform='" + getnCodsform() + "'" +
            ", nCodsolic='" + getnCodsolic() + "'" +
            ", nCodffina='" + getnCodffina() + "'" +
            ", nCodfarch='" + getnCodfarch() + "'" +
            ", nCodfperf='" + getnCodfperf() + "'" +
            ", vNomform='" + getvNomform() + "'" +
            ", vTipoform='" + getvTipoform() + "'" +
            ", nFlgoblig='" + isnFlgoblig() + "'" +
            ", vFlgest='" + getvFlgest() + "'" +
            ", vObserva='" + getvObserva() + "'" +
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
