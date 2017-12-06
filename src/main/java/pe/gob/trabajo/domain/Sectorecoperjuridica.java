package pe.gob.trabajo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "SITB_SECCION", schema = "SIMINTRA1")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Sectorecoperjuridica {

    @Id
    @Column(name = "v_codsec", nullable = false)
    private String vCodsec;
    @Column(name = "v_dessec", nullable = false)
    private String vDessec;

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
     * @return the vDessec
     */
    public String getvDessec() {
        return vDessec;
    }

    /**
     * @param vDessec the vDessec to set
     */
    public void setvDessec(String vDessec) {
        this.vDessec = vDessec;
    }
}