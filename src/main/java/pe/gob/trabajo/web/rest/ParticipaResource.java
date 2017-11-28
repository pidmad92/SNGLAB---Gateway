package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Participa;

import pe.gob.trabajo.repository.ParticipaRepository;
import pe.gob.trabajo.repository.search.ParticipaSearchRepository;
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
 * REST controller for managing Participa.
 */
@RestController
@RequestMapping("/api")
public class ParticipaResource {

    private final Logger log = LoggerFactory.getLogger(ParticipaResource.class);

    private static final String ENTITY_NAME = "participa";

    private final ParticipaRepository participaRepository;

    private final ParticipaSearchRepository participaSearchRepository;

    public ParticipaResource(ParticipaRepository participaRepository, ParticipaSearchRepository participaSearchRepository) {
        this.participaRepository = participaRepository;
        this.participaSearchRepository = participaSearchRepository;
    }

    /**
     * POST  /participas : Create a new participa.
     *
     * @param participa the participa to create
     * @return the ResponseEntity with status 201 (Created) and with body the new participa, or with status 400 (Bad Request) if the participa has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/participas")
    @Timed
    public ResponseEntity<Participa> createParticipa(@Valid @RequestBody Participa participa) throws URISyntaxException {
        log.debug("REST request to save Participa : {}", participa);
        if (participa.getId() != null) {
            throw new BadRequestAlertException("A new participa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Participa result = participaRepository.save(participa);
        participaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/participas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /participas : Updates an existing participa.
     *
     * @param participa the participa to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated participa,
     * or with status 400 (Bad Request) if the participa is not valid,
     * or with status 500 (Internal Server Error) if the participa couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/participas")
    @Timed
    public ResponseEntity<Participa> updateParticipa(@Valid @RequestBody Participa participa) throws URISyntaxException {
        log.debug("REST request to update Participa : {}", participa);
        if (participa.getId() == null) {
            return createParticipa(participa);
        }
        Participa result = participaRepository.save(participa);
        participaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, participa.getId().toString()))
            .body(result);
    }

    /**
     * GET  /participas : get all the participas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of participas in body
     */
    @GetMapping("/participas")
    @Timed
    public List<Participa> getAllParticipas() {
        log.debug("REST request to get all Participas");
        return participaRepository.findAll();
        }

    /**
     * GET  /participas/:id : get the "id" participa.
     *
     * @param id the id of the participa to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the participa, or with status 404 (Not Found)
     */
    @GetMapping("/participas/{id}")
    @Timed
    public ResponseEntity<Participa> getParticipa(@PathVariable Integer id) {
        log.debug("REST request to get Participa : {}", id);
        Participa participa = participaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(participa));
    }

    /**
     * DELETE  /participas/:id : delete the "id" participa.
     *
     * @param id the id of the participa to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/participas/{id}")
    @Timed
    public ResponseEntity<Void> deleteParticipa(@PathVariable Integer id) {
        log.debug("REST request to delete Participa : {}", id);
        participaRepository.delete(id);
        participaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/participas?query=:query : search for the participa corresponding
     * to the query.
     *
     * @param query the query of the participa search
     * @return the result of the search
     */
    @GetMapping("/_search/participas")
    @Timed
    public List<Participa> searchParticipas(@RequestParam String query) {
        log.debug("REST request to search Participas for query {}", query);
        return StreamSupport
            .stream(participaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
