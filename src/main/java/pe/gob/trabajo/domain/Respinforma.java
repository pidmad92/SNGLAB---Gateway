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
 * A Respinforma.
 */
@Entity
@Table(name = "DETBC_Respinforma")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "respinforma")
public class Respinforma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_codrinfo", nullable = false)
    private Integer nCodrinfo;

    @NotNull
    @Column(name = "n_codfperf", nullable = false)
    private Integer nCodfperf;

    @Size(max = 1)
    @Column(name = "v_tipores", length = 1)
    private String vTipores;

    @Size(max = 15)
    @Column(name = "v_numdocum", length = 15)
    private String vNumdocum;

    @Size(max = 100)
    @Column(name = "v_nombre", length = 100)
    private String vNombre;

    @Size(max = 100)
    @Column(name = "v_cargores", length = 100)
    private String vCargores;

    @Size(max = 100)
    @Column(name = "v_emailres", length = 100)
    private String vEmailres;

    @Size(max = 15)
    @Column(name = "v_telefono", length = 15)
    private String vTelefono;

    @Size(max = 15)
    @Column(name = "v_celular", length = 15)
    private String vCelular;

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

    public Integer getnCodrinfo() {
        return nCodrinfo;
    }

    public Respinforma nCodrinfo(Integer nCodrinfo) {
        this.nCodrinfo = nCodrinfo;
        return this;
    }

    public void setnCodrinfo(Integer nCodrinfo) {
        this.nCodrinfo = nCodrinfo;
    }

    public Integer getnCodfperf() {
        return nCodfperf;
    }

    public Respinforma nCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
        return this;
    }

    public void setnCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
    }

    public String getvTipores() {
        return vTipores;
    }

    public Respinforma vTipores(String vTipores) {
        this.vTipores = vTipores;
        return this;
    }

    public void setvTipores(String vTipores) {
        this.vTipores = vTipores;
    }

    public String getvNumdocum() {
        return vNumdocum;
    }

    public Respinforma vNumdocum(String vNumdocum) {
        this.vNumdocum = vNumdocum;
        return this;
    }

    public void setvNumdocum(String vNumdocum) {
        this.vNumdocum = vNumdocum;
    }

    public String getvNombre() {
        return vNombre;
    }

    public Respinforma vNombre(String vNombre) {
        this.vNombre = vNombre;
        return this;
    }

    public void setvNombre(String vNombre) {
        this.vNombre = vNombre;
    }

    public String getvCargores() {
        return vCargores;
    }

    public Respinforma vCargores(String vCargores) {
        this.vCargores = vCargores;
        return this;
    }

    public void setvCargores(String vCargores) {
        this.vCargores = vCargores;
    }

    public String getvEmailres() {
        return vEmailres;
    }

    public Respinforma vEmailres(String vEmailres) {
        this.vEmailres = vEmailres;
        return this;
    }

    public void setvEmailres(String vEmailres) {
        this.vEmailres = vEmailres;
    }

    public String getvTelefono() {
        return vTelefono;
    }

    public Respinforma vTelefono(String vTelefono) {
        this.vTelefono = vTelefono;
        return this;
    }

    public void setvTelefono(String vTelefono) {
        this.vTelefono = vTelefono;
    }

    public String getvCelular() {
        return vCelular;
    }

    public Respinforma vCelular(String vCelular) {
        this.vCelular = vCelular;
        return this;
    }

    public void setvCelular(String vCelular) {
        this.vCelular = vCelular;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Respinforma vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Respinforma tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Respinforma nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Respinforma nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Respinforma vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Respinforma tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Respinforma nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Formperfil getFormperfil() {
        return formperfil;
    }

    public Respinforma formperfil(Formperfil formperfil) {
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
        Respinforma respinforma = (Respinforma) o;
        if (respinforma.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), respinforma.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Respinforma{" +
            "id=" + getId() +
            ", nCodrinfo='" + getnCodrinfo() + "'" +
            ", nCodfperf='" + getnCodfperf() + "'" +
            ", vTipores='" + getvTipores() + "'" +
            ", vNumdocum='" + getvNumdocum() + "'" +
            ", vNombre='" + getvNombre() + "'" +
            ", vCargores='" + getvCargores() + "'" +
            ", vEmailres='" + getvEmailres() + "'" +
            ", vTelefono='" + getvTelefono() + "'" +
            ", vCelular='" + getvCelular() + "'" +
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
