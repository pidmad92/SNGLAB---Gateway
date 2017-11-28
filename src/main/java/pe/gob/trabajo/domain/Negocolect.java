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
 * A Negocolect.
 */
@Entity
@Table(name = "DETBC_Negocolect")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "negocolect")
public class Negocolect implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_codngcol", nullable = false)
    private Integer nCodngcol;

    @NotNull
    @Column(name = "n_codfperf", nullable = false)
    private Integer nCodfperf;

    @Size(max = 50)
    @Column(name = "v_ambsubje", length = 50)
    private String vAmbsubje;

    @Size(max = 1)
    @Column(name = "v_tipongco", length = 1)
    private String vTipongco;

    @Size(max = 50)
    @Column(name = "v_etapaneg", length = 50)
    private String vEtapaneg;

    @Column(name = "t_fecvigde")
    private Instant tFecvigde;

    @Column(name = "t_fecvigha")
    private Instant tFecvigha;

    @Size(max = 50)
    @Column(name = "v_numexpe", length = 50)
    private String vNumexpe;

    @Size(max = 50)
    @Column(name = "v_auttrab", length = 50)
    private String vAuttrab;

    @Size(max = 20)
    @Column(name = "v_rucneg", length = 20)
    private String vRucneg;

    @Size(max = 50)
    @Column(name = "v_registro", length = 50)
    private String vRegistro;

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

    public Integer getnCodngcol() {
        return nCodngcol;
    }

    public Negocolect nCodngcol(Integer nCodngcol) {
        this.nCodngcol = nCodngcol;
        return this;
    }

    public void setnCodngcol(Integer nCodngcol) {
        this.nCodngcol = nCodngcol;
    }

    public Integer getnCodfperf() {
        return nCodfperf;
    }

    public Negocolect nCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
        return this;
    }

    public void setnCodfperf(Integer nCodfperf) {
        this.nCodfperf = nCodfperf;
    }

    public String getvAmbsubje() {
        return vAmbsubje;
    }

    public Negocolect vAmbsubje(String vAmbsubje) {
        this.vAmbsubje = vAmbsubje;
        return this;
    }

    public void setvAmbsubje(String vAmbsubje) {
        this.vAmbsubje = vAmbsubje;
    }

    public String getvTipongco() {
        return vTipongco;
    }

    public Negocolect vTipongco(String vTipongco) {
        this.vTipongco = vTipongco;
        return this;
    }

    public void setvTipongco(String vTipongco) {
        this.vTipongco = vTipongco;
    }

    public String getvEtapaneg() {
        return vEtapaneg;
    }

    public Negocolect vEtapaneg(String vEtapaneg) {
        this.vEtapaneg = vEtapaneg;
        return this;
    }

    public void setvEtapaneg(String vEtapaneg) {
        this.vEtapaneg = vEtapaneg;
    }

    public Instant gettFecvigde() {
        return tFecvigde;
    }

    public Negocolect tFecvigde(Instant tFecvigde) {
        this.tFecvigde = tFecvigde;
        return this;
    }

    public void settFecvigde(Instant tFecvigde) {
        this.tFecvigde = tFecvigde;
    }

    public Instant gettFecvigha() {
        return tFecvigha;
    }

    public Negocolect tFecvigha(Instant tFecvigha) {
        this.tFecvigha = tFecvigha;
        return this;
    }

    public void settFecvigha(Instant tFecvigha) {
        this.tFecvigha = tFecvigha;
    }

    public String getvNumexpe() {
        return vNumexpe;
    }

    public Negocolect vNumexpe(String vNumexpe) {
        this.vNumexpe = vNumexpe;
        return this;
    }

    public void setvNumexpe(String vNumexpe) {
        this.vNumexpe = vNumexpe;
    }

    public String getvAuttrab() {
        return vAuttrab;
    }

    public Negocolect vAuttrab(String vAuttrab) {
        this.vAuttrab = vAuttrab;
        return this;
    }

    public void setvAuttrab(String vAuttrab) {
        this.vAuttrab = vAuttrab;
    }

    public String getvRucneg() {
        return vRucneg;
    }

    public Negocolect vRucneg(String vRucneg) {
        this.vRucneg = vRucneg;
        return this;
    }

    public void setvRucneg(String vRucneg) {
        this.vRucneg = vRucneg;
    }

    public String getvRegistro() {
        return vRegistro;
    }

    public Negocolect vRegistro(String vRegistro) {
        this.vRegistro = vRegistro;
        return this;
    }

    public void setvRegistro(String vRegistro) {
        this.vRegistro = vRegistro;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Negocolect vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Negocolect tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Negocolect nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Negocolect nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Negocolect vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Negocolect tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Negocolect nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Formperfil getFormperfil() {
        return formperfil;
    }

    public Negocolect formperfil(Formperfil formperfil) {
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
        Negocolect negocolect = (Negocolect) o;
        if (negocolect.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), negocolect.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Negocolect{" +
            "id=" + getId() +
            ", nCodngcol='" + getnCodngcol() + "'" +
            ", nCodfperf='" + getnCodfperf() + "'" +
            ", vAmbsubje='" + getvAmbsubje() + "'" +
            ", vTipongco='" + getvTipongco() + "'" +
            ", vEtapaneg='" + getvEtapaneg() + "'" +
            ", tFecvigde='" + gettFecvigde() + "'" +
            ", tFecvigha='" + gettFecvigha() + "'" +
            ", vNumexpe='" + getvNumexpe() + "'" +
            ", vAuttrab='" + getvAuttrab() + "'" +
            ", vRucneg='" + getvRucneg() + "'" +
            ", vRegistro='" + getvRegistro() + "'" +
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
