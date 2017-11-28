package pe.gob.trabajo.repository.search;

import pe.gob.trabajo.domain.Formperfil;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Formperfil entity.
 */
public interface FormperfilSearchRepository extends ElasticsearchRepository<Formperfil, Integer> {
}
