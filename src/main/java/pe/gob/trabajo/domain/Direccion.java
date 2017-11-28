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
 * A Direccion.
 */
@Entity
@Table(name = "DETBC_DIRECCION")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "direccion")
public class Direccion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_coddirec", nullable = false)
    private Integer nCoddirec;

    @NotNull
    @Column(name = "n_codfperf", nullable = false)
    private Integer nCodfperf;

    @Size(max = 100)
    @Column(name = "v_depart", length = 100)
    private String vDepart;

    @Size(max = 100)
    @Column(name = "v_provincia", length = 100)
    private String vProvincia;

    @Size(max = 100)
    @Column(name = "v_distrito", length = 100)
    private String vDistrito;

    @Size(max = 200)
    @Column(name = "v_direccion", length = 200)
    private String vDireccion;

    @Size(max = 100)
    @Column(name = "v_referen", length = 100)
    private String vReferen;

    @Column(name = "n_notifica")
    private Integer nNotifica;

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

    public Integer getnCoddirec() {
        return nCoddirec;
    }

    public Direccion nCoddirec(Integer nCoddirec) {
        this.nCoddirec = nCoddirec;
        return this;
    }

    public void setnCoddirec(Integer nCoddirec) {
        this.nCoddirec = nCoddirec;
    }

    public Integer getnCodfperf() {
        return nCodfperf;
    }

    public Direccion nCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
        return this;
    }

    public void setnCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
    }

    public String getvDepart() {
        return vDepart;
    }

    public Direccion vDepart(String vDepart) {
        this.vDepart = vDepart;
        return this;
    }

    public void setvDepart(String vDepart) {
        this.vDepart = vDepart;
    }

    public String getvProvincia() {
        return vProvincia;
    }

    public Direccion vProvincia(String vProvincia) {
        this.vProvincia = vProvincia;
        return this;
    }

    public void setvProvincia(String vProvincia) {
        this.vProvincia = vProvincia;
    }

    public String getvDistrito() {
        return vDistrito;
    }

    public Direccion vDistrito(String vDistrito) {
        this.vDistrito = vDistrito;
        return this;
    }

    public void setvDistrito(String vDistrito) {
        this.vDistrito = vDistrito;
    }

    public String getvDireccion() {
        return vDireccion;
    }

    public Direccion vDireccion(String vDireccion) {
        this.vDireccion = vDireccion;
        return this;
    }

    public void setvDireccion(String vDireccion) {
        this.vDireccion = vDireccion;
    }

    public String getvReferen() {
        return vReferen;
    }

    public Direccion vReferen(String vReferen) {
        this.vReferen = vReferen;
        return this;
    }

    public void setvReferen(String vReferen) {
        this.vReferen = vReferen;
    }

    public Integer getnNotifica() {
        return nNotifica;
    }

    public Direccion nNotifica(Integer nNotifica) {
        this.nNotifica = nNotifica;
        return this;
    }

    public void setnNotifica(Integer nNotifica) {
        this.nNotifica = nNotifica;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Direccion vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Direccion tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Direccion nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Direccion nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Direccion vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Direccion tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Direccion nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Formperfil getFormperfil() {
        return formperfil;
    }

    public Direccion formperfil(Formperfil formperfil) {
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
        Direccion direccion = (Direccion) o;
        if (direccion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), direccion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Direccion{" +
            "id=" + getId() +
            ", nCoddirec='" + getnCoddirec() + "'" +
            ", nCodfperf='" + getnCodfperf() + "'" +
            ", vDepart='" + getvDepart() + "'" +
            ", vProvincia='" + getvProvincia() + "'" +
            ", vDistrito='" + getvDistrito() + "'" +
            ", vDireccion='" + getvDireccion() + "'" +
            ", vReferen='" + getvReferen() + "'" +
            ", nNotifica='" + getnNotifica() + "'" +
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
