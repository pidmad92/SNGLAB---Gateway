package pe.gob.trabajo.web.rest;

import com.codahale.metrics.annotation.Timed;
import pe.gob.trabajo.domain.Ciuperjuridica;
import pe.gob.trabajo.domain.Expediente;
import pe.gob.trabajo.domain.Sectorecoperjuridica;
import pe.gob.trabajo.repository.CiuperjuridicaRepository;
import pe.gob.trabajo.repository.ExpedienteRepository;
import pe.gob.trabajo.repository.search.ExpedienteSearchRepository;
import pe.gob.trabajo.service.dto.PersonaValidarServicioDTO;
import pe.gob.trabajo.service.ws.bean.EmpresaBean;
import pe.gob.trabajo.service.ws.bean.PersonaBean;
import pe.gob.trabajo.service.ws.client.ReniecClient;
import pe.gob.trabajo.service.ws.client.SunatClient;
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
import pe.gob.trabajo.repository.SectorecoperjuridicaRepository;

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

    private final SectorecoperjuridicaRepository sectorecoperjuridicaRepository;
    private final CiuperjuridicaRepository ciuperjuridicaRepository;

    public ServiciosExternosResource(SectorecoperjuridicaRepository sectorecoperjuridicaRepository,
            CiuperjuridicaRepository ciuperjuridicaRepository) {
        this.sectorecoperjuridicaRepository = sectorecoperjuridicaRepository;
        this.ciuperjuridicaRepository = ciuperjuridicaRepository;
    }

    @PostMapping("/validarpersonaservicio")
    @Timed
    public PersonaValidarServicioDTO ValidarPersonaNatural(@RequestBody PersonaValidarServicioDTO personaNatural)
            throws SOAPException, IOException {
        switch (personaNatural.getTipoDoc()) {
        case "DNI":
            PersonaBean personaBean = ReniecClient.getConsolidada(personaNatural.getvNumdoc());
            this.ValidarConvertirObjetoReniec(personaNatural, personaBean);
        }

        return personaNatural;
    }

    @PostMapping("/validarserviciosunat")
    @Timed
    public EmpresaBean validarserviciosunat(@RequestBody EmpresaBean empresaBean) throws SOAPException, IOException {
        EmpresaBean bean = SunatClient.getDatosPrincipales(empresaBean.getDdp_numruc());
        System.out.println("-------------");
        System.out.println(bean);
        System.out.println(bean.getDdp_ciiu());
        System.out.println("-------------");
        Ciuperjuridica ciuperjuridica = ciuperjuridicaRepository.GetCiiu(bean.getDdp_ciiu());
        Sectorecoperjuridica sectorecoperjuridica = sectorecoperjuridicaRepository
                .GetSector(ciuperjuridica.getvCodsec());
        bean.setDesc_sectoeco(sectorecoperjuridica.getvDessec());
        bean.ddp_sector = sectorecoperjuridica.getvCodsec();
        return bean;
    }

    private PersonaValidarServicioDTO ValidarConvertirObjetoReniec(PersonaValidarServicioDTO dto, PersonaBean persona) {

        if (persona == null) {
            dto.setResultado(false);
        } else {
            if (persona.getApellidoPaterno() == null || persona.getApellidoMaterno() == null
                    || persona.getNombres() == null) {
                dto.setResultado(false);
            } else {
                if (dto.getvApepat().trim().toUpperCase().equals(persona.getApellidoPaterno())
                        && dto.getvApemat().trim().toUpperCase().equals(persona.getApellidoMaterno())
                        && dto.getvNombres().trim().toUpperCase().equals(persona.getNombres())) {
                    dto.setResultado(true);
                    dto.setvApemat(persona.getApellidoMaterno());
                    dto.setvApepat(persona.getApellidoPaterno());
                    dto.setvNombres(persona.getNombres());
                    dto.setdFecnac(persona.getFechaNacimiento());
                    dto.setGenero(persona.getGenero());
                    dto.setEstadoCivil(persona.getEstadoCivil());
                    dto.setCodigo(persona.getCodigo());
                    dto.setCoddep(persona.getCoddep());
                    dto.setCodpro(persona.getCodpro());
                    dto.setCoddist(persona.getCoddist());
                    dto.setDireccion(persona.getDireccion());
                    dto.setdFecnac(persona.getFechaNacimiento());
                    dto.setGenero(persona.getGenero());
                    dto.vSexoper = (persona.getGenero().trim() == "1") ? "M" : "F";
                    dto.nCodtdiden = 1;
                } else {
                    dto.setResultado(false);
                }
            }
        }
        return dto;
    }
}