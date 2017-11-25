package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Solicform;
import pe.gob.trabajo.repository.SolicformRepository;
import pe.gob.trabajo.repository.search.SolicformSearchRepository;
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
 * Test class for the SolicformResource REST controller.
 *
 * @see SolicformResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class SolicformResourceIntTest {

    private static final Integer DEFAULT_N_CODSFORM = 1;
    private static final Integer UPDATED_N_CODSFORM = 2;

    private static final Integer DEFAULT_N_CODSOLIC = 1;
    private static final Integer UPDATED_N_CODSOLIC = 2;

    private static final Integer DEFAULT_N_CODFFINA = 1;
    private static final Integer UPDATED_N_CODFFINA = 2;

    private static final Integer DEFAULT_N_CODFARCH = 1;
    private static final Integer UPDATED_N_CODFARCH = 2;

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final String DEFAULT_V_NOMFORM = "AAAAAAAAAA";
    private static final String UPDATED_V_NOMFORM = "BBBBBBBBBB";

    private static final String DEFAULT_V_TIPOFORM = "A";
    private static final String UPDATED_V_TIPOFORM = "B";

    private static final Boolean DEFAULT_N_FLGOBLIG = false;
    private static final Boolean UPDATED_N_FLGOBLIG = true;

    private static final String DEFAULT_V_FLGEST = "A";
    private static final String UPDATED_V_FLGEST = "B";

    private static final String DEFAULT_V_OBSERVA = "AAAAAAAAAA";
    private static final String UPDATED_V_OBSERVA = "BBBBBBBBBB";

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
    private SolicformRepository solicformRepository;

    @Autowired
    private SolicformSearchRepository solicformSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSolicformMockMvc;

    private Solicform solicform;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolicformResource solicformResource = new SolicformResource(solicformRepository, solicformSearchRepository);
        this.restSolicformMockMvc = MockMvcBuilders.standaloneSetup(solicformResource)
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
    public static Solicform createEntity(EntityManager em) {
        Solicform solicform = new Solicform()
            .nCodsform(DEFAULT_N_CODSFORM)
            .nCodsolic(DEFAULT_N_CODSOLIC)
            .nCodffina(DEFAULT_N_CODFFINA)
            .nCodfarch(DEFAULT_N_CODFARCH)
            .nCodfperf(DEFAULT_N_CODFPERF)
            .vNomform(DEFAULT_V_NOMFORM)
            .vTipoform(DEFAULT_V_TIPOFORM)
            .nFlgoblig(DEFAULT_N_FLGOBLIG)
            .vFlgest(DEFAULT_V_FLGEST)
            .vObserva(DEFAULT_V_OBSERVA)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return solicform;
    }

    @Before
    public void initTest() {
        solicformSearchRepository.deleteAll();
        solicform = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolicform() throws Exception {
        int databaseSizeBeforeCreate = solicformRepository.findAll().size();

        // Create the Solicform
        restSolicformMockMvc.perform(post("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicform)))
            .andExpect(status().isCreated());

        // Validate the Solicform in the database
        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeCreate + 1);
        Solicform testSolicform = solicformList.get(solicformList.size() - 1);
        assertThat(testSolicform.getnCodsform()).isEqualTo(DEFAULT_N_CODSFORM);
        assertThat(testSolicform.getnCodsolic()).isEqualTo(DEFAULT_N_CODSOLIC);
        assertThat(testSolicform.getnCodffina()).isEqualTo(DEFAULT_N_CODFFINA);
        assertThat(testSolicform.getnCodfarch()).isEqualTo(DEFAULT_N_CODFARCH);
        assertThat(testSolicform.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testSolicform.getvNomform()).isEqualTo(DEFAULT_V_NOMFORM);
        assertThat(testSolicform.getvTipoform()).isEqualTo(DEFAULT_V_TIPOFORM);
        assertThat(testSolicform.isnFlgoblig()).isEqualTo(DEFAULT_N_FLGOBLIG);
        assertThat(testSolicform.getvFlgest()).isEqualTo(DEFAULT_V_FLGEST);
        assertThat(testSolicform.getvObserva()).isEqualTo(DEFAULT_V_OBSERVA);
        assertThat(testSolicform.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testSolicform.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testSolicform.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testSolicform.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testSolicform.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testSolicform.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testSolicform.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Solicform in Elasticsearch
        Solicform solicformEs = solicformSearchRepository.findOne(testSolicform.getnCodsform());
        assertThat(solicformEs).isEqualToComparingFieldByField(testSolicform);
    }

    @Test
    @Transactional
    public void createSolicformWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solicformRepository.findAll().size();

        // Create the Solicform with an existing ID
        solicform.setnCodsform(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolicformMockMvc.perform(post("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicform)))
            .andExpect(status().isBadRequest());

        // Validate the Solicform in the database
        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodsformIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicformRepository.findAll().size();
        // set the field null
        solicform.setnCodsform(null);

        // Create the Solicform, which fails.

        restSolicformMockMvc.perform(post("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicform)))
            .andExpect(status().isBadRequest());

        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknCodsolicIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicformRepository.findAll().size();
        // set the field null
        solicform.setnCodsolic(null);

        // Create the Solicform, which fails.

        restSolicformMockMvc.perform(post("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicform)))
            .andExpect(status().isBadRequest());

        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicformRepository.findAll().size();
        // set the field null
        solicform.setvUsuareg(null);

        // Create the Solicform, which fails.

        restSolicformMockMvc.perform(post("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicform)))
            .andExpect(status().isBadRequest());

        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicformRepository.findAll().size();
        // set the field null
        solicform.settFecreg(null);

        // Create the Solicform, which fails.

        restSolicformMockMvc.perform(post("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicform)))
            .andExpect(status().isBadRequest());

        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicformRepository.findAll().size();
        // set the field null
        solicform.setnFlgactivo(null);

        // Create the Solicform, which fails.

        restSolicformMockMvc.perform(post("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicform)))
            .andExpect(status().isBadRequest());

        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicformRepository.findAll().size();
        // set the field null
        solicform.setnSedereg(null);

        // Create the Solicform, which fails.

        restSolicformMockMvc.perform(post("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicform)))
            .andExpect(status().isBadRequest());

        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSolicforms() throws Exception {
        // Initialize the database
        solicformRepository.saveAndFlush(solicform);

        // Get all the solicformList
        restSolicformMockMvc.perform(get("/api/solicforms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(solicform.getnCodsform().intValue())))
            .andExpect(jsonPath("$.[*].nCodsform").value(hasItem(DEFAULT_N_CODSFORM)))
            .andExpect(jsonPath("$.[*].nCodsolic").value(hasItem(DEFAULT_N_CODSOLIC)))
            .andExpect(jsonPath("$.[*].nCodffina").value(hasItem(DEFAULT_N_CODFFINA)))
            .andExpect(jsonPath("$.[*].nCodfarch").value(hasItem(DEFAULT_N_CODFARCH)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vNomform").value(hasItem(DEFAULT_V_NOMFORM.toString())))
            .andExpect(jsonPath("$.[*].vTipoform").value(hasItem(DEFAULT_V_TIPOFORM.toString())))
            .andExpect(jsonPath("$.[*].nFlgoblig").value(hasItem(DEFAULT_N_FLGOBLIG.booleanValue())))
            .andExpect(jsonPath("$.[*].vFlgest").value(hasItem(DEFAULT_V_FLGEST.toString())))
            .andExpect(jsonPath("$.[*].vObserva").value(hasItem(DEFAULT_V_OBSERVA.toString())))
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
    public void getSolicform() throws Exception {
        // Initialize the database
        solicformRepository.saveAndFlush(solicform);

        // Get the solicform
        restSolicformMockMvc.perform(get("/api/solicforms/{id}", solicform.getnCodsform()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(solicform.getnCodsform().intValue()))
            .andExpect(jsonPath("$.nCodsform").value(DEFAULT_N_CODSFORM))
            .andExpect(jsonPath("$.nCodsolic").value(DEFAULT_N_CODSOLIC))
            .andExpect(jsonPath("$.nCodffina").value(DEFAULT_N_CODFFINA))
            .andExpect(jsonPath("$.nCodfarch").value(DEFAULT_N_CODFARCH))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.vNomform").value(DEFAULT_V_NOMFORM.toString()))
            .andExpect(jsonPath("$.vTipoform").value(DEFAULT_V_TIPOFORM.toString()))
            .andExpect(jsonPath("$.nFlgoblig").value(DEFAULT_N_FLGOBLIG.booleanValue()))
            .andExpect(jsonPath("$.vFlgest").value(DEFAULT_V_FLGEST.toString()))
            .andExpect(jsonPath("$.vObserva").value(DEFAULT_V_OBSERVA.toString()))
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
    public void getNonExistingSolicform() throws Exception {
        // Get the solicform
        restSolicformMockMvc.perform(get("/api/solicforms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolicform() throws Exception {
        // Initialize the database
        solicformRepository.saveAndFlush(solicform);
        solicformSearchRepository.save(solicform);
        int databaseSizeBeforeUpdate = solicformRepository.findAll().size();

        // Update the solicform
        Solicform updatedSolicform = solicformRepository.findOne(solicform.getnCodsform());
        updatedSolicform
            .nCodsform(UPDATED_N_CODSFORM)
            .nCodsolic(UPDATED_N_CODSOLIC)
            .nCodffina(UPDATED_N_CODFFINA)
            .nCodfarch(UPDATED_N_CODFARCH)
            .nCodfperf(UPDATED_N_CODFPERF)
            .vNomform(UPDATED_V_NOMFORM)
            .vTipoform(UPDATED_V_TIPOFORM)
            .nFlgoblig(UPDATED_N_FLGOBLIG)
            .vFlgest(UPDATED_V_FLGEST)
            .vObserva(UPDATED_V_OBSERVA)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restSolicformMockMvc.perform(put("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSolicform)))
            .andExpect(status().isOk());

        // Validate the Solicform in the database
        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeUpdate);
        Solicform testSolicform = solicformList.get(solicformList.size() - 1);
        assertThat(testSolicform.getnCodsform()).isEqualTo(UPDATED_N_CODSFORM);
        assertThat(testSolicform.getnCodsolic()).isEqualTo(UPDATED_N_CODSOLIC);
        assertThat(testSolicform.getnCodffina()).isEqualTo(UPDATED_N_CODFFINA);
        assertThat(testSolicform.getnCodfarch()).isEqualTo(UPDATED_N_CODFARCH);
        assertThat(testSolicform.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testSolicform.getvNomform()).isEqualTo(UPDATED_V_NOMFORM);
        assertThat(testSolicform.getvTipoform()).isEqualTo(UPDATED_V_TIPOFORM);
        assertThat(testSolicform.isnFlgoblig()).isEqualTo(UPDATED_N_FLGOBLIG);
        assertThat(testSolicform.getvFlgest()).isEqualTo(UPDATED_V_FLGEST);
        assertThat(testSolicform.getvObserva()).isEqualTo(UPDATED_V_OBSERVA);
        assertThat(testSolicform.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testSolicform.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testSolicform.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testSolicform.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testSolicform.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testSolicform.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testSolicform.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Solicform in Elasticsearch
        Solicform solicformEs = solicformSearchRepository.findOne(testSolicform.getnCodsform());
        assertThat(solicformEs).isEqualToComparingFieldByField(testSolicform);
    }

    @Test
    @Transactional
    public void updateNonExistingSolicform() throws Exception {
        int databaseSizeBeforeUpdate = solicformRepository.findAll().size();

        // Create the Solicform

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSolicformMockMvc.perform(put("/api/solicforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicform)))
            .andExpect(status().isCreated());

        // Validate the Solicform in the database
        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSolicform() throws Exception {
        // Initialize the database
        solicformRepository.saveAndFlush(solicform);
        solicformSearchRepository.save(solicform);
        int databaseSizeBeforeDelete = solicformRepository.findAll().size();

        // Get the solicform
        restSolicformMockMvc.perform(delete("/api/solicforms/{id}", solicform.getnCodsform())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean solicformExistsInEs = solicformSearchRepository.exists(solicform.getnCodsform());
        assertThat(solicformExistsInEs).isFalse();

        // Validate the database is empty
        List<Solicform> solicformList = solicformRepository.findAll();
        assertThat(solicformList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSolicform() throws Exception {
        // Initialize the database
        solicformRepository.saveAndFlush(solicform);
        solicformSearchRepository.save(solicform);

        // Search the solicform
        restSolicformMockMvc.perform(get("/api/_search/solicforms?query=id:" + solicform.getnCodsform()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(solicform.getnCodsform().intValue())))
            .andExpect(jsonPath("$.[*].nCodsform").value(hasItem(DEFAULT_N_CODSFORM)))
            .andExpect(jsonPath("$.[*].nCodsolic").value(hasItem(DEFAULT_N_CODSOLIC)))
            .andExpect(jsonPath("$.[*].nCodffina").value(hasItem(DEFAULT_N_CODFFINA)))
            .andExpect(jsonPath("$.[*].nCodfarch").value(hasItem(DEFAULT_N_CODFARCH)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vNomform").value(hasItem(DEFAULT_V_NOMFORM.toString())))
            .andExpect(jsonPath("$.[*].vTipoform").value(hasItem(DEFAULT_V_TIPOFORM.toString())))
            .andExpect(jsonPath("$.[*].nFlgoblig").value(hasItem(DEFAULT_N_FLGOBLIG.booleanValue())))
            .andExpect(jsonPath("$.[*].vFlgest").value(hasItem(DEFAULT_V_FLGEST.toString())))
            .andExpect(jsonPath("$.[*].vObserva").value(hasItem(DEFAULT_V_OBSERVA.toString())))
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
        TestUtil.equalsVerifier(Solicform.class);
        Solicform solicform1 = new Solicform();
        solicform1.setnCodsform(1);
        Solicform solicform2 = new Solicform();
        solicform2.setnCodsform(solicform1.getnCodsform());
        assertThat(solicform1).isEqualTo(solicform2);
        solicform2.setnCodsform(2);
        assertThat(solicform1).isNotEqualTo(solicform2);
        solicform1.setnCodsform(null);
        assertThat(solicform1).isNotEqualTo(solicform2);
    }
}
