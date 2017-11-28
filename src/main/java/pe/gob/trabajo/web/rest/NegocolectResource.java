package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Negocolect;

import pe.gob.trabajo.repository.NegocolectRepository;
import pe.gob.trabajo.repository.search.NegocolectSearchRepository;
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
 * REST controller for managing Negocolect.
 */
@RestController
@RequestMapping("/api")
public class NegocolectResource {

    private final Logger log = LoggerFactory.getLogger(NegocolectResource.class);

    private static final String ENTITY_NAME = "negocolect";

    private final NegocolectRepository negocolectRepository;

    private final NegocolectSearchRepository negocolectSearchRepository;

    public NegocolectResource(NegocolectRepository negocolectRepository, NegocolectSearchRepository negocolectSearchRepository) {
        this.negocolectRepository = negocolectRepository;
        this.negocolectSearchRepository = negocolectSearchRepository;
    }

    /**
     * POST  /negocolects : Create a new negocolect.
     *
     * @param negocolect the negocolect to create
     * @return the ResponseEntity with status 201 (Created) and with body the new negocolect, or with status 400 (Bad Request) if the negocolect has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/negocolects")
    @Timed
    public ResponseEntity<Negocolect> createNegocolect(@Valid @RequestBody Negocolect negocolect) throws URISyntaxException {
        log.debug("REST request to save Negocolect : {}", negocolect);
        if (negocolect.getId() != null) {
            throw new BadRequestAlertException("A new negocolect cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Negocolect result = negocolectRepository.save(negocolect);
        negocolectSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/negocolects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /negocolects : Updates an existing negocolect.
     *
     * @param negocolect the negocolect to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated negocolect,
     * or with status 400 (Bad Request) if the negocolect is not valid,
     * or with status 500 (Internal Server Error) if the negocolect couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/negocolects")
    @Timed
    public ResponseEntity<Negocolect> updateNegocolect(@Valid @RequestBody Negocolect negocolect) throws URISyntaxException {
        log.debug("REST request to update Negocolect : {}", negocolect);
        if (negocolect.getId() == null) {
            return createNegocolect(negocolect);
        }
        Negocolect result = negocolectRepository.save(negocolect);
        negocolectSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, negocolect.getId().toString()))
            .body(result);
    }

    /**
     * GET  /negocolects : get all the negocolects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of negocolects in body
     */
    @GetMapping("/negocolects")
    @Timed
    public List<Negocolect> getAllNegocolects() {
        log.debug("REST request to get all Negocolects");
        return negocolectRepository.findAll();
        }

    /**
     * GET  /negocolects/:id : get the "id" negocolect.
     *
     * @param id the id of the negocolect to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the negocolect, or with status 404 (Not Found)
     */
    @GetMapping("/negocolects/{id}")
    @Timed
    public ResponseEntity<Negocolect> getNegocolect(@PathVariable Integer id) {
        log.debug("REST request to get Negocolect : {}", id);
        Negocolect negocolect = negocolectRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(negocolect));
    }

    /**
     * DELETE  /negocolects/:id : delete the "id" negocolect.
     *
     * @param id the id of the negocolect to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/negocolects/{id}")
    @Timed
    public ResponseEntity<Void> deleteNegocolect(@PathVariable Integer id) {
        log.debug("REST request to delete Negocolect : {}", id);
        negocolectRepository.delete(id);
        negocolectSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/negocolects?query=:query : search for the negocolect corresponding
     * to the query.
     *
     * @param query the query of the negocolect search
     * @return the result of the search
     */
    @GetMapping("/_search/negocolects")
    @Timed
    public List<Negocolect> searchNegocolects(@RequestParam String query) {
        log.debug("REST request to search Negocolects for query {}", query);
        return StreamSupport
            .stream(negocolectSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
