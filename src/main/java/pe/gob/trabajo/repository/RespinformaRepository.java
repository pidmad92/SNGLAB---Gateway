package pe.gob.trabajo.repository;

import pe.gob.trabajo.domain.Respinforma;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Respinforma entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RespinformaRepository extends JpaRepository<Respinforma, Integer> {

}
