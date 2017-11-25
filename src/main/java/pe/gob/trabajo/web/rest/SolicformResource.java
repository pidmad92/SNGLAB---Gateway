package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Solicform;

import pe.gob.trabajo.repository.SolicformRepository;
import pe.gob.trabajo.repository.search.SolicformSearchRepository;
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
 * REST controller for managing Solicform.
 */
@RestController
@RequestMapping("/api")
public class SolicformResource {

    private final Logger log = LoggerFactory.getLogger(SolicformResource.class);

    private static final String ENTITY_NAME = "solicform";

    private final SolicformRepository solicformRepository;

    private final SolicformSearchRepository solicformSearchRepository;

    public SolicformResource(SolicformRepository solicformRepository, SolicformSearchRepository solicformSearchRepository) {
        this.solicformRepository = solicformRepository;
        this.solicformSearchRepository = solicformSearchRepository;
    }

    /**
     * POST  /solicforms : Create a new solicform.
     *
     * @param solicform the solicform to create
     * @return the ResponseEntity with status 201 (Created) and with body the new solicform, or with status 400 (Bad Request) if the solicform has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/solicforms")
    @Timed
    public ResponseEntity<Solicform> createSolicform(@Valid @RequestBody Solicform solicform) throws URISyntaxException {
        log.debug("REST request to save Solicform : {}", solicform);
        if (solicform.getId() != null) {
            throw new BadRequestAlertException("A new solicform cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Solicform result = solicformRepository.save(solicform);
        solicformSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/solicforms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /solicforms : Updates an existing solicform.
     *
     * @param solicform the solicform to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated solicform,
     * or with status 400 (Bad Request) if the solicform is not valid,
     * or with status 500 (Internal Server Error) if the solicform couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/solicforms")
    @Timed
    public ResponseEntity<Solicform> updateSolicform(@Valid @RequestBody Solicform solicform) throws URISyntaxException {
        log.debug("REST request to update Solicform : {}", solicform);
        if (solicform.getId() == null) {
            return createSolicform(solicform);
        }
        Solicform result = solicformRepository.save(solicform);
        solicformSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, solicform.getId().toString()))
            .body(result);
    }

    /**
     * GET  /solicforms : get all the solicforms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of solicforms in body
     */
    @GetMapping("/solicforms")
    @Timed
    public List<Solicform> getAllSolicforms() {
        log.debug("REST request to get all Solicforms");
        return solicformRepository.findAll();
        }

    /**
     * GET  /solicforms/:id : get the "id" solicform.
     *
     * @param id the id of the solicform to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the solicform, or with status 404 (Not Found)
     */
    @GetMapping("/solicforms/{id}")
    @Timed
    public ResponseEntity<Solicform> getSolicform(@PathVariable Integer id) {
        log.debug("REST request to get Solicform : {}", id);
        Solicform solicform = solicformRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(solicform));
    }

    /**
     * DELETE  /solicforms/:id : delete the "id" solicform.
     *
     * @param id the id of the solicform to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/solicforms/{id}")
    @Timed
    public ResponseEntity<Void> deleteSolicform(@PathVariable Integer id) {
        log.debug("REST request to delete Solicform : {}", id);
        solicformRepository.delete(id);
        solicformSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/solicforms?query=:query : search for the solicform corresponding
     * to the query.
     *
     * @param query the query of the solicform search
     * @return the result of the search
     */
    @GetMapping("/_search/solicforms")
    @Timed
    public List<Solicform> searchSolicforms(@RequestParam String query) {
        log.debug("REST request to search Solicforms for query {}", query);
        return StreamSupport
            .stream(solicformSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
