package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Reporteres;
import pe.gob.trabajo.repository.ReporteresRepository;
import pe.gob.trabajo.repository.search.ReporteresSearchRepository;
import pe.gob.trabajo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static pe.gob.trabajo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReporteresResource REST controller.
 *
 * @see ReporteresResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class ReporteresResourceIntTest {

    private static final Integer DEFAULT_N_CODREPRE = 1;
    private static final Integer UPDATED_N_CODREPRE = 2;

    private static final String DEFAULT_V_TIPOREP = "AA";
    private static final String UPDATED_V_TIPOREP = "BB";

    private static final String DEFAULT_V_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_V_NOMBRE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_B_ARCHIVO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_B_ARCHIVO = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_B_ARCHIVO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_B_ARCHIVO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_V_CONTYPE = "AAAAAAAAAA";
    private static final String UPDATED_V_CONTYPE = "BBBBBBBBBB";

    private static final String DEFAULT_V_USUAREG = "AAAAAAAAAA";
    private static final String UPDATED_V_USUAREG = "BBBBBBBBBB";

    private static final Instant DEFAULT_T_FECREG = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_T_FECREG = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_N_FLGACTIVO = false;
    private static final Boolean UPDATED_N_FLGACTIVO = true;

    private static final Integer DEFAULT_N_SEDEREG = 1;
    private static final Integer UPDATED_N_SEDEREG = 2;

    private static final String DEFAULT_V_USUAUPD = "AAAAAAAAAA";
    private static final String UPDATED_V_USUAUPD = "BBBBBBBBBB";

    private static final Instant DEFAULT_T_FECUPD = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_T_FECUPD = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_N_SEDEUPD = 1;
    private static final Integer UPDATED_N_SEDEUPD = 2;

    @Autowired
    private ReporteresRepository reporteresRepository;

    @Autowired
    private ReporteresSearchRepository reporteresSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReporteresMockMvc;

    private Reporteres reporteres;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReporteresResource reporteresResource = new ReporteresResource(reporteresRepository, reporteresSearchRepository);
        this.restReporteresMockMvc = MockMvcBuilders.standaloneSetup(reporteresResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reporteres createEntity(EntityManager em) {
        Reporteres reporteres = new Reporteres()
            .nCodrepre(DEFAULT_N_CODREPRE)
            .vTiporep(DEFAULT_V_TIPOREP)
            .vNombre(DEFAULT_V_NOMBRE)
            .bArchivo(DEFAULT_B_ARCHIVO)
            .bArchivoContentType(DEFAULT_B_ARCHIVO_CONTENT_TYPE)
            .vContype(DEFAULT_V_CONTYPE)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return reporteres;
    }

    @Before
    public void initTest() {
        reporteresSearchRepository.deleteAll();
        reporteres = createEntity(em);
    }

    @Test
    @Transactional
    public void createReporteres() throws Exception {
        int databaseSizeBeforeCreate = reporteresRepository.findAll().size();

        // Create the Reporteres
        restReporteresMockMvc.perform(post("/api/reporteres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteres)))
            .andExpect(status().isCreated());

        // Validate the Reporteres in the database
        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeCreate + 1);
        Reporteres testReporteres = reporteresList.get(reporteresList.size() - 1);
        assertThat(testReporteres.getnCodrepre()).isEqualTo(DEFAULT_N_CODREPRE);
        assertThat(testReporteres.getvTiporep()).isEqualTo(DEFAULT_V_TIPOREP);
        assertThat(testReporteres.getvNombre()).isEqualTo(DEFAULT_V_NOMBRE);
        assertThat(testReporteres.getbArchivo()).isEqualTo(DEFAULT_B_ARCHIVO);
        assertThat(testReporteres.getbArchivoContentType()).isEqualTo(DEFAULT_B_ARCHIVO_CONTENT_TYPE);
        assertThat(testReporteres.getvContype()).isEqualTo(DEFAULT_V_CONTYPE);
        assertThat(testReporteres.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testReporteres.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testReporteres.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testReporteres.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testReporteres.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testReporteres.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testReporteres.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Reporteres in Elasticsearch
        Reporteres reporteresEs = reporteresSearchRepository.findOne(testReporteres.getnCodrepre());
        assertThat(reporteresEs).isEqualToComparingFieldByField(testReporteres);
    }

    @Test
    @Transactional
    public void createReporteresWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reporteresRepository.findAll().size();

        // Create the Reporteres with an existing ID
        reporteres.setnCodrepre(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReporteresMockMvc.perform(post("/api/reporteres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteres)))
            .andExpect(status().isBadRequest());

        // Validate the Reporteres in the database
        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodrepreIsRequired() throws Exception {
        int databaseSizeBeforeTest = reporteresRepository.findAll().size();
        // set the field null
        reporteres.setnCodrepre(null);

        // Create the Reporteres, which fails.

        restReporteresMockMvc.perform(post("/api/reporteres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteres)))
            .andExpect(status().isBadRequest());

        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = reporteresRepository.findAll().size();
        // set the field null
        reporteres.setvUsuareg(null);

        // Create the Reporteres, which fails.

        restReporteresMockMvc.perform(post("/api/reporteres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteres)))
            .andExpect(status().isBadRequest());

        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = reporteresRepository.findAll().size();
        // set the field null
        reporteres.settFecreg(null);

        // Create the Reporteres, which fails.

        restReporteresMockMvc.perform(post("/api/reporteres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteres)))
            .andExpect(status().isBadRequest());

        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = reporteresRepository.findAll().size();
        // set the field null
        reporteres.setnFlgactivo(null);

        // Create the Reporteres, which fails.

        restReporteresMockMvc.perform(post("/api/reporteres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteres)))
            .andExpect(status().isBadRequest());

        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = reporteresRepository.findAll().size();
        // set the field null
        reporteres.setnSedereg(null);

        // Create the Reporteres, which fails.

        restReporteresMockMvc.perform(post("/api/reporteres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteres)))
            .andExpect(status().isBadRequest());

        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReporteres() throws Exception {
        // Initialize the database
        reporteresRepository.saveAndFlush(reporteres);

        // Get all the reporteresList
        restReporteresMockMvc.perform(get("/api/reporteres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(reporteres.getnCodrepre().intValue())))
            .andExpect(jsonPath("$.[*].nCodrepre").value(hasItem(DEFAULT_N_CODREPRE)))
            .andExpect(jsonPath("$.[*].vTiporep").value(hasItem(DEFAULT_V_TIPOREP.toString())))
            .andExpect(jsonPath("$.[*].vNombre").value(hasItem(DEFAULT_V_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].bArchivoContentType").value(hasItem(DEFAULT_B_ARCHIVO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bArchivo").value(hasItem(Base64Utils.encodeToString(DEFAULT_B_ARCHIVO))))
            .andExpect(jsonPath("$.[*].vContype").value(hasItem(DEFAULT_V_CONTYPE.toString())))
            .andExpect(jsonPath("$.[*].vUsuareg").value(hasItem(DEFAULT_V_USUAREG.toString())))
            .andExpect(jsonPath("$.[*].tFecreg").value(hasItem(DEFAULT_T_FECREG.toString())))
            .andExpect(jsonPath("$.[*].nFlgactivo").value(hasItem(DEFAULT_N_FLGACTIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].nSedereg").value(hasItem(DEFAULT_N_SEDEREG)))
            .andExpect(jsonPath("$.[*].vUsuaupd").value(hasItem(DEFAULT_V_USUAUPD.toString())))
            .andExpect(jsonPath("$.[*].tFecupd").value(hasItem(DEFAULT_T_FECUPD.toString())))
            .andExpect(jsonPath("$.[*].nSedeupd").value(hasItem(DEFAULT_N_SEDEUPD)));
    }

    @Test
    @Transactional
    public void getReporteres() throws Exception {
        // Initialize the database
        reporteresRepository.saveAndFlush(reporteres);

        // Get the reporteres
        restReporteresMockMvc.perform(get("/api/reporteres/{id}", reporteres.getnCodrepre()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(reporteres.getnCodrepre().intValue()))
            .andExpect(jsonPath("$.nCodrepre").value(DEFAULT_N_CODREPRE))
            .andExpect(jsonPath("$.vTiporep").value(DEFAULT_V_TIPOREP.toString()))
            .andExpect(jsonPath("$.vNombre").value(DEFAULT_V_NOMBRE.toString()))
            .andExpect(jsonPath("$.bArchivoContentType").value(DEFAULT_B_ARCHIVO_CONTENT_TYPE))
            .andExpect(jsonPath("$.bArchivo").value(Base64Utils.encodeToString(DEFAULT_B_ARCHIVO)))
            .andExpect(jsonPath("$.vContype").value(DEFAULT_V_CONTYPE.toString()))
            .andExpect(jsonPath("$.vUsuareg").value(DEFAULT_V_USUAREG.toString()))
            .andExpect(jsonPath("$.tFecreg").value(DEFAULT_T_FECREG.toString()))
            .andExpect(jsonPath("$.nFlgactivo").value(DEFAULT_N_FLGACTIVO.booleanValue()))
            .andExpect(jsonPath("$.nSedereg").value(DEFAULT_N_SEDEREG))
            .andExpect(jsonPath("$.vUsuaupd").value(DEFAULT_V_USUAUPD.toString()))
            .andExpect(jsonPath("$.tFecupd").value(DEFAULT_T_FECUPD.toString()))
            .andExpect(jsonPath("$.nSedeupd").value(DEFAULT_N_SEDEUPD));
    }

    @Test
    @Transactional
    public void getNonExistingReporteres() throws Exception {
        // Get the reporteres
        restReporteresMockMvc.perform(get("/api/reporteres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReporteres() throws Exception {
        // Initialize the database
        reporteresRepository.saveAndFlush(reporteres);
        reporteresSearchRepository.save(reporteres);
        int databaseSizeBeforeUpdate = reporteresRepository.findAll().size();

        // Update the reporteres
        Reporteres updatedReporteres = reporteresRepository.findOne(reporteres.getnCodrepre());
        updatedReporteres
            .nCodrepre(UPDATED_N_CODREPRE)
            .vTiporep(UPDATED_V_TIPOREP)
            .vNombre(UPDATED_V_NOMBRE)
            .bArchivo(UPDATED_B_ARCHIVO)
            .bArchivoContentType(UPDATED_B_ARCHIVO_CONTENT_TYPE)
            .vContype(UPDATED_V_CONTYPE)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restReporteresMockMvc.perform(put("/api/reporteres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReporteres)))
            .andExpect(status().isOk());

        // Validate the Reporteres in the database
        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeUpdate);
        Reporteres testReporteres = reporteresList.get(reporteresList.size() - 1);
        assertThat(testReporteres.getnCodrepre()).isEqualTo(UPDATED_N_CODREPRE);
        assertThat(testReporteres.getvTiporep()).isEqualTo(UPDATED_V_TIPOREP);
        assertThat(testReporteres.getvNombre()).isEqualTo(UPDATED_V_NOMBRE);
        assertThat(testReporteres.getbArchivo()).isEqualTo(UPDATED_B_ARCHIVO);
        assertThat(testReporteres.getbArchivoContentType()).isEqualTo(UPDATED_B_ARCHIVO_CONTENT_TYPE);
        assertThat(testReporteres.getvContype()).isEqualTo(UPDATED_V_CONTYPE);
        assertThat(testReporteres.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testReporteres.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testReporteres.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testReporteres.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testReporteres.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testReporteres.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testReporteres.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Reporteres in Elasticsearch
        Reporteres reporteresEs = reporteresSearchRepository.findOne(testReporteres.getnCodrepre());
        assertThat(reporteresEs).isEqualToComparingFieldByField(testReporteres);
    }

    @Test
    @Transactional
    public void updateNonExistingReporteres() throws Exception {
        int databaseSizeBeforeUpdate = reporteresRepository.findAll().size();

        // Create the Reporteres

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReporteresMockMvc.perform(put("/api/reporteres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteres)))
            .andExpect(status().isCreated());

        // Validate the Reporteres in the database
        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReporteres() throws Exception {
        // Initialize the database
        reporteresRepository.saveAndFlush(reporteres);
        reporteresSearchRepository.save(reporteres);
        int databaseSizeBeforeDelete = reporteresRepository.findAll().size();

        // Get the reporteres
        restReporteresMockMvc.perform(delete("/api/reporteres/{id}", reporteres.getnCodrepre())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean reporteresExistsInEs = reporteresSearchRepository.exists(reporteres.getnCodrepre());
        assertThat(reporteresExistsInEs).isFalse();

        // Validate the database is empty
        List<Reporteres> reporteresList = reporteresRepository.findAll();
        assertThat(reporteresList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchReporteres() throws Exception {
        // Initialize the database
        reporteresRepository.saveAndFlush(reporteres);
        reporteresSearchRepository.save(reporteres);

        // Search the reporteres
        restReporteresMockMvc.perform(get("/api/_search/reporteres?query=id:" + reporteres.getnCodrepre()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(reporteres.getnCodrepre().intValue())))
            .andExpect(jsonPath("$.[*].nCodrepre").value(hasItem(DEFAULT_N_CODREPRE)))
            .andExpect(jsonPath("$.[*].vTiporep").value(hasItem(DEFAULT_V_TIPOREP.toString())))
            .andExpect(jsonPath("$.[*].vNombre").value(hasItem(DEFAULT_V_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].bArchivoContentType").value(hasItem(DEFAULT_B_ARCHIVO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bArchivo").value(hasItem(Base64Utils.encodeToString(DEFAULT_B_ARCHIVO))))
            .andExpect(jsonPath("$.[*].vContype").value(hasItem(DEFAULT_V_CONTYPE.toString())))
            .andExpect(jsonPath("$.[*].vUsuareg").value(hasItem(DEFAULT_V_USUAREG.toString())))
            .andExpect(jsonPath("$.[*].tFecreg").value(hasItem(DEFAULT_T_FECREG.toString())))
            .andExpect(jsonPath("$.[*].nFlgactivo").value(hasItem(DEFAULT_N_FLGACTIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].nSedereg").value(hasItem(DEFAULT_N_SEDEREG)))
            .andExpect(jsonPath("$.[*].vUsuaupd").value(hasItem(DEFAULT_V_USUAUPD.toString())))
            .andExpect(jsonPath("$.[*].tFecupd").value(hasItem(DEFAULT_T_FECUPD.toString())))
            .andExpect(jsonPath("$.[*].nSedeupd").value(hasItem(DEFAULT_N_SEDEUPD)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reporteres.class);
        Reporteres reporteres1 = new Reporteres();
        reporteres1.setnCodrepre(1);
        Reporteres reporteres2 = new Reporteres();
        reporteres2.setnCodrepre(reporteres1.getnCodrepre());
        assertThat(reporteres1).isEqualTo(reporteres2);
        reporteres2.setnCodrepre(2);
        assertThat(reporteres1).isNotEqualTo(reporteres2);
        reporteres1.setnCodrepre(null);
        assertThat(reporteres1).isNotEqualTo(reporteres2);
    }
}
