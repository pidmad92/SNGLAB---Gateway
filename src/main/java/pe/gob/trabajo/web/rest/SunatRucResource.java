package pe.gob.trabajo.web.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.trabajo.service.ws.bean.CarnetExtBean;
import pe.gob.trabajo.service.ws.bean.EmpresaBean;
import pe.gob.trabajo.service.ws.bean.PersonaBean;
import pe.gob.trabajo.service.ws.client.MigracionClient;
import pe.gob.trabajo.service.ws.client.PIDESunatClient;
import pe.gob.trabajo.service.ws.client.ReniecClient;
import pe.gob.trabajo.service.ws.client.SunatClient;
import pe.gob.trabajo.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.codahale.metrics.annotation.Timed;


@RestController
@RequestMapping("/api")
public class SunatRucResource {

    private final Logger log = LoggerFactory.getLogger(SunatRucResource.class);

    private static final String ENTITY_NAME = "Sunat_Ruc";

    public SunatRucResource() {
    }

    /**
     * GET  /tipzonas : get all the tipzonas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipzonas in body
     */
    @GetMapping("/sunat/{ruc}")
    @Timed
    public EmpresaBean obtenerDatosGenerales(@PathVariable String ruc) {
        EmpresaBean bean = null;
        try
        {
            bean = SunatClient.getDatosPrincipales(ruc);
            return bean;
        }catch(Exception e){
            e.printStackTrace();
        }
        return bean;
    }

    /**
     * GET  /tipzonas : get all the tipzonas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipzonas in body
     */
    @GetMapping("/reniec/{dni}")
    @Timed
    public PersonaBean obtenerDocumentoReniec(@PathVariable String dni) {
        PersonaBean bean = null;
        try
        {
            bean = ReniecClient.getConsolidada(dni);
            return bean;
        }catch(Exception e){
            e.printStackTrace();
        }
        return bean;
    }

    /**
     * GET  /tipzonas : get all the tipzonas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipzonas in body
     */
    @GetMapping("/migracion/{carnet}")
    @Timed
    public CarnetExtBean obtenerDatosCarnetExtranjeria(@PathVariable String carnet) {
        CarnetExtBean bean = null;
        try
        {
            bean = MigracionClient.obtenerInformacion("CE",carnet);
            return bean;
        }catch(Exception e){
            e.printStackTrace();
        }
        return bean;
    }
}