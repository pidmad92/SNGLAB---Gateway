package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Reporteres;

import pe.gob.trabajo.repository.ReporteresRepository;
import pe.gob.trabajo.repository.search.ReporteresSearchRepository;
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
 * REST controller for managing Reporteres.
 */
@RestController
@RequestMapping("/api")
public class ReporteresResource {

    private final Logger log = LoggerFactory.getLogger(ReporteresResource.class);

    private static final String ENTITY_NAME = "reporteres";

    private final ReporteresRepository reporteresRepository;

    private final ReporteresSearchRepository reporteresSearchRepository;

    public ReporteresResource(ReporteresRepository reporteresRepository, ReporteresSearchRepository reporteresSearchRepository) {
        this.reporteresRepository = reporteresRepository;
        this.reporteresSearchRepository = reporteresSearchRepository;
    }

    /**
     * POST  /reporteres : Create a new reporteres.
     *
     * @param reporteres the reporteres to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reporteres, or with status 400 (Bad Request) if the reporteres has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reporteres")
    @Timed
    public ResponseEntity<Reporteres> createReporteres(@Valid @RequestBody Reporteres reporteres) throws URISyntaxException {
        log.debug("REST request to save Reporteres : {}", reporteres);
        if (reporteres.getId() != null) {
            throw new BadRequestAlertException("A new reporteres cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Reporteres result = reporteresRepository.save(reporteres);
        reporteresSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/reporteres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reporteres : Updates an existing reporteres.
     *
     * @param reporteres the reporteres to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reporteres,
     * or with status 400 (Bad Request) if the reporteres is not valid,
     * or with status 500 (Internal Server Error) if the reporteres couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reporteres")
    @Timed
    public ResponseEntity<Reporteres> updateReporteres(@Valid @RequestBody Reporteres reporteres) throws URISyntaxException {
        log.debug("REST request to update Reporteres : {}", reporteres);
        if (reporteres.getId() == null) {
            return createReporteres(reporteres);
        }
        Reporteres result = reporteresRepository.save(reporteres);
        reporteresSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reporteres.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reporteres : get all the reporteres.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of reporteres in body
     */
    @GetMapping("/reporteres")
    @Timed
    public List<Reporteres> getAllReporteres() {
        log.debug("REST request to get all Reporteres");
        return reporteresRepository.findAll();
        }

    /**
     * GET  /reporteres/:id : get the "id" reporteres.
     *
     * @param id the id of the reporteres to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reporteres, or with status 404 (Not Found)
     */
    @GetMapping("/reporteres/{id}")
    @Timed
    public ResponseEntity<Reporteres> getReporteres(@PathVariable Integer id) {
        log.debug("REST request to get Reporteres : {}", id);
        Reporteres reporteres = reporteresRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(reporteres));
    }

    /**
     * DELETE  /reporteres/:id : delete the "id" reporteres.
     *
     * @param id the id of the reporteres to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reporteres/{id}")
    @Timed
    public ResponseEntity<Void> deleteReporteres(@PathVariable Integer id) {
        log.debug("REST request to delete Reporteres : {}", id);
        reporteresRepository.delete(id);
        reporteresSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/reporteres?query=:query : search for the reporteres corresponding
     * to the query.
     *
     * @param query the query of the reporteres search
     * @return the result of the search
     */
    @GetMapping("/_search/reporteres")
    @Timed
    public List<Reporteres> searchReporteres(@RequestParam String query) {
        log.debug("REST request to search Reporteres for query {}", query);
        return StreamSupport
            .stream(reporteresSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
