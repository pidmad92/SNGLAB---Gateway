package pe.gob.trabajo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;
import org.springframework.data.repository.query.Param;
import pe.gob.trabajo.domain.Ciuperjuridica;

/**
 * Spring Data JPA repository for the Anexlaboral entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CiuperjuridicaRepository extends JpaRepository<Ciuperjuridica, String> {

    @Query("select ciuperjuridica from Ciuperjuridica ciuperjuridica where  ciuperjuridica.vCodciiu=?1")
    public Ciuperjuridica GetCiiu(String codCiiu);
}