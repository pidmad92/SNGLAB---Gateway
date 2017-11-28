package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Solicitud;

import pe.gob.trabajo.repository.SolicitudRepository;
import pe.gob.trabajo.repository.search.SolicitudSearchRepository;
import pe.gob.trabajo.web.rest.errors.BadRequestAlertException;
import pe.gob.trabajo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Solicitud.
 */
@RestController
@RequestMapping("/api")
public class SolicitudResource {

    private final Logger log = LoggerFactory.getLogger(SolicitudResource.class);

    private static final String ENTITY_NAME = "solicitud";

    private final SolicitudRepository solicitudRepository;

    private final SolicitudSearchRepository solicitudSearchRepository;

    public SolicitudResource(SolicitudRepository solicitudRepository, SolicitudSearchRepository solicitudSearchRepository) {
        this.solicitudRepository = solicitudRepository;
        this.solicitudSearchRepository = solicitudSearchRepository;
    }

    /**
     * POST  /solicituds : Create a new solicitud.
     *
     * @param solicitud the solicitud to create
     * @return the ResponseEntity with status 201 (Created) and with body the new solicitud, or with status 400 (Bad Request) if the solicitud has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/solicituds")
    @Timed
    public ResponseEntity<Solicitud> createSolicitud(@Valid @RequestBody Solicitud solicitud) throws URISyntaxException {
        log.debug("REST request to save Solicitud : {}", solicitud);
        if (solicitud.getId() != null) {
            throw new BadRequestAlertException("A new solicitud cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Solicitud result = solicitudRepository.save(solicitud);
        solicitudSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/solicituds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /solicituds : Updates an existing solicitud.
     *
     * @param solicitud the solicitud to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated solicitud,
     * or with status 400 (Bad Request) if the solicitud is not valid,
     * or with status 500 (Internal Server Error) if the solicitud couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/solicituds")
    @Timed
    public ResponseEntity<Solicitud> updateSolicitud(@Valid @RequestBody Solicitud solicitud) throws URISyntaxException {
        log.debug("REST request to update Solicitud : {}", solicitud);
        if (solicitud.getId() == null) {
            return createSolicitud(solicitud);
        }
        Solicitud result = solicitudRepository.save(solicitud);
        solicitudSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, solicitud.getId().toString()))
            .body(result);
    }

    /**
     * GET  /solicituds : get all the solicituds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of solicituds in body
     */
    @GetMapping("/solicituds")
    @Timed
    public List<Solicitud> getAllSolicituds() {
        log.debug("REST request to get all Solicituds");
        return solicitudRepository.findAll();
        }

    /**
     * GET  /solicituds/:id : get the "id" solicitud.
     *
     * @param id the id of the solicitud to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the solicitud, or with status 404 (Not Found)
     */
    @GetMapping("/solicituds/{id}")
    @Timed
    public ResponseEntity<Solicitud> getSolicitud(@PathVariable Integer id) {
        log.debug("REST request to get Solicitud : {}", id);
        Solicitud solicitud = solicitudRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(solicitud));
    }

    /**
     * DELETE  /solicituds/:id : delete the "id" solicitud.
     *
     * @param id the id of the solicitud to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/solicituds/{id}")
    @Timed
    public ResponseEntity<Void> deleteSolicitud(@PathVariable Integer id) {
        log.debug("REST request to delete Solicitud : {}", id);
        solicitudRepository.delete(id);
        solicitudSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/solicituds?query=:query : search for the solicitud corresponding
     * to the query.
     *
     * @param query the query of the solicitud search
     * @return the result of the search
     */
    @GetMapping("/_search/solicituds")
    @Timed
    public List<Solicitud> searchSolicituds(@RequestParam String query) {
        log.debug("REST request to search Solicituds for query {}", query);
        return StreamSupport
            .stream(solicitudSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    /**
     * GET  /obtenerSolicitud : obtener solicitudes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of obtenerSolicitud in body
     */
    @GetMapping("/obtenerSolicitud")
    @Timed
    public List<Solicitud> obtenerSolicitud(@RequestParam String codUsuario) {
        log.debug("REST obtener solicitudes, cantidad: " + solicitudRepository.obtenerSolicitud(codUsuario).size());
        return solicitudRepository.obtenerSolicitud(codUsuario);
    }

}
