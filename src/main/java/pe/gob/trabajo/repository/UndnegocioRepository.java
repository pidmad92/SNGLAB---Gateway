package pe.gob.trabajo.repository;

import pe.gob.trabajo.domain.Undnegocio;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data JPA repository for the Undnegocio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UndnegocioRepository extends JpaRepository<Undnegocio, Integer> {

}
