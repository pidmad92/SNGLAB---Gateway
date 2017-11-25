package pe.gob.trabajo.repository;

import pe.gob.trabajo.domain.Negocolect;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Negocolect entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NegocolectRepository extends JpaRepository<Negocolect, Integer> {

}
