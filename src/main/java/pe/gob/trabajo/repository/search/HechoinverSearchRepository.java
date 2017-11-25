package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Hechoinver;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Hechoinver entity.
 */
public interface HechoinverSearchRepository extends ElasticsearchRepository<Hechoinver, Integer> {
}
