package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Formfinanc;

import pe.gob.trabajo.repository.FormfinancRepository;
import pe.gob.trabajo.repository.search.FormfinancSearchRepository;
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
 * REST controller for managing Formfinanc.
 */
@RestController
@RequestMapping("/api")
public class FormfinancResource {

    private final Logger log = LoggerFactory.getLogger(FormfinancResource.class);

    private static final String ENTITY_NAME = "formfinanc";

    private final FormfinancRepository formfinancRepository;

    private final FormfinancSearchRepository formfinancSearchRepository;

    public FormfinancResource(FormfinancRepository formfinancRepository, FormfinancSearchRepository formfinancSearchRepository) {
        this.formfinancRepository = formfinancRepository;
        this.formfinancSearchRepository = formfinancSearchRepository;
    }

    /**
     * POST  /formfinancs : Create a new formfinanc.
     *
     * @param formfinanc the formfinanc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formfinanc, or with status 400 (Bad Request) if the formfinanc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/formfinancs")
    @Timed
    public ResponseEntity<Formfinanc> createFormfinanc(@Valid @RequestBody Formfinanc formfinanc) throws URISyntaxException {
        log.debug("REST request to save Formfinanc : {}", formfinanc);
        if (formfinanc.getId() != null) {
            throw new BadRequestAlertException("A new formfinanc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Formfinanc result = formfinancRepository.save(formfinanc);
        formfinancSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/formfinancs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /formfinancs : Updates an existing formfinanc.
     *
     * @param formfinanc the formfinanc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formfinanc,
     * or with status 400 (Bad Request) if the formfinanc is not valid,
     * or with status 500 (Internal Server Error) if the formfinanc couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/formfinancs")
    @Timed
    public ResponseEntity<Formfinanc> updateFormfinanc(@Valid @RequestBody Formfinanc formfinanc) throws URISyntaxException {
        log.debug("REST request to update Formfinanc : {}", formfinanc);
        if (formfinanc.getId() == null) {
            return createFormfinanc(formfinanc);
        }
        Formfinanc result = formfinancRepository.save(formfinanc);
        formfinancSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formfinanc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /formfinancs : get all the formfinancs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of formfinancs in body
     */
    @GetMapping("/formfinancs")
    @Timed
    public List<Formfinanc> getAllFormfinancs() {
        log.debug("REST request to get all Formfinancs");
        return formfinancRepository.findAll();
        }

    /**
     * GET  /formfinancs/:id : get the "id" formfinanc.
     *
     * @param id the id of the formfinanc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formfinanc, or with status 404 (Not Found)
     */
    @GetMapping("/formfinancs/{id}")
    @Timed
    public ResponseEntity<Formfinanc> getFormfinanc(@PathVariable Integer id) {
        log.debug("REST request to get Formfinanc : {}", id);
        Formfinanc formfinanc = formfinancRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(formfinanc));
    }

    /**
     * DELETE  /formfinancs/:id : delete the "id" formfinanc.
     *
     * @param id the id of the formfinanc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/formfinancs/{id}")
    @Timed
    public ResponseEntity<Void> deleteFormfinanc(@PathVariable Integer id) {
        log.debug("REST request to delete Formfinanc : {}", id);
        formfinancRepository.delete(id);
        formfinancSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/formfinancs?query=:query : search for the formfinanc corresponding
     * to the query.
     *
     * @param query the query of the formfinanc search
     * @return the result of the search
     */
    @GetMapping("/_search/formfinancs")
    @Timed
    public List<Formfinanc> searchFormfinancs(@RequestParam String query) {
        log.debug("REST request to search Formfinancs for query {}", query);
        return StreamSupport
            .stream(formfinancSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
