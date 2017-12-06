package pe.gob.trabajo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;
import org.springframework.data.repository.query.Param;
import pe.gob.trabajo.domain.Sectorecoperjuridica;

/**
 * Spring Data JPA repository for the Anexlaboral entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SectorecoperjuridicaRepository extends JpaRepository<Sectorecoperjuridica, String> {

    @Query("select sectorecoperjuridica from Sectorecoperjuridica sectorecoperjuridica where  sectorecoperjuridica.vCodsec=?1")
    public Sectorecoperjuridica GetSector(String codSec);
}