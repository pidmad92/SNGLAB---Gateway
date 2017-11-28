package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Reporteres;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Reporteres entity.
 */
public interface ReporteresSearchRepository extends ElasticsearchRepository<Reporteres, Integer> {
}
