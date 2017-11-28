package pe.gob.trabajo.repository;

import pe.gob.trabajo.domain.Resulnegoc;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Resulnegoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResulnegocRepository extends JpaRepository<Resulnegoc, Integer> {

}
