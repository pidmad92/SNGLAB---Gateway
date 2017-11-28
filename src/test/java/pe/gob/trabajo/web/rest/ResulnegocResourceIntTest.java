package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Resulnegoc;
import pe.gob.trabajo.repository.ResulnegocRepository;
import pe.gob.trabajo.repository.search.ResulnegocSearchRepository;
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
 * Test class for the ResulnegocResource REST controller.
 *
 * @see ResulnegocResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class ResulnegocResourceIntTest {

    private static final Integer DEFAULT_N_CODRENEG = 1;
    private static final Integer UPDATED_N_CODRENEG = 2;

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final Instant DEFAULT_T_FECRENEG = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_T_FECRENEG = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_N_AUMENTO = 1D;
    private static final Double UPDATED_N_AUMENTO = 2D;

    private static final Double DEFAULT_N_CLAUSULA = 1D;
    private static final Double UPDATED_N_CLAUSULA = 2D;

    private static final Double DEFAULT_N_GRATIFICA = 1D;
    private static final Double UPDATED_N_GRATIFICA = 2D;

    private static final Double DEFAULT_N_ALIMENTAC = 1D;
    private static final Double UPDATED_N_ALIMENTAC = 2D;

    private static final Double DEFAULT_N_MOVILIDAD = 1D;
    private static final Double UPDATED_N_MOVILIDAD = 2D;

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
    private ResulnegocRepository resulnegocRepository;

    @Autowired
    private ResulnegocSearchRepository resulnegocSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restResulnegocMockMvc;

    private Resulnegoc resulnegoc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ResulnegocResource resulnegocResource = new ResulnegocResource(resulnegocRepository, resulnegocSearchRepository);
        this.restResulnegocMockMvc = MockMvcBuilders.standaloneSetup(resulnegocResource)
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
    public static Resulnegoc createEntity(EntityManager em) {
        Resulnegoc resulnegoc = new Resulnegoc()
            .nCodreneg(DEFAULT_N_CODRENEG)
            .nCodfperf(DEFAULT_N_CODFPERF)
            .tFecreneg(DEFAULT_T_FECRENEG)
            .nAumento(DEFAULT_N_AUMENTO)
            .nClausula(DEFAULT_N_CLAUSULA)
            .nGratifica(DEFAULT_N_GRATIFICA)
            .nAlimentac(DEFAULT_N_ALIMENTAC)
            .nMovilidad(DEFAULT_N_MOVILIDAD)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return resulnegoc;
    }

    @Before
    public void initTest() {
        resulnegocSearchRepository.deleteAll();
        resulnegoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createResulnegoc() throws Exception {
        int databaseSizeBeforeCreate = resulnegocRepository.findAll().size();

        // Create the Resulnegoc
        restResulnegocMockMvc.perform(post("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resulnegoc)))
            .andExpect(status().isCreated());

        // Validate the Resulnegoc in the database
        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeCreate + 1);
        Resulnegoc testResulnegoc = resulnegocList.get(resulnegocList.size() - 1);
        assertThat(testResulnegoc.getnCodreneg()).isEqualTo(DEFAULT_N_CODRENEG);
        assertThat(testResulnegoc.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testResulnegoc.gettFecreneg()).isEqualTo(DEFAULT_T_FECRENEG);
        assertThat(testResulnegoc.getnAumento()).isEqualTo(DEFAULT_N_AUMENTO);
        assertThat(testResulnegoc.getnClausula()).isEqualTo(DEFAULT_N_CLAUSULA);
        assertThat(testResulnegoc.getnGratifica()).isEqualTo(DEFAULT_N_GRATIFICA);
        assertThat(testResulnegoc.getnAlimentac()).isEqualTo(DEFAULT_N_ALIMENTAC);
        assertThat(testResulnegoc.getnMovilidad()).isEqualTo(DEFAULT_N_MOVILIDAD);
        assertThat(testResulnegoc.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testResulnegoc.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testResulnegoc.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testResulnegoc.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testResulnegoc.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testResulnegoc.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testResulnegoc.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Resulnegoc in Elasticsearch
        Resulnegoc resulnegocEs = resulnegocSearchRepository.findOne(testResulnegoc.getnCodreneg());
        assertThat(resulnegocEs).isEqualToComparingFieldByField(testResulnegoc);
    }

    @Test
    @Transactional
    public void createResulnegocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resulnegocRepository.findAll().size();

        // Create the Resulnegoc with an existing ID
        resulnegoc.setnCodreneg(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResulnegocMockMvc.perform(post("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resulnegoc)))
            .andExpect(status().isBadRequest());

        // Validate the Resulnegoc in the database
        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodrenegIsRequired() throws Exception {
        int databaseSizeBeforeTest = resulnegocRepository.findAll().size();
        // set the field null
        resulnegoc.setnCodreneg(null);

        // Create the Resulnegoc, which fails.

        restResulnegocMockMvc.perform(post("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resulnegoc)))
            .andExpect(status().isBadRequest());

        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknCodfperfIsRequired() throws Exception {
        int databaseSizeBeforeTest = resulnegocRepository.findAll().size();
        // set the field null
        resulnegoc.setnCodfperf(null);

        // Create the Resulnegoc, which fails.

        restResulnegocMockMvc.perform(post("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resulnegoc)))
            .andExpect(status().isBadRequest());

        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = resulnegocRepository.findAll().size();
        // set the field null
        resulnegoc.setvUsuareg(null);

        // Create the Resulnegoc, which fails.

        restResulnegocMockMvc.perform(post("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resulnegoc)))
            .andExpect(status().isBadRequest());

        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = resulnegocRepository.findAll().size();
        // set the field null
        resulnegoc.settFecreg(null);

        // Create the Resulnegoc, which fails.

        restResulnegocMockMvc.perform(post("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resulnegoc)))
            .andExpect(status().isBadRequest());

        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = resulnegocRepository.findAll().size();
        // set the field null
        resulnegoc.setnFlgactivo(null);

        // Create the Resulnegoc, which fails.

        restResulnegocMockMvc.perform(post("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resulnegoc)))
            .andExpect(status().isBadRequest());

        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = resulnegocRepository.findAll().size();
        // set the field null
        resulnegoc.setnSedereg(null);

        // Create the Resulnegoc, which fails.

        restResulnegocMockMvc.perform(post("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resulnegoc)))
            .andExpect(status().isBadRequest());

        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllResulnegocs() throws Exception {
        // Initialize the database
        resulnegocRepository.saveAndFlush(resulnegoc);

        // Get all the resulnegocList
        restResulnegocMockMvc.perform(get("/api/resulnegocs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(resulnegoc.getnCodreneg().intValue())))
            .andExpect(jsonPath("$.[*].nCodreneg").value(hasItem(DEFAULT_N_CODRENEG)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].tFecreneg").value(hasItem(DEFAULT_T_FECRENEG.toString())))
            .andExpect(jsonPath("$.[*].nAumento").value(hasItem(DEFAULT_N_AUMENTO.doubleValue())))
            .andExpect(jsonPath("$.[*].nClausula").value(hasItem(DEFAULT_N_CLAUSULA.doubleValue())))
            .andExpect(jsonPath("$.[*].nGratifica").value(hasItem(DEFAULT_N_GRATIFICA.doubleValue())))
            .andExpect(jsonPath("$.[*].nAlimentac").value(hasItem(DEFAULT_N_ALIMENTAC.doubleValue())))
            .andExpect(jsonPath("$.[*].nMovilidad").value(hasItem(DEFAULT_N_MOVILIDAD.doubleValue())))
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
    public void getResulnegoc() throws Exception {
        // Initialize the database
        resulnegocRepository.saveAndFlush(resulnegoc);

        // Get the resulnegoc
        restResulnegocMockMvc.perform(get("/api/resulnegocs/{id}", resulnegoc.getnCodreneg()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(resulnegoc.getnCodreneg().intValue()))
            .andExpect(jsonPath("$.nCodreneg").value(DEFAULT_N_CODRENEG))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.tFecreneg").value(DEFAULT_T_FECRENEG.toString()))
            .andExpect(jsonPath("$.nAumento").value(DEFAULT_N_AUMENTO.doubleValue()))
            .andExpect(jsonPath("$.nClausula").value(DEFAULT_N_CLAUSULA.doubleValue()))
            .andExpect(jsonPath("$.nGratifica").value(DEFAULT_N_GRATIFICA.doubleValue()))
            .andExpect(jsonPath("$.nAlimentac").value(DEFAULT_N_ALIMENTAC.doubleValue()))
            .andExpect(jsonPath("$.nMovilidad").value(DEFAULT_N_MOVILIDAD.doubleValue()))
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
    public void getNonExistingResulnegoc() throws Exception {
        // Get the resulnegoc
        restResulnegocMockMvc.perform(get("/api/resulnegocs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResulnegoc() throws Exception {
        // Initialize the database
        resulnegocRepository.saveAndFlush(resulnegoc);
        resulnegocSearchRepository.save(resulnegoc);
        int databaseSizeBeforeUpdate = resulnegocRepository.findAll().size();

        // Update the resulnegoc
        Resulnegoc updatedResulnegoc = resulnegocRepository.findOne(resulnegoc.getnCodreneg());
        updatedResulnegoc
            .nCodreneg(UPDATED_N_CODRENEG)
            .nCodfperf(UPDATED_N_CODFPERF)
            .tFecreneg(UPDATED_T_FECRENEG)
            .nAumento(UPDATED_N_AUMENTO)
            .nClausula(UPDATED_N_CLAUSULA)
            .nGratifica(UPDATED_N_GRATIFICA)
            .nAlimentac(UPDATED_N_ALIMENTAC)
            .nMovilidad(UPDATED_N_MOVILIDAD)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restResulnegocMockMvc.perform(put("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedResulnegoc)))
            .andExpect(status().isOk());

        // Validate the Resulnegoc in the database
        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeUpdate);
        Resulnegoc testResulnegoc = resulnegocList.get(resulnegocList.size() - 1);
        assertThat(testResulnegoc.getnCodreneg()).isEqualTo(UPDATED_N_CODRENEG);
        assertThat(testResulnegoc.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testResulnegoc.gettFecreneg()).isEqualTo(UPDATED_T_FECRENEG);
        assertThat(testResulnegoc.getnAumento()).isEqualTo(UPDATED_N_AUMENTO);
        assertThat(testResulnegoc.getnClausula()).isEqualTo(UPDATED_N_CLAUSULA);
        assertThat(testResulnegoc.getnGratifica()).isEqualTo(UPDATED_N_GRATIFICA);
        assertThat(testResulnegoc.getnAlimentac()).isEqualTo(UPDATED_N_ALIMENTAC);
        assertThat(testResulnegoc.getnMovilidad()).isEqualTo(UPDATED_N_MOVILIDAD);
        assertThat(testResulnegoc.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testResulnegoc.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testResulnegoc.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testResulnegoc.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testResulnegoc.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testResulnegoc.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testResulnegoc.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Resulnegoc in Elasticsearch
        Resulnegoc resulnegocEs = resulnegocSearchRepository.findOne(testResulnegoc.getnCodreneg());
        assertThat(resulnegocEs).isEqualToComparingFieldByField(testResulnegoc);
    }

    @Test
    @Transactional
    public void updateNonExistingResulnegoc() throws Exception {
        int databaseSizeBeforeUpdate = resulnegocRepository.findAll().size();

        // Create the Resulnegoc

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restResulnegocMockMvc.perform(put("/api/resulnegocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resulnegoc)))
            .andExpect(status().isCreated());

        // Validate the Resulnegoc in the database
        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteResulnegoc() throws Exception {
        // Initialize the database
        resulnegocRepository.saveAndFlush(resulnegoc);
        resulnegocSearchRepository.save(resulnegoc);
        int databaseSizeBeforeDelete = resulnegocRepository.findAll().size();

        // Get the resulnegoc
        restResulnegocMockMvc.perform(delete("/api/resulnegocs/{id}", resulnegoc.getnCodreneg())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean resulnegocExistsInEs = resulnegocSearchRepository.exists(resulnegoc.getnCodreneg());
        assertThat(resulnegocExistsInEs).isFalse();

        // Validate the database is empty
        List<Resulnegoc> resulnegocList = resulnegocRepository.findAll();
        assertThat(resulnegocList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchResulnegoc() throws Exception {
        // Initialize the database
        resulnegocRepository.saveAndFlush(resulnegoc);
        resulnegocSearchRepository.save(resulnegoc);

        // Search the resulnegoc
        restResulnegocMockMvc.perform(get("/api/_search/resulnegocs?query=id:" + resulnegoc.getnCodreneg()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(resulnegoc.getnCodreneg().intValue())))
            .andExpect(jsonPath("$.[*].nCodreneg").value(hasItem(DEFAULT_N_CODRENEG)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].tFecreneg").value(hasItem(DEFAULT_T_FECRENEG.toString())))
            .andExpect(jsonPath("$.[*].nAumento").value(hasItem(DEFAULT_N_AUMENTO.doubleValue())))
            .andExpect(jsonPath("$.[*].nClausula").value(hasItem(DEFAULT_N_CLAUSULA.doubleValue())))
            .andExpect(jsonPath("$.[*].nGratifica").value(hasItem(DEFAULT_N_GRATIFICA.doubleValue())))
            .andExpect(jsonPath("$.[*].nAlimentac").value(hasItem(DEFAULT_N_ALIMENTAC.doubleValue())))
            .andExpect(jsonPath("$.[*].nMovilidad").value(hasItem(DEFAULT_N_MOVILIDAD.doubleValue())))
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
        TestUtil.equalsVerifier(Resulnegoc.class);
        Resulnegoc resulnegoc1 = new Resulnegoc();
        resulnegoc1.setnCodreneg(1);
        Resulnegoc resulnegoc2 = new Resulnegoc();
        resulnegoc2.setnCodreneg(resulnegoc1.getnCodreneg());
        assertThat(resulnegoc1).isEqualTo(resulnegoc2);
        resulnegoc2.setnCodreneg(2);
        assertThat(resulnegoc1).isNotEqualTo(resulnegoc2);
        resulnegoc1.setnCodreneg(null);
        assertThat(resulnegoc1).isNotEqualTo(resulnegoc2);
    }
}
