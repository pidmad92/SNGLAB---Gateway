package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Negocolect;

import pe.gob.trabajo.repository.NegocolectRepository;
import pe.gob.trabajo.repository.search.NegocolectSearchRepository;
import pe.gob.trabajo.service.dto.PersonaValidarServicioDTO;
import pe.gob.trabajo.service.util.EmailComponent;
import pe.gob.trabajo.web.rest.errors.BadRequestAlertException;
import pe.gob.trabajo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api")
public class NotidenunciasusuarioResource {
    
    private static final String ENTITY_NAME = "notificacionusuario";

    @PostMapping("/notificausuario")
    @Timed
    public ResponseEntity<Void> deleteNegocolect(@RequestBody PersonaValidarServicioDTO personaNatural) {
        
        try{
            EmailComponent emailComponent = new EmailComponent();
            emailComponent.desde = "snglab@trabajo.gob.pe";
            emailComponent.userFrom = "snglab@trabajo.gob.pe";
            emailComponent.password = "snglab123456";

            StringBuilder str = new StringBuilder();
            str.append("Su usuario para denuncias en linea es: \n");
            str.append("Usuario " + personaNatural.vEmailper + " \n");
            str.append("Clave: " + personaNatural.pass);

            emailComponent.sendEmail(personaNatural.vEmailper, "Creacion de usuario", str.toString());

            return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, ENTITY_NAME)).build();
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}