package pe.gob.trabajo.repository;

import pe.gob.trabajo.domain.Formarchivo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Formarchivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormarchivoRepository extends JpaRepository<Formarchivo, Integer> {

}
