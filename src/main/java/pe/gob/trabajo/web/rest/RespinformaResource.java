package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Respinforma;

import pe.gob.trabajo.repository.RespinformaRepository;
import pe.gob.trabajo.repository.search.RespinformaSearchRepository;
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
 * REST controller for managing Respinforma.
 */
@RestController
@RequestMapping("/api")
public class RespinformaResource {

    private final Logger log = LoggerFactory.getLogger(RespinformaResource.class);

    private static final String ENTITY_NAME = "respinforma";

    private final RespinformaRepository respinformaRepository;

    private final RespinformaSearchRepository respinformaSearchRepository;

    public RespinformaResource(RespinformaRepository respinformaRepository, RespinformaSearchRepository respinformaSearchRepository) {
        this.respinformaRepository = respinformaRepository;
        this.respinformaSearchRepository = respinformaSearchRepository;
    }

    /**
     * POST  /respinformas : Create a new respinforma.
     *
     * @param respinforma the respinforma to create
     * @return the ResponseEntity with status 201 (Created) and with body the new respinforma, or with status 400 (Bad Request) if the respinforma has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/respinformas")
    @Timed
    public ResponseEntity<Respinforma> createRespinforma(@Valid @RequestBody Respinforma respinforma) throws URISyntaxException {
        log.debug("REST request to save Respinforma : {}", respinforma);
        if (respinforma.getId() != null) {
            throw new BadRequestAlertException("A new respinforma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Respinforma result = respinformaRepository.save(respinforma);
        respinformaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/respinformas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /respinformas : Updates an existing respinforma.
     *
     * @param respinforma the respinforma to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated respinforma,
     * or with status 400 (Bad Request) if the respinforma is not valid,
     * or with status 500 (Internal Server Error) if the respinforma couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/respinformas")
    @Timed
    public ResponseEntity<Respinforma> updateRespinforma(@Valid @RequestBody Respinforma respinforma) throws URISyntaxException {
        log.debug("REST request to update Respinforma : {}", respinforma);
        if (respinforma.getId() == null) {
            return createRespinforma(respinforma);
        }
        Respinforma result = respinformaRepository.save(respinforma);
        respinformaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, respinforma.getId().toString()))
            .body(result);
    }

    /**
     * GET  /respinformas : get all the respinformas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of respinformas in body
     */
    @GetMapping("/respinformas")
    @Timed
    public List<Respinforma> getAllRespinformas() {
        log.debug("REST request to get all Respinformas");
        return respinformaRepository.findAll();
        }

    /**
     * GET  /respinformas/:id : get the "id" respinforma.
     *
     * @param id the id of the respinforma to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the respinforma, or with status 404 (Not Found)
     */
    @GetMapping("/respinformas/{id}")
    @Timed
    public ResponseEntity<Respinforma> getRespinforma(@PathVariable Integer id) {
        log.debug("REST request to get Respinforma : {}", id);
        Respinforma respinforma = respinformaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(respinforma));
    }

    /**
     * DELETE  /respinformas/:id : delete the "id" respinforma.
     *
     * @param id the id of the respinforma to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/respinformas/{id}")
    @Timed
    public ResponseEntity<Void> deleteRespinforma(@PathVariable Integer id) {
        log.debug("REST request to delete Respinforma : {}", id);
        respinformaRepository.delete(id);
        respinformaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/respinformas?query=:query : search for the respinforma corresponding
     * to the query.
     *
     * @param query the query of the respinforma search
     * @return the result of the search
     */
    @GetMapping("/_search/respinformas")
    @Timed
    public List<Respinforma> searchRespinformas(@RequestParam String query) {
        log.debug("REST request to search Respinformas for query {}", query);
        return StreamSupport
            .stream(respinformaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
