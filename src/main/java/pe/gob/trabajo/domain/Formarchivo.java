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
 * A Formarchivo.
 */
@Entity
@Table(name = "DETBC_Formarchivo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "formarchivo")
public class Formarchivo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_codfarch", nullable = false)
    private Integer nCodfarch;

    @Size(max = 200)
    @Column(name = "v_desform", length = 200)
    private String vDesform;

    @Lob
    @Column(name = "b_archivo")
    private byte[] bArchivo;

    @Column(name = "b_archivo_content_type")
    private String bArchivoContentType;

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

    @OneToMany(mappedBy = "formarchivo")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Solicform> solFormularios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getnCodfarch() {
        return nCodfarch;
    }

    public Formarchivo nCodfarch(Integer nCodfarch) {
        this.nCodfarch = nCodfarch;
        return this;
    }

    public void setnCodfarch(Integer nCodfarch) {
        this.nCodfarch = nCodfarch;
    }

    public String getvDesform() {
        return vDesform;
    }

    public Formarchivo vDesform(String vDesform) {
        this.vDesform = vDesform;
        return this;
    }

    public void setvDesform(String vDesform) {
        this.vDesform = vDesform;
    }

    public byte[] getbArchivo() {
        return bArchivo;
    }

    public Formarchivo bArchivo(byte[] bArchivo) {
        this.bArchivo = bArchivo;
        return this;
    }

    public void setbArchivo(byte[] bArchivo) {
        this.bArchivo = bArchivo;
    }

    public String getbArchivoContentType() {
        return bArchivoContentType;
    }

    public Formarchivo bArchivoContentType(String bArchivoContentType) {
        this.bArchivoContentType = bArchivoContentType;
        return this;
    }

    public void setbArchivoContentType(String bArchivoContentType) {
        this.bArchivoContentType = bArchivoContentType;
    }

    public String getvContype() {
        return vContype;
    }

    public Formarchivo vContype(String vContype) {
        this.vContype = vContype;
        return this;
    }

    public void setvContype(String vContype) {
        this.vContype = vContype;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Formarchivo vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Formarchivo tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Formarchivo nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Formarchivo nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Formarchivo vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Formarchivo tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Formarchivo nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Set<Solicform> getSolFormularios() {
        return solFormularios;
    }

    public Formarchivo solFormularios(Set<Solicform> solicforms) {
        this.solFormularios = solicforms;
        return this;
    }

    public Formarchivo addSolFormulario(Solicform solicform) {
        this.solFormularios.add(solicform);
        solicform.setFormarchivo(this);
        return this;
    }

    public Formarchivo removeSolFormulario(Solicform solicform) {
        this.solFormularios.remove(solicform);
        solicform.setFormarchivo(null);
        return this;
    }

    public void setSolFormularios(Set<Solicform> solicforms) {
        this.solFormularios = solicforms;
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
        Formarchivo formarchivo = (Formarchivo) o;
        if (formarchivo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formarchivo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Formarchivo{" +
            "id=" + getId() +
            ", nCodfarch='" + getnCodfarch() + "'" +
            ", vDesform='" + getvDesform() + "'" +
            ", bArchivo='" + getbArchivo() + "'" +
            ", bArchivoContentType='" + bArchivoContentType + "'" +
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
