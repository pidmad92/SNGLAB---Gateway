package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Direccion;
import pe.gob.trabajo.repository.DireccionRepository;
import pe.gob.trabajo.repository.search.DireccionSearchRepository;
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
 * Test class for the DireccionResource REST controller.
 *
 * @see DireccionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class DireccionResourceIntTest {

    private static final Integer DEFAULT_N_CODDIREC = 1;
    private static final Integer UPDATED_N_CODDIREC = 2;

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final String DEFAULT_V_DEPART = "AAAAAAAAAA";
    private static final String UPDATED_V_DEPART = "BBBBBBBBBB";

    private static final String DEFAULT_V_PROVINCIA = "AAAAAAAAAA";
    private static final String UPDATED_V_PROVINCIA = "BBBBBBBBBB";

    private static final String DEFAULT_V_DISTRITO = "AAAAAAAAAA";
    private static final String UPDATED_V_DISTRITO = "BBBBBBBBBB";

    private static final String DEFAULT_V_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_V_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_V_REFEREN = "AAAAAAAAAA";
    private static final String UPDATED_V_REFEREN = "BBBBBBBBBB";

    private static final Integer DEFAULT_N_NOTIFICA = 1;
    private static final Integer UPDATED_N_NOTIFICA = 2;

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
    private DireccionRepository direccionRepository;

    @Autowired
    private DireccionSearchRepository direccionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDireccionMockMvc;

    private Direccion direccion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DireccionResource direccionResource = new DireccionResource(direccionRepository, direccionSearchRepository);
        this.restDireccionMockMvc = MockMvcBuilders.standaloneSetup(direccionResource)
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
    public static Direccion createEntity(EntityManager em) {
        Direccion direccion = new Direccion()
            .nCoddirec(DEFAULT_N_CODDIREC)
            .nCodfperf(DEFAULT_N_CODFPERF)
            .vDepart(DEFAULT_V_DEPART)
            .vProvincia(DEFAULT_V_PROVINCIA)
            .vDistrito(DEFAULT_V_DISTRITO)
            .vDireccion(DEFAULT_V_DIRECCION)
            .vReferen(DEFAULT_V_REFEREN)
            .nNotifica(DEFAULT_N_NOTIFICA)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return direccion;
    }

    @Before
    public void initTest() {
        direccionSearchRepository.deleteAll();
        direccion = createEntity(em);
    }

    @Test
    @Transactional
    public void createDireccion() throws Exception {
        int databaseSizeBeforeCreate = direccionRepository.findAll().size();

        // Create the Direccion
        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isCreated());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeCreate + 1);
        Direccion testDireccion = direccionList.get(direccionList.size() - 1);
        assertThat(testDireccion.getnCoddirec()).isEqualTo(DEFAULT_N_CODDIREC);
        assertThat(testDireccion.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testDireccion.getvDepart()).isEqualTo(DEFAULT_V_DEPART);
        assertThat(testDireccion.getvProvincia()).isEqualTo(DEFAULT_V_PROVINCIA);
        assertThat(testDireccion.getvDistrito()).isEqualTo(DEFAULT_V_DISTRITO);
        assertThat(testDireccion.getvDireccion()).isEqualTo(DEFAULT_V_DIRECCION);
        assertThat(testDireccion.getvReferen()).isEqualTo(DEFAULT_V_REFEREN);
        assertThat(testDireccion.getnNotifica()).isEqualTo(DEFAULT_N_NOTIFICA);
        assertThat(testDireccion.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testDireccion.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testDireccion.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testDireccion.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testDireccion.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testDireccion.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testDireccion.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Direccion in Elasticsearch
        Direccion direccionEs = direccionSearchRepository.findOne(testDireccion.getnCoddirec());
        assertThat(direccionEs).isEqualToComparingFieldByField(testDireccion);
    }

    @Test
    @Transactional
    public void createDireccionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = direccionRepository.findAll().size();

        // Create the Direccion with an existing ID
        direccion.setnCoddirec(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCoddirecIsRequired() throws Exception {
        int databaseSizeBeforeTest = direccionRepository.findAll().size();
        // set the field null
        direccion.setnCoddirec(null);

        // Create the Direccion, which fails.

        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknCodfperfIsRequired() throws Exception {
        int databaseSizeBeforeTest = direccionRepository.findAll().size();
        // set the field null
        direccion.setnCodfperf(null);

        // Create the Direccion, which fails.

        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = direccionRepository.findAll().size();
        // set the field null
        direccion.setvUsuareg(null);

        // Create the Direccion, which fails.

        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = direccionRepository.findAll().size();
        // set the field null
        direccion.settFecreg(null);

        // Create the Direccion, which fails.

        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = direccionRepository.findAll().size();
        // set the field null
        direccion.setnFlgactivo(null);

        // Create the Direccion, which fails.

        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = direccionRepository.findAll().size();
        // set the field null
        direccion.setnSedereg(null);

        // Create the Direccion, which fails.

        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDireccions() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        // Get all the direccionList
        restDireccionMockMvc.perform(get("/api/direccions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(direccion.getnCoddirec().intValue())))
            .andExpect(jsonPath("$.[*].nCoddirec").value(hasItem(DEFAULT_N_CODDIREC)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vDepart").value(hasItem(DEFAULT_V_DEPART.toString())))
            .andExpect(jsonPath("$.[*].vProvincia").value(hasItem(DEFAULT_V_PROVINCIA.toString())))
            .andExpect(jsonPath("$.[*].vDistrito").value(hasItem(DEFAULT_V_DISTRITO.toString())))
            .andExpect(jsonPath("$.[*].vDireccion").value(hasItem(DEFAULT_V_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].vReferen").value(hasItem(DEFAULT_V_REFEREN.toString())))
            .andExpect(jsonPath("$.[*].nNotifica").value(hasItem(DEFAULT_N_NOTIFICA)))
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
    public void getDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        // Get the direccion
        restDireccionMockMvc.perform(get("/api/direccions/{id}", direccion.getnCoddirec()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(direccion.getnCoddirec().intValue()))
            .andExpect(jsonPath("$.nCoddirec").value(DEFAULT_N_CODDIREC))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.vDepart").value(DEFAULT_V_DEPART.toString()))
            .andExpect(jsonPath("$.vProvincia").value(DEFAULT_V_PROVINCIA.toString()))
            .andExpect(jsonPath("$.vDistrito").value(DEFAULT_V_DISTRITO.toString()))
            .andExpect(jsonPath("$.vDireccion").value(DEFAULT_V_DIRECCION.toString()))
            .andExpect(jsonPath("$.vReferen").value(DEFAULT_V_REFEREN.toString()))
            .andExpect(jsonPath("$.nNotifica").value(DEFAULT_N_NOTIFICA))
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
    public void getNonExistingDireccion() throws Exception {
        // Get the direccion
        restDireccionMockMvc.perform(get("/api/direccions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);
        direccionSearchRepository.save(direccion);
        int databaseSizeBeforeUpdate = direccionRepository.findAll().size();

        // Update the direccion
        Direccion updatedDireccion = direccionRepository.findOne(direccion.getnCoddirec());
        updatedDireccion
            .nCoddirec(UPDATED_N_CODDIREC)
            .nCodfperf(UPDATED_N_CODFPERF)
            .vDepart(UPDATED_V_DEPART)
            .vProvincia(UPDATED_V_PROVINCIA)
            .vDistrito(UPDATED_V_DISTRITO)
            .vDireccion(UPDATED_V_DIRECCION)
            .vReferen(UPDATED_V_REFEREN)
            .nNotifica(UPDATED_N_NOTIFICA)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restDireccionMockMvc.perform(put("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDireccion)))
            .andExpect(status().isOk());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeUpdate);
        Direccion testDireccion = direccionList.get(direccionList.size() - 1);
        assertThat(testDireccion.getnCoddirec()).isEqualTo(UPDATED_N_CODDIREC);
        assertThat(testDireccion.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testDireccion.getvDepart()).isEqualTo(UPDATED_V_DEPART);
        assertThat(testDireccion.getvProvincia()).isEqualTo(UPDATED_V_PROVINCIA);
        assertThat(testDireccion.getvDistrito()).isEqualTo(UPDATED_V_DISTRITO);
        assertThat(testDireccion.getvDireccion()).isEqualTo(UPDATED_V_DIRECCION);
        assertThat(testDireccion.getvReferen()).isEqualTo(UPDATED_V_REFEREN);
        assertThat(testDireccion.getnNotifica()).isEqualTo(UPDATED_N_NOTIFICA);
        assertThat(testDireccion.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testDireccion.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testDireccion.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testDireccion.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testDireccion.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testDireccion.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testDireccion.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Direccion in Elasticsearch
        Direccion direccionEs = direccionSearchRepository.findOne(testDireccion.getnCoddirec());
        assertThat(direccionEs).isEqualToComparingFieldByField(testDireccion);
    }

    @Test
    @Transactional
    public void updateNonExistingDireccion() throws Exception {
        int databaseSizeBeforeUpdate = direccionRepository.findAll().size();

        // Create the Direccion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDireccionMockMvc.perform(put("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isCreated());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);
        direccionSearchRepository.save(direccion);
        int databaseSizeBeforeDelete = direccionRepository.findAll().size();

        // Get the direccion
        restDireccionMockMvc.perform(delete("/api/direccions/{id}", direccion.getnCoddirec())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean direccionExistsInEs = direccionSearchRepository.exists(direccion.getnCoddirec());
        assertThat(direccionExistsInEs).isFalse();

        // Validate the database is empty
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);
        direccionSearchRepository.save(direccion);

        // Search the direccion
        restDireccionMockMvc.perform(get("/api/_search/direccions?query=id:" + direccion.getnCoddirec()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(direccion.getnCoddirec().intValue())))
            .andExpect(jsonPath("$.[*].nCoddirec").value(hasItem(DEFAULT_N_CODDIREC)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vDepart").value(hasItem(DEFAULT_V_DEPART.toString())))
            .andExpect(jsonPath("$.[*].vProvincia").value(hasItem(DEFAULT_V_PROVINCIA.toString())))
            .andExpect(jsonPath("$.[*].vDistrito").value(hasItem(DEFAULT_V_DISTRITO.toString())))
            .andExpect(jsonPath("$.[*].vDireccion").value(hasItem(DEFAULT_V_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].vReferen").value(hasItem(DEFAULT_V_REFEREN.toString())))
            .andExpect(jsonPath("$.[*].nNotifica").value(hasItem(DEFAULT_N_NOTIFICA)))
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
        TestUtil.equalsVerifier(Direccion.class);
        Direccion direccion1 = new Direccion();
        direccion1.setnCoddirec(1);
        Direccion direccion2 = new Direccion();
        direccion2.setnCoddirec(direccion1.getnCoddirec());
        assertThat(direccion1).isEqualTo(direccion2);
        direccion2.setnCoddirec(2);
        assertThat(direccion1).isNotEqualTo(direccion2);
        direccion1.setnCoddirec(null);
        assertThat(direccion1).isNotEqualTo(direccion2);
    }
}
