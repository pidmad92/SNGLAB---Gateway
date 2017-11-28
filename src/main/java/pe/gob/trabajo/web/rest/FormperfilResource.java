package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Formperfil;

import pe.gob.trabajo.repository.FormperfilRepository;
import pe.gob.trabajo.repository.search.FormperfilSearchRepository;
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
 * REST controller for managing Formperfil.
 */
@RestController
@RequestMapping("/api")
public class FormperfilResource {

    private final Logger log = LoggerFactory.getLogger(FormperfilResource.class);

    private static final String ENTITY_NAME = "formperfil";

    private final FormperfilRepository formperfilRepository;

    private final FormperfilSearchRepository formperfilSearchRepository;

    public FormperfilResource(FormperfilRepository formperfilRepository, FormperfilSearchRepository formperfilSearchRepository) {
        this.formperfilRepository = formperfilRepository;
        this.formperfilSearchRepository = formperfilSearchRepository;
    }

    /**
     * POST  /formperfils : Create a new formperfil.
     *
     * @param formperfil the formperfil to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formperfil, or with status 400 (Bad Request) if the formperfil has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/formperfils")
    @Timed
    public ResponseEntity<Formperfil> createFormperfil(@Valid @RequestBody Formperfil formperfil) throws URISyntaxException {
        log.debug("REST request to save Formperfil : {}", formperfil);
        if (formperfil.getId() != null) {
            throw new BadRequestAlertException("A new formperfil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Formperfil result = formperfilRepository.save(formperfil);
        formperfilSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/formperfils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /formperfils : Updates an existing formperfil.
     *
     * @param formperfil the formperfil to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formperfil,
     * or with status 400 (Bad Request) if the formperfil is not valid,
     * or with status 500 (Internal Server Error) if the formperfil couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/formperfils")
    @Timed
    public ResponseEntity<Formperfil> updateFormperfil(@Valid @RequestBody Formperfil formperfil) throws URISyntaxException {
        log.debug("REST request to update Formperfil : {}", formperfil);
        if (formperfil.getId() == null) {
            return createFormperfil(formperfil);
        }
        Formperfil result = formperfilRepository.save(formperfil);
        formperfilSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formperfil.getId().toString()))
            .body(result);
    }

    /**
     * GET  /formperfils : get all the formperfils.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of formperfils in body
     */
    @GetMapping("/formperfils")
    @Timed
    public List<Formperfil> getAllFormperfils() {
        log.debug("REST request to get all Formperfils");
        return formperfilRepository.findAll();
        }

    /**
     * GET  /formperfils/:id : get the "id" formperfil.
     *
     * @param id the id of the formperfil to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formperfil, or with status 404 (Not Found)
     */
    @GetMapping("/formperfils/{id}")
    @Timed
    public ResponseEntity<Formperfil> getFormperfil(@PathVariable Integer id) {
        log.debug("REST request to get Formperfil : {}", id);
        Formperfil formperfil = formperfilRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(formperfil));
    }

    /**
     * DELETE  /formperfils/:id : delete the "id" formperfil.
     *
     * @param id the id of the formperfil to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/formperfils/{id}")
    @Timed
    public ResponseEntity<Void> deleteFormperfil(@PathVariable Integer id) {
        log.debug("REST request to delete Formperfil : {}", id);
        formperfilRepository.delete(id);
        formperfilSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/formperfils?query=:query : search for the formperfil corresponding
     * to the query.
     *
     * @param query the query of the formperfil search
     * @return the result of the search
     */
    @GetMapping("/_search/formperfils")
    @Timed
    public List<Formperfil> searchFormperfils(@RequestParam String query) {
        log.debug("REST request to search Formperfils for query {}", query);
        return StreamSupport
            .stream(formperfilSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
