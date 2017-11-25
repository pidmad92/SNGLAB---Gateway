package pe.gob.trabajo.repository;

import pe.gob.trabajo.domain.Solicform;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Solicform entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicformRepository extends JpaRepository<Solicform, Integer> {

}
