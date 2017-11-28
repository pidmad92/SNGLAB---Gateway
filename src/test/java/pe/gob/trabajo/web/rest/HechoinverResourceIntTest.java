package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Hechoinver;
import pe.gob.trabajo.repository.HechoinverRepository;
import pe.gob.trabajo.repository.search.HechoinverSearchRepository;
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
 * Test class for the HechoinverResource REST controller.
 *
 * @see HechoinverResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class HechoinverResourceIntTest {

    private static final Integer DEFAULT_N_CODHINVE = 1;
    private static final Integer UPDATED_N_CODHINVE = 2;

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final String DEFAULT_V_DESHINVE = "AAAAAAAAAA";
    private static final String UPDATED_V_DESHINVE = "BBBBBBBBBB";

    private static final String DEFAULT_V_TIPOHINV = "A";
    private static final String UPDATED_V_TIPOHINV = "B";

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
    private HechoinverRepository hechoinverRepository;

    @Autowired
    private HechoinverSearchRepository hechoinverSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHechoinverMockMvc;

    private Hechoinver hechoinver;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HechoinverResource hechoinverResource = new HechoinverResource(hechoinverRepository, hechoinverSearchRepository);
        this.restHechoinverMockMvc = MockMvcBuilders.standaloneSetup(hechoinverResource)
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
    public static Hechoinver createEntity(EntityManager em) {
        Hechoinver hechoinver = new Hechoinver()
            .nCodhinve(DEFAULT_N_CODHINVE)
            .nCodfperf(DEFAULT_N_CODFPERF)
            .vDeshinve(DEFAULT_V_DESHINVE)
            .vTipohinv(DEFAULT_V_TIPOHINV)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return hechoinver;
    }

    @Before
    public void initTest() {
        hechoinverSearchRepository.deleteAll();
        hechoinver = createEntity(em);
    }

    @Test
    @Transactional
    public void createHechoinver() throws Exception {
        int databaseSizeBeforeCreate = hechoinverRepository.findAll().size();

        // Create the Hechoinver
        restHechoinverMockMvc.perform(post("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hechoinver)))
            .andExpect(status().isCreated());

        // Validate the Hechoinver in the database
        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeCreate + 1);
        Hechoinver testHechoinver = hechoinverList.get(hechoinverList.size() - 1);
        assertThat(testHechoinver.getnCodhinve()).isEqualTo(DEFAULT_N_CODHINVE);
        assertThat(testHechoinver.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testHechoinver.getvDeshinve()).isEqualTo(DEFAULT_V_DESHINVE);
        assertThat(testHechoinver.getvTipohinv()).isEqualTo(DEFAULT_V_TIPOHINV);
        assertThat(testHechoinver.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testHechoinver.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testHechoinver.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testHechoinver.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testHechoinver.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testHechoinver.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testHechoinver.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Hechoinver in Elasticsearch
        Hechoinver hechoinverEs = hechoinverSearchRepository.findOne(testHechoinver.getnCodhinve());
        assertThat(hechoinverEs).isEqualToComparingFieldByField(testHechoinver);
    }

    @Test
    @Transactional
    public void createHechoinverWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hechoinverRepository.findAll().size();

        // Create the Hechoinver with an existing ID
        hechoinver.setnCodhinve(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHechoinverMockMvc.perform(post("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hechoinver)))
            .andExpect(status().isBadRequest());

        // Validate the Hechoinver in the database
        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodhinveIsRequired() throws Exception {
        int databaseSizeBeforeTest = hechoinverRepository.findAll().size();
        // set the field null
        hechoinver.setnCodhinve(null);

        // Create the Hechoinver, which fails.

        restHechoinverMockMvc.perform(post("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hechoinver)))
            .andExpect(status().isBadRequest());

        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknCodfperfIsRequired() throws Exception {
        int databaseSizeBeforeTest = hechoinverRepository.findAll().size();
        // set the field null
        hechoinver.setnCodfperf(null);

        // Create the Hechoinver, which fails.

        restHechoinverMockMvc.perform(post("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hechoinver)))
            .andExpect(status().isBadRequest());

        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = hechoinverRepository.findAll().size();
        // set the field null
        hechoinver.setvUsuareg(null);

        // Create the Hechoinver, which fails.

        restHechoinverMockMvc.perform(post("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hechoinver)))
            .andExpect(status().isBadRequest());

        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = hechoinverRepository.findAll().size();
        // set the field null
        hechoinver.settFecreg(null);

        // Create the Hechoinver, which fails.

        restHechoinverMockMvc.perform(post("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hechoinver)))
            .andExpect(status().isBadRequest());

        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = hechoinverRepository.findAll().size();
        // set the field null
        hechoinver.setnFlgactivo(null);

        // Create the Hechoinver, which fails.

        restHechoinverMockMvc.perform(post("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hechoinver)))
            .andExpect(status().isBadRequest());

        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = hechoinverRepository.findAll().size();
        // set the field null
        hechoinver.setnSedereg(null);

        // Create the Hechoinver, which fails.

        restHechoinverMockMvc.perform(post("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hechoinver)))
            .andExpect(status().isBadRequest());

        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHechoinvers() throws Exception {
        // Initialize the database
        hechoinverRepository.saveAndFlush(hechoinver);

        // Get all the hechoinverList
        restHechoinverMockMvc.perform(get("/api/hechoinvers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(hechoinver.getnCodhinve().intValue())))
            .andExpect(jsonPath("$.[*].nCodhinve").value(hasItem(DEFAULT_N_CODHINVE)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vDeshinve").value(hasItem(DEFAULT_V_DESHINVE.toString())))
            .andExpect(jsonPath("$.[*].vTipohinv").value(hasItem(DEFAULT_V_TIPOHINV.toString())))
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
    public void getHechoinver() throws Exception {
        // Initialize the database
        hechoinverRepository.saveAndFlush(hechoinver);

        // Get the hechoinver
        restHechoinverMockMvc.perform(get("/api/hechoinvers/{id}", hechoinver.getnCodhinve()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(hechoinver.getnCodhinve().intValue()))
            .andExpect(jsonPath("$.nCodhinve").value(DEFAULT_N_CODHINVE))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.vDeshinve").value(DEFAULT_V_DESHINVE.toString()))
            .andExpect(jsonPath("$.vTipohinv").value(DEFAULT_V_TIPOHINV.toString()))
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
    public void getNonExistingHechoinver() throws Exception {
        // Get the hechoinver
        restHechoinverMockMvc.perform(get("/api/hechoinvers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHechoinver() throws Exception {
        // Initialize the database
        hechoinverRepository.saveAndFlush(hechoinver);
        hechoinverSearchRepository.save(hechoinver);
        int databaseSizeBeforeUpdate = hechoinverRepository.findAll().size();

        // Update the hechoinver
        Hechoinver updatedHechoinver = hechoinverRepository.findOne(hechoinver.getnCodhinve());
        updatedHechoinver
            .nCodhinve(UPDATED_N_CODHINVE)
            .nCodfperf(UPDATED_N_CODFPERF)
            .vDeshinve(UPDATED_V_DESHINVE)
            .vTipohinv(UPDATED_V_TIPOHINV)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restHechoinverMockMvc.perform(put("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHechoinver)))
            .andExpect(status().isOk());

        // Validate the Hechoinver in the database
        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeUpdate);
        Hechoinver testHechoinver = hechoinverList.get(hechoinverList.size() - 1);
        assertThat(testHechoinver.getnCodhinve()).isEqualTo(UPDATED_N_CODHINVE);
        assertThat(testHechoinver.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testHechoinver.getvDeshinve()).isEqualTo(UPDATED_V_DESHINVE);
        assertThat(testHechoinver.getvTipohinv()).isEqualTo(UPDATED_V_TIPOHINV);
        assertThat(testHechoinver.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testHechoinver.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testHechoinver.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testHechoinver.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testHechoinver.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testHechoinver.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testHechoinver.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Hechoinver in Elasticsearch
        Hechoinver hechoinverEs = hechoinverSearchRepository.findOne(testHechoinver.getnCodhinve());
        assertThat(hechoinverEs).isEqualToComparingFieldByField(testHechoinver);
    }

    @Test
    @Transactional
    public void updateNonExistingHechoinver() throws Exception {
        int databaseSizeBeforeUpdate = hechoinverRepository.findAll().size();

        // Create the Hechoinver

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHechoinverMockMvc.perform(put("/api/hechoinvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hechoinver)))
            .andExpect(status().isCreated());

        // Validate the Hechoinver in the database
        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHechoinver() throws Exception {
        // Initialize the database
        hechoinverRepository.saveAndFlush(hechoinver);
        hechoinverSearchRepository.save(hechoinver);
        int databaseSizeBeforeDelete = hechoinverRepository.findAll().size();

        // Get the hechoinver
        restHechoinverMockMvc.perform(delete("/api/hechoinvers/{id}", hechoinver.getnCodhinve())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean hechoinverExistsInEs = hechoinverSearchRepository.exists(hechoinver.getnCodhinve());
        assertThat(hechoinverExistsInEs).isFalse();

        // Validate the database is empty
        List<Hechoinver> hechoinverList = hechoinverRepository.findAll();
        assertThat(hechoinverList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchHechoinver() throws Exception {
        // Initialize the database
        hechoinverRepository.saveAndFlush(hechoinver);
        hechoinverSearchRepository.save(hechoinver);

        // Search the hechoinver
        restHechoinverMockMvc.perform(get("/api/_search/hechoinvers?query=id:" + hechoinver.getnCodhinve()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(hechoinver.getnCodhinve().intValue())))
            .andExpect(jsonPath("$.[*].nCodhinve").value(hasItem(DEFAULT_N_CODHINVE)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vDeshinve").value(hasItem(DEFAULT_V_DESHINVE.toString())))
            .andExpect(jsonPath("$.[*].vTipohinv").value(hasItem(DEFAULT_V_TIPOHINV.toString())))
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
        TestUtil.equalsVerifier(Hechoinver.class);
        Hechoinver hechoinver1 = new Hechoinver();
        hechoinver1.setnCodhinve(1);
        Hechoinver hechoinver2 = new Hechoinver();
        hechoinver2.setnCodhinve(hechoinver1.getnCodhinve());
        assertThat(hechoinver1).isEqualTo(hechoinver2);
        hechoinver2.setnCodhinve(2);
        assertThat(hechoinver1).isNotEqualTo(hechoinver2);
        hechoinver1.setnCodhinve(null);
        assertThat(hechoinver1).isNotEqualTo(hechoinver2);
    }
}
