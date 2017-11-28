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
 * A Solicitud.
 */
@Entity
@Table(name = "detbc_solicitud")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "detbc_solicitud")
public class Solicitud implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @NotNull
    @Column(name = "n_codsolic", nullable = false)
    private Integer nCodsolic;

    @Column(name = "n_codrepre")
    private Integer nCodrepre;

    @Column(name = "t_fecsolic")
    private Instant tFecsolic;

    @Column(name = "t_fecenvio")
    private Instant tFecenvio;

    @Size(max = 1)
    @Column(name = "v_flgest", length = 1)
    private String vFlgest;

    @Size(max = 100)
    @Column(name = "v_solicita", length = 100)
    private String vSolicita;

    @Size(max = 100)
    @Column(name = "v_empleador", length = 100)
    private String vEmpleador;

    @Size(max = 100)
    @Column(name = "v_sindicato", length = 100)
    private String vSindicato;

    @Size(max = 100)
    @Column(name = "v_arbitro", length = 100)
    private String vArbitro;

    @Size(max = 20)
    @Column(name = "v_codsolic", length = 20)
    private String vCodsolic;

    @Size(max = 20)
    @Column(name = "v_codemple", length = 20)
    private String vCodemple;

    @Size(max = 20)
    @Column(name = "v_codsindi", length = 20)
    private String vCodsindi;

    @Size(max = 20)
    @Column(name = "v_codarbit", length = 20)
    private String vCodarbit;

    @Column(name = "t_fecvigde")
    private Instant tFecvigde;

    @Column(name = "t_fecvigha")
    private Instant tFecvigha;

    @Size(max = 50)
    @Column(name = "v_voucher", length = 50)
    private String vVoucher;

    @Size(max = 50)
    @Column(name = "v_registro", length = 50)
    private String vRegistro;

    @Size(max = 50)
    @Column(name = "v_rucsol", length = 50)
    private String vRucsol;

    @Size(max = 20)
    @Column(name = "v_codusu", length = 20)
    private String vCodusu;

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

    @OneToOne
    @JoinColumn(name="n_codrepre",insertable=false,updatable=false,unique = true)
    private Reporteres reporteRes;

    @OneToMany(mappedBy = "solicitud")
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

    public Integer getnCodsolic() {
        return nCodsolic;
    }

    public Solicitud nCodsolic(Integer nCodsolic) {
        this.nCodsolic = nCodsolic;
        return this;
    }

    public void setnCodsolic(Integer nCodsolic) {
        this.nCodsolic = nCodsolic;
    }

    public Integer getnCodrepre() {
        return nCodrepre;
    }

    public Solicitud nCodrepre(Integer nCodrepre) {
        this.nCodrepre = nCodrepre;
        return this;
    }

    public void setnCodrepre(Integer nCodrepre) {
        this.nCodrepre = nCodrepre;
    }

    public Instant gettFecsolic() {
        return tFecsolic;
    }

    public Solicitud tFecsolic(Instant tFecsolic) {
        this.tFecsolic = tFecsolic;
        return this;
    }

    public void settFecsolic(Instant tFecsolic) {
        this.tFecsolic = tFecsolic;
    }

    public Instant gettFecenvio() {
        return tFecenvio;
    }

    public Solicitud tFecenvio(Instant tFecenvio) {
        this.tFecenvio = tFecenvio;
        return this;
    }

    public void settFecenvio(Instant tFecenvio) {
        this.tFecenvio = tFecenvio;
    }

    public String getvFlgest() {
        return vFlgest;
    }

    public Solicitud vFlgest(String vFlgest) {
        this.vFlgest = vFlgest;
        return this;
    }

    public void setvFlgest(String vFlgest) {
        this.vFlgest = vFlgest;
    }

    public String getvSolicita() {
        return vSolicita;
    }

    public Solicitud vSolicita(String vSolicita) {
        this.vSolicita = vSolicita;
        return this;
    }

    public void setvSolicita(String vSolicita) {
        this.vSolicita = vSolicita;
    }

    public String getvEmpleador() {
        return vEmpleador;
    }

    public Solicitud vEmpleador(String vEmpleador) {
        this.vEmpleador = vEmpleador;
        return this;
    }

    public void setvEmpleador(String vEmpleador) {
        this.vEmpleador = vEmpleador;
    }

    public String getvSindicato() {
        return vSindicato;
    }

    public Solicitud vSindicato(String vSindicato) {
        this.vSindicato = vSindicato;
        return this;
    }

    public void setvSindicato(String vSindicato) {
        this.vSindicato = vSindicato;
    }

    public String getvArbitro() {
        return vArbitro;
    }

    public Solicitud vArbitro(String vArbitro) {
        this.vArbitro = vArbitro;
        return this;
    }

    public void setvArbitro(String vArbitro) {
        this.vArbitro = vArbitro;
    }

    public String getvCodsolic() {
        return vCodsolic;
    }

    public Solicitud vCodsolic(String vCodsolic) {
        this.vCodsolic = vCodsolic;
        return this;
    }

    public void setvCodsolic(String vCodsolic) {
        this.vCodsolic = vCodsolic;
    }

    public String getvCodemple() {
        return vCodemple;
    }

    public Solicitud vCodemple(String vCodemple) {
        this.vCodemple = vCodemple;
        return this;
    }

    public void setvCodemple(String vCodemple) {
        this.vCodemple = vCodemple;
    }

    public String getvCodsindi() {
        return vCodsindi;
    }

    public Solicitud vCodsindi(String vCodsindi) {
        this.vCodsindi = vCodsindi;
        return this;
    }

    public void setvCodsindi(String vCodsindi) {
        this.vCodsindi = vCodsindi;
    }

    public String getvCodarbit() {
        return vCodarbit;
    }

    public Solicitud vCodarbit(String vCodarbit) {
        this.vCodarbit = vCodarbit;
        return this;
    }

    public void setvCodarbit(String vCodarbit) {
        this.vCodarbit = vCodarbit;
    }

    public Instant gettFecvigde() {
        return tFecvigde;
    }

    public Solicitud tFecvigde(Instant tFecvigde) {
        this.tFecvigde = tFecvigde;
        return this;
    }

    public void settFecvigde(Instant tFecvigde) {
        this.tFecvigde = tFecvigde;
    }

    public Instant gettFecvigha() {
        return tFecvigha;
    }

    public Solicitud tFecvigha(Instant tFecvigha) {
        this.tFecvigha = tFecvigha;
        return this;
    }

    public void settFecvigha(Instant tFecvigha) {
        this.tFecvigha = tFecvigha;
    }

    public String getvVoucher() {
        return vVoucher;
    }

    public Solicitud vVoucher(String vVoucher) {
        this.vVoucher = vVoucher;
        return this;
    }

    public void setvVoucher(String vVoucher) {
        this.vVoucher = vVoucher;
    }

    public String getvRegistro() {
        return vRegistro;
    }

    public Solicitud vRegistro(String vRegistro) {
        this.vRegistro = vRegistro;
        return this;
    }

    public void setvRegistro(String vRegistro) {
        this.vRegistro = vRegistro;
    }

    public String getvRucsol() {
        return vRucsol;
    }

    public Solicitud vRucsol(String vRucsol) {
        this.vRucsol = vRucsol;
        return this;
    }

    public void setvRucsol(String vRucsol) {
        this.vRucsol = vRucsol;
    }

    public String getvCodusu() {
        return vCodusu;
    }

    public Solicitud vCodusu(String vCodusu) {
        this.vCodusu = vCodusu;
        return this;
    }

    public void setvCodusu(String vCodusu) {
        this.vCodusu = vCodusu;
    }

    public String getvUsuareg() {
        return vUsuareg;
    }

    public Solicitud vUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
        return this;
    }

    public void setvUsuareg(String vUsuareg) {
        this.vUsuareg = vUsuareg;
    }

    public Instant gettFecreg() {
        return tFecreg;
    }

    public Solicitud tFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
        return this;
    }

    public void settFecreg(Instant tFecreg) {
        this.tFecreg = tFecreg;
    }

    public Boolean isnFlgactivo() {
        return nFlgactivo;
    }

    public Solicitud nFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
        return this;
    }

    public void setnFlgactivo(Boolean nFlgactivo) {
        this.nFlgactivo = nFlgactivo;
    }

    public Integer getnSedereg() {
        return nSedereg;
    }

    public Solicitud nSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
        return this;
    }

    public void setnSedereg(Integer nSedereg) {
        this.nSedereg = nSedereg;
    }

    public String getvUsuaupd() {
        return vUsuaupd;
    }

    public Solicitud vUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
        return this;
    }

    public void setvUsuaupd(String vUsuaupd) {
        this.vUsuaupd = vUsuaupd;
    }

    public Instant gettFecupd() {
        return tFecupd;
    }

    public Solicitud tFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
        return this;
    }

    public void settFecupd(Instant tFecupd) {
        this.tFecupd = tFecupd;
    }

    public Integer getnSedeupd() {
        return nSedeupd;
    }

    public Solicitud nSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
        return this;
    }

    public void setnSedeupd(Integer nSedeupd) {
        this.nSedeupd = nSedeupd;
    }

    public Reporteres getReporteRes() {
        return reporteRes;
    }

    public Solicitud reporteRes(Reporteres reporteres) {
        this.reporteRes = reporteres;
        return this;
    }

    public void setReporteRes(Reporteres reporteres) {
        this.reporteRes = reporteres;
    }

    public Set<Solicform> getSolFormularios() {
        return solFormularios;
    }

    public Solicitud solFormularios(Set<Solicform> solicforms) {
        this.solFormularios = solicforms;
        return this;
    }

    public Solicitud addSolFormulario(Solicform solicform) {
        this.solFormularios.add(solicform);
        solicform.setSolicitud(this);
        return this;
    }

    public Solicitud removeSolFormulario(Solicform solicform) {
        this.solFormularios.remove(solicform);
        solicform.setSolicitud(null);
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
        Solicitud solicitud = (Solicitud) o;
        if (solicitud.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), solicitud.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Solicitud{" +
            "id=" + getId() +
            ", nCodsolic='" + getnCodsolic() + "'" +
            ", nCodrepre='" + getnCodrepre() + "'" +
            ", tFecsolic='" + gettFecsolic() + "'" +
            ", tFecenvio='" + gettFecenvio() + "'" +
            ", vFlgest='" + getvFlgest() + "'" +
            ", vSolicita='" + getvSolicita() + "'" +
            ", vEmpleador='" + getvEmpleador() + "'" +
            ", vSindicato='" + getvSindicato() + "'" +
            ", vArbitro='" + getvArbitro() + "'" +
            ", vCodsolic='" + getvCodsolic() + "'" +
            ", vCodemple='" + getvCodemple() + "'" +
            ", vCodsindi='" + getvCodsindi() + "'" +
            ", vCodarbit='" + getvCodarbit() + "'" +
            ", tFecvigde='" + gettFecvigde() + "'" +
            ", tFecvigha='" + gettFecvigha() + "'" +
            ", vVoucher='" + getvVoucher() + "'" +
            ", vRegistro='" + getvRegistro() + "'" +
            ", vRucsol='" + getvRucsol() + "'" +
            ", vCodusu='" + getvCodusu() + "'" +
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
