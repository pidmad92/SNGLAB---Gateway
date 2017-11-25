package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Formfinanc;
import pe.gob.trabajo.repository.FormfinancRepository;
import pe.gob.trabajo.repository.search.FormfinancSearchRepository;
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
 * Test class for the FormfinancResource REST controller.
 *
 * @see FormfinancResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class FormfinancResourceIntTest {

    private static final Integer DEFAULT_N_CODFFINA = 1;
    private static final Integer UPDATED_N_CODFFINA = 2;

    private static final String DEFAULT_V_CODFORM = "AAAAAAAAAA";
    private static final String UPDATED_V_CODFORM = "BBBBBBBBBB";

    private static final String DEFAULT_V_DESFFINA = "AAAAAAAAAA";
    private static final String UPDATED_V_DESFFINA = "BBBBBBBBBB";

    private static final String DEFAULT_V_UNDFFINA = "AAAAAAAAAA";
    private static final String UPDATED_V_UNDFFINA = "BBBBBBBBBB";

    private static final Double DEFAULT_N_MONFFINA = 1D;
    private static final Double UPDATED_N_MONFFINA = 2D;

    private static final Double DEFAULT_N_PORCFFIN = 1D;
    private static final Double UPDATED_N_PORCFFIN = 2D;

    private static final Integer DEFAULT_N_ANIOFORM = 1;
    private static final Integer UPDATED_N_ANIOFORM = 2;

    private static final Integer DEFAULT_N_MESFORM = 1;
    private static final Integer UPDATED_N_MESFORM = 2;

    private static final String DEFAULT_V_CODFILA = "AAAAAAAAAA";
    private static final String UPDATED_V_CODFILA = "BBBBBBBBBB";

    private static final String DEFAULT_V_CODCOLUM = "AAAAAAAAAA";
    private static final String UPDATED_V_CODCOLUM = "BBBBBBBBBB";

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
    private FormfinancRepository formfinancRepository;

    @Autowired
    private FormfinancSearchRepository formfinancSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFormfinancMockMvc;

    private Formfinanc formfinanc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormfinancResource formfinancResource = new FormfinancResource(formfinancRepository, formfinancSearchRepository);
        this.restFormfinancMockMvc = MockMvcBuilders.standaloneSetup(formfinancResource)
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
    public static Formfinanc createEntity(EntityManager em) {
        Formfinanc formfinanc = new Formfinanc()
            .nCodffina(DEFAULT_N_CODFFINA)
            .vCodform(DEFAULT_V_CODFORM)
            .vDesffina(DEFAULT_V_DESFFINA)
            .vUndffina(DEFAULT_V_UNDFFINA)
            .nMonffina(DEFAULT_N_MONFFINA)
            .nPorcffin(DEFAULT_N_PORCFFIN)
            .nAnioform(DEFAULT_N_ANIOFORM)
            .nMesform(DEFAULT_N_MESFORM)
            .vCodfila(DEFAULT_V_CODFILA)
            .vCodcolum(DEFAULT_V_CODCOLUM)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return formfinanc;
    }

    @Before
    public void initTest() {
        formfinancSearchRepository.deleteAll();
        formfinanc = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormfinanc() throws Exception {
        int databaseSizeBeforeCreate = formfinancRepository.findAll().size();

        // Create the Formfinanc
        restFormfinancMockMvc.perform(post("/api/formfinancs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formfinanc)))
            .andExpect(status().isCreated());

        // Validate the Formfinanc in the database
        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeCreate + 1);
        Formfinanc testFormfinanc = formfinancList.get(formfinancList.size() - 1);
        assertThat(testFormfinanc.getnCodffina()).isEqualTo(DEFAULT_N_CODFFINA);
        assertThat(testFormfinanc.getvCodform()).isEqualTo(DEFAULT_V_CODFORM);
        assertThat(testFormfinanc.getvDesffina()).isEqualTo(DEFAULT_V_DESFFINA);
        assertThat(testFormfinanc.getvUndffina()).isEqualTo(DEFAULT_V_UNDFFINA);
        assertThat(testFormfinanc.getnMonffina()).isEqualTo(DEFAULT_N_MONFFINA);
        assertThat(testFormfinanc.getnPorcffin()).isEqualTo(DEFAULT_N_PORCFFIN);
        assertThat(testFormfinanc.getnAnioform()).isEqualTo(DEFAULT_N_ANIOFORM);
        assertThat(testFormfinanc.getnMesform()).isEqualTo(DEFAULT_N_MESFORM);
        assertThat(testFormfinanc.getvCodfila()).isEqualTo(DEFAULT_V_CODFILA);
        assertThat(testFormfinanc.getvCodcolum()).isEqualTo(DEFAULT_V_CODCOLUM);
        assertThat(testFormfinanc.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testFormfinanc.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testFormfinanc.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testFormfinanc.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testFormfinanc.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testFormfinanc.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testFormfinanc.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Formfinanc in Elasticsearch
        Formfinanc formfinancEs = formfinancSearchRepository.findOne(testFormfinanc.getnCodffina());
        assertThat(formfinancEs).isEqualToComparingFieldByField(testFormfinanc);
    }

    @Test
    @Transactional
    public void createFormfinancWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formfinancRepository.findAll().size();

        // Create the Formfinanc with an existing ID
        formfinanc.setnCodffina(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormfinancMockMvc.perform(post("/api/formfinancs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formfinanc)))
            .andExpect(status().isBadRequest());

        // Validate the Formfinanc in the database
        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodffinaIsRequired() throws Exception {
        int databaseSizeBeforeTest = formfinancRepository.findAll().size();
        // set the field null
        formfinanc.setnCodffina(null);

        // Create the Formfinanc, which fails.

        restFormfinancMockMvc.perform(post("/api/formfinancs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formfinanc)))
            .andExpect(status().isBadRequest());

        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = formfinancRepository.findAll().size();
        // set the field null
        formfinanc.setvUsuareg(null);

        // Create the Formfinanc, which fails.

        restFormfinancMockMvc.perform(post("/api/formfinancs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formfinanc)))
            .andExpect(status().isBadRequest());

        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = formfinancRepository.findAll().size();
        // set the field null
        formfinanc.settFecreg(null);

        // Create the Formfinanc, which fails.

        restFormfinancMockMvc.perform(post("/api/formfinancs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formfinanc)))
            .andExpect(status().isBadRequest());

        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = formfinancRepository.findAll().size();
        // set the field null
        formfinanc.setnFlgactivo(null);

        // Create the Formfinanc, which fails.

        restFormfinancMockMvc.perform(post("/api/formfinancs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formfinanc)))
            .andExpect(status().isBadRequest());

        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = formfinancRepository.findAll().size();
        // set the field null
        formfinanc.setnSedereg(null);

        // Create the Formfinanc, which fails.

        restFormfinancMockMvc.perform(post("/api/formfinancs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formfinanc)))
            .andExpect(status().isBadRequest());

        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFormfinancs() throws Exception {
        // Initialize the database
        formfinancRepository.saveAndFlush(formfinanc);

        // Get all the formfinancList
        restFormfinancMockMvc.perform(get("/api/formfinancs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(formfinanc.getnCodffina().intValue())))
            .andExpect(jsonPath("$.[*].nCodffina").value(hasItem(DEFAULT_N_CODFFINA)))
            .andExpect(jsonPath("$.[*].vCodform").value(hasItem(DEFAULT_V_CODFORM.toString())))
            .andExpect(jsonPath("$.[*].vDesffina").value(hasItem(DEFAULT_V_DESFFINA.toString())))
            .andExpect(jsonPath("$.[*].vUndffina").value(hasItem(DEFAULT_V_UNDFFINA.toString())))
            .andExpect(jsonPath("$.[*].nMonffina").value(hasItem(DEFAULT_N_MONFFINA.doubleValue())))
            .andExpect(jsonPath("$.[*].nPorcffin").value(hasItem(DEFAULT_N_PORCFFIN.doubleValue())))
            .andExpect(jsonPath("$.[*].nAnioform").value(hasItem(DEFAULT_N_ANIOFORM)))
            .andExpect(jsonPath("$.[*].nMesform").value(hasItem(DEFAULT_N_MESFORM)))
            .andExpect(jsonPath("$.[*].vCodfila").value(hasItem(DEFAULT_V_CODFILA.toString())))
            .andExpect(jsonPath("$.[*].vCodcolum").value(hasItem(DEFAULT_V_CODCOLUM.toString())))
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
    public void getFormfinanc() throws Exception {
        // Initialize the database
        formfinancRepository.saveAndFlush(formfinanc);

        // Get the formfinanc
        restFormfinancMockMvc.perform(get("/api/formfinancs/{id}", formfinanc.getnCodffina()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(formfinanc.getnCodffina().intValue()))
            .andExpect(jsonPath("$.nCodffina").value(DEFAULT_N_CODFFINA))
            .andExpect(jsonPath("$.vCodform").value(DEFAULT_V_CODFORM.toString()))
            .andExpect(jsonPath("$.vDesffina").value(DEFAULT_V_DESFFINA.toString()))
            .andExpect(jsonPath("$.vUndffina").value(DEFAULT_V_UNDFFINA.toString()))
            .andExpect(jsonPath("$.nMonffina").value(DEFAULT_N_MONFFINA.doubleValue()))
            .andExpect(jsonPath("$.nPorcffin").value(DEFAULT_N_PORCFFIN.doubleValue()))
            .andExpect(jsonPath("$.nAnioform").value(DEFAULT_N_ANIOFORM))
            .andExpect(jsonPath("$.nMesform").value(DEFAULT_N_MESFORM))
            .andExpect(jsonPath("$.vCodfila").value(DEFAULT_V_CODFILA.toString()))
            .andExpect(jsonPath("$.vCodcolum").value(DEFAULT_V_CODCOLUM.toString()))
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
    public void getNonExistingFormfinanc() throws Exception {
        // Get the formfinanc
        restFormfinancMockMvc.perform(get("/api/formfinancs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormfinanc() throws Exception {
        // Initialize the database
        formfinancRepository.saveAndFlush(formfinanc);
        formfinancSearchRepository.save(formfinanc);
        int databaseSizeBeforeUpdate = formfinancRepository.findAll().size();

        // Update the formfinanc
        Formfinanc updatedFormfinanc = formfinancRepository.findOne(formfinanc.getnCodffina());
        updatedFormfinanc
            .nCodffina(UPDATED_N_CODFFINA)
            .vCodform(UPDATED_V_CODFORM)
            .vDesffina(UPDATED_V_DESFFINA)
            .vUndffina(UPDATED_V_UNDFFINA)
            .nMonffina(UPDATED_N_MONFFINA)
            .nPorcffin(UPDATED_N_PORCFFIN)
            .nAnioform(UPDATED_N_ANIOFORM)
            .nMesform(UPDATED_N_MESFORM)
            .vCodfila(UPDATED_V_CODFILA)
            .vCodcolum(UPDATED_V_CODCOLUM)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restFormfinancMockMvc.perform(put("/api/formfinancs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormfinanc)))
            .andExpect(status().isOk());

        // Validate the Formfinanc in the database
        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeUpdate);
        Formfinanc testFormfinanc = formfinancList.get(formfinancList.size() - 1);
        assertThat(testFormfinanc.getnCodffina()).isEqualTo(UPDATED_N_CODFFINA);
        assertThat(testFormfinanc.getvCodform()).isEqualTo(UPDATED_V_CODFORM);
        assertThat(testFormfinanc.getvDesffina()).isEqualTo(UPDATED_V_DESFFINA);
        assertThat(testFormfinanc.getvUndffina()).isEqualTo(UPDATED_V_UNDFFINA);
        assertThat(testFormfinanc.getnMonffina()).isEqualTo(UPDATED_N_MONFFINA);
        assertThat(testFormfinanc.getnPorcffin()).isEqualTo(UPDATED_N_PORCFFIN);
        assertThat(testFormfinanc.getnAnioform()).isEqualTo(UPDATED_N_ANIOFORM);
        assertThat(testFormfinanc.getnMesform()).isEqualTo(UPDATED_N_MESFORM);
        assertThat(testFormfinanc.getvCodfila()).isEqualTo(UPDATED_V_CODFILA);
        assertThat(testFormfinanc.getvCodcolum()).isEqualTo(UPDATED_V_CODCOLUM);
        assertThat(testFormfinanc.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testFormfinanc.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testFormfinanc.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testFormfinanc.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testFormfinanc.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testFormfinanc.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testFormfinanc.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Formfinanc in Elasticsearch
        Formfinanc formfinancEs = formfinancSearchRepository.findOne(testFormfinanc.getnCodffina());
        assertThat(formfinancEs).isEqualToComparingFieldByField(testFormfinanc);
    }

    @Test
    @Transactional
    public void updateNonExistingFormfinanc() throws Exception {
        int databaseSizeBeforeUpdate = formfinancRepository.findAll().size();

        // Create the Formfinanc

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFormfinancMockMvc.perform(put("/api/formfinancs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formfinanc)))
            .andExpect(status().isCreated());

        // Validate the Formfinanc in the database
        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFormfinanc() throws Exception {
        // Initialize the database
        formfinancRepository.saveAndFlush(formfinanc);
        formfinancSearchRepository.save(formfinanc);
        int databaseSizeBeforeDelete = formfinancRepository.findAll().size();

        // Get the formfinanc
        restFormfinancMockMvc.perform(delete("/api/formfinancs/{id}", formfinanc.getnCodffina())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean formfinancExistsInEs = formfinancSearchRepository.exists(formfinanc.getnCodffina());
        assertThat(formfinancExistsInEs).isFalse();

        // Validate the database is empty
        List<Formfinanc> formfinancList = formfinancRepository.findAll();
        assertThat(formfinancList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFormfinanc() throws Exception {
        // Initialize the database
        formfinancRepository.saveAndFlush(formfinanc);
        formfinancSearchRepository.save(formfinanc);

        // Search the formfinanc
        restFormfinancMockMvc.perform(get("/api/_search/formfinancs?query=id:" + formfinanc.getnCodffina()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(formfinanc.getnCodffina().intValue())))
            .andExpect(jsonPath("$.[*].nCodffina").value(hasItem(DEFAULT_N_CODFFINA)))
            .andExpect(jsonPath("$.[*].vCodform").value(hasItem(DEFAULT_V_CODFORM.toString())))
            .andExpect(jsonPath("$.[*].vDesffina").value(hasItem(DEFAULT_V_DESFFINA.toString())))
            .andExpect(jsonPath("$.[*].vUndffina").value(hasItem(DEFAULT_V_UNDFFINA.toString())))
            .andExpect(jsonPath("$.[*].nMonffina").value(hasItem(DEFAULT_N_MONFFINA.doubleValue())))
            .andExpect(jsonPath("$.[*].nPorcffin").value(hasItem(DEFAULT_N_PORCFFIN.doubleValue())))
            .andExpect(jsonPath("$.[*].nAnioform").value(hasItem(DEFAULT_N_ANIOFORM)))
            .andExpect(jsonPath("$.[*].nMesform").value(hasItem(DEFAULT_N_MESFORM)))
            .andExpect(jsonPath("$.[*].vCodfila").value(hasItem(DEFAULT_V_CODFILA.toString())))
            .andExpect(jsonPath("$.[*].vCodcolum").value(hasItem(DEFAULT_V_CODCOLUM.toString())))
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
        TestUtil.equalsVerifier(Formfinanc.class);
        Formfinanc formfinanc1 = new Formfinanc();
        formfinanc1.setnCodffina(1);
        Formfinanc formfinanc2 = new Formfinanc();
        formfinanc2.setnCodffina(formfinanc1.getnCodffina());
        assertThat(formfinanc1).isEqualTo(formfinanc2);
        formfinanc2.setnCodffina(2);
        assertThat(formfinanc1).isNotEqualTo(formfinanc2);
        formfinanc1.setnCodffina(null);
        assertThat(formfinanc1).isNotEqualTo(formfinanc2);
    }
}
