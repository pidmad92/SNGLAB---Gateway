package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Formfinanc;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Formfinanc entity.
 */
public interface FormfinancSearchRepository extends ElasticsearchRepository<Formfinanc, Integer> {
}
