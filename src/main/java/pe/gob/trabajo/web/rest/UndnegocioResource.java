package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Undnegocio;

import pe.gob.trabajo.repository.UndnegocioRepository;
import pe.gob.trabajo.repository.search.UndnegocioSearchRepository;
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
 * REST controller for managing Undnegocio.
 */
@RestController
@RequestMapping("/api")
public class UndnegocioResource {

    private final Logger log = LoggerFactory.getLogger(UndnegocioResource.class);

    private static final String ENTITY_NAME = "undnegocio";

    private final UndnegocioRepository undnegocioRepository;

    private final UndnegocioSearchRepository undnegocioSearchRepository;

    public UndnegocioResource(UndnegocioRepository undnegocioRepository, UndnegocioSearchRepository undnegocioSearchRepository) {
        this.undnegocioRepository = undnegocioRepository;
        this.undnegocioSearchRepository = undnegocioSearchRepository;
    }

    /**
     * POST  /undnegocios : Create a new undnegocio.
     *
     * @param undnegocio the undnegocio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new undnegocio, or with status 400 (Bad Request) if the undnegocio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/undnegocios")
    @Timed
    public ResponseEntity<Undnegocio> createUndnegocio(@Valid @RequestBody Undnegocio undnegocio) throws URISyntaxException {
        log.debug("REST request to save Undnegocio : {}", undnegocio);
        if (undnegocio.getId() != null) {
            throw new BadRequestAlertException("A new undnegocio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Undnegocio result = undnegocioRepository.save(undnegocio);
        undnegocioSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/undnegocios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /undnegocios : Updates an existing undnegocio.
     *
     * @param undnegocio the undnegocio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated undnegocio,
     * or with status 400 (Bad Request) if the undnegocio is not valid,
     * or with status 500 (Internal Server Error) if the undnegocio couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/undnegocios")
    @Timed
    public ResponseEntity<Undnegocio> updateUndnegocio(@Valid @RequestBody Undnegocio undnegocio) throws URISyntaxException {
        log.debug("REST request to update Undnegocio : {}", undnegocio);
        if (undnegocio.getId() == null) {
            return createUndnegocio(undnegocio);
        }
        Undnegocio result = undnegocioRepository.save(undnegocio);
        undnegocioSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, undnegocio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /undnegocios : get all the undnegocios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of undnegocios in body
     */
    @GetMapping("/undnegocios")
    @Timed
    public List<Undnegocio> getAllUndnegocios() {
        log.debug("REST request to get all Undnegocios");
        return undnegocioRepository.findAll();
        }

    /**
     * GET  /undnegocios/:id : get the "id" undnegocio.
     *
     * @param id the id of the undnegocio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the undnegocio, or with status 404 (Not Found)
     */
    @GetMapping("/undnegocios/{id}")
    @Timed
    public ResponseEntity<Undnegocio> getUndnegocio(@PathVariable Integer id) {
        log.debug("REST request to get Undnegocio : {}", id);
        Undnegocio undnegocio = undnegocioRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(undnegocio));
    }

    /**
     * DELETE  /undnegocios/:id : delete the "id" undnegocio.
     *
     * @param id the id of the undnegocio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/undnegocios/{id}")
    @Timed
    public ResponseEntity<Void> deleteUndnegocio(@PathVariable Integer id) {
        log.debug("REST request to delete Undnegocio : {}", id);
        undnegocioRepository.delete(id);
        undnegocioSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/undnegocios?query=:query : search for the undnegocio corresponding
     * to the query.
     *
     * @param query the query of the undnegocio search
     * @return the result of the search
     */
    @GetMapping("/_search/undnegocios")
    @Timed
    public List<Undnegocio> searchUndnegocios(@RequestParam String query) {
        log.debug("REST request to search Undnegocios for query {}", query);
        return StreamSupport
            .stream(undnegocioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
