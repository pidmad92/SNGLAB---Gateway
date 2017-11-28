package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Anexlaboral;

import pe.gob.trabajo.repository.AnexlaboralRepository;
import pe.gob.trabajo.repository.search.AnexlaboralSearchRepository;
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
 * REST controller for managing Anexlaboral.
 */
@RestController
@RequestMapping("/api")
public class AnexlaboralResource {

    private final Logger log = LoggerFactory.getLogger(AnexlaboralResource.class);

    private static final String ENTITY_NAME = "anexlaboral";

    private final AnexlaboralRepository anexlaboralRepository;

    private final AnexlaboralSearchRepository anexlaboralSearchRepository;

    public AnexlaboralResource(AnexlaboralRepository anexlaboralRepository, AnexlaboralSearchRepository anexlaboralSearchRepository) {
        this.anexlaboralRepository = anexlaboralRepository;
        this.anexlaboralSearchRepository = anexlaboralSearchRepository;
    }

    /**
     * POST  /anexlaborals : Create a new anexlaboral.
     *
     * @param anexlaboral the anexlaboral to create
     * @return the ResponseEntity with status 201 (Created) and with body the new anexlaboral, or with status 400 (Bad Request) if the anexlaboral has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/anexlaborals")
    @Timed
    public ResponseEntity<Anexlaboral> createAnexlaboral(@Valid @RequestBody Anexlaboral anexlaboral) throws URISyntaxException {
        log.debug("REST request to save Anexlaboral : {}", anexlaboral);
        if (anexlaboral.getId() != null) {
            throw new BadRequestAlertException("A new anexlaboral cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Anexlaboral result = anexlaboralRepository.save(anexlaboral);
        anexlaboralSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/anexlaborals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /anexlaborals : Updates an existing anexlaboral.
     *
     * @param anexlaboral the anexlaboral to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated anexlaboral,
     * or with status 400 (Bad Request) if the anexlaboral is not valid,
     * or with status 500 (Internal Server Error) if the anexlaboral couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/anexlaborals")
    @Timed
    public ResponseEntity<Anexlaboral> updateAnexlaboral(@Valid @RequestBody Anexlaboral anexlaboral) throws URISyntaxException {
        log.debug("REST request to update Anexlaboral : {}", anexlaboral);
        if (anexlaboral.getId() == null) {
            return createAnexlaboral(anexlaboral);
        }
        Anexlaboral result = anexlaboralRepository.save(anexlaboral);
        anexlaboralSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, anexlaboral.getId().toString()))
            .body(result);
    }

    /**
     * GET  /anexlaborals : get all the anexlaborals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of anexlaborals in body
     */
    @GetMapping("/anexlaborals")
    @Timed
    public List<Anexlaboral> getAllAnexlaborals() {
        log.debug("REST request to get all Anexlaborals");
        return anexlaboralRepository.findAll();
        }

    /**
     * GET  /anexlaborals/:id : get the "id" anexlaboral.
     *
     * @param id the id of the anexlaboral to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the anexlaboral, or with status 404 (Not Found)
     */
    @GetMapping("/anexlaborals/{id}")
    @Timed
    public ResponseEntity<Anexlaboral> getAnexlaboral(@PathVariable Integer id) {
        log.debug("REST request to get Anexlaboral : {}", id);
        Anexlaboral anexlaboral = anexlaboralRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(anexlaboral));
    }

    /**
     * DELETE  /anexlaborals/:id : delete the "id" anexlaboral.
     *
     * @param id the id of the anexlaboral to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/anexlaborals/{id}")
    @Timed
    public ResponseEntity<Void> deleteAnexlaboral(@PathVariable Integer id) {
        log.debug("REST request to delete Anexlaboral : {}", id);
        anexlaboralRepository.delete(id);
        anexlaboralSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/anexlaborals?query=:query : search for the anexlaboral corresponding
     * to the query.
     *
     * @param query the query of the anexlaboral search
     * @return the result of the search
     */
    @GetMapping("/_search/anexlaborals")
    @Timed
    public List<Anexlaboral> searchAnexlaborals(@RequestParam String query) {
        log.debug("REST request to search Anexlaborals for query {}", query);
        return StreamSupport
            .stream(anexlaboralSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
