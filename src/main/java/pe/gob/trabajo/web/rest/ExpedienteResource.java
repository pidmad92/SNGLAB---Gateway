package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Expediente;

import pe.gob.trabajo.repository.ExpedienteRepository;
import pe.gob.trabajo.repository.search.ExpedienteSearchRepository;
import pe.gob.trabajo.web.rest.errors.BadRequestAlertException;
import pe.gob.trabajo.web.rest.util.HeaderUtil;
import pe.gob.trabajo.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Expediente.
 */
@RestController
@RequestMapping("/api")
public class ExpedienteResource {

    private final Logger log = LoggerFactory.getLogger(ExpedienteResource.class);

    private static final String ENTITY_NAME = "expediente";

    private final ExpedienteRepository expedienteRepository;

    private final ExpedienteSearchRepository expedienteSearchRepository;

    public ExpedienteResource(ExpedienteRepository expedienteRepository, ExpedienteSearchRepository expedienteSearchRepository) {
        this.expedienteRepository = expedienteRepository;
        this.expedienteSearchRepository = expedienteSearchRepository;
    }

    /**
     * POST  /expedientes : Create a new expediente.
     *
     * @param expediente the expediente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expediente, or with status 400 (Bad Request) if the expediente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/expedientes")
    @Timed
    public ResponseEntity<Expediente> createExpediente(@RequestBody Expediente expediente) throws URISyntaxException {
        log.debug("REST request to save Expediente : {}", expediente);
        if (expediente.getId() != null) {
            throw new BadRequestAlertException("A new expediente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expediente result = expedienteRepository.save(expediente);
        expedienteSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/expedientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expedientes : Updates an existing expediente.
     *
     * @param expediente the expediente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expediente,
     * or with status 400 (Bad Request) if the expediente is not valid,
     * or with status 500 (Internal Server Error) if the expediente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/expedientes")
    @Timed
    public ResponseEntity<Expediente> updateExpediente(@RequestBody Expediente expediente) throws URISyntaxException {
        log.debug("REST request to update Expediente : {}", expediente);
        if (expediente.getId() == null) {
            return createExpediente(expediente);
        }
        Expediente result = expedienteRepository.save(expediente);
        expedienteSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, expediente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/expedientes")
    @Timed
    public ResponseEntity<List<Expediente>> getAllExpedientes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Expedientes");
        Page<Expediente> page = expedienteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/expedientes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /expedientes/:id : get the "id" expediente.
     *
     * @param id the id of the expediente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expediente, or with status 404 (Not Found)
     */
    @GetMapping("/expedientes/{id}")
    @Timed
    public ResponseEntity<Expediente> getExpediente(@PathVariable Long id) {
        log.debug("REST request to get Expediente : {}", id);
        Expediente expediente = expedienteRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(expediente));
    }

    /**
     * DELETE  /expedientes/:id : delete the "id" expediente.
     *
     * @param id the id of the expediente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/expedientes/{id}")
    @Timed
    public ResponseEntity<Void> deleteExpediente(@PathVariable Long id) {
        log.debug("REST request to delete Expediente : {}", id);
        expedienteRepository.delete(id);
        expedienteSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/expedientes?query=:query : search for the expediente corresponding
     * to the query.
     *
     * @param query the query of the expediente search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/expedientes")
    @Timed
    public ResponseEntity<List<Expediente>> searchExpedientes(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Expedientes for query {}", query);
        Page<Expediente> page = expedienteSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/expedientes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
