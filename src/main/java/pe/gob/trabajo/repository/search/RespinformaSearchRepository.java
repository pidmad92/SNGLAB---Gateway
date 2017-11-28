package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Respinforma;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Respinforma entity.
 */
public interface RespinformaSearchRepository extends ElasticsearchRepository<Respinforma, Integer> {
}
