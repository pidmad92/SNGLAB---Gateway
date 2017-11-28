package pe.gob.trabajo.repository;

import pe.gob.trabajo.domain.Formperfil;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data JPA repository for the Formperfil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormperfilRepository extends JpaRepository<Formperfil, Integer> {


}
