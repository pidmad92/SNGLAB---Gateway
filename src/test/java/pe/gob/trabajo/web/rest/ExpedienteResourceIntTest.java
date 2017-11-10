package pe.gob.trabajo.web.rest;

import pe.gob.trabajo.GatewayApp;

import pe.gob.trabajo.domain.Expediente;
import pe.gob.trabajo.repository.ExpedienteRepository;
import pe.gob.trabajo.repository.search.ExpedienteSearchRepository;
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
import java.util.List;

import static pe.gob.trabajo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ExpedienteResource REST controller.
 *
 * @see ExpedienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class ExpedienteResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DESC = "BBBBBBBBBB";

    @Autowired
    private ExpedienteRepository expedienteRepository;

    @Autowired
    private ExpedienteSearchRepository expedienteSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restExpedienteMockMvc;

    private Expediente expediente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpedienteResource expedienteResource = new ExpedienteResource(expedienteRepository, expedienteSearchRepository);
        this.restExpedienteMockMvc = MockMvcBuilders.standaloneSetup(expedienteResource)
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
    public static Expediente createEntity(EntityManager em) {
        Expediente expediente = new Expediente()
            .name(DEFAULT_NAME)
            .desc(DEFAULT_DESC);
        return expediente;
    }

    @Before
    public void initTest() {
        expedienteSearchRepository.deleteAll();
        expediente = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpediente() throws Exception {
        int databaseSizeBeforeCreate = expedienteRepository.findAll().size();

        // Create the Expediente
        restExpedienteMockMvc.perform(post("/api/expedientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expediente)))
            .andExpect(status().isCreated());

        // Validate the Expediente in the database
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeCreate + 1);
        Expediente testExpediente = expedienteList.get(expedienteList.size() - 1);
        assertThat(testExpediente.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testExpediente.getDesc()).isEqualTo(DEFAULT_DESC);

        // Validate the Expediente in Elasticsearch
        Expediente expedienteEs = expedienteSearchRepository.findOne(testExpediente.getId());
        assertThat(expedienteEs).isEqualToComparingFieldByField(testExpediente);
    }

    @Test
    @Transactional
    public void createExpedienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expedienteRepository.findAll().size();

        // Create the Expediente with an existing ID
        expediente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpedienteMockMvc.perform(post("/api/expedientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expediente)))
            .andExpect(status().isBadRequest());

        // Validate the Expediente in the database
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExpedientes() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);

        // Get all the expedienteList
        restExpedienteMockMvc.perform(get("/api/expedientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expediente.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].desc").value(hasItem(DEFAULT_DESC.toString())));
    }

    @Test
    @Transactional
    public void getExpediente() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);

        // Get the expediente
        restExpedienteMockMvc.perform(get("/api/expedientes/{id}", expediente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expediente.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.desc").value(DEFAULT_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExpediente() throws Exception {
        // Get the expediente
        restExpedienteMockMvc.perform(get("/api/expedientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpediente() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);
        expedienteSearchRepository.save(expediente);
        int databaseSizeBeforeUpdate = expedienteRepository.findAll().size();

        // Update the expediente
        Expediente updatedExpediente = expedienteRepository.findOne(expediente.getId());
        updatedExpediente
            .name(UPDATED_NAME)
            .desc(UPDATED_DESC);

        restExpedienteMockMvc.perform(put("/api/expedientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExpediente)))
            .andExpect(status().isOk());

        // Validate the Expediente in the database
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeUpdate);
        Expediente testExpediente = expedienteList.get(expedienteList.size() - 1);
        assertThat(testExpediente.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testExpediente.getDesc()).isEqualTo(UPDATED_DESC);

        // Validate the Expediente in Elasticsearch
        Expediente expedienteEs = expedienteSearchRepository.findOne(testExpediente.getId());
        assertThat(expedienteEs).isEqualToComparingFieldByField(testExpediente);
    }

    @Test
    @Transactional
    public void updateNonExistingExpediente() throws Exception {
        int databaseSizeBeforeUpdate = expedienteRepository.findAll().size();

        // Create the Expediente

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restExpedienteMockMvc.perform(put("/api/expedientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expediente)))
            .andExpect(status().isCreated());

        // Validate the Expediente in the database
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteExpediente() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);
        expedienteSearchRepository.save(expediente);
        int databaseSizeBeforeDelete = expedienteRepository.findAll().size();

        // Get the expediente
        restExpedienteMockMvc.perform(delete("/api/expedientes/{id}", expediente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean expedienteExistsInEs = expedienteSearchRepository.exists(expediente.getId());
        assertThat(expedienteExistsInEs).isFalse();

        // Validate the database is empty
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchExpediente() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);
        expedienteSearchRepository.save(expediente);

        // Search the expediente
        restExpedienteMockMvc.perform(get("/api/_search/expedientes?query=id:" + expediente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expediente.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].desc").value(hasItem(DEFAULT_DESC.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Expediente.class);
        Expediente expediente1 = new Expediente();
        expediente1.setId(1L);
        Expediente expediente2 = new Expediente();
        expediente2.setId(expediente1.getId());
        assertThat(expediente1).isEqualTo(expediente2);
        expediente2.setId(2L);
        assertThat(expediente1).isNotEqualTo(expediente2);
        expediente1.setId(null);
        assertThat(expediente1).isNotEqualTo(expediente2);
    }
}
