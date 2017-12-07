package pe.gob.trabajo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "SITB_CIIU", schema = "SIMINTRA1")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ciuperjuridica {

    @Id
    @Column(name = "v_ciiu_sunat", nullable = false)
    private String vCodciiu;
    @NotNull
    @Column(name = "v_codsec", nullable = false)
    private String vCodsec;
    @NotNull
    @Column(name = "v_desciiu", nullable = false)
    private String vDesciiu;
    @NotNull
    @Column(name = "i_flgsunmin", nullable = false)
    private Integer iFlgsunmin;

    /**
     * @return the vCodsec
     */
    public String getvCodsec() {
        return vCodsec;
    }

    /**
     * @param vCodsec the vCodsec to set
     */
    public void setvCodsec(String vCodsec) {
        this.vCodsec = vCodsec;
    }

    /**
     * @return the vCodciiu
     */
    public String getvCodciiu() {
        return vCodciiu;
    }

    /**
     * @param vCodciiu the vCodciiu to set
     */
    public void setvCodciiu(String vCodciiu) {
        this.vCodciiu = vCodciiu;
    }

    /**
     * @return the vDesciiu
     */
    public String getvDesciiu() {
        return vDesciiu;
    }

    /**
     * @param vDesciiu the vDesciiu to set
     */
    public void setvDesciiu(String vDesciiu) {
        this.vDesciiu = vDesciiu;
    }

    /**
     * @return the iFlgsunmin
     */
    public Integer getiFlgsunmin() {
        return iFlgsunmin;
    }

    /**
     * @param iFlgsunmin the iFlgsunmin to set
     */
    public void setiFlgsunmin(Integer iFlgsunmin) {
        this.iFlgsunmin = iFlgsunmin;
    }
}