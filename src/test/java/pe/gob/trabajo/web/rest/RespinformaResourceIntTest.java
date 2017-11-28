package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Respinforma;
import pe.gob.trabajo.repository.RespinformaRepository;
import pe.gob.trabajo.repository.search.RespinformaSearchRepository;
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
 * Test class for the RespinformaResource REST controller.
 *
 * @see RespinformaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class RespinformaResourceIntTest {

    private static final Integer DEFAULT_N_CODRINFO = 1;
    private static final Integer UPDATED_N_CODRINFO = 2;

    private static final Integer DEFAULT_N_CODFPERF = 1;
    private static final Integer UPDATED_N_CODFPERF = 2;

    private static final String DEFAULT_V_TIPORES = "A";
    private static final String UPDATED_V_TIPORES = "B";

    private static final String DEFAULT_V_NUMDOCUM = "AAAAAAAAAA";
    private static final String UPDATED_V_NUMDOCUM = "BBBBBBBBBB";

    private static final String DEFAULT_V_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_V_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_V_CARGORES = "AAAAAAAAAA";
    private static final String UPDATED_V_CARGORES = "BBBBBBBBBB";

    private static final String DEFAULT_V_EMAILRES = "AAAAAAAAAA";
    private static final String UPDATED_V_EMAILRES = "BBBBBBBBBB";

    private static final String DEFAULT_V_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_V_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_V_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_V_CELULAR = "BBBBBBBBBB";

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
    private RespinformaRepository respinformaRepository;

    @Autowired
    private RespinformaSearchRepository respinformaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRespinformaMockMvc;

    private Respinforma respinforma;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RespinformaResource respinformaResource = new RespinformaResource(respinformaRepository, respinformaSearchRepository);
        this.restRespinformaMockMvc = MockMvcBuilders.standaloneSetup(respinformaResource)
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
    public static Respinforma createEntity(EntityManager em) {
        Respinforma respinforma = new Respinforma()
            .nCodrinfo(DEFAULT_N_CODRINFO)
            .nCodfperf(DEFAULT_N_CODFPERF)
            .vTipores(DEFAULT_V_TIPORES)
            .vNumdocum(DEFAULT_V_NUMDOCUM)
            .vNombre(DEFAULT_V_NOMBRE)
            .vCargores(DEFAULT_V_CARGORES)
            .vEmailres(DEFAULT_V_EMAILRES)
            .vTelefono(DEFAULT_V_TELEFONO)
            .vCelular(DEFAULT_V_CELULAR)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return respinforma;
    }

    @Before
    public void initTest() {
        respinformaSearchRepository.deleteAll();
        respinforma = createEntity(em);
    }

    @Test
    @Transactional
    public void createRespinforma() throws Exception {
        int databaseSizeBeforeCreate = respinformaRepository.findAll().size();

        // Create the Respinforma
        restRespinformaMockMvc.perform(post("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respinforma)))
            .andExpect(status().isCreated());

        // Validate the Respinforma in the database
        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeCreate + 1);
        Respinforma testRespinforma = respinformaList.get(respinformaList.size() - 1);
        assertThat(testRespinforma.getnCodrinfo()).isEqualTo(DEFAULT_N_CODRINFO);
        assertThat(testRespinforma.getnCodfperf()).isEqualTo(DEFAULT_N_CODFPERF);
        assertThat(testRespinforma.getvTipores()).isEqualTo(DEFAULT_V_TIPORES);
        assertThat(testRespinforma.getvNumdocum()).isEqualTo(DEFAULT_V_NUMDOCUM);
        assertThat(testRespinforma.getvNombre()).isEqualTo(DEFAULT_V_NOMBRE);
        assertThat(testRespinforma.getvCargores()).isEqualTo(DEFAULT_V_CARGORES);
        assertThat(testRespinforma.getvEmailres()).isEqualTo(DEFAULT_V_EMAILRES);
        assertThat(testRespinforma.getvTelefono()).isEqualTo(DEFAULT_V_TELEFONO);
        assertThat(testRespinforma.getvCelular()).isEqualTo(DEFAULT_V_CELULAR);
        assertThat(testRespinforma.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testRespinforma.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testRespinforma.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testRespinforma.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testRespinforma.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testRespinforma.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testRespinforma.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Respinforma in Elasticsearch
        Respinforma respinformaEs = respinformaSearchRepository.findOne(testRespinforma.getnCodrinfo());
        assertThat(respinformaEs).isEqualToComparingFieldByField(testRespinforma);
    }

    @Test
    @Transactional
    public void createRespinformaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = respinformaRepository.findAll().size();

        // Create the Respinforma with an existing ID
        respinforma.setnCodrinfo(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRespinformaMockMvc.perform(post("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respinforma)))
            .andExpect(status().isBadRequest());

        // Validate the Respinforma in the database
        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodrinfoIsRequired() throws Exception {
        int databaseSizeBeforeTest = respinformaRepository.findAll().size();
        // set the field null
        respinforma.setnCodrinfo(null);

        // Create the Respinforma, which fails.

        restRespinformaMockMvc.perform(post("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respinforma)))
            .andExpect(status().isBadRequest());

        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknCodfperfIsRequired() throws Exception {
        int databaseSizeBeforeTest = respinformaRepository.findAll().size();
        // set the field null
        respinforma.setnCodfperf(null);

        // Create the Respinforma, which fails.

        restRespinformaMockMvc.perform(post("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respinforma)))
            .andExpect(status().isBadRequest());

        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = respinformaRepository.findAll().size();
        // set the field null
        respinforma.setvUsuareg(null);

        // Create the Respinforma, which fails.

        restRespinformaMockMvc.perform(post("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respinforma)))
            .andExpect(status().isBadRequest());

        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = respinformaRepository.findAll().size();
        // set the field null
        respinforma.settFecreg(null);

        // Create the Respinforma, which fails.

        restRespinformaMockMvc.perform(post("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respinforma)))
            .andExpect(status().isBadRequest());

        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = respinformaRepository.findAll().size();
        // set the field null
        respinforma.setnFlgactivo(null);

        // Create the Respinforma, which fails.

        restRespinformaMockMvc.perform(post("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respinforma)))
            .andExpect(status().isBadRequest());

        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = respinformaRepository.findAll().size();
        // set the field null
        respinforma.setnSedereg(null);

        // Create the Respinforma, which fails.

        restRespinformaMockMvc.perform(post("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respinforma)))
            .andExpect(status().isBadRequest());

        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRespinformas() throws Exception {
        // Initialize the database
        respinformaRepository.saveAndFlush(respinforma);

        // Get all the respinformaList
        restRespinformaMockMvc.perform(get("/api/respinformas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(respinforma.getnCodrinfo().intValue())))
            .andExpect(jsonPath("$.[*].nCodrinfo").value(hasItem(DEFAULT_N_CODRINFO)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vTipores").value(hasItem(DEFAULT_V_TIPORES.toString())))
            .andExpect(jsonPath("$.[*].vNumdocum").value(hasItem(DEFAULT_V_NUMDOCUM.toString())))
            .andExpect(jsonPath("$.[*].vNombre").value(hasItem(DEFAULT_V_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].vCargores").value(hasItem(DEFAULT_V_CARGORES.toString())))
            .andExpect(jsonPath("$.[*].vEmailres").value(hasItem(DEFAULT_V_EMAILRES.toString())))
            .andExpect(jsonPath("$.[*].vTelefono").value(hasItem(DEFAULT_V_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].vCelular").value(hasItem(DEFAULT_V_CELULAR.toString())))
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
    public void getRespinforma() throws Exception {
        // Initialize the database
        respinformaRepository.saveAndFlush(respinforma);

        // Get the respinforma
        restRespinformaMockMvc.perform(get("/api/respinformas/{id}", respinforma.getnCodrinfo()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(respinforma.getnCodrinfo().intValue()))
            .andExpect(jsonPath("$.nCodrinfo").value(DEFAULT_N_CODRINFO))
            .andExpect(jsonPath("$.nCodfperf").value(DEFAULT_N_CODFPERF))
            .andExpect(jsonPath("$.vTipores").value(DEFAULT_V_TIPORES.toString()))
            .andExpect(jsonPath("$.vNumdocum").value(DEFAULT_V_NUMDOCUM.toString()))
            .andExpect(jsonPath("$.vNombre").value(DEFAULT_V_NOMBRE.toString()))
            .andExpect(jsonPath("$.vCargores").value(DEFAULT_V_CARGORES.toString()))
            .andExpect(jsonPath("$.vEmailres").value(DEFAULT_V_EMAILRES.toString()))
            .andExpect(jsonPath("$.vTelefono").value(DEFAULT_V_TELEFONO.toString()))
            .andExpect(jsonPath("$.vCelular").value(DEFAULT_V_CELULAR.toString()))
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
    public void getNonExistingRespinforma() throws Exception {
        // Get the respinforma
        restRespinformaMockMvc.perform(get("/api/respinformas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRespinforma() throws Exception {
        // Initialize the database
        respinformaRepository.saveAndFlush(respinforma);
        respinformaSearchRepository.save(respinforma);
        int databaseSizeBeforeUpdate = respinformaRepository.findAll().size();

        // Update the respinforma
        Respinforma updatedRespinforma = respinformaRepository.findOne(respinforma.getnCodrinfo());
        updatedRespinforma
            .nCodrinfo(UPDATED_N_CODRINFO)
            .nCodfperf(UPDATED_N_CODFPERF)
            .vTipores(UPDATED_V_TIPORES)
            .vNumdocum(UPDATED_V_NUMDOCUM)
            .vNombre(UPDATED_V_NOMBRE)
            .vCargores(UPDATED_V_CARGORES)
            .vEmailres(UPDATED_V_EMAILRES)
            .vTelefono(UPDATED_V_TELEFONO)
            .vCelular(UPDATED_V_CELULAR)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restRespinformaMockMvc.perform(put("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRespinforma)))
            .andExpect(status().isOk());

        // Validate the Respinforma in the database
        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeUpdate);
        Respinforma testRespinforma = respinformaList.get(respinformaList.size() - 1);
        assertThat(testRespinforma.getnCodrinfo()).isEqualTo(UPDATED_N_CODRINFO);
        assertThat(testRespinforma.getnCodfperf()).isEqualTo(UPDATED_N_CODFPERF);
        assertThat(testRespinforma.getvTipores()).isEqualTo(UPDATED_V_TIPORES);
        assertThat(testRespinforma.getvNumdocum()).isEqualTo(UPDATED_V_NUMDOCUM);
        assertThat(testRespinforma.getvNombre()).isEqualTo(UPDATED_V_NOMBRE);
        assertThat(testRespinforma.getvCargores()).isEqualTo(UPDATED_V_CARGORES);
        assertThat(testRespinforma.getvEmailres()).isEqualTo(UPDATED_V_EMAILRES);
        assertThat(testRespinforma.getvTelefono()).isEqualTo(UPDATED_V_TELEFONO);
        assertThat(testRespinforma.getvCelular()).isEqualTo(UPDATED_V_CELULAR);
        assertThat(testRespinforma.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testRespinforma.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testRespinforma.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testRespinforma.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testRespinforma.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testRespinforma.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testRespinforma.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Respinforma in Elasticsearch
        Respinforma respinformaEs = respinformaSearchRepository.findOne(testRespinforma.getnCodrinfo());
        assertThat(respinformaEs).isEqualToComparingFieldByField(testRespinforma);
    }

    @Test
    @Transactional
    public void updateNonExistingRespinforma() throws Exception {
        int databaseSizeBeforeUpdate = respinformaRepository.findAll().size();

        // Create the Respinforma

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRespinformaMockMvc.perform(put("/api/respinformas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(respinforma)))
            .andExpect(status().isCreated());

        // Validate the Respinforma in the database
        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRespinforma() throws Exception {
        // Initialize the database
        respinformaRepository.saveAndFlush(respinforma);
        respinformaSearchRepository.save(respinforma);
        int databaseSizeBeforeDelete = respinformaRepository.findAll().size();

        // Get the respinforma
        restRespinformaMockMvc.perform(delete("/api/respinformas/{id}", respinforma.getnCodrinfo())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean respinformaExistsInEs = respinformaSearchRepository.exists(respinforma.getnCodrinfo());
        assertThat(respinformaExistsInEs).isFalse();

        // Validate the database is empty
        List<Respinforma> respinformaList = respinformaRepository.findAll();
        assertThat(respinformaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRespinforma() throws Exception {
        // Initialize the database
        respinformaRepository.saveAndFlush(respinforma);
        respinformaSearchRepository.save(respinforma);

        // Search the respinforma
        restRespinformaMockMvc.perform(get("/api/_search/respinformas?query=id:" + respinforma.getnCodrinfo()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(respinforma.getnCodrinfo().intValue())))
            .andExpect(jsonPath("$.[*].nCodrinfo").value(hasItem(DEFAULT_N_CODRINFO)))
            .andExpect(jsonPath("$.[*].nCodfperf").value(hasItem(DEFAULT_N_CODFPERF)))
            .andExpect(jsonPath("$.[*].vTipores").value(hasItem(DEFAULT_V_TIPORES.toString())))
            .andExpect(jsonPath("$.[*].vNumdocum").value(hasItem(DEFAULT_V_NUMDOCUM.toString())))
            .andExpect(jsonPath("$.[*].vNombre").value(hasItem(DEFAULT_V_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].vCargores").value(hasItem(DEFAULT_V_CARGORES.toString())))
            .andExpect(jsonPath("$.[*].vEmailres").value(hasItem(DEFAULT_V_EMAILRES.toString())))
            .andExpect(jsonPath("$.[*].vTelefono").value(hasItem(DEFAULT_V_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].vCelular").value(hasItem(DEFAULT_V_CELULAR.toString())))
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
        TestUtil.equalsVerifier(Respinforma.class);
        Respinforma respinforma1 = new Respinforma();
        respinforma1.setnCodrinfo(1);
        Respinforma respinforma2 = new Respinforma();
        respinforma2.setnCodrinfo(respinforma1.getnCodrinfo());
        assertThat(respinforma1).isEqualTo(respinforma2);
        respinforma2.setnCodrinfo(2);
        assertThat(respinforma1).isNotEqualTo(respinforma2);
        respinforma1.setnCodrinfo(null);
        assertThat(respinforma1).isNotEqualTo(respinforma2);
    }
}
