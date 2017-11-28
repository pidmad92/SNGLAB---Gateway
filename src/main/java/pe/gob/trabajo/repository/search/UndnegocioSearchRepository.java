package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Undnegocio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Undnegocio entity.
 */
public interface UndnegocioSearchRepository extends ElasticsearchRepository<Undnegocio, Integer> {
}
