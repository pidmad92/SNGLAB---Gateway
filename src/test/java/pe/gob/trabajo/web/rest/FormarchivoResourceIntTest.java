package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Formarchivo;
import pe.gob.trabajo.repository.FormarchivoRepository;
import pe.gob.trabajo.repository.search.FormarchivoSearchRepository;
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
 * Test class for the FormarchivoResource REST controller.
 *
 * @see FormarchivoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class FormarchivoResourceIntTest {

    private static final Integer DEFAULT_N_CODFARCH = 1;
    private static final Integer UPDATED_N_CODFARCH = 2;

    private static final String DEFAULT_V_DESFORM = "AAAAAAAAAA";
    private static final String UPDATED_V_DESFORM = "BBBBBBBBBB";

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
    private FormarchivoRepository formarchivoRepository;

    @Autowired
    private FormarchivoSearchRepository formarchivoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFormarchivoMockMvc;

    private Formarchivo formarchivo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormarchivoResource formarchivoResource = new FormarchivoResource(formarchivoRepository, formarchivoSearchRepository);
        this.restFormarchivoMockMvc = MockMvcBuilders.standaloneSetup(formarchivoResource)
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
    public static Formarchivo createEntity(EntityManager em) {
        Formarchivo formarchivo = new Formarchivo()
            .nCodfarch(DEFAULT_N_CODFARCH)
            .vDesform(DEFAULT_V_DESFORM)
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
        return formarchivo;
    }

    @Before
    public void initTest() {
        formarchivoSearchRepository.deleteAll();
        formarchivo = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormarchivo() throws Exception {
        int databaseSizeBeforeCreate = formarchivoRepository.findAll().size();

        // Create the Formarchivo
        restFormarchivoMockMvc.perform(post("/api/formarchivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formarchivo)))
            .andExpect(status().isCreated());

        // Validate the Formarchivo in the database
        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeCreate + 1);
        Formarchivo testFormarchivo = formarchivoList.get(formarchivoList.size() - 1);
        assertThat(testFormarchivo.getnCodfarch()).isEqualTo(DEFAULT_N_CODFARCH);
        assertThat(testFormarchivo.getvDesform()).isEqualTo(DEFAULT_V_DESFORM);
        assertThat(testFormarchivo.getbArchivo()).isEqualTo(DEFAULT_B_ARCHIVO);
        assertThat(testFormarchivo.getbArchivoContentType()).isEqualTo(DEFAULT_B_ARCHIVO_CONTENT_TYPE);
        assertThat(testFormarchivo.getvContype()).isEqualTo(DEFAULT_V_CONTYPE);
        assertThat(testFormarchivo.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testFormarchivo.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testFormarchivo.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testFormarchivo.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testFormarchivo.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testFormarchivo.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testFormarchivo.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Formarchivo in Elasticsearch
        Formarchivo formarchivoEs = formarchivoSearchRepository.findOne(testFormarchivo.getnCodfarch());
        assertThat(formarchivoEs).isEqualToComparingFieldByField(testFormarchivo);
    }

    @Test
    @Transactional
    public void createFormarchivoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formarchivoRepository.findAll().size();

        // Create the Formarchivo with an existing ID
        formarchivo.setnCodfarch(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormarchivoMockMvc.perform(post("/api/formarchivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formarchivo)))
            .andExpect(status().isBadRequest());

        // Validate the Formarchivo in the database
        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodfarchIsRequired() throws Exception {
        int databaseSizeBeforeTest = formarchivoRepository.findAll().size();
        // set the field null
        formarchivo.setnCodfarch(null);

        // Create the Formarchivo, which fails.

        restFormarchivoMockMvc.perform(post("/api/formarchivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formarchivo)))
            .andExpect(status().isBadRequest());

        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = formarchivoRepository.findAll().size();
        // set the field null
        formarchivo.setvUsuareg(null);

        // Create the Formarchivo, which fails.

        restFormarchivoMockMvc.perform(post("/api/formarchivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formarchivo)))
            .andExpect(status().isBadRequest());

        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = formarchivoRepository.findAll().size();
        // set the field null
        formarchivo.settFecreg(null);

        // Create the Formarchivo, which fails.

        restFormarchivoMockMvc.perform(post("/api/formarchivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formarchivo)))
            .andExpect(status().isBadRequest());

        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = formarchivoRepository.findAll().size();
        // set the field null
        formarchivo.setnFlgactivo(null);

        // Create the Formarchivo, which fails.

        restFormarchivoMockMvc.perform(post("/api/formarchivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formarchivo)))
            .andExpect(status().isBadRequest());

        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = formarchivoRepository.findAll().size();
        // set the field null
        formarchivo.setnSedereg(null);

        // Create the Formarchivo, which fails.

        restFormarchivoMockMvc.perform(post("/api/formarchivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formarchivo)))
            .andExpect(status().isBadRequest());

        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFormarchivos() throws Exception {
        // Initialize the database
        formarchivoRepository.saveAndFlush(formarchivo);

        // Get all the formarchivoList
        restFormarchivoMockMvc.perform(get("/api/formarchivos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(formarchivo.getnCodfarch().intValue())))
            .andExpect(jsonPath("$.[*].nCodfarch").value(hasItem(DEFAULT_N_CODFARCH)))
            .andExpect(jsonPath("$.[*].vDesform").value(hasItem(DEFAULT_V_DESFORM.toString())))
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
    public void getFormarchivo() throws Exception {
        // Initialize the database
        formarchivoRepository.saveAndFlush(formarchivo);

        // Get the formarchivo
        restFormarchivoMockMvc.perform(get("/api/formarchivos/{id}", formarchivo.getnCodfarch()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(formarchivo.getnCodfarch().intValue()))
            .andExpect(jsonPath("$.nCodfarch").value(DEFAULT_N_CODFARCH))
            .andExpect(jsonPath("$.vDesform").value(DEFAULT_V_DESFORM.toString()))
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
    public void getNonExistingFormarchivo() throws Exception {
        // Get the formarchivo
        restFormarchivoMockMvc.perform(get("/api/formarchivos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormarchivo() throws Exception {
        // Initialize the database
        formarchivoRepository.saveAndFlush(formarchivo);
        formarchivoSearchRepository.save(formarchivo);
        int databaseSizeBeforeUpdate = formarchivoRepository.findAll().size();

        // Update the formarchivo
        Formarchivo updatedFormarchivo = formarchivoRepository.findOne(formarchivo.getnCodfarch());
        updatedFormarchivo
            .nCodfarch(UPDATED_N_CODFARCH)
            .vDesform(UPDATED_V_DESFORM)
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

        restFormarchivoMockMvc.perform(put("/api/formarchivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormarchivo)))
            .andExpect(status().isOk());

        // Validate the Formarchivo in the database
        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeUpdate);
        Formarchivo testFormarchivo = formarchivoList.get(formarchivoList.size() - 1);
        assertThat(testFormarchivo.getnCodfarch()).isEqualTo(UPDATED_N_CODFARCH);
        assertThat(testFormarchivo.getvDesform()).isEqualTo(UPDATED_V_DESFORM);
        assertThat(testFormarchivo.getbArchivo()).isEqualTo(UPDATED_B_ARCHIVO);
        assertThat(testFormarchivo.getbArchivoContentType()).isEqualTo(UPDATED_B_ARCHIVO_CONTENT_TYPE);
        assertThat(testFormarchivo.getvContype()).isEqualTo(UPDATED_V_CONTYPE);
        assertThat(testFormarchivo.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testFormarchivo.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testFormarchivo.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testFormarchivo.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testFormarchivo.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testFormarchivo.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testFormarchivo.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Formarchivo in Elasticsearch
        Formarchivo formarchivoEs = formarchivoSearchRepository.findOne(testFormarchivo.getnCodfarch());
        assertThat(formarchivoEs).isEqualToComparingFieldByField(testFormarchivo);
    }

    @Test
    @Transactional
    public void updateNonExistingFormarchivo() throws Exception {
        int databaseSizeBeforeUpdate = formarchivoRepository.findAll().size();

        // Create the Formarchivo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFormarchivoMockMvc.perform(put("/api/formarchivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formarchivo)))
            .andExpect(status().isCreated());

        // Validate the Formarchivo in the database
        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFormarchivo() throws Exception {
        // Initialize the database
        formarchivoRepository.saveAndFlush(formarchivo);
        formarchivoSearchRepository.save(formarchivo);
        int databaseSizeBeforeDelete = formarchivoRepository.findAll().size();

        // Get the formarchivo
        restFormarchivoMockMvc.perform(delete("/api/formarchivos/{id}", formarchivo.getnCodfarch())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean formarchivoExistsInEs = formarchivoSearchRepository.exists(formarchivo.getnCodfarch());
        assertThat(formarchivoExistsInEs).isFalse();

        // Validate the database is empty
        List<Formarchivo> formarchivoList = formarchivoRepository.findAll();
        assertThat(formarchivoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFormarchivo() throws Exception {
        // Initialize the database
        formarchivoRepository.saveAndFlush(formarchivo);
        formarchivoSearchRepository.save(formarchivo);

        // Search the formarchivo
        restFormarchivoMockMvc.perform(get("/api/_search/formarchivos?query=id:" + formarchivo.getnCodfarch()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(formarchivo.getnCodfarch().intValue())))
            .andExpect(jsonPath("$.[*].nCodfarch").value(hasItem(DEFAULT_N_CODFARCH)))
            .andExpect(jsonPath("$.[*].vDesform").value(hasItem(DEFAULT_V_DESFORM.toString())))
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
        TestUtil.equalsVerifier(Formarchivo.class);
        Formarchivo formarchivo1 = new Formarchivo();
        formarchivo1.setnCodfarch(1);
        Formarchivo formarchivo2 = new Formarchivo();
        formarchivo2.setnCodfarch(formarchivo1.getnCodfarch());
        assertThat(formarchivo1).isEqualTo(formarchivo2);
        formarchivo2.setnCodfarch(2);
        assertThat(formarchivo1).isNotEqualTo(formarchivo2);
        formarchivo1.setnCodfarch(null);
        assertThat(formarchivo1).isNotEqualTo(formarchivo2);
    }
}
