package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Negocolect;
import pe.gob.trabajo.repository.NegocolectRepository;
import pe.gob.trabajo.repository.search.NegocolectSearchRepository;
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
 * Test class for the NegocolectResource REST controller.
 *
 * @see NegocolectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class NegocolectResourceIntTest {

    private static final Integer DEFAULT_N_CODNGCOL = 1;
    private static final Integer UPDATED_N_CODNGCOL = 2;

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final String DEFAULT_V_AMBSUBJE = "AAAAAAAAAA";
    private static final String UPDATED_V_AMBSUBJE = "BBBBBBBBBB";

    private static final String DEFAULT_V_TIPONGCO = "A";
    private static final String UPDATED_V_TIPONGCO = "B";

    private static final String DEFAULT_V_ETAPANEG = "AAAAAAAAAA";
    private static final String UPDATED_V_ETAPANEG = "BBBBBBBBBB";

    private static final Instant DEFAULT_T_FECVIGDE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_T_FECVIGDE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_T_FECVIGHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_T_FECVIGHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_V_NUMEXPE = "AAAAAAAAAA";
    private static final String UPDATED_V_NUMEXPE = "BBBBBBBBBB";

    private static final String DEFAULT_V_AUTTRAB = "AAAAAAAAAA";
    private static final String UPDATED_V_AUTTRAB = "BBBBBBBBBB";

    private static final String DEFAULT_V_RUCNEG = "AAAAAAAAAA";
    private static final String UPDATED_V_RUCNEG = "BBBBBBBBBB";

    private static final String DEFAULT_V_REGISTRO = "AAAAAAAAAA";
    private static final String UPDATED_V_REGISTRO = "BBBBBBBBBB";

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
    private NegocolectRepository negocolectRepository;

    @Autowired
    private NegocolectSearchRepository negocolectSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNegocolectMockMvc;

    private Negocolect negocolect;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NegocolectResource negocolectResource = new NegocolectResource(negocolectRepository, negocolectSearchRepository);
        this.restNegocolectMockMvc = MockMvcBuilders.standaloneSetup(negocolectResource)
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
    public static Negocolect createEntity(EntityManager em) {
        Negocolect negocolect = new Negocolect()
            .nCodngcol(DEFAULT_N_CODNGCOL)
            .nCodfperf(DEFAULT_N_CODFPERF)
            .vAmbsubje(DEFAULT_V_AMBSUBJE)
            .vTipongco(DEFAULT_V_TIPONGCO)
            .vEtapaneg(DEFAULT_V_ETAPANEG)
            .tFecvigde(DEFAULT_T_FECVIGDE)
            .tFecvigha(DEFAULT_T_FECVIGHA)
            .vNumexpe(DEFAULT_V_NUMEXPE)
            .vAuttrab(DEFAULT_V_AUTTRAB)
            .vRucneg(DEFAULT_V_RUCNEG)
            .vRegistro(DEFAULT_V_REGISTRO)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return negocolect;
    }

    @Before
    public void initTest() {
        negocolectSearchRepository.deleteAll();
        negocolect = createEntity(em);
    }

    @Test
    @Transactional
    public void createNegocolect() throws Exception {
        int databaseSizeBeforeCreate = negocolectRepository.findAll().size();

        // Create the Negocolect
        restNegocolectMockMvc.perform(post("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(negocolect)))
            .andExpect(status().isCreated());

        // Validate the Negocolect in the database
        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeCreate + 1);
        Negocolect testNegocolect = negocolectList.get(negocolectList.size() - 1);
        assertThat(testNegocolect.getnCodngcol()).isEqualTo(DEFAULT_N_CODNGCOL);
        assertThat(testNegocolect.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testNegocolect.getvAmbsubje()).isEqualTo(DEFAULT_V_AMBSUBJE);
        assertThat(testNegocolect.getvTipongco()).isEqualTo(DEFAULT_V_TIPONGCO);
        assertThat(testNegocolect.getvEtapaneg()).isEqualTo(DEFAULT_V_ETAPANEG);
        assertThat(testNegocolect.gettFecvigde()).isEqualTo(DEFAULT_T_FECVIGDE);
        assertThat(testNegocolect.gettFecvigha()).isEqualTo(DEFAULT_T_FECVIGHA);
        assertThat(testNegocolect.getvNumexpe()).isEqualTo(DEFAULT_V_NUMEXPE);
        assertThat(testNegocolect.getvAuttrab()).isEqualTo(DEFAULT_V_AUTTRAB);
        assertThat(testNegocolect.getvRucneg()).isEqualTo(DEFAULT_V_RUCNEG);
        assertThat(testNegocolect.getvRegistro()).isEqualTo(DEFAULT_V_REGISTRO);
        assertThat(testNegocolect.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testNegocolect.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testNegocolect.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testNegocolect.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testNegocolect.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testNegocolect.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testNegocolect.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Negocolect in Elasticsearch
        Negocolect negocolectEs = negocolectSearchRepository.findOne(testNegocolect.getnCodngcol());
        assertThat(negocolectEs).isEqualToComparingFieldByField(testNegocolect);
    }

    @Test
    @Transactional
    public void createNegocolectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = negocolectRepository.findAll().size();

        // Create the Negocolect with an existing ID
        negocolect.setnCodngcol(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNegocolectMockMvc.perform(post("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(negocolect)))
            .andExpect(status().isBadRequest());

        // Validate the Negocolect in the database
        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodngcolIsRequired() throws Exception {
        int databaseSizeBeforeTest = negocolectRepository.findAll().size();
        // set the field null
        negocolect.setnCodngcol(null);

        // Create the Negocolect, which fails.

        restNegocolectMockMvc.perform(post("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(negocolect)))
            .andExpect(status().isBadRequest());

        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknCodfperfIsRequired() throws Exception {
        int databaseSizeBeforeTest = negocolectRepository.findAll().size();
        // set the field null
        negocolect.setnCodfperf(null);

        // Create the Negocolect, which fails.

        restNegocolectMockMvc.perform(post("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(negocolect)))
            .andExpect(status().isBadRequest());

        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = negocolectRepository.findAll().size();
        // set the field null
        negocolect.setvUsuareg(null);

        // Create the Negocolect, which fails.

        restNegocolectMockMvc.perform(post("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(negocolect)))
            .andExpect(status().isBadRequest());

        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = negocolectRepository.findAll().size();
        // set the field null
        negocolect.settFecreg(null);

        // Create the Negocolect, which fails.

        restNegocolectMockMvc.perform(post("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(negocolect)))
            .andExpect(status().isBadRequest());

        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = negocolectRepository.findAll().size();
        // set the field null
        negocolect.setnFlgactivo(null);

        // Create the Negocolect, which fails.

        restNegocolectMockMvc.perform(post("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(negocolect)))
            .andExpect(status().isBadRequest());

        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = negocolectRepository.findAll().size();
        // set the field null
        negocolect.setnSedereg(null);

        // Create the Negocolect, which fails.

        restNegocolectMockMvc.perform(post("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(negocolect)))
            .andExpect(status().isBadRequest());

        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNegocolects() throws Exception {
        // Initialize the database
        negocolectRepository.saveAndFlush(negocolect);

        // Get all the negocolectList
        restNegocolectMockMvc.perform(get("/api/negocolects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(negocolect.getnCodngcol().intValue())))
            .andExpect(jsonPath("$.[*].nCodngcol").value(hasItem(DEFAULT_N_CODNGCOL)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vAmbsubje").value(hasItem(DEFAULT_V_AMBSUBJE.toString())))
            .andExpect(jsonPath("$.[*].vTipongco").value(hasItem(DEFAULT_V_TIPONGCO.toString())))
            .andExpect(jsonPath("$.[*].vEtapaneg").value(hasItem(DEFAULT_V_ETAPANEG.toString())))
            .andExpect(jsonPath("$.[*].tFecvigde").value(hasItem(DEFAULT_T_FECVIGDE.toString())))
            .andExpect(jsonPath("$.[*].tFecvigha").value(hasItem(DEFAULT_T_FECVIGHA.toString())))
            .andExpect(jsonPath("$.[*].vNumexpe").value(hasItem(DEFAULT_V_NUMEXPE.toString())))
            .andExpect(jsonPath("$.[*].vAuttrab").value(hasItem(DEFAULT_V_AUTTRAB.toString())))
            .andExpect(jsonPath("$.[*].vRucneg").value(hasItem(DEFAULT_V_RUCNEG.toString())))
            .andExpect(jsonPath("$.[*].vRegistro").value(hasItem(DEFAULT_V_REGISTRO.toString())))
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
    public void getNegocolect() throws Exception {
        // Initialize the database
        negocolectRepository.saveAndFlush(negocolect);

        // Get the negocolect
        restNegocolectMockMvc.perform(get("/api/negocolects/{id}", negocolect.getnCodngcol()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(negocolect.getnCodngcol().intValue()))
            .andExpect(jsonPath("$.nCodngcol").value(DEFAULT_N_CODNGCOL))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.vAmbsubje").value(DEFAULT_V_AMBSUBJE.toString()))
            .andExpect(jsonPath("$.vTipongco").value(DEFAULT_V_TIPONGCO.toString()))
            .andExpect(jsonPath("$.vEtapaneg").value(DEFAULT_V_ETAPANEG.toString()))
            .andExpect(jsonPath("$.tFecvigde").value(DEFAULT_T_FECVIGDE.toString()))
            .andExpect(jsonPath("$.tFecvigha").value(DEFAULT_T_FECVIGHA.toString()))
            .andExpect(jsonPath("$.vNumexpe").value(DEFAULT_V_NUMEXPE.toString()))
            .andExpect(jsonPath("$.vAuttrab").value(DEFAULT_V_AUTTRAB.toString()))
            .andExpect(jsonPath("$.vRucneg").value(DEFAULT_V_RUCNEG.toString()))
            .andExpect(jsonPath("$.vRegistro").value(DEFAULT_V_REGISTRO.toString()))
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
    public void getNonExistingNegocolect() throws Exception {
        // Get the negocolect
        restNegocolectMockMvc.perform(get("/api/negocolects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNegocolect() throws Exception {
        // Initialize the database
        negocolectRepository.saveAndFlush(negocolect);
        negocolectSearchRepository.save(negocolect);
        int databaseSizeBeforeUpdate = negocolectRepository.findAll().size();

        // Update the negocolect
        Negocolect updatedNegocolect = negocolectRepository.findOne(negocolect.getnCodngcol());
        updatedNegocolect
            .nCodngcol(UPDATED_N_CODNGCOL)
            .nCodfperf(UPDATED_N_CODFPERF)
            .vAmbsubje(UPDATED_V_AMBSUBJE)
            .vTipongco(UPDATED_V_TIPONGCO)
            .vEtapaneg(UPDATED_V_ETAPANEG)
            .tFecvigde(UPDATED_T_FECVIGDE)
            .tFecvigha(UPDATED_T_FECVIGHA)
            .vNumexpe(UPDATED_V_NUMEXPE)
            .vAuttrab(UPDATED_V_AUTTRAB)
            .vRucneg(UPDATED_V_RUCNEG)
            .vRegistro(UPDATED_V_REGISTRO)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restNegocolectMockMvc.perform(put("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNegocolect)))
            .andExpect(status().isOk());

        // Validate the Negocolect in the database
        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeUpdate);
        Negocolect testNegocolect = negocolectList.get(negocolectList.size() - 1);
        assertThat(testNegocolect.getnCodngcol()).isEqualTo(UPDATED_N_CODNGCOL);
        assertThat(testNegocolect.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testNegocolect.getvAmbsubje()).isEqualTo(UPDATED_V_AMBSUBJE);
        assertThat(testNegocolect.getvTipongco()).isEqualTo(UPDATED_V_TIPONGCO);
        assertThat(testNegocolect.getvEtapaneg()).isEqualTo(UPDATED_V_ETAPANEG);
        assertThat(testNegocolect.gettFecvigde()).isEqualTo(UPDATED_T_FECVIGDE);
        assertThat(testNegocolect.gettFecvigha()).isEqualTo(UPDATED_T_FECVIGHA);
        assertThat(testNegocolect.getvNumexpe()).isEqualTo(UPDATED_V_NUMEXPE);
        assertThat(testNegocolect.getvAuttrab()).isEqualTo(UPDATED_V_AUTTRAB);
        assertThat(testNegocolect.getvRucneg()).isEqualTo(UPDATED_V_RUCNEG);
        assertThat(testNegocolect.getvRegistro()).isEqualTo(UPDATED_V_REGISTRO);
        assertThat(testNegocolect.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testNegocolect.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testNegocolect.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testNegocolect.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testNegocolect.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testNegocolect.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testNegocolect.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Negocolect in Elasticsearch
        Negocolect negocolectEs = negocolectSearchRepository.findOne(testNegocolect.getnCodngcol());
        assertThat(negocolectEs).isEqualToComparingFieldByField(testNegocolect);
    }

    @Test
    @Transactional
    public void updateNonExistingNegocolect() throws Exception {
        int databaseSizeBeforeUpdate = negocolectRepository.findAll().size();

        // Create the Negocolect

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNegocolectMockMvc.perform(put("/api/negocolects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(negocolect)))
            .andExpect(status().isCreated());

        // Validate the Negocolect in the database
        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNegocolect() throws Exception {
        // Initialize the database
        negocolectRepository.saveAndFlush(negocolect);
        negocolectSearchRepository.save(negocolect);
        int databaseSizeBeforeDelete = negocolectRepository.findAll().size();

        // Get the negocolect
        restNegocolectMockMvc.perform(delete("/api/negocolects/{id}", negocolect.getnCodngcol())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean negocolectExistsInEs = negocolectSearchRepository.exists(negocolect.getnCodngcol());
        assertThat(negocolectExistsInEs).isFalse();

        // Validate the database is empty
        List<Negocolect> negocolectList = negocolectRepository.findAll();
        assertThat(negocolectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchNegocolect() throws Exception {
        // Initialize the database
        negocolectRepository.saveAndFlush(negocolect);
        negocolectSearchRepository.save(negocolect);

        // Search the negocolect
        restNegocolectMockMvc.perform(get("/api/_search/negocolects?query=id:" + negocolect.getnCodngcol()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(negocolect.getnCodngcol().intValue())))
            .andExpect(jsonPath("$.[*].nCodngcol").value(hasItem(DEFAULT_N_CODNGCOL)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vAmbsubje").value(hasItem(DEFAULT_V_AMBSUBJE.toString())))
            .andExpect(jsonPath("$.[*].vTipongco").value(hasItem(DEFAULT_V_TIPONGCO.toString())))
            .andExpect(jsonPath("$.[*].vEtapaneg").value(hasItem(DEFAULT_V_ETAPANEG.toString())))
            .andExpect(jsonPath("$.[*].tFecvigde").value(hasItem(DEFAULT_T_FECVIGDE.toString())))
            .andExpect(jsonPath("$.[*].tFecvigha").value(hasItem(DEFAULT_T_FECVIGHA.toString())))
            .andExpect(jsonPath("$.[*].vNumexpe").value(hasItem(DEFAULT_V_NUMEXPE.toString())))
            .andExpect(jsonPath("$.[*].vAuttrab").value(hasItem(DEFAULT_V_AUTTRAB.toString())))
            .andExpect(jsonPath("$.[*].vRucneg").value(hasItem(DEFAULT_V_RUCNEG.toString())))
            .andExpect(jsonPath("$.[*].vRegistro").value(hasItem(DEFAULT_V_REGISTRO.toString())))
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
        TestUtil.equalsVerifier(Negocolect.class);
        Negocolect negocolect1 = new Negocolect();
        negocolect1.setnCodngcol(1);
        Negocolect negocolect2 = new Negocolect();
        negocolect2.setnCodngcol(negocolect1.getnCodngcol());
        assertThat(negocolect1).isEqualTo(negocolect2);
        negocolect2.setnCodngcol(2);
        assertThat(negocolect1).isNotEqualTo(negocolect2);
        negocolect1.setnCodngcol(null);
        assertThat(negocolect1).isNotEqualTo(negocolect2);
    }
}
