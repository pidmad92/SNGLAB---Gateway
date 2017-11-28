package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Undnegocio;
import pe.gob.trabajo.repository.UndnegocioRepository;
import pe.gob.trabajo.repository.search.UndnegocioSearchRepository;
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
 * Test class for the UndnegocioResource REST controller.
 *
 * @see UndnegocioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class UndnegocioResourceIntTest {

    private static final Integer DEFAULT_N_CODUNDNG = 1;
    private static final Integer UPDATED_N_CODUNDNG = 2;

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final String DEFAULT_V_DESUNDNG = "AAAAAAAAAA";
    private static final String UPDATED_V_DESUNDNG = "BBBBBBBBBB";

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
    private UndnegocioRepository undnegocioRepository;

    @Autowired
    private UndnegocioSearchRepository undnegocioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUndnegocioMockMvc;

    private Undnegocio undnegocio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UndnegocioResource undnegocioResource = new UndnegocioResource(undnegocioRepository, undnegocioSearchRepository);
        this.restUndnegocioMockMvc = MockMvcBuilders.standaloneSetup(undnegocioResource)
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
    public static Undnegocio createEntity(EntityManager em) {
        Undnegocio undnegocio = new Undnegocio()
            .nCodundng(DEFAULT_N_CODUNDNG)
            .nCodfperf(DEFAULT_N_CODFPERF)
            .vDesundng(DEFAULT_V_DESUNDNG)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return undnegocio;
    }

    @Before
    public void initTest() {
        undnegocioSearchRepository.deleteAll();
        undnegocio = createEntity(em);
    }

    @Test
    @Transactional
    public void createUndnegocio() throws Exception {
        int databaseSizeBeforeCreate = undnegocioRepository.findAll().size();

        // Create the Undnegocio
        restUndnegocioMockMvc.perform(post("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(undnegocio)))
            .andExpect(status().isCreated());

        // Validate the Undnegocio in the database
        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeCreate + 1);
        Undnegocio testUndnegocio = undnegocioList.get(undnegocioList.size() - 1);
        assertThat(testUndnegocio.getnCodundng()).isEqualTo(DEFAULT_N_CODUNDNG);
        assertThat(testUndnegocio.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testUndnegocio.getvDesundng()).isEqualTo(DEFAULT_V_DESUNDNG);
        assertThat(testUndnegocio.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testUndnegocio.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testUndnegocio.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testUndnegocio.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testUndnegocio.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testUndnegocio.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testUndnegocio.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Undnegocio in Elasticsearch
        Undnegocio undnegocioEs = undnegocioSearchRepository.findOne(testUndnegocio.getnCodundng());
        assertThat(undnegocioEs).isEqualToComparingFieldByField(testUndnegocio);
    }

    @Test
    @Transactional
    public void createUndnegocioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = undnegocioRepository.findAll().size();

        // Create the Undnegocio with an existing ID
        undnegocio.setnCodundng(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUndnegocioMockMvc.perform(post("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(undnegocio)))
            .andExpect(status().isBadRequest());

        // Validate the Undnegocio in the database
        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodundngIsRequired() throws Exception {
        int databaseSizeBeforeTest = undnegocioRepository.findAll().size();
        // set the field null
        undnegocio.setnCodundng(null);

        // Create the Undnegocio, which fails.

        restUndnegocioMockMvc.perform(post("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(undnegocio)))
            .andExpect(status().isBadRequest());

        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknCodfperfIsRequired() throws Exception {
        int databaseSizeBeforeTest = undnegocioRepository.findAll().size();
        // set the field null
        undnegocio.setnCodfperf(null);

        // Create the Undnegocio, which fails.

        restUndnegocioMockMvc.perform(post("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(undnegocio)))
            .andExpect(status().isBadRequest());

        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = undnegocioRepository.findAll().size();
        // set the field null
        undnegocio.setvUsuareg(null);

        // Create the Undnegocio, which fails.

        restUndnegocioMockMvc.perform(post("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(undnegocio)))
            .andExpect(status().isBadRequest());

        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = undnegocioRepository.findAll().size();
        // set the field null
        undnegocio.settFecreg(null);

        // Create the Undnegocio, which fails.

        restUndnegocioMockMvc.perform(post("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(undnegocio)))
            .andExpect(status().isBadRequest());

        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = undnegocioRepository.findAll().size();
        // set the field null
        undnegocio.setnFlgactivo(null);

        // Create the Undnegocio, which fails.

        restUndnegocioMockMvc.perform(post("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(undnegocio)))
            .andExpect(status().isBadRequest());

        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = undnegocioRepository.findAll().size();
        // set the field null
        undnegocio.setnSedereg(null);

        // Create the Undnegocio, which fails.

        restUndnegocioMockMvc.perform(post("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(undnegocio)))
            .andExpect(status().isBadRequest());

        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUndnegocios() throws Exception {
        // Initialize the database
        undnegocioRepository.saveAndFlush(undnegocio);

        // Get all the undnegocioList
        restUndnegocioMockMvc.perform(get("/api/undnegocios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(undnegocio.getnCodundng().intValue())))
            .andExpect(jsonPath("$.[*].nCodundng").value(hasItem(DEFAULT_N_CODUNDNG)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vDesundng").value(hasItem(DEFAULT_V_DESUNDNG.toString())))
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
    public void getUndnegocio() throws Exception {
        // Initialize the database
        undnegocioRepository.saveAndFlush(undnegocio);

        // Get the undnegocio
        restUndnegocioMockMvc.perform(get("/api/undnegocios/{id}", undnegocio.getnCodundng()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(undnegocio.getnCodundng().intValue()))
            .andExpect(jsonPath("$.nCodundng").value(DEFAULT_N_CODUNDNG))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.vDesundng").value(DEFAULT_V_DESUNDNG.toString()))
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
    public void getNonExistingUndnegocio() throws Exception {
        // Get the undnegocio
        restUndnegocioMockMvc.perform(get("/api/undnegocios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUndnegocio() throws Exception {
        // Initialize the database
        undnegocioRepository.saveAndFlush(undnegocio);
        undnegocioSearchRepository.save(undnegocio);
        int databaseSizeBeforeUpdate = undnegocioRepository.findAll().size();

        // Update the undnegocio
        Undnegocio updatedUndnegocio = undnegocioRepository.findOne(undnegocio.getnCodundng());
        updatedUndnegocio
            .nCodundng(UPDATED_N_CODUNDNG)
            .nCodfperf(UPDATED_N_CODFPERF)
            .vDesundng(UPDATED_V_DESUNDNG)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restUndnegocioMockMvc.perform(put("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUndnegocio)))
            .andExpect(status().isOk());

        // Validate the Undnegocio in the database
        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeUpdate);
        Undnegocio testUndnegocio = undnegocioList.get(undnegocioList.size() - 1);
        assertThat(testUndnegocio.getnCodundng()).isEqualTo(UPDATED_N_CODUNDNG);
        assertThat(testUndnegocio.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testUndnegocio.getvDesundng()).isEqualTo(UPDATED_V_DESUNDNG);
        assertThat(testUndnegocio.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testUndnegocio.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testUndnegocio.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testUndnegocio.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testUndnegocio.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testUndnegocio.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testUndnegocio.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Undnegocio in Elasticsearch
        Undnegocio undnegocioEs = undnegocioSearchRepository.findOne(testUndnegocio.getnCodundng());
        assertThat(undnegocioEs).isEqualToComparingFieldByField(testUndnegocio);
    }

    @Test
    @Transactional
    public void updateNonExistingUndnegocio() throws Exception {
        int databaseSizeBeforeUpdate = undnegocioRepository.findAll().size();

        // Create the Undnegocio

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUndnegocioMockMvc.perform(put("/api/undnegocios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(undnegocio)))
            .andExpect(status().isCreated());

        // Validate the Undnegocio in the database
        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUndnegocio() throws Exception {
        // Initialize the database
        undnegocioRepository.saveAndFlush(undnegocio);
        undnegocioSearchRepository.save(undnegocio);
        int databaseSizeBeforeDelete = undnegocioRepository.findAll().size();

        // Get the undnegocio
        restUndnegocioMockMvc.perform(delete("/api/undnegocios/{id}", undnegocio.getnCodundng())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean undnegocioExistsInEs = undnegocioSearchRepository.exists(undnegocio.getnCodundng());
        assertThat(undnegocioExistsInEs).isFalse();

        // Validate the database is empty
        List<Undnegocio> undnegocioList = undnegocioRepository.findAll();
        assertThat(undnegocioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchUndnegocio() throws Exception {
        // Initialize the database
        undnegocioRepository.saveAndFlush(undnegocio);
        undnegocioSearchRepository.save(undnegocio);

        // Search the undnegocio
        restUndnegocioMockMvc.perform(get("/api/_search/undnegocios?query=id:" + undnegocio.getnCodundng()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(undnegocio.getnCodundng().intValue())))
            .andExpect(jsonPath("$.[*].nCodundng").value(hasItem(DEFAULT_N_CODUNDNG)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vDesundng").value(hasItem(DEFAULT_V_DESUNDNG.toString())))
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
        TestUtil.equalsVerifier(Undnegocio.class);
        Undnegocio undnegocio1 = new Undnegocio();
        undnegocio1.setnCodundng(1);
        Undnegocio undnegocio2 = new Undnegocio();
        undnegocio2.setnCodundng(undnegocio1.getnCodundng());
        assertThat(undnegocio1).isEqualTo(undnegocio2);
        undnegocio2.setnCodundng(2);
        assertThat(undnegocio1).isNotEqualTo(undnegocio2);
        undnegocio1.setnCodundng(null);
        assertThat(undnegocio1).isNotEqualTo(undnegocio2);
    }
}
