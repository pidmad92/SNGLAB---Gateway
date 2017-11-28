package pe.gob.trabajo.repository;

import pe.gob.trabajo.domain.Solicitud;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Solicitud entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Integer> {

    @Query("select a.nCodsolic, b.nCodrepre, b.vNombre, a.tFecsolic, a.tFecenvio, a.vSolicita, a.vEmpleador, a.vSindicato, a.vArbitro, a.tFecvigde, a.tFecvigha, a.vVoucher, a.vFlgest, a.vRegistro, a.vRucsol "+
    "from Solicitud a LEFT JOIN a.reporteRes b where a.vCodusu = :codUsuario")
    public List<Solicitud> obtenerSolicitud(@Param("codUsuario") String codUsuario);

}
