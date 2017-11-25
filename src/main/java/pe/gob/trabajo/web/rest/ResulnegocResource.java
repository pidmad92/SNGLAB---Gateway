package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Resulnegoc;

import pe.gob.trabajo.repository.ResulnegocRepository;
import pe.gob.trabajo.repository.search.ResulnegocSearchRepository;
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
 * REST controller for managing Resulnegoc.
 */
@RestController
@RequestMapping("/api")
public class ResulnegocResource {

    private final Logger log = LoggerFactory.getLogger(ResulnegocResource.class);

    private static final String ENTITY_NAME = "resulnegoc";

    private final ResulnegocRepository resulnegocRepository;

    private final ResulnegocSearchRepository resulnegocSearchRepository;

    public ResulnegocResource(ResulnegocRepository resulnegocRepository, ResulnegocSearchRepository resulnegocSearchRepository) {
        this.resulnegocRepository = resulnegocRepository;
        this.resulnegocSearchRepository = resulnegocSearchRepository;
    }

    /**
     * POST  /resulnegocs : Create a new resulnegoc.
     *
     * @param resulnegoc the resulnegoc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resulnegoc, or with status 400 (Bad Request) if the resulnegoc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resulnegocs")
    @Timed
    public ResponseEntity<Resulnegoc> createResulnegoc(@Valid @RequestBody Resulnegoc resulnegoc) throws URISyntaxException {
        log.debug("REST request to save Resulnegoc : {}", resulnegoc);
        if (resulnegoc.getId() != null) {
            throw new BadRequestAlertException("A new resulnegoc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Resulnegoc result = resulnegocRepository.save(resulnegoc);
        resulnegocSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/resulnegocs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resulnegocs : Updates an existing resulnegoc.
     *
     * @param resulnegoc the resulnegoc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resulnegoc,
     * or with status 400 (Bad Request) if the resulnegoc is not valid,
     * or with status 500 (Internal Server Error) if the resulnegoc couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resulnegocs")
    @Timed
    public ResponseEntity<Resulnegoc> updateResulnegoc(@Valid @RequestBody Resulnegoc resulnegoc) throws URISyntaxException {
        log.debug("REST request to update Resulnegoc : {}", resulnegoc);
        if (resulnegoc.getId() == null) {
            return createResulnegoc(resulnegoc);
        }
        Resulnegoc result = resulnegocRepository.save(resulnegoc);
        resulnegocSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resulnegoc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resulnegocs : get all the resulnegocs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resulnegocs in body
     */
    @GetMapping("/resulnegocs")
    @Timed
    public List<Resulnegoc> getAllResulnegocs() {
        log.debug("REST request to get all Resulnegocs");
        return resulnegocRepository.findAll();
        }

    /**
     * GET  /resulnegocs/:id : get the "id" resulnegoc.
     *
     * @param id the id of the resulnegoc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resulnegoc, or with status 404 (Not Found)
     */
    @GetMapping("/resulnegocs/{id}")
    @Timed
    public ResponseEntity<Resulnegoc> getResulnegoc(@PathVariable Integer id) {
        log.debug("REST request to get Resulnegoc : {}", id);
        Resulnegoc resulnegoc = resulnegocRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resulnegoc));
    }

    /**
     * DELETE  /resulnegocs/:id : delete the "id" resulnegoc.
     *
     * @param id the id of the resulnegoc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resulnegocs/{id}")
    @Timed
    public ResponseEntity<Void> deleteResulnegoc(@PathVariable Integer id) {
        log.debug("REST request to delete Resulnegoc : {}", id);
        resulnegocRepository.delete(id);
        resulnegocSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/resulnegocs?query=:query : search for the resulnegoc corresponding
     * to the query.
     *
     * @param query the query of the resulnegoc search
     * @return the result of the search
     */
    @GetMapping("/_search/resulnegocs")
    @Timed
    public List<Resulnegoc> searchResulnegocs(@RequestParam String query) {
        log.debug("REST request to search Resulnegocs for query {}", query);
        return StreamSupport
            .stream(resulnegocSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
