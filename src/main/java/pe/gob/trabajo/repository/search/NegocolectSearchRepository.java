package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Negocolect;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Negocolect entity.
 */
public interface NegocolectSearchRepository extends ElasticsearchRepository<Negocolect, Integer> {
}
