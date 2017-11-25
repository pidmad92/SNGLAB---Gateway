package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Solicitud;
import pe.gob.trabajo.repository.SolicitudRepository;
import pe.gob.trabajo.repository.search.SolicitudSearchRepository;
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
 * Test class for the SolicitudResource REST controller.
 *
 * @see SolicitudResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class SolicitudResourceIntTest {

    private static final Integer DEFAULT_N_CODSOLIC = 1;
    private static final Integer UPDATED_N_CODSOLIC = 2;

    private static final Integer DEFAULT_N_CODREPRE = 1;
    private static final Integer UPDATED_N_CODREPRE = 2;

    private static final Instant DEFAULT_T_FECSOLIC = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_T_FECSOLIC = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_T_FECENVIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_T_FECENVIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_V_FLGEST = "A";
    private static final String UPDATED_V_FLGEST = "B";

    private static final String DEFAULT_V_SOLICITA = "AAAAAAAAAA";
    private static final String UPDATED_V_SOLICITA = "BBBBBBBBBB";

    private static final String DEFAULT_V_EMPLEADOR = "AAAAAAAAAA";
    private static final String UPDATED_V_EMPLEADOR = "BBBBBBBBBB";

    private static final String DEFAULT_V_SINDICATO = "AAAAAAAAAA";
    private static final String UPDATED_V_SINDICATO = "BBBBBBBBBB";

    private static final String DEFAULT_V_ARBITRO = "AAAAAAAAAA";
    private static final String UPDATED_V_ARBITRO = "BBBBBBBBBB";

    private static final String DEFAULT_V_CODSOLIC = "AAAAAAAAAA";
    private static final String UPDATED_V_CODSOLIC = "BBBBBBBBBB";

    private static final String DEFAULT_V_CODEMPLE = "AAAAAAAAAA";
    private static final String UPDATED_V_CODEMPLE = "BBBBBBBBBB";

    private static final String DEFAULT_V_CODSINDI = "AAAAAAAAAA";
    private static final String UPDATED_V_CODSINDI = "BBBBBBBBBB";

    private static final String DEFAULT_V_CODARBIT = "AAAAAAAAAA";
    private static final String UPDATED_V_CODARBIT = "BBBBBBBBBB";

    private static final Instant DEFAULT_T_FECVIGDE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_T_FECVIGDE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_T_FECVIGHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_T_FECVIGHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_V_VOUCHER = "AAAAAAAAAA";
    private static final String UPDATED_V_VOUCHER = "BBBBBBBBBB";

    private static final String DEFAULT_V_REGISTRO = "AAAAAAAAAA";
    private static final String UPDATED_V_REGISTRO = "BBBBBBBBBB";

    private static final String DEFAULT_V_RUCSOL = "AAAAAAAAAA";
    private static final String UPDATED_V_RUCSOL = "BBBBBBBBBB";

    private static final String DEFAULT_V_CODUSU = "AAAAAAAAAA";
    private static final String UPDATED_V_CODUSU = "BBBBBBBBBB";

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
    private SolicitudRepository solicitudRepository;

    @Autowired
    private SolicitudSearchRepository solicitudSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSolicitudMockMvc;

    private Solicitud solicitud;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolicitudResource solicitudResource = new SolicitudResource(solicitudRepository, solicitudSearchRepository);
        this.restSolicitudMockMvc = MockMvcBuilders.standaloneSetup(solicitudResource)
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
    public static Solicitud createEntity(EntityManager em) {
        Solicitud solicitud = new Solicitud()
            .nCodsolic(DEFAULT_N_CODSOLIC)
            .nCodrepre(DEFAULT_N_CODREPRE)
            .tFecsolic(DEFAULT_T_FECSOLIC)
            .tFecenvio(DEFAULT_T_FECENVIO)
            .vFlgest(DEFAULT_V_FLGEST)
            .vSolicita(DEFAULT_V_SOLICITA)
            .vEmpleador(DEFAULT_V_EMPLEADOR)
            .vSindicato(DEFAULT_V_SINDICATO)
            .vArbitro(DEFAULT_V_ARBITRO)
            .vCodsolic(DEFAULT_V_CODSOLIC)
            .vCodemple(DEFAULT_V_CODEMPLE)
            .vCodsindi(DEFAULT_V_CODSINDI)
            .vCodarbit(DEFAULT_V_CODARBIT)
            .tFecvigde(DEFAULT_T_FECVIGDE)
            .tFecvigha(DEFAULT_T_FECVIGHA)
            .vVoucher(DEFAULT_V_VOUCHER)
            .vRegistro(DEFAULT_V_REGISTRO)
            .vRucsol(DEFAULT_V_RUCSOL)
            .vCodusu(DEFAULT_V_CODUSU)
            .vUsuareg(DEFAULT_V_USUAREG)
            .tFecreg(DEFAULT_T_FECREG)
            .nFlgactivo(DEFAULT_N_FLGACTIVO)
            .nSedereg(DEFAULT_N_SEDEREG)
            .vUsuaupd(DEFAULT_V_USUAUPD)
            .tFecupd(DEFAULT_T_FECUPD)
            .nSedeupd(DEFAULT_N_SEDEUPD);
        return solicitud;
    }

    @Before
    public void initTest() {
        solicitudSearchRepository.deleteAll();
        solicitud = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolicitud() throws Exception {
        int databaseSizeBeforeCreate = solicitudRepository.findAll().size();

        // Create the Solicitud
        restSolicitudMockMvc.perform(post("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isCreated());

        // Validate the Solicitud in the database
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeCreate + 1);
        Solicitud testSolicitud = solicitudList.get(solicitudList.size() - 1);
        assertThat(testSolicitud.getnCodsolic()).isEqualTo(DEFAULT_N_CODSOLIC);
        assertThat(testSolicitud.getnCodrepre()).isEqualTo(DEFAULT_N_CODREPRE);
        assertThat(testSolicitud.gettFecsolic()).isEqualTo(DEFAULT_T_FECSOLIC);
        assertThat(testSolicitud.gettFecenvio()).isEqualTo(DEFAULT_T_FECENVIO);
        assertThat(testSolicitud.getvFlgest()).isEqualTo(DEFAULT_V_FLGEST);
        assertThat(testSolicitud.getvSolicita()).isEqualTo(DEFAULT_V_SOLICITA);
        assertThat(testSolicitud.getvEmpleador()).isEqualTo(DEFAULT_V_EMPLEADOR);
        assertThat(testSolicitud.getvSindicato()).isEqualTo(DEFAULT_V_SINDICATO);
        assertThat(testSolicitud.getvArbitro()).isEqualTo(DEFAULT_V_ARBITRO);
        assertThat(testSolicitud.getvCodsolic()).isEqualTo(DEFAULT_V_CODSOLIC);
        assertThat(testSolicitud.getvCodemple()).isEqualTo(DEFAULT_V_CODEMPLE);
        assertThat(testSolicitud.getvCodsindi()).isEqualTo(DEFAULT_V_CODSINDI);
        assertThat(testSolicitud.getvCodarbit()).isEqualTo(DEFAULT_V_CODARBIT);
        assertThat(testSolicitud.gettFecvigde()).isEqualTo(DEFAULT_T_FECVIGDE);
        assertThat(testSolicitud.gettFecvigha()).isEqualTo(DEFAULT_T_FECVIGHA);
        assertThat(testSolicitud.getvVoucher()).isEqualTo(DEFAULT_V_VOUCHER);
        assertThat(testSolicitud.getvRegistro()).isEqualTo(DEFAULT_V_REGISTRO);
        assertThat(testSolicitud.getvRucsol()).isEqualTo(DEFAULT_V_RUCSOL);
        assertThat(testSolicitud.getvCodusu()).isEqualTo(DEFAULT_V_CODUSU);
        assertThat(testSolicitud.getvUsuareg()).isEqualTo(DEFAULT_V_USUAREG);
        assertThat(testSolicitud.gettFecreg()).isEqualTo(DEFAULT_T_FECREG);
        assertThat(testSolicitud.isnFlgactivo()).isEqualTo(DEFAULT_N_FLGACTIVO);
        assertThat(testSolicitud.getnSedereg()).isEqualTo(DEFAULT_N_SEDEREG);
        assertThat(testSolicitud.getvUsuaupd()).isEqualTo(DEFAULT_V_USUAUPD);
        assertThat(testSolicitud.gettFecupd()).isEqualTo(DEFAULT_T_FECUPD);
        assertThat(testSolicitud.getnSedeupd()).isEqualTo(DEFAULT_N_SEDEUPD);

        // Validate the Solicitud in Elasticsearch
        Solicitud solicitudEs = solicitudSearchRepository.findOne(testSolicitud.getnCodsolic());
        assertThat(solicitudEs).isEqualToComparingFieldByField(testSolicitud);
    }

    @Test
    @Transactional
    public void createSolicitudWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solicitudRepository.findAll().size();

        // Create the Solicitud with an existing ID
        solicitud.setnCodsolic(1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolicitudMockMvc.perform(post("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isBadRequest());

        // Validate the Solicitud in the database
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checknCodsolicIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudRepository.findAll().size();
        // set the field null
        solicitud.setnCodsolic(null);

        // Create the Solicitud, which fails.

        restSolicitudMockMvc.perform(post("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isBadRequest());

        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkvUsuaregIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudRepository.findAll().size();
        // set the field null
        solicitud.setvUsuareg(null);

        // Create the Solicitud, which fails.

        restSolicitudMockMvc.perform(post("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isBadRequest());

        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checktFecregIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudRepository.findAll().size();
        // set the field null
        solicitud.settFecreg(null);

        // Create the Solicitud, which fails.

        restSolicitudMockMvc.perform(post("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isBadRequest());

        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknFlgactivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudRepository.findAll().size();
        // set the field null
        solicitud.setnFlgactivo(null);

        // Create the Solicitud, which fails.

        restSolicitudMockMvc.perform(post("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isBadRequest());

        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checknSederegIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudRepository.findAll().size();
        // set the field null
        solicitud.setnSedereg(null);

        // Create the Solicitud, which fails.

        restSolicitudMockMvc.perform(post("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isBadRequest());

        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSolicituds() throws Exception {
        // Initialize the database
        solicitudRepository.saveAndFlush(solicitud);

        // Get all the solicitudList
        restSolicitudMockMvc.perform(get("/api/solicituds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(solicitud.getnCodsolic().intValue())))
            .andExpect(jsonPath("$.[*].nCodsolic").value(hasItem(DEFAULT_N_CODSOLIC)))
            .andExpect(jsonPath("$.[*].nCodrepre").value(hasItem(DEFAULT_N_CODREPRE)))
            .andExpect(jsonPath("$.[*].tFecsolic").value(hasItem(DEFAULT_T_FECSOLIC.toString())))
            .andExpect(jsonPath("$.[*].tFecenvio").value(hasItem(DEFAULT_T_FECENVIO.toString())))
            .andExpect(jsonPath("$.[*].vFlgest").value(hasItem(DEFAULT_V_FLGEST.toString())))
            .andExpect(jsonPath("$.[*].vSolicita").value(hasItem(DEFAULT_V_SOLICITA.toString())))
            .andExpect(jsonPath("$.[*].vEmpleador").value(hasItem(DEFAULT_V_EMPLEADOR.toString())))
            .andExpect(jsonPath("$.[*].vSindicato").value(hasItem(DEFAULT_V_SINDICATO.toString())))
            .andExpect(jsonPath("$.[*].vArbitro").value(hasItem(DEFAULT_V_ARBITRO.toString())))
            .andExpect(jsonPath("$.[*].vCodsolic").value(hasItem(DEFAULT_V_CODSOLIC.toString())))
            .andExpect(jsonPath("$.[*].vCodemple").value(hasItem(DEFAULT_V_CODEMPLE.toString())))
            .andExpect(jsonPath("$.[*].vCodsindi").value(hasItem(DEFAULT_V_CODSINDI.toString())))
            .andExpect(jsonPath("$.[*].vCodarbit").value(hasItem(DEFAULT_V_CODARBIT.toString())))
            .andExpect(jsonPath("$.[*].tFecvigde").value(hasItem(DEFAULT_T_FECVIGDE.toString())))
            .andExpect(jsonPath("$.[*].tFecvigha").value(hasItem(DEFAULT_T_FECVIGHA.toString())))
            .andExpect(jsonPath("$.[*].vVoucher").value(hasItem(DEFAULT_V_VOUCHER.toString())))
            .andExpect(jsonPath("$.[*].vRegistro").value(hasItem(DEFAULT_V_REGISTRO.toString())))
            .andExpect(jsonPath("$.[*].vRucsol").value(hasItem(DEFAULT_V_RUCSOL.toString())))
            .andExpect(jsonPath("$.[*].vCodusu").value(hasItem(DEFAULT_V_CODUSU.toString())))
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
    public void getSolicitud() throws Exception {
        // Initialize the database
        solicitudRepository.saveAndFlush(solicitud);

        // Get the solicitud
        restSolicitudMockMvc.perform(get("/api/solicituds/{id}", solicitud.getnCodsolic()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.id").value(solicitud.getnCodsolic().intValue()))
            .andExpect(jsonPath("$.nCodsolic").value(DEFAULT_N_CODSOLIC))
            .andExpect(jsonPath("$.nCodrepre").value(DEFAULT_N_CODREPRE))
            .andExpect(jsonPath("$.tFecsolic").value(DEFAULT_T_FECSOLIC.toString()))
            .andExpect(jsonPath("$.tFecenvio").value(DEFAULT_T_FECENVIO.toString()))
            .andExpect(jsonPath("$.vFlgest").value(DEFAULT_V_FLGEST.toString()))
            .andExpect(jsonPath("$.vSolicita").value(DEFAULT_V_SOLICITA.toString()))
            .andExpect(jsonPath("$.vEmpleador").value(DEFAULT_V_EMPLEADOR.toString()))
            .andExpect(jsonPath("$.vSindicato").value(DEFAULT_V_SINDICATO.toString()))
            .andExpect(jsonPath("$.vArbitro").value(DEFAULT_V_ARBITRO.toString()))
            .andExpect(jsonPath("$.vCodsolic").value(DEFAULT_V_CODSOLIC.toString()))
            .andExpect(jsonPath("$.vCodemple").value(DEFAULT_V_CODEMPLE.toString()))
            .andExpect(jsonPath("$.vCodsindi").value(DEFAULT_V_CODSINDI.toString()))
            .andExpect(jsonPath("$.vCodarbit").value(DEFAULT_V_CODARBIT.toString()))
            .andExpect(jsonPath("$.tFecvigde").value(DEFAULT_T_FECVIGDE.toString()))
            .andExpect(jsonPath("$.tFecvigha").value(DEFAULT_T_FECVIGHA.toString()))
            .andExpect(jsonPath("$.vVoucher").value(DEFAULT_V_VOUCHER.toString()))
            .andExpect(jsonPath("$.vRegistro").value(DEFAULT_V_REGISTRO.toString()))
            .andExpect(jsonPath("$.vRucsol").value(DEFAULT_V_RUCSOL.toString()))
            .andExpect(jsonPath("$.vCodusu").value(DEFAULT_V_CODUSU.toString()))
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
    public void getNonExistingSolicitud() throws Exception {
        // Get the solicitud
        restSolicitudMockMvc.perform(get("/api/solicituds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolicitud() throws Exception {
        // Initialize the database
        solicitudRepository.saveAndFlush(solicitud);
        solicitudSearchRepository.save(solicitud);
        int databaseSizeBeforeUpdate = solicitudRepository.findAll().size();

        // Update the solicitud
        Solicitud updatedSolicitud = solicitudRepository.findOne(solicitud.getnCodsolic());
        updatedSolicitud
            .nCodsolic(UPDATED_N_CODSOLIC)
            .nCodrepre(UPDATED_N_CODREPRE)
            .tFecsolic(UPDATED_T_FECSOLIC)
            .tFecenvio(UPDATED_T_FECENVIO)
            .vFlgest(UPDATED_V_FLGEST)
            .vSolicita(UPDATED_V_SOLICITA)
            .vEmpleador(UPDATED_V_EMPLEADOR)
            .vSindicato(UPDATED_V_SINDICATO)
            .vArbitro(UPDATED_V_ARBITRO)
            .vCodsolic(UPDATED_V_CODSOLIC)
            .vCodemple(UPDATED_V_CODEMPLE)
            .vCodsindi(UPDATED_V_CODSINDI)
            .vCodarbit(UPDATED_V_CODARBIT)
            .tFecvigde(UPDATED_T_FECVIGDE)
            .tFecvigha(UPDATED_T_FECVIGHA)
            .vVoucher(UPDATED_V_VOUCHER)
            .vRegistro(UPDATED_V_REGISTRO)
            .vRucsol(UPDATED_V_RUCSOL)
            .vCodusu(UPDATED_V_CODUSU)
            .vUsuareg(UPDATED_V_USUAREG)
            .tFecreg(UPDATED_T_FECREG)
            .nFlgactivo(UPDATED_N_FLGACTIVO)
            .nSedereg(UPDATED_N_SEDEREG)
            .vUsuaupd(UPDATED_V_USUAUPD)
            .tFecupd(UPDATED_T_FECUPD)
            .nSedeupd(UPDATED_N_SEDEUPD);

        restSolicitudMockMvc.perform(put("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSolicitud)))
            .andExpect(status().isOk());

        // Validate the Solicitud in the database
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeUpdate);
        Solicitud testSolicitud = solicitudList.get(solicitudList.size() - 1);
        assertThat(testSolicitud.getnCodsolic()).isEqualTo(UPDATED_N_CODSOLIC);
        assertThat(testSolicitud.getnCodrepre()).isEqualTo(UPDATED_N_CODREPRE);
        assertThat(testSolicitud.gettFecsolic()).isEqualTo(UPDATED_T_FECSOLIC);
        assertThat(testSolicitud.gettFecenvio()).isEqualTo(UPDATED_T_FECENVIO);
        assertThat(testSolicitud.getvFlgest()).isEqualTo(UPDATED_V_FLGEST);
        assertThat(testSolicitud.getvSolicita()).isEqualTo(UPDATED_V_SOLICITA);
        assertThat(testSolicitud.getvEmpleador()).isEqualTo(UPDATED_V_EMPLEADOR);
        assertThat(testSolicitud.getvSindicato()).isEqualTo(UPDATED_V_SINDICATO);
        assertThat(testSolicitud.getvArbitro()).isEqualTo(UPDATED_V_ARBITRO);
        assertThat(testSolicitud.getvCodsolic()).isEqualTo(UPDATED_V_CODSOLIC);
        assertThat(testSolicitud.getvCodemple()).isEqualTo(UPDATED_V_CODEMPLE);
        assertThat(testSolicitud.getvCodsindi()).isEqualTo(UPDATED_V_CODSINDI);
        assertThat(testSolicitud.getvCodarbit()).isEqualTo(UPDATED_V_CODARBIT);
        assertThat(testSolicitud.gettFecvigde()).isEqualTo(UPDATED_T_FECVIGDE);
        assertThat(testSolicitud.gettFecvigha()).isEqualTo(UPDATED_T_FECVIGHA);
        assertThat(testSolicitud.getvVoucher()).isEqualTo(UPDATED_V_VOUCHER);
        assertThat(testSolicitud.getvRegistro()).isEqualTo(UPDATED_V_REGISTRO);
        assertThat(testSolicitud.getvRucsol()).isEqualTo(UPDATED_V_RUCSOL);
        assertThat(testSolicitud.getvCodusu()).isEqualTo(UPDATED_V_CODUSU);
        assertThat(testSolicitud.getvUsuareg()).isEqualTo(UPDATED_V_USUAREG);
        assertThat(testSolicitud.gettFecreg()).isEqualTo(UPDATED_T_FECREG);
        assertThat(testSolicitud.isnFlgactivo()).isEqualTo(UPDATED_N_FLGACTIVO);
        assertThat(testSolicitud.getnSedereg()).isEqualTo(UPDATED_N_SEDEREG);
        assertThat(testSolicitud.getvUsuaupd()).isEqualTo(UPDATED_V_USUAUPD);
        assertThat(testSolicitud.gettFecupd()).isEqualTo(UPDATED_T_FECUPD);
        assertThat(testSolicitud.getnSedeupd()).isEqualTo(UPDATED_N_SEDEUPD);

        // Validate the Solicitud in Elasticsearch
        Solicitud solicitudEs = solicitudSearchRepository.findOne(testSolicitud.getnCodsolic());
        assertThat(solicitudEs).isEqualToComparingFieldByField(testSolicitud);
    }

    @Test
    @Transactional
    public void updateNonExistingSolicitud() throws Exception {
        int databaseSizeBeforeUpdate = solicitudRepository.findAll().size();

        // Create the Solicitud

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSolicitudMockMvc.perform(put("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isCreated());

        // Validate the Solicitud in the database
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSolicitud() throws Exception {
        // Initialize the database
        solicitudRepository.saveAndFlush(solicitud);
        solicitudSearchRepository.save(solicitud);
        int databaseSizeBeforeDelete = solicitudRepository.findAll().size();

        // Get the solicitud
        restSolicitudMockMvc.perform(delete("/api/solicituds/{id}", solicitud.getnCodsolic())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean solicitudExistsInEs = solicitudSearchRepository.exists(solicitud.getnCodsolic());
        assertThat(solicitudExistsInEs).isFalse();

        // Validate the database is empty
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSolicitud() throws Exception {
        // Initialize the database
        solicitudRepository.saveAndFlush(solicitud);
        solicitudSearchRepository.save(solicitud);

        // Search the solicitud
        restSolicitudMockMvc.perform(get("/api/_search/solicituds?query=id:" + solicitud.getnCodsolic()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            //.andExpect(jsonPath("$.[*].id").value(hasItem(solicitud.getnCodsolic().intValue())))
            .andExpect(jsonPath("$.[*].nCodsolic").value(hasItem(DEFAULT_N_CODSOLIC)))
            .andExpect(jsonPath("$.[*].nCodrepre").value(hasItem(DEFAULT_N_CODREPRE)))
            .andExpect(jsonPath("$.[*].tFecsolic").value(hasItem(DEFAULT_T_FECSOLIC.toString())))
            .andExpect(jsonPath("$.[*].tFecenvio").value(hasItem(DEFAULT_T_FECENVIO.toString())))
            .andExpect(jsonPath("$.[*].vFlgest").value(hasItem(DEFAULT_V_FLGEST.toString())))
            .andExpect(jsonPath("$.[*].vSolicita").value(hasItem(DEFAULT_V_SOLICITA.toString())))
            .andExpect(jsonPath("$.[*].vEmpleador").value(hasItem(DEFAULT_V_EMPLEADOR.toString())))
            .andExpect(jsonPath("$.[*].vSindicato").value(hasItem(DEFAULT_V_SINDICATO.toString())))
            .andExpect(jsonPath("$.[*].vArbitro").value(hasItem(DEFAULT_V_ARBITRO.toString())))
            .andExpect(jsonPath("$.[*].vCodsolic").value(hasItem(DEFAULT_V_CODSOLIC.toString())))
            .andExpect(jsonPath("$.[*].vCodemple").value(hasItem(DEFAULT_V_CODEMPLE.toString())))
            .andExpect(jsonPath("$.[*].vCodsindi").value(hasItem(DEFAULT_V_CODSINDI.toString())))
            .andExpect(jsonPath("$.[*].vCodarbit").value(hasItem(DEFAULT_V_CODARBIT.toString())))
            .andExpect(jsonPath("$.[*].tFecvigde").value(hasItem(DEFAULT_T_FECVIGDE.toString())))
            .andExpect(jsonPath("$.[*].tFecvigha").value(hasItem(DEFAULT_T_FECVIGHA.toString())))
            .andExpect(jsonPath("$.[*].vVoucher").value(hasItem(DEFAULT_V_VOUCHER.toString())))
            .andExpect(jsonPath("$.[*].vRegistro").value(hasItem(DEFAULT_V_REGISTRO.toString())))
            .andExpect(jsonPath("$.[*].vRucsol").value(hasItem(DEFAULT_V_RUCSOL.toString())))
            .andExpect(jsonPath("$.[*].vCodusu").value(hasItem(DEFAULT_V_CODUSU.toString())))
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
        TestUtil.equalsVerifier(Solicitud.class);
        Solicitud solicitud1 = new Solicitud();
        solicitud1.setnCodsolic(1);
        Solicitud solicitud2 = new Solicitud();
        solicitud2.setnCodsolic(solicitud1.getnCodsolic());
        assertThat(solicitud1).isEqualTo(solicitud2);
        solicitud2.setnCodsolic(2);
        assertThat(solicitud1).isNotEqualTo(solicitud2);
        solicitud1.setnCodsolic(null);
        assertThat(solicitud1).isNotEqualTo(solicitud2);
    }
}
