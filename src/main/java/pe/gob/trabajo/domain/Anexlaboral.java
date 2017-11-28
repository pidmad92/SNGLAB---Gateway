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
 * A Anexlaboral.
 */
@Entity
@Table(name = "DETBC_ANEXLABORAL")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "anexlaboral")
public class Anexlaboral implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "n_codanexo", nullable = false)
    private Integer nCodanexo;

    @NotNull
    @Column(name = "n_codfperf", nullable = false)
    private Integer nCodfperf;

    @Column(name = "n_anioanex")
    private Integer nAnioanex;

    @Size(max = 1)
    @Column(name = "v_tipocont", length = 1)
    private String vTipocont;

    @Size(max = 50)
    @Column(name = "v_declegal", length = 50)
    private String vDeclegal;

    @Size(max = 200)
    @Column(name = "v_desanexo", length = 200)
    private String vDesanexo;

    @Column(name = "n_cantlabo")
    private Integer nCantlabo;

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

    public Integer getnCodanexo() {
        return nCodanexo;
    }

    public Anexlaboral nCodanexo(Integer nCodanexo) {
        this.nCodanexo = nCodanexo;
        return this;
    }

    public void setnCodanexo(Integer nCodanexo) {
        this.nCodanexo = nCodanexo;
    }

    public Integer getnCodfperf() {
        return nCodfperf;
    }

    public Anexlaboral nCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
        return this;
    }

    public void setnCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
    }

    public Integer getnAnioanex() {
        return nAnioanex;
    }

    public Anexlaboral nAnioanex(Integer nAnioanex) {
        this.nAnioanex = nAnioanex;
        return this;
    }

    public void setnAnioanex(Integer nAnioanex) {
        this.nAnioanex = nAnioanex;
    }

    public String getvTipocont() {
        return vTipocont;
    }

    public Anexlaboral vTipocont(String vTipocont) {
        this.vTipocont = vTipocont;
        return this;
    }

    public void setvTipocont(String vTipocont) {
        this.vTipocont = vTipocont;
    }

    public String getvDeclegal() {
        return vDeclegal;
    }

    public Anexlaboral vDeclegal(String vDeclegal) {
        this.vDeclegal = vDeclegal;
        return this;
    }

    public void setvDeclegal(String vDeclegal) {
        this.vDeclegal = vDeclegal;
    }

    public String getvDesanexo() {
        return vDesanexo;
    }

    public Anexlaboral vDesanexo(String vDesanexo) {
        this.vDesanexo = vDesanexo;
        return this;
    }

    public void setvDesanexo(String vDesanexo) {
        this.vDesanexo = vDesanexo;
    }

    public Integer getnCantlabo() {
        return nCantlabo;
    }

    public Anexlaboral nCantlabo(Integer nCantlabo) {
        this.nCantlabo = nCantlabo;
        return this;
    }

    public void setnCantlabo(Integer nCantlabo) {
        this.nCantlabo = nCantlabo;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Anexlaboral vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Anexlaboral tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Anexlaboral nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Anexlaboral nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Anexlaboral vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Anexlaboral tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Anexlaboral nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Formperfil getFormperfil() {
        return formperfil;
    }

    public Anexlaboral formperfil(Formperfil formperfil) {
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
        Anexlaboral anexlaboral = (Anexlaboral) o;
        if (anexlaboral.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), anexlaboral.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Anexlaboral{" +
            "id=" + getId() +
            ", nCodanexo='" + getnCodanexo() + "'" +
            ", nCodfperf='" + getnCodfperf() + "'" +
            ", nAnioanex='" + getnAnioanex() + "'" +
            ", vTipocont='" + getvTipocont() + "'" +
            ", vDeclegal='" + getvDeclegal() + "'" +
            ", vDesanexo='" + getvDesanexo() + "'" +
            ", nCantlabo='" + getnCantlabo() + "'" +
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
