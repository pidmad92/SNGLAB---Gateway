package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Hechoinver;

import pe.gob.trabajo.repository.HechoinverRepository;
import pe.gob.trabajo.repository.search.HechoinverSearchRepository;
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
 * REST controller for managing Hechoinver.
 */
@RestController
@RequestMapping("/api")
public class HechoinverResource {

    private final Logger log = LoggerFactory.getLogger(HechoinverResource.class);

    private static final String ENTITY_NAME = "hechoinver";

    private final HechoinverRepository hechoinverRepository;

    private final HechoinverSearchRepository hechoinverSearchRepository;

    public HechoinverResource(HechoinverRepository hechoinverRepository, HechoinverSearchRepository hechoinverSearchRepository) {
        this.hechoinverRepository = hechoinverRepository;
        this.hechoinverSearchRepository = hechoinverSearchRepository;
    }

    /**
     * POST  /hechoinvers : Create a new hechoinver.
     *
     * @param hechoinver the hechoinver to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hechoinver, or with status 400 (Bad Request) if the hechoinver has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hechoinvers")
    @Timed
    public ResponseEntity<Hechoinver> createHechoinver(@Valid @RequestBody Hechoinver hechoinver) throws URISyntaxException {
        log.debug("REST request to save Hechoinver : {}", hechoinver);
        if (hechoinver.getId() != null) {
            throw new BadRequestAlertException("A new hechoinver cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Hechoinver result = hechoinverRepository.save(hechoinver);
        hechoinverSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/hechoinvers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hechoinvers : Updates an existing hechoinver.
     *
     * @param hechoinver the hechoinver to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hechoinver,
     * or with status 400 (Bad Request) if the hechoinver is not valid,
     * or with status 500 (Internal Server Error) if the hechoinver couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hechoinvers")
    @Timed
    public ResponseEntity<Hechoinver> updateHechoinver(@Valid @RequestBody Hechoinver hechoinver) throws URISyntaxException {
        log.debug("REST request to update Hechoinver : {}", hechoinver);
        if (hechoinver.getId() == null) {
            return createHechoinver(hechoinver);
        }
        Hechoinver result = hechoinverRepository.save(hechoinver);
        hechoinverSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hechoinver.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hechoinvers : get all the hechoinvers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hechoinvers in body
     */
    @GetMapping("/hechoinvers")
    @Timed
    public List<Hechoinver> getAllHechoinvers() {
        log.debug("REST request to get all Hechoinvers");
        return hechoinverRepository.findAll();
        }

    /**
     * GET  /hechoinvers/:id : get the "id" hechoinver.
     *
     * @param id the id of the hechoinver to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hechoinver, or with status 404 (Not Found)
     */
    @GetMapping("/hechoinvers/{id}")
    @Timed
    public ResponseEntity<Hechoinver> getHechoinver(@PathVariable Integer id) {
        log.debug("REST request to get Hechoinver : {}", id);
        Hechoinver hechoinver = hechoinverRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(hechoinver));
    }

    /**
     * DELETE  /hechoinvers/:id : delete the "id" hechoinver.
     *
     * @param id the id of the hechoinver to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hechoinvers/{id}")
    @Timed
    public ResponseEntity<Void> deleteHechoinver(@PathVariable Integer id) {
        log.debug("REST request to delete Hechoinver : {}", id);
        hechoinverRepository.delete(id);
        hechoinverSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/hechoinvers?query=:query : search for the hechoinver corresponding
     * to the query.
     *
     * @param query the query of the hechoinver search
     * @return the result of the search
     */
    @GetMapping("/_search/hechoinvers")
    @Timed
    public List<Hechoinver> searchHechoinvers(@RequestParam String query) {
        log.debug("REST request to search Hechoinvers for query {}", query);
        return StreamSupport
            .stream(hechoinverSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
