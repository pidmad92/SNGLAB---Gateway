package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Formarchivo;

import pe.gob.trabajo.repository.FormarchivoRepository;
import pe.gob.trabajo.repository.search.FormarchivoSearchRepository;
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
 * REST controller for managing Formarchivo.
 */
@RestController
@RequestMapping("/api")
public class FormarchivoResource {

    private final Logger log = LoggerFactory.getLogger(FormarchivoResource.class);

    private static final String ENTITY_NAME = "formarchivo";

    private final FormarchivoRepository formarchivoRepository;

    private final FormarchivoSearchRepository formarchivoSearchRepository;

    public FormarchivoResource(FormarchivoRepository formarchivoRepository, FormarchivoSearchRepository formarchivoSearchRepository) {
        this.formarchivoRepository = formarchivoRepository;
        this.formarchivoSearchRepository = formarchivoSearchRepository;
    }

    /**
     * POST  /formarchivos : Create a new formarchivo.
     *
     * @param formarchivo the formarchivo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formarchivo, or with status 400 (Bad Request) if the formarchivo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/formarchivos")
    @Timed
    public ResponseEntity<Formarchivo> createFormarchivo(@Valid @RequestBody Formarchivo formarchivo) throws URISyntaxException {
        log.debug("REST request to save Formarchivo : {}", formarchivo);
        if (formarchivo.getId() != null) {
            throw new BadRequestAlertException("A new formarchivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Formarchivo result = formarchivoRepository.save(formarchivo);
        formarchivoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/formarchivos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /formarchivos : Updates an existing formarchivo.
     *
     * @param formarchivo the formarchivo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formarchivo,
     * or with status 400 (Bad Request) if the formarchivo is not valid,
     * or with status 500 (Internal Server Error) if the formarchivo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/formarchivos")
    @Timed
    public ResponseEntity<Formarchivo> updateFormarchivo(@Valid @RequestBody Formarchivo formarchivo) throws URISyntaxException {
        log.debug("REST request to update Formarchivo : {}", formarchivo);
        if (formarchivo.getId() == null) {
            return createFormarchivo(formarchivo);
        }
        Formarchivo result = formarchivoRepository.save(formarchivo);
        formarchivoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formarchivo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /formarchivos : get all the formarchivos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of formarchivos in body
     */
    @GetMapping("/formarchivos")
    @Timed
    public List<Formarchivo> getAllFormarchivos() {
        log.debug("REST request to get all Formarchivos");
        return formarchivoRepository.findAll();
        }

    /**
     * GET  /formarchivos/:id : get the "id" formarchivo.
     *
     * @param id the id of the formarchivo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formarchivo, or with status 404 (Not Found)
     */
    @GetMapping("/formarchivos/{id}")
    @Timed
    public ResponseEntity<Formarchivo> getFormarchivo(@PathVariable Integer id) {
        log.debug("REST request to get Formarchivo : {}", id);
        Formarchivo formarchivo = formarchivoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(formarchivo));
    }

    /**
     * DELETE  /formarchivos/:id : delete the "id" formarchivo.
     *
     * @param id the id of the formarchivo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/formarchivos/{id}")
    @Timed
    public ResponseEntity<Void> deleteFormarchivo(@PathVariable Integer id) {
        log.debug("REST request to delete Formarchivo : {}", id);
        formarchivoRepository.delete(id);
        formarchivoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/formarchivos?query=:query : search for the formarchivo corresponding
     * to the query.
     *
     * @param query the query of the formarchivo search
     * @return the result of the search
     */
    @GetMapping("/_search/formarchivos")
    @Timed
    public List<Formarchivo> searchFormarchivos(@RequestParam String query) {
        log.debug("REST request to search Formarchivos for query {}", query);
        return StreamSupport
            .stream(formarchivoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
