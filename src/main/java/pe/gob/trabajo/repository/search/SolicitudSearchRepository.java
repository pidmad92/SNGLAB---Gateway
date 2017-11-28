package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Solicitud;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Solicitud entity.
 */
public interface SolicitudSearchRepository extends ElasticsearchRepository<Solicitud, Integer> {
}
