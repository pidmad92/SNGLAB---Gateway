package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Anexlaboral;
import pe.gob.trabajo.repository.AnexlaboralRepository;
import pe.gob.trabajo.repository.search.AnexlaboralSearchRepository;
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
 * Test class for the AnexlaboralResource REST controller.
 *
 * @see AnexlaboralResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class AnexlaboralResourceIntTest {

    private static final Integer DEFAULT_N_CODANEXO = 1;
    private static final Integer UPDATED_N_CODANEXO = 2;

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final Integer DEFAULT_N_ANIOANEX = 1;
    private static final Integer UPDATED_N_ANIOANEX = 2;

    private static final String DEFAULT_V_TIPOCONT = "A";
    private static final String UPDATED_V_TIPOCONT = "B";

    private static final String DEFAULT_V_DECLEGAL = "AAAAAAAAAA";
    private static final String UPDATED_V_DECLEGAL = "BBBBBBBBBB";

    private static final String DEFAULT_V_DESANEXO = "AAAAAAAAAA";
    private static final String UPDATED_V_DESANEXO = "BBBBBBBBBB";

    private static final Integer DEFAULT_N_CANTLABO = 1;
    private static final Integer UPDATED_N_CANTLABO = 2;

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
    private AnexlaboralRepository anexlaboralRepository;

    @Autowired
    private AnexlaboralSearchRepository anexlaboralSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnexlaboralMockMvc;

    private Anexlaboral anexlaboral;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnexlaboralResource anexlaboralResource = new AnexlaboralResource(anexlaboralRepository, anexlaboralSearchRepository);
        this.restAnexlaboralMockMvc = MockMvcBuilders.standaloneSetup(anexlaboralResource)
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
    public static Anexlaboral createEntity(EntityManager em) {
        Anexlaboral anexlaboral = new Anexlaboral()
            .nCodanexo(DEFAULT_N_CODANEXO)
            .nCodfperf(DEFAULT_N_CODFPERF)
            .nAnioanex(DEFAULT_N_ANIOANEX)
            .vTipocont(DEFAULT_V_TIPOCONT)
            .vDeclegal(DEFAULT_V_DECLEGAL)
            .vDesanexo(DEFAULT_V_DESANEXO)
            .nCantlabo(DEFAULT_N_CANTLABO)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return anexlaboral;
    }

    @Before
    public void initTest() {
        anexlaboralSearchRepository.deleteAll();
        anexlaboral = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnexlaboral() throws Exception {
        int databaseSizeBeforeCreate = anexlaboralRepository.findAll().size();

        // Create the Anexlaboral
        restAnexlaboralMockMvc.perform(post("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexlaboral)))
            .andExpect(status().isCreated());

        // Validate the Anexlaboral in the database
        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeCreate + 1);
        Anexlaboral testAnexlaboral = anexlaboralList.get(anexlaboralList.size() - 1);
        assertThat(testAnexlaboral.getnCodanexo()).isEqualTo(DEFAULT_N_CODANEXO);
        assertThat(testAnexlaboral.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testAnexlaboral.getnAnioanex()).isEqualTo(DEFAULT_N_ANIOANEX);
        assertThat(testAnexlaboral.getvTipocont()).isEqualTo(DEFAULT_V_TIPOCONT);
        assertThat(testAnexlaboral.getvDeclegal()).isEqualTo(DEFAULT_V_DECLEGAL);
        assertThat(testAnexlaboral.getvDesanexo()).isEqualTo(DEFAULT_V_DESANEXO);
        assertThat(testAnexlaboral.getnCantlabo()).isEqualTo(DEFAULT_N_CANTLABO);
        assertThat(testAnexlaboral.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testAnexlaboral.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testAnexlaboral.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testAnexlaboral.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testAnexlaboral.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testAnexlaboral.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testAnexlaboral.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Anexlaboral in Elasticsearch
        Anexlaboral anexlaboralEs = anexlaboralSearchRepository.findOne(testAnexlaboral.getnCodanexo());
        assertThat(anexlaboralEs).isEqualToComparingFieldByField(testAnexlaboral);
    }

    @Test
    @Transactional
    public void createAnexlaboralWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = anexlaboralRepository.findAll().size();

        // Create the Anexlaboral with an existing ID
        anexlaboral.setnCodanexo(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnexlaboralMockMvc.perform(post("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexlaboral)))
            .andExpect(status().isBadRequest());

        // Validate the Anexlaboral in the database
        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodanexoIsRequired() throws Exception {
        int databaseSizeBeforeTest = anexlaboralRepository.findAll().size();
        // set the field null
        anexlaboral.setnCodanexo(null);

        // Create the Anexlaboral, which fails.

        restAnexlaboralMockMvc.perform(post("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexlaboral)))
            .andExpect(status().isBadRequest());

        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknCodfperfIsRequired() throws Exception {
        int databaseSizeBeforeTest = anexlaboralRepository.findAll().size();
        // set the field null
        anexlaboral.setnCodfperf(null);

        // Create the Anexlaboral, which fails.

        restAnexlaboralMockMvc.perform(post("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexlaboral)))
            .andExpect(status().isBadRequest());

        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = anexlaboralRepository.findAll().size();
        // set the field null
        anexlaboral.setvUsuareg(null);

        // Create the Anexlaboral, which fails.

        restAnexlaboralMockMvc.perform(post("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexlaboral)))
            .andExpect(status().isBadRequest());

        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = anexlaboralRepository.findAll().size();
        // set the field null
        anexlaboral.settFecreg(null);

        // Create the Anexlaboral, which fails.

        restAnexlaboralMockMvc.perform(post("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexlaboral)))
            .andExpect(status().isBadRequest());

        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = anexlaboralRepository.findAll().size();
        // set the field null
        anexlaboral.setnFlgactivo(null);

        // Create the Anexlaboral, which fails.

        restAnexlaboralMockMvc.perform(post("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexlaboral)))
            .andExpect(status().isBadRequest());

        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = anexlaboralRepository.findAll().size();
        // set the field null
        anexlaboral.setnSedereg(null);

        // Create the Anexlaboral, which fails.

        restAnexlaboralMockMvc.perform(post("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexlaboral)))
            .andExpect(status().isBadRequest());

        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAnexlaborals() throws Exception {
        // Initialize the database
        anexlaboralRepository.saveAndFlush(anexlaboral);

        // Get all the anexlaboralList
        restAnexlaboralMockMvc.perform(get("/api/anexlaborals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(anexlaboral.getnCodanexo().intValue())))
            .andExpect(jsonPath("$.[*].nCodanexo").value(hasItem(DEFAULT_N_CODANEXO)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].nAnioanex").value(hasItem(DEFAULT_N_ANIOANEX)))
            .andExpect(jsonPath("$.[*].vTipocont").value(hasItem(DEFAULT_V_TIPOCONT.toString())))
            .andExpect(jsonPath("$.[*].vDeclegal").value(hasItem(DEFAULT_V_DECLEGAL.toString())))
            .andExpect(jsonPath("$.[*].vDesanexo").value(hasItem(DEFAULT_V_DESANEXO.toString())))
            .andExpect(jsonPath("$.[*].nCantlabo").value(hasItem(DEFAULT_N_CANTLABO)))
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
    public void getAnexlaboral() throws Exception {
        // Initialize the database
        anexlaboralRepository.saveAndFlush(anexlaboral);

        // Get the anexlaboral
        restAnexlaboralMockMvc.perform(get("/api/anexlaborals/{id}", anexlaboral.getnCodanexo()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(anexlaboral.getnCodanexo().intValue()))
            .andExpect(jsonPath("$.nCodanexo").value(DEFAULT_N_CODANEXO))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.nAnioanex").value(DEFAULT_N_ANIOANEX))
            .andExpect(jsonPath("$.vTipocont").value(DEFAULT_V_TIPOCONT.toString()))
            .andExpect(jsonPath("$.vDeclegal").value(DEFAULT_V_DECLEGAL.toString()))
            .andExpect(jsonPath("$.vDesanexo").value(DEFAULT_V_DESANEXO.toString()))
            .andExpect(jsonPath("$.nCantlabo").value(DEFAULT_N_CANTLABO))
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
    public void getNonExistingAnexlaboral() throws Exception {
        // Get the anexlaboral
        restAnexlaboralMockMvc.perform(get("/api/anexlaborals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnexlaboral() throws Exception {
        // Initialize the database
        anexlaboralRepository.saveAndFlush(anexlaboral);
        anexlaboralSearchRepository.save(anexlaboral);
        int databaseSizeBeforeUpdate = anexlaboralRepository.findAll().size();

        // Update the anexlaboral
        Anexlaboral updatedAnexlaboral = anexlaboralRepository.findOne(anexlaboral.getnCodanexo());
        updatedAnexlaboral
            .nCodanexo(UPDATED_N_CODANEXO)
            .nCodfperf(UPDATED_N_CODFPERF)
            .nAnioanex(UPDATED_N_ANIOANEX)
            .vTipocont(UPDATED_V_TIPOCONT)
            .vDeclegal(UPDATED_V_DECLEGAL)
            .vDesanexo(UPDATED_V_DESANEXO)
            .nCantlabo(UPDATED_N_CANTLABO)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restAnexlaboralMockMvc.perform(put("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnexlaboral)))
            .andExpect(status().isOk());

        // Validate the Anexlaboral in the database
        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeUpdate);
        Anexlaboral testAnexlaboral = anexlaboralList.get(anexlaboralList.size() - 1);
        assertThat(testAnexlaboral.getnCodanexo()).isEqualTo(UPDATED_N_CODANEXO);
        assertThat(testAnexlaboral.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testAnexlaboral.getnAnioanex()).isEqualTo(UPDATED_N_ANIOANEX);
        assertThat(testAnexlaboral.getvTipocont()).isEqualTo(UPDATED_V_TIPOCONT);
        assertThat(testAnexlaboral.getvDeclegal()).isEqualTo(UPDATED_V_DECLEGAL);
        assertThat(testAnexlaboral.getvDesanexo()).isEqualTo(UPDATED_V_DESANEXO);
        assertThat(testAnexlaboral.getnCantlabo()).isEqualTo(UPDATED_N_CANTLABO);
        assertThat(testAnexlaboral.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testAnexlaboral.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testAnexlaboral.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testAnexlaboral.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testAnexlaboral.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testAnexlaboral.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testAnexlaboral.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Anexlaboral in Elasticsearch
        Anexlaboral anexlaboralEs = anexlaboralSearchRepository.findOne(testAnexlaboral.getnCodanexo());
        assertThat(anexlaboralEs).isEqualToComparingFieldByField(testAnexlaboral);
    }

    @Test
    @Transactional
    public void updateNonExistingAnexlaboral() throws Exception {
        int databaseSizeBeforeUpdate = anexlaboralRepository.findAll().size();

        // Create the Anexlaboral

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAnexlaboralMockMvc.perform(put("/api/anexlaborals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexlaboral)))
            .andExpect(status().isCreated());

        // Validate the Anexlaboral in the database
        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAnexlaboral() throws Exception {
        // Initialize the database
        anexlaboralRepository.saveAndFlush(anexlaboral);
        anexlaboralSearchRepository.save(anexlaboral);
        int databaseSizeBeforeDelete = anexlaboralRepository.findAll().size();

        // Get the anexlaboral
        restAnexlaboralMockMvc.perform(delete("/api/anexlaborals/{id}", anexlaboral.getnCodanexo())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean anexlaboralExistsInEs = anexlaboralSearchRepository.exists(anexlaboral.getnCodanexo());
        assertThat(anexlaboralExistsInEs).isFalse();

        // Validate the database is empty
        List<Anexlaboral> anexlaboralList = anexlaboralRepository.findAll();
        assertThat(anexlaboralList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAnexlaboral() throws Exception {
        // Initialize the database
        anexlaboralRepository.saveAndFlush(anexlaboral);
        anexlaboralSearchRepository.save(anexlaboral);

        // Search the anexlaboral
        restAnexlaboralMockMvc.perform(get("/api/_search/anexlaborals?query=id:" + anexlaboral.getnCodanexo()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(anexlaboral.getnCodanexo().intValue())))
            .andExpect(jsonPath("$.[*].nCodanexo").value(hasItem(DEFAULT_N_CODANEXO)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].nAnioanex").value(hasItem(DEFAULT_N_ANIOANEX)))
            .andExpect(jsonPath("$.[*].vTipocont").value(hasItem(DEFAULT_V_TIPOCONT.toString())))
            .andExpect(jsonPath("$.[*].vDeclegal").value(hasItem(DEFAULT_V_DECLEGAL.toString())))
            .andExpect(jsonPath("$.[*].vDesanexo").value(hasItem(DEFAULT_V_DESANEXO.toString())))
            .andExpect(jsonPath("$.[*].nCantlabo").value(hasItem(DEFAULT_N_CANTLABO)))
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
        TestUtil.equalsVerifier(Anexlaboral.class);
        Anexlaboral anexlaboral1 = new Anexlaboral();
        anexlaboral1.setnCodanexo(1);
        Anexlaboral anexlaboral2 = new Anexlaboral();
        anexlaboral2.setnCodanexo(anexlaboral1.getnCodanexo());
        assertThat(anexlaboral1).isEqualTo(anexlaboral2);
        anexlaboral2.setnCodanexo(2);
        assertThat(anexlaboral1).isNotEqualTo(anexlaboral2);
        anexlaboral1.setnCodanexo(null);
        assertThat(anexlaboral1).isNotEqualTo(anexlaboral2);
    }
}
