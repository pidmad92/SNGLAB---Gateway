package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Direccion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Direccion entity.
 */
public interface DireccionSearchRepository extends ElasticsearchRepository<Direccion, Integer> {
}
