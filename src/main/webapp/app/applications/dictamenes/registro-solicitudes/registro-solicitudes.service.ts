import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../shared';
import { Empresa } from '../../general/servicesmodel/empresa.model';
import { Persona } from '../../general/servicesmodel/persona.model';
import { CarnetExtranjeria } from '../../general/servicesmodel/carnetextranjeria.model';
import { Usuario } from '../../../entities/usuario/index';
import { Organizacio } from '../../../entities/organizacio/index';

@Injectable()
export class RegistroSolicitudesService {

    private resourceSunatUrl = '/api/sunat';
    private resourceReniecUrl = '/api/reniec';
    private resourceMigracionUrl = '/api/migracion';
    private resourceSindicatoUrl = '/api/buscarorganizacion';
    private resourceUsuarioUrl = 'api/obtenerUsuarioPorDNI';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    obtenerDatosGenerales(ruc: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceSunatUrl}/${ruc}`).map(
            (res: Response) => this.convertResponse(res, 1));

    }

    obtenerDatosReniec(dni: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceReniecUrl}/${dni}`).map(
            (res: Response) => this.convertResponse(res, 2));

    }

    obtenerSindicato(texto: string): Observable<ResponseWrapper> {
        const tipo = 'Option5';
        return this.http.get(`${this.resourceSindicatoUrl}/${tipo}/${texto}`).map(
            (res: Response) => this.convertResponseOrg(res));

    }

    obtenerCoordinador(dni: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUsuarioUrl}/${dni}`).map(
            (res: Response) => this.convertResponse(res, 5));

    }

    private convertResponse(res: Response, tipo: number): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        if (tipo === 1) {
            result.push(this.convertItemFromServerSunat(res.json()));
        } else if (tipo === 2) {
            result.push(this.convertItemFromServerReniec(res.json()));
        } else if (tipo === 3) {
            result.push(this.convertItemFromServerMigracion(res.json()));
        } else if (tipo === 4) {
            result.push(this.convertItemFromServerOrg(res.json()));
        } else if (tipo === 5) {
            result.push(this.convertItemFromServerUser(res.json()));
        } else {
            // Pasaporte
            result.push(this.convertItemFromServerSunat(res.json()));
        }

        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertItemFromServerSunat(json: any): Empresa {
        const entity: Empresa = Object.assign(new Empresa(), json);
        return entity;
    }

    private convertItemFromServerReniec(json: any): Persona {
        const entity: Persona = Object.assign(new Persona(), json);
        return entity;
    }

    private convertItemFromServerMigracion(json: any): CarnetExtranjeria {
        const entity: CarnetExtranjeria = Object.assign(new CarnetExtranjeria(), json);
        return entity;
    }

    private convertResponseUser(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerUser(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Usuario.
     */
    private convertItemFromServerUser(json: any): Usuario {
        const entity: Usuario = Object.assign(new Usuario(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        entity.datFecTermino = this.dateUtils
            .convertLocalDateFromServer(json.datFecTermino);
        return entity;
    }

    /**
     * Convert a Usuario to a JSON which can be sent to the server.
     */
    private convertUser(usuario: Usuario): Usuario {
        const copy: Usuario = Object.assign({}, usuario);

        copy.datFechaLog = this.dateUtils.toDate(usuario.datFechaLog);
        copy.datFecTermino = this.dateUtils
            .convertLocalDateToServer(usuario.datFecTermino);
        return copy;
    }

    /**
     * Convert a returned JSON object to Organizacio.
     */
    private convertItemFromServerOrg(json: any): Organizacio {
        const entity: Organizacio = Object.assign(new Organizacio(), json);
        entity.tFecregist = this.dateUtils
            .convertDateTimeFromServer(json.tFecregist);
        entity.tFecpresen = this.dateUtils
            .convertDateTimeFromServer(json.tFecpresen);
        entity.tFecconsta = this.dateUtils
            .convertDateTimeFromServer(json.tFecconsta);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Organizacio to a JSON which can be sent to the server.
     */
    private convertOrg(organizacio: Organizacio): Organizacio {
        const copy: Organizacio = Object.assign({}, organizacio);

        copy.tFecregist = this.dateUtils.toDate(organizacio.tFecregist);

        copy.tFecpresen = this.dateUtils.toDate(organizacio.tFecpresen);

        copy.tFecconsta = this.dateUtils.toDate(organizacio.tFecconsta);

        copy.tFecreg = this.dateUtils.toDate(organizacio.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(organizacio.tFecupd);
        return copy;
    }

    private convertResponseOrg(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerOrg(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

}
