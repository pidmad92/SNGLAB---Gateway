package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Participa;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Participa entity.
 */
public interface ParticipaSearchRepository extends ElasticsearchRepository<Participa, Integer> {
}
