package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Participa;
import pe.gob.trabajo.repository.ParticipaRepository;
import pe.gob.trabajo.repository.search.ParticipaSearchRepository;
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
 * Test class for the ParticipaResource REST controller.
 *
 * @see ParticipaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class ParticipaResourceIntTest {

    private static final Integer DEFAULT_N_CODPARTI = 1;
    private static final Integer UPDATED_N_CODPARTI = 2;

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final String DEFAULT_V_NUMDOCUM = "AAAAAAAAAA";
    private static final String UPDATED_V_NUMDOCUM = "BBBBBBBBBB";

    private static final String DEFAULT_V_RAZONSOC = "AAAAAAAAAA";
    private static final String UPDATED_V_RAZONSOC = "BBBBBBBBBB";

    private static final String DEFAULT_V_TIPODOC = "A";
    private static final String UPDATED_V_TIPODOC = "B";

    private static final String DEFAULT_V_TIPOPART = "A";
    private static final String UPDATED_V_TIPOPART = "B";

    private static final Double DEFAULT_N_PORCASIG = 1D;
    private static final Double UPDATED_N_PORCASIG = 2D;

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
    private ParticipaRepository participaRepository;

    @Autowired
    private ParticipaSearchRepository participaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParticipaMockMvc;

    private Participa participa;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParticipaResource participaResource = new ParticipaResource(participaRepository, participaSearchRepository);
        this.restParticipaMockMvc = MockMvcBuilders.standaloneSetup(participaResource)
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
    public static Participa createEntity(EntityManager em) {
        Participa participa = new Participa()
            .nCodparti(DEFAULT_N_CODPARTI)
            .nCodfperf(DEFAULT_N_CODFPERF)
            .vNumdocum(DEFAULT_V_NUMDOCUM)
            .vRazonsoc(DEFAULT_V_RAZONSOC)
            .vTipodoc(DEFAULT_V_TIPODOC)
            .vTipopart(DEFAULT_V_TIPOPART)
            .nPorcasig(DEFAULT_N_PORCASIG)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return participa;
    }

    @Before
    public void initTest() {
        participaSearchRepository.deleteAll();
        participa = createEntity(em);
    }

    @Test
    @Transactional
    public void createParticipa() throws Exception {
        int databaseSizeBeforeCreate = participaRepository.findAll().size();

        // Create the Participa
        restParticipaMockMvc.perform(post("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participa)))
            .andExpect(status().isCreated());

        // Validate the Participa in the database
        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeCreate + 1);
        Participa testParticipa = participaList.get(participaList.size() - 1);
        assertThat(testParticipa.getnCodparti()).isEqualTo(DEFAULT_N_CODPARTI);
        assertThat(testParticipa.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testParticipa.getvNumdocum()).isEqualTo(DEFAULT_V_NUMDOCUM);
        assertThat(testParticipa.getvRazonsoc()).isEqualTo(DEFAULT_V_RAZONSOC);
        assertThat(testParticipa.getvTipodoc()).isEqualTo(DEFAULT_V_TIPODOC);
        assertThat(testParticipa.getvTipopart()).isEqualTo(DEFAULT_V_TIPOPART);
        assertThat(testParticipa.getnPorcasig()).isEqualTo(DEFAULT_N_PORCASIG);
        assertThat(testParticipa.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testParticipa.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testParticipa.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testParticipa.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testParticipa.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testParticipa.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testParticipa.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Participa in Elasticsearch
        Participa participaEs = participaSearchRepository.findOne(testParticipa.getnCodparti());
        assertThat(participaEs).isEqualToComparingFieldByField(testParticipa);
    }

    @Test
    @Transactional
    public void createParticipaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = participaRepository.findAll().size();

        // Create the Participa with an existing ID
        participa.setnCodparti(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParticipaMockMvc.perform(post("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participa)))
            .andExpect(status().isBadRequest());

        // Validate the Participa in the database
        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodpartiIsRequired() throws Exception {
        int databaseSizeBeforeTest = participaRepository.findAll().size();
        // set the field null
        participa.setnCodparti(null);

        // Create the Participa, which fails.

        restParticipaMockMvc.perform(post("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participa)))
            .andExpect(status().isBadRequest());

        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknCodfperfIsRequired() throws Exception {
        int databaseSizeBeforeTest = participaRepository.findAll().size();
        // set the field null
        participa.setnCodfperf(null);

        // Create the Participa, which fails.

        restParticipaMockMvc.perform(post("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participa)))
            .andExpect(status().isBadRequest());

        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = participaRepository.findAll().size();
        // set the field null
        participa.setvUsuareg(null);

        // Create the Participa, which fails.

        restParticipaMockMvc.perform(post("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participa)))
            .andExpect(status().isBadRequest());

        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = participaRepository.findAll().size();
        // set the field null
        participa.settFecreg(null);

        // Create the Participa, which fails.

        restParticipaMockMvc.perform(post("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participa)))
            .andExpect(status().isBadRequest());

        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = participaRepository.findAll().size();
        // set the field null
        participa.setnFlgactivo(null);

        // Create the Participa, which fails.

        restParticipaMockMvc.perform(post("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participa)))
            .andExpect(status().isBadRequest());

        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = participaRepository.findAll().size();
        // set the field null
        participa.setnSedereg(null);

        // Create the Participa, which fails.

        restParticipaMockMvc.perform(post("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participa)))
            .andExpect(status().isBadRequest());

        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllParticipas() throws Exception {
        // Initialize the database
        participaRepository.saveAndFlush(participa);

        // Get all the participaList
        restParticipaMockMvc.perform(get("/api/participas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(participa.getnCodparti().intValue())))
            .andExpect(jsonPath("$.[*].nCodparti").value(hasItem(DEFAULT_N_CODPARTI)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vNumdocum").value(hasItem(DEFAULT_V_NUMDOCUM.toString())))
            .andExpect(jsonPath("$.[*].vRazonsoc").value(hasItem(DEFAULT_V_RAZONSOC.toString())))
            .andExpect(jsonPath("$.[*].vTipodoc").value(hasItem(DEFAULT_V_TIPODOC.toString())))
            .andExpect(jsonPath("$.[*].vTipopart").value(hasItem(DEFAULT_V_TIPOPART.toString())))
            .andExpect(jsonPath("$.[*].nPorcasig").value(hasItem(DEFAULT_N_PORCASIG.doubleValue())))
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
    public void getParticipa() throws Exception {
        // Initialize the database
        participaRepository.saveAndFlush(participa);

        // Get the participa
        restParticipaMockMvc.perform(get("/api/participas/{id}", participa.getnCodparti()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(participa.getnCodparti().intValue()))
            .andExpect(jsonPath("$.nCodparti").value(DEFAULT_N_CODPARTI))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.vNumdocum").value(DEFAULT_V_NUMDOCUM.toString()))
            .andExpect(jsonPath("$.vRazonsoc").value(DEFAULT_V_RAZONSOC.toString()))
            .andExpect(jsonPath("$.vTipodoc").value(DEFAULT_V_TIPODOC.toString()))
            .andExpect(jsonPath("$.vTipopart").value(DEFAULT_V_TIPOPART.toString()))
            .andExpect(jsonPath("$.nPorcasig").value(DEFAULT_N_PORCASIG.doubleValue()))
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
    public void getNonExistingParticipa() throws Exception {
        // Get the participa
        restParticipaMockMvc.perform(get("/api/participas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParticipa() throws Exception {
        // Initialize the database
        participaRepository.saveAndFlush(participa);
        participaSearchRepository.save(participa);
        int databaseSizeBeforeUpdate = participaRepository.findAll().size();

        // Update the participa
        Participa updatedParticipa = participaRepository.findOne(participa.getnCodparti());
        updatedParticipa
            .nCodparti(UPDATED_N_CODPARTI)
            .nCodfperf(UPDATED_N_CODFPERF)
            .vNumdocum(UPDATED_V_NUMDOCUM)
            .vRazonsoc(UPDATED_V_RAZONSOC)
            .vTipodoc(UPDATED_V_TIPODOC)
            .vTipopart(UPDATED_V_TIPOPART)
            .nPorcasig(UPDATED_N_PORCASIG)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restParticipaMockMvc.perform(put("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParticipa)))
            .andExpect(status().isOk());

        // Validate the Participa in the database
        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeUpdate);
        Participa testParticipa = participaList.get(participaList.size() - 1);
        assertThat(testParticipa.getnCodparti()).isEqualTo(UPDATED_N_CODPARTI);
        assertThat(testParticipa.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testParticipa.getvNumdocum()).isEqualTo(UPDATED_V_NUMDOCUM);
        assertThat(testParticipa.getvRazonsoc()).isEqualTo(UPDATED_V_RAZONSOC);
        assertThat(testParticipa.getvTipodoc()).isEqualTo(UPDATED_V_TIPODOC);
        assertThat(testParticipa.getvTipopart()).isEqualTo(UPDATED_V_TIPOPART);
        assertThat(testParticipa.getnPorcasig()).isEqualTo(UPDATED_N_PORCASIG);
        assertThat(testParticipa.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testParticipa.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testParticipa.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testParticipa.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testParticipa.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testParticipa.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testParticipa.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Participa in Elasticsearch
        Participa participaEs = participaSearchRepository.findOne(testParticipa.getnCodparti());
        assertThat(participaEs).isEqualToComparingFieldByField(testParticipa);
    }

    @Test
    @Transactional
    public void updateNonExistingParticipa() throws Exception {
        int databaseSizeBeforeUpdate = participaRepository.findAll().size();

        // Create the Participa

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restParticipaMockMvc.perform(put("/api/participas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participa)))
            .andExpect(status().isCreated());

        // Validate the Participa in the database
        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteParticipa() throws Exception {
        // Initialize the database
        participaRepository.saveAndFlush(participa);
        participaSearchRepository.save(participa);
        int databaseSizeBeforeDelete = participaRepository.findAll().size();

        // Get the participa
        restParticipaMockMvc.perform(delete("/api/participas/{id}", participa.getnCodparti())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean participaExistsInEs = participaSearchRepository.exists(participa.getnCodparti());
        assertThat(participaExistsInEs).isFalse();

        // Validate the database is empty
        List<Participa> participaList = participaRepository.findAll();
        assertThat(participaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchParticipa() throws Exception {
        // Initialize the database
        participaRepository.saveAndFlush(participa);
        participaSearchRepository.save(participa);

        // Search the participa
        restParticipaMockMvc.perform(get("/api/_search/participas?query=id:" + participa.getnCodparti()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(participa.getnCodparti().intValue())))
            .andExpect(jsonPath("$.[*].nCodparti").value(hasItem(DEFAULT_N_CODPARTI)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vNumdocum").value(hasItem(DEFAULT_V_NUMDOCUM.toString())))
            .andExpect(jsonPath("$.[*].vRazonsoc").value(hasItem(DEFAULT_V_RAZONSOC.toString())))
            .andExpect(jsonPath("$.[*].vTipodoc").value(hasItem(DEFAULT_V_TIPODOC.toString())))
            .andExpect(jsonPath("$.[*].vTipopart").value(hasItem(DEFAULT_V_TIPOPART.toString())))
            .andExpect(jsonPath("$.[*].nPorcasig").value(hasItem(DEFAULT_N_PORCASIG.doubleValue())))
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
        TestUtil.equalsVerifier(Participa.class);
        Participa participa1 = new Participa();
        participa1.setnCodparti(1);
        Participa participa2 = new Participa();
        participa2.setnCodparti(participa1.getnCodparti());
        assertThat(participa1).isEqualTo(participa2);
        participa2.setnCodparti(2);
        assertThat(participa1).isNotEqualTo(participa2);
        participa1.setnCodparti(null);
        assertThat(participa1).isNotEqualTo(participa2);
    }
}
