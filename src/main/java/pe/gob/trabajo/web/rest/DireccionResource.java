package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Direccion;

import pe.gob.trabajo.repository.DireccionRepository;
import pe.gob.trabajo.repository.search.DireccionSearchRepository;
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
 * REST controller for managing Direccion.
 */
@RestController
@RequestMapping("/api")
public class DireccionResource {

    private final Logger log = LoggerFactory.getLogger(DireccionResource.class);

    private static final String ENTITY_NAME = "direccion";

    private final DireccionRepository direccionRepository;

    private final DireccionSearchRepository direccionSearchRepository;

    public DireccionResource(DireccionRepository direccionRepository, DireccionSearchRepository direccionSearchRepository) {
        this.direccionRepository = direccionRepository;
        this.direccionSearchRepository = direccionSearchRepository;
    }

    /**
     * POST  /direccions : Create a new direccion.
     *
     * @param direccion the direccion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new direccion, or with status 400 (Bad Request) if the direccion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/direccions")
    @Timed
    public ResponseEntity<Direccion> createDireccion(@Valid @RequestBody Direccion direccion) throws URISyntaxException {
        log.debug("REST request to save Direccion : {}", direccion);
        if (direccion.getId() != null) {
            throw new BadRequestAlertException("A new direccion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Direccion result = direccionRepository.save(direccion);
        direccionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/direccions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /direccions : Updates an existing direccion.
     *
     * @param direccion the direccion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated direccion,
     * or with status 400 (Bad Request) if the direccion is not valid,
     * or with status 500 (Internal Server Error) if the direccion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/direccions")
    @Timed
    public ResponseEntity<Direccion> updateDireccion(@Valid @RequestBody Direccion direccion) throws URISyntaxException {
        log.debug("REST request to update Direccion : {}", direccion);
        if (direccion.getId() == null) {
            return createDireccion(direccion);
        }
        Direccion result = direccionRepository.save(direccion);
        direccionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, direccion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /direccions : get all the direccions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of direccions in body
     */
    @GetMapping("/direccions")
    @Timed
    public List<Direccion> getAllDireccions() {
        log.debug("REST request to get all Direccions");
        return direccionRepository.findAll();
        }

    /**
     * GET  /direccions/:id : get the "id" direccion.
     *
     * @param id the id of the direccion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the direccion, or with status 404 (Not Found)
     */
    @GetMapping("/direccions/{id}")
    @Timed
    public ResponseEntity<Direccion> getDireccion(@PathVariable Integer id) {
        log.debug("REST request to get Direccion : {}", id);
        Direccion direccion = direccionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(direccion));
    }

    /**
     * DELETE  /direccions/:id : delete the "id" direccion.
     *
     * @param id the id of the direccion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/direccions/{id}")
    @Timed
    public ResponseEntity<Void> deleteDireccion(@PathVariable Integer id) {
        log.debug("REST request to delete Direccion : {}", id);
        direccionRepository.delete(id);
        direccionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/direccions?query=:query : search for the direccion corresponding
     * to the query.
     *
     * @param query the query of the direccion search
     * @return the result of the search
     */
    @GetMapping("/_search/direccions")
    @Timed
    public List<Direccion> searchDireccions(@RequestParam String query) {
        log.debug("REST request to search Direccions for query {}", query);
        return StreamSupport
            .stream(direccionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
