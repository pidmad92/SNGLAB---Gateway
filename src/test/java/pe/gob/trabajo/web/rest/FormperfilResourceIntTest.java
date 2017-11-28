package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Formperfil;
import pe.gob.trabajo.repository.FormperfilRepository;
import pe.gob.trabajo.repository.search.FormperfilSearchRepository;
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
 * Test class for the FormperfilResource REST controller.
 *
 * @see FormperfilResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class FormperfilResourceIntTest {

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final String DEFAULT_V_NOMCOMER = "AAAAAAAAAA";
    private static final String UPDATED_V_NOMCOMER = "BBBBBBBBBB";

    private static final String DEFAULT_V_DESEMPLE = "AAAAAAAAAA";
    private static final String UPDATED_V_DESEMPLE = "BBBBBBBBBB";

    private static final String DEFAULT_V_CODCIIU = "AAAAAAAAAA";
    private static final String UPDATED_V_CODCIIU = "BBBBBBBBBB";

    private static final String DEFAULT_V_PARTREG = "AAAAAAAAAA";
    private static final String UPDATED_V_PARTREG = "BBBBBBBBBB";

    private static final String DEFAULT_V_GRUECONO = "AAAAAAAAAA";
    private static final String UPDATED_V_GRUECONO = "BBBBBBBBBB";

    private static final String DEFAULT_V_SECTOR = "AAAAAAAAAA";
    private static final String UPDATED_V_SECTOR = "BBBBBBBBBB";

    private static final String DEFAULT_V_PLANCONT = "AAAAAAAAAA";
    private static final String UPDATED_V_PLANCONT = "BBBBBBBBBB";

    private static final String DEFAULT_V_REGLABO = "AAAAAAAAAA";
    private static final String UPDATED_V_REGLABO = "BBBBBBBBBB";

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
    private FormperfilRepository formperfilRepository;

    @Autowired
    private FormperfilSearchRepository formperfilSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFormperfilMockMvc;

    private Formperfil formperfil;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormperfilResource formperfilResource = new FormperfilResource(formperfilRepository, formperfilSearchRepository);
        this.restFormperfilMockMvc = MockMvcBuilders.standaloneSetup(formperfilResource)
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
    public static Formperfil createEntity(EntityManager em) {
        Formperfil formperfil = new Formperfil()
            .nCodfperf(DEFAULT_N_CODFPERF)
            .vNomcomer(DEFAULT_V_NOMCOMER)
            .vDesemple(DEFAULT_V_DESEMPLE)
            .vCodciiu(DEFAULT_V_CODCIIU)
            .vPartreg(DEFAULT_V_PARTREG)
            .vGruecono(DEFAULT_V_GRUECONO)
            .vSector(DEFAULT_V_SECTOR)
            .vPlancont(DEFAULT_V_PLANCONT)
            .vReglabo(DEFAULT_V_REGLABO)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return formperfil;
    }

    @Before
    public void initTest() {
        formperfilSearchRepository.deleteAll();
        formperfil = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormperfil() throws Exception {
        int databaseSizeBeforeCreate = formperfilRepository.findAll().size();

        // Create the Formperfil
        restFormperfilMockMvc.perform(post("/api/formperfils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formperfil)))
            .andExpect(status().isCreated());

        // Validate the Formperfil in the database
        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeCreate + 1);
        Formperfil testFormperfil = formperfilList.get(formperfilList.size() - 1);
        assertThat(testFormperfil.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testFormperfil.getvNomcomer()).isEqualTo(DEFAULT_V_NOMCOMER);
        assertThat(testFormperfil.getvDesemple()).isEqualTo(DEFAULT_V_DESEMPLE);
        assertThat(testFormperfil.getvCodciiu()).isEqualTo(DEFAULT_V_CODCIIU);
        assertThat(testFormperfil.getvPartreg()).isEqualTo(DEFAULT_V_PARTREG);
        assertThat(testFormperfil.getvGruecono()).isEqualTo(DEFAULT_V_GRUECONO);
        assertThat(testFormperfil.getvSector()).isEqualTo(DEFAULT_V_SECTOR);
        assertThat(testFormperfil.getvPlancont()).isEqualTo(DEFAULT_V_PLANCONT);
        assertThat(testFormperfil.getvReglabo()).isEqualTo(DEFAULT_V_REGLABO);
        assertThat(testFormperfil.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testFormperfil.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testFormperfil.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testFormperfil.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testFormperfil.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testFormperfil.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testFormperfil.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Formperfil in Elasticsearch
        Formperfil formperfilEs = formperfilSearchRepository.findOne(testFormperfil.getnCodfperf());
        assertThat(formperfilEs).isEqualToComparingFieldByField(testFormperfil);
    }

    @Test
    @Transactional
    public void createFormperfilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formperfilRepository.findAll().size();

        // Create the Formperfil with an existing ID
        formperfil.setnCodfperf(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormperfilMockMvc.perform(post("/api/formperfils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formperfil)))
            .andExpect(status().isBadRequest());

        // Validate the Formperfil in the database
        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodfperfIsRequired() throws Exception {
        int databaseSizeBeforeTest = formperfilRepository.findAll().size();
        // set the field null
        formperfil.setnCodfperf(null);

        // Create the Formperfil, which fails.

        restFormperfilMockMvc.perform(post("/api/formperfils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formperfil)))
            .andExpect(status().isBadRequest());

        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = formperfilRepository.findAll().size();
        // set the field null
        formperfil.setvUsuareg(null);

        // Create the Formperfil, which fails.

        restFormperfilMockMvc.perform(post("/api/formperfils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formperfil)))
            .andExpect(status().isBadRequest());

        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = formperfilRepository.findAll().size();
        // set the field null
        formperfil.settFecreg(null);

        // Create the Formperfil, which fails.

        restFormperfilMockMvc.perform(post("/api/formperfils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formperfil)))
            .andExpect(status().isBadRequest());

        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = formperfilRepository.findAll().size();
        // set the field null
        formperfil.setnFlgactivo(null);

        // Create the Formperfil, which fails.

        restFormperfilMockMvc.perform(post("/api/formperfils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formperfil)))
            .andExpect(status().isBadRequest());

        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = formperfilRepository.findAll().size();
        // set the field null
        formperfil.setnSedereg(null);

        // Create the Formperfil, which fails.

        restFormperfilMockMvc.perform(post("/api/formperfils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formperfil)))
            .andExpect(status().isBadRequest());

        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFormperfils() throws Exception {
        // Initialize the database
        formperfilRepository.saveAndFlush(formperfil);

        // Get all the formperfilList
        restFormperfilMockMvc.perform(get("/api/formperfils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(formperfil.getnCodfperf().intValue())))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vNomcomer").value(hasItem(DEFAULT_V_NOMCOMER.toString())))
            .andExpect(jsonPath("$.[*].vDesemple").value(hasItem(DEFAULT_V_DESEMPLE.toString())))
            .andExpect(jsonPath("$.[*].vCodciiu").value(hasItem(DEFAULT_V_CODCIIU.toString())))
            .andExpect(jsonPath("$.[*].vPartreg").value(hasItem(DEFAULT_V_PARTREG.toString())))
            .andExpect(jsonPath("$.[*].vGruecono").value(hasItem(DEFAULT_V_GRUECONO.toString())))
            .andExpect(jsonPath("$.[*].vSector").value(hasItem(DEFAULT_V_SECTOR.toString())))
            .andExpect(jsonPath("$.[*].vPlancont").value(hasItem(DEFAULT_V_PLANCONT.toString())))
            .andExpect(jsonPath("$.[*].vReglabo").value(hasItem(DEFAULT_V_REGLABO.toString())))
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
    public void getFormperfil() throws Exception {
        // Initialize the database
        formperfilRepository.saveAndFlush(formperfil);

        // Get the formperfil
        restFormperfilMockMvc.perform(get("/api/formperfils/{id}", formperfil.getnCodfperf()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(formperfil.getnCodfperf().intValue()))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.vNomcomer").value(DEFAULT_V_NOMCOMER.toString()))
            .andExpect(jsonPath("$.vDesemple").value(DEFAULT_V_DESEMPLE.toString()))
            .andExpect(jsonPath("$.vCodciiu").value(DEFAULT_V_CODCIIU.toString()))
            .andExpect(jsonPath("$.vPartreg").value(DEFAULT_V_PARTREG.toString()))
            .andExpect(jsonPath("$.vGruecono").value(DEFAULT_V_GRUECONO.toString()))
            .andExpect(jsonPath("$.vSector").value(DEFAULT_V_SECTOR.toString()))
            .andExpect(jsonPath("$.vPlancont").value(DEFAULT_V_PLANCONT.toString()))
            .andExpect(jsonPath("$.vReglabo").value(DEFAULT_V_REGLABO.toString()))
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
    public void getNonExistingFormperfil() throws Exception {
        // Get the formperfil
        restFormperfilMockMvc.perform(get("/api/formperfils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormperfil() throws Exception {
        // Initialize the database
        formperfilRepository.saveAndFlush(formperfil);
        formperfilSearchRepository.save(formperfil);
        int databaseSizeBeforeUpdate = formperfilRepository.findAll().size();

        // Update the formperfil
        Formperfil updatedFormperfil = formperfilRepository.findOne(formperfil.getnCodfperf());
        updatedFormperfil
            .nCodfperf(UPDATED_N_CODFPERF)
            .vNomcomer(UPDATED_V_NOMCOMER)
            .vDesemple(UPDATED_V_DESEMPLE)
            .vCodciiu(UPDATED_V_CODCIIU)
            .vPartreg(UPDATED_V_PARTREG)
            .vGruecono(UPDATED_V_GRUECONO)
            .vSector(UPDATED_V_SECTOR)
            .vPlancont(UPDATED_V_PLANCONT)
            .vReglabo(UPDATED_V_REGLABO)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restFormperfilMockMvc.perform(put("/api/formperfils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormperfil)))
            .andExpect(status().isOk());

        // Validate the Formperfil in the database
        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeUpdate);
        Formperfil testFormperfil = formperfilList.get(formperfilList.size() - 1);
        assertThat(testFormperfil.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testFormperfil.getvNomcomer()).isEqualTo(UPDATED_V_NOMCOMER);
        assertThat(testFormperfil.getvDesemple()).isEqualTo(UPDATED_V_DESEMPLE);
        assertThat(testFormperfil.getvCodciiu()).isEqualTo(UPDATED_V_CODCIIU);
        assertThat(testFormperfil.getvPartreg()).isEqualTo(UPDATED_V_PARTREG);
        assertThat(testFormperfil.getvGruecono()).isEqualTo(UPDATED_V_GRUECONO);
        assertThat(testFormperfil.getvSector()).isEqualTo(UPDATED_V_SECTOR);
        assertThat(testFormperfil.getvPlancont()).isEqualTo(UPDATED_V_PLANCONT);
        assertThat(testFormperfil.getvReglabo()).isEqualTo(UPDATED_V_REGLABO);
        assertThat(testFormperfil.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testFormperfil.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testFormperfil.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testFormperfil.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testFormperfil.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testFormperfil.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testFormperfil.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Formperfil in Elasticsearch
        Formperfil formperfilEs = formperfilSearchRepository.findOne(testFormperfil.getnCodfperf());
        assertThat(formperfilEs).isEqualToComparingFieldByField(testFormperfil);
    }

    @Test
    @Transactional
    public void updateNonExistingFormperfil() throws Exception {
        int databaseSizeBeforeUpdate = formperfilRepository.findAll().size();

        // Create the Formperfil

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFormperfilMockMvc.perform(put("/api/formperfils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formperfil)))
            .andExpect(status().isCreated());

        // Validate the Formperfil in the database
        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFormperfil() throws Exception {
        // Initialize the database
        formperfilRepository.saveAndFlush(formperfil);
        formperfilSearchRepository.save(formperfil);
        int databaseSizeBeforeDelete = formperfilRepository.findAll().size();

        // Get the formperfil
        restFormperfilMockMvc.perform(delete("/api/formperfils/{id}", formperfil.getnCodfperf())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean formperfilExistsInEs = formperfilSearchRepository.exists(formperfil.getnCodfperf());
        assertThat(formperfilExistsInEs).isFalse();

        // Validate the database is empty
        List<Formperfil> formperfilList = formperfilRepository.findAll();
        assertThat(formperfilList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFormperfil() throws Exception {
        // Initialize the database
        formperfilRepository.saveAndFlush(formperfil);
        formperfilSearchRepository.save(formperfil);

        // Search the formperfil
        restFormperfilMockMvc.perform(get("/api/_search/formperfils?query=id:" + formperfil.getnCodfperf()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(formperfil.getnCodfperf().intValue())))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vNomcomer").value(hasItem(DEFAULT_V_NOMCOMER.toString())))
            .andExpect(jsonPath("$.[*].vDesemple").value(hasItem(DEFAULT_V_DESEMPLE.toString())))
            .andExpect(jsonPath("$.[*].vCodciiu").value(hasItem(DEFAULT_V_CODCIIU.toString())))
            .andExpect(jsonPath("$.[*].vPartreg").value(hasItem(DEFAULT_V_PARTREG.toString())))
            .andExpect(jsonPath("$.[*].vGruecono").value(hasItem(DEFAULT_V_GRUECONO.toString())))
            .andExpect(jsonPath("$.[*].vSector").value(hasItem(DEFAULT_V_SECTOR.toString())))
            .andExpect(jsonPath("$.[*].vPlancont").value(hasItem(DEFAULT_V_PLANCONT.toString())))
            .andExpect(jsonPath("$.[*].vReglabo").value(hasItem(DEFAULT_V_REGLABO.toString())))
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
        TestUtil.equalsVerifier(Formperfil.class);
        Formperfil formperfil1 = new Formperfil();
        formperfil1.setnCodfperf(1);
        Formperfil formperfil2 = new Formperfil();
        formperfil2.setnCodfperf(formperfil1.getnCodfperf());
        assertThat(formperfil1).isEqualTo(formperfil2);
        formperfil2.setnCodfperf(2);
        assertThat(formperfil1).isNotEqualTo(formperfil2);
        formperfil1.setnCodfperf(null);
        assertThat(formperfil1).isNotEqualTo(formperfil2);
    }
}
