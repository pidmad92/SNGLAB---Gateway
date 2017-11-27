package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Expediente;

import pe.gob.trabajo.repository.ExpedienteRepository;
import pe.gob.trabajo.repository.search.ExpedienteSearchRepository;
import pe.gob.trabajo.service.dto.PersonaValidarServicioDTO;
import pe.gob.trabajo.service.ws.bean.PersonaBean;
import pe.gob.trabajo.service.ws.client.ReniecClient;
import pe.gob.trabajo.web.rest.errors.BadRequestAlertException;
import pe.gob.trabajo.web.rest.util.HeaderUtil;
import pe.gob.trabajo.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.xml.soap.SOAPException;

@RestController
@RequestMapping("/api")
public class ServiciosExternosResource {
    private final Logger log = LoggerFactory.getLogger(ServiciosExternosResource.class);

    private static final String ENTITY_NAME = "serviciosexternos";

    public ServiciosExternosResource() {
    }

    @PostMapping("/validarpersonaservicio")
    @Timed
    public PersonaValidarServicioDTO ValidarPersonaNatural(@RequestBody PersonaValidarServicioDTO personaNatural)
            throws SOAPException, IOException {

        PersonaValidarServicioDTO dto = new PersonaValidarServicioDTO();
        System.out.println("======================>ENTROOOOOO");
        System.out.println(personaNatural.getTipoDoc());
        System.out.println("======================>");

        switch (personaNatural.getTipoDoc()) {
        case "DNI":
            PersonaBean personaBean = ReniecClient.getConsolidada(personaNatural.getNumeroDoc());
            
        }
        

        return dto;
    }

    private PersonaValidarServicioDTO ValidarConvertirObjetoReniec(PersonaValidarServicioDTO dto, PersonaBean persona) {

        return dto;
    }
}