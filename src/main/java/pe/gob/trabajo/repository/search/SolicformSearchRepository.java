package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Solicform;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Solicform entity.
 */
public interface SolicformSearchRepository extends ElasticsearchRepository<Solicform, Integer> {
}
