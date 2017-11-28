package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Anexlaboral;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Anexlaboral entity.
 */
public interface AnexlaboralSearchRepository extends ElasticsearchRepository<Anexlaboral, Integer> {
}
