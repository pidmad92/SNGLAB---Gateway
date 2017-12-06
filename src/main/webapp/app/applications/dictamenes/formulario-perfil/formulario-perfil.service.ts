import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../shared';
import { Empresa } from '../../general/servicesmodel/empresa.model';
import { Persona } from '../../general/servicesmodel/persona.model';
import { CarnetExtranjeria } from '../../general/servicesmodel/carnetextranjeria.model';

@Injectable()
export class FormularioPerfilService {

    private resourceSunatUrl = '/api/sunat';
    private resourceReniecUrl = '/api/reniec';
    private resourceMigracionUrl = '/api/migracion';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    obtenerDatosGenerales(ruc: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceSunatUrl}/${ruc}`).map(
            (res: Response) => this.convertResponse(res, 1));

    }

    obtenerDatosReniec(dni: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceReniecUrl}/${dni}`).map(
            (res: Response) => this.convertResponse(res, 2));

    }

    obtenerDatosMigracion(carnet: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceMigracionUrl}/${carnet}`).map(
            (res: Response) => this.convertResponse(res, 2));

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
        } else {
            // Pasaporte
            result.push(this.convertItemFromServerSunat(res.json()));
        }

        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Atenaccadop.
     */
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
}
