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

    //Obtener los datos de control de informacion de los formularios
    @Query("select a " +
    "from Solicform a where a.nFlgactivo = 1 and a.nFlgoblig = :flgObligatorio and a.nCodsolic = :codSolicitud")
    public List<Solicform> obtenerDatosFormulario(@Param("flgObligatorio") Boolean flgObligatorio, @Param("codSolicitud") Integer codSolicitud);


}
