package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Expediente;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Expediente entity.
 */
public interface ExpedienteSearchRepository extends ElasticsearchRepository<Expediente, Long> {
}
