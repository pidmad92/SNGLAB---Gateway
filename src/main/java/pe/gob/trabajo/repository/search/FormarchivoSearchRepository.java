package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Formarchivo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Formarchivo entity.
 */
public interface FormarchivoSearchRepository extends ElasticsearchRepository<Formarchivo, Integer> {
}
