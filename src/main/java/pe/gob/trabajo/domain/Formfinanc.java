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
 * A Formfinanc.
 */
@Entity
@Table(name = "DETBC_Formfinanc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "formfinanc")
public class Formfinanc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_codffina", nullable = false)
    private Integer nCodffina;

    @Size(max = 20)
    @Column(name = "v_codform", length = 20)
    private String vCodform;

    @Size(max = 200)
    @Column(name = "v_desffina", length = 200)
    private String vDesffina;

    @Size(max = 50)
    @Column(name = "v_undffina", length = 50)
    private String vUndffina;

    @Column(name = "n_monffina")
    private Double nMonffina;

    @Column(name = "n_porcffin")
    private Double nPorcffin;

    @Column(name = "n_anioform")
    private Integer nAnioform;

    @Column(name = "n_mesform")
    private Integer nMesform;

    @Size(max = 10)
    @Column(name = "v_codfila", length = 10)
    private String vCodfila;

    @Size(max = 10)
    @Column(name = "v_codcolum", length = 10)
    private String vCodcolum;

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

    @OneToMany(mappedBy = "formfinanc")
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

    public Integer getnCodffina() {
        return nCodffina;
    }

    public Formfinanc nCodffina(Integer nCodffina) {
        this.nCodffina = nCodffina;
        return this;
    }

    public void setnCodffina(Integer nCodffina) {
        this.nCodffina = nCodffina;
    }

    public String getvCodform() {
        return vCodform;
    }

    public Formfinanc vCodform(String vCodform) {
        this.vCodform = vCodform;
        return this;
    }

    public void setvCodform(String vCodform) {
        this.vCodform = vCodform;
    }

    public String getvDesffina() {
        return vDesffina;
    }

    public Formfinanc vDesffina(String vDesffina) {
        this.vDesffina = vDesffina;
        return this;
    }

    public void setvDesffina(String vDesffina) {
        this.vDesffina = vDesffina;
    }

    public String getvUndffina() {
        return vUndffina;
    }

    public Formfinanc vUndffina(String vUndffina) {
        this.vUndffina = vUndffina;
        return this;
    }

    public void setvUndffina(String vUndffina) {
        this.vUndffina = vUndffina;
    }

    public Double getnMonffina() {
        return nMonffina;
    }

    public Formfinanc nMonffina(Double nMonffina) {
        this.nMonffina = nMonffina;
        return this;
    }

    public void setnMonffina(Double nMonffina) {
        this.nMonffina = nMonffina;
    }

    public Double getnPorcffin() {
        return nPorcffin;
    }

    public Formfinanc nPorcffin(Double nPorcffin) {
        this.nPorcffin = nPorcffin;
        return this;
    }

    public void setnPorcffin(Double nPorcffin) {
        this.nPorcffin = nPorcffin;
    }

    public Integer getnAnioform() {
        return nAnioform;
    }

    public Formfinanc nAnioform(Integer nAnioform) {
        this.nAnioform = nAnioform;
        return this;
    }

    public void setnAnioform(Integer nAnioform) {
        this.nAnioform = nAnioform;
    }

    public Integer getnMesform() {
        return nMesform;
    }

    public Formfinanc nMesform(Integer nMesform) {
        this.nMesform = nMesform;
        return this;
    }

    public void setnMesform(Integer nMesform) {
        this.nMesform = nMesform;
    }

    public String getvCodfila() {
        return vCodfila;
    }

    public Formfinanc vCodfila(String vCodfila) {
        this.vCodfila = vCodfila;
        return this;
    }

    public void setvCodfila(String vCodfila) {
        this.vCodfila = vCodfila;
    }

    public String getvCodcolum() {
        return vCodcolum;
    }

    public Formfinanc vCodcolum(String vCodcolum) {
        this.vCodcolum = vCodcolum;
        return this;
    }

    public void setvCodcolum(String vCodcolum) {
        this.vCodcolum = vCodcolum;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Formfinanc vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Formfinanc tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Formfinanc nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Formfinanc nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Formfinanc vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Formfinanc tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Formfinanc nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Set<Solicform> getSolFormularios() {
        return solFormularios;
    }

    public Formfinanc solFormularios(Set<Solicform> solicforms) {
        this.solFormularios = solicforms;
        return this;
    }

    public Formfinanc addSolFormulario(Solicform solicform) {
        this.solFormularios.add(solicform);
        solicform.setFormfinanc(this);
        return this;
    }

    public Formfinanc removeSolFormulario(Solicform solicform) {
        this.solFormularios.remove(solicform);
        solicform.setFormfinanc(null);
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
        Formfinanc formfinanc = (Formfinanc) o;
        if (formfinanc.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formfinanc.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Formfinanc{" +
            "id=" + getId() +
            ", nCodffina='" + getnCodffina() + "'" +
            ", vCodform='" + getvCodform() + "'" +
            ", vDesffina='" + getvDesffina() + "'" +
            ", vUndffina='" + getvUndffina() + "'" +
            ", nMonffina='" + getnMonffina() + "'" +
            ", nPorcffin='" + getnPorcffin() + "'" +
            ", nAnioform='" + getnAnioform() + "'" +
            ", nMesform='" + getnMesform() + "'" +
            ", vCodfila='" + getvCodfila() + "'" +
            ", vCodcolum='" + getvCodcolum() + "'" +
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
