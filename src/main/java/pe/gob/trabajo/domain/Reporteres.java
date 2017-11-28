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
 * A Reporteres.
 */
@Entity
@Table(name = "detbc_reporteres")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "detbc_reporteres")
public class Reporteres implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_codrepre", nullable = false)
    private Integer nCodrepre;

    @Size(max = 2)
    @Column(name = "v_tiporep", length = 2)
    private String vTiporep;

    @Size(max = 50)
    @Column(name = "v_nombre", length = 50)
    private String vNombre;

    @Lob
    @Column(name = "b_archivo")
    private byte[] bArchivo;

    @Size(max = 20)
    @Column(name = "v_contype", length = 20)
    private String vContype;

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

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getnCodrepre() {
        return nCodrepre;
    }

    public Reporteres nCodrepre(Integer nCodrepre) {
        this.nCodrepre = nCodrepre;
        return this;
    }

    public void setnCodrepre(Integer nCodrepre) {
        this.nCodrepre = nCodrepre;
    }

    public String getvTiporep() {
        return vTiporep;
    }

    public Reporteres vTiporep(String vTiporep) {
        this.vTiporep = vTiporep;
        return this;
    }

    public void setvTiporep(String vTiporep) {
        this.vTiporep = vTiporep;
    }

    public String getvNombre() {
        return vNombre;
    }

    public Reporteres vNombre(String vNombre) {
        this.vNombre = vNombre;
        return this;
    }

    public void setvNombre(String vNombre) {
        this.vNombre = vNombre;
    }

    public byte[] getbArchivo() {
        return bArchivo;
    }

    public Reporteres bArchivo(byte[] bArchivo) {
        this.bArchivo = bArchivo;
        return this;
    }

    public void setbArchivo(byte[] bArchivo) {
        this.bArchivo = bArchivo;
    }

    public String getvContype() {
        return vContype;
    }

    public Reporteres vContype(String vContype) {
        this.vContype = vContype;
        return this;
    }

    public void setvContype(String vContype) {
        this.vContype = vContype;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Reporteres vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Reporteres tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Reporteres nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Reporteres nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Reporteres vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Reporteres tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Reporteres nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
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
        Reporteres reporteres = (Reporteres) o;
        if (reporteres.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reporteres.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reporteres{" +
            "id=" + getId() +
            ", nCodrepre='" + getnCodrepre() + "'" +
            ", vTiporep='" + getvTiporep() + "'" +
            ", vNombre='" + getvNombre() + "'" +
            ", bArchivo='" + getbArchivo() + "'" +
            ", vContype='" + getvContype() + "'" +
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
