package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Resulnegoc;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Resulnegoc entity.
 */
public interface ResulnegocSearchRepository extends ElasticsearchRepository<Resulnegoc, Integer> {
}
