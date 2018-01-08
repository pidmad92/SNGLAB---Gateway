import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../../shared';

import { Tipdocident } from '../../models/tipdocident.model';

@Injectable()
export class TrabajadorService {

    private resource = '/liquidaciones/api/';

    // RUTAS POR ENTIDAD
    private resourceTipdocident = this.resource + 'tipdocidents';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    // TIPO DE DOCUMENTO

    /**
     * Tipo de Documento de Identidad
     * @returns Observable
     */
    consultaTipoDocIdentidad(): Observable<ResponseWrapper> {
        // console.log('ConsService'); llego al servicio
        return this.http.get(this.resourceTipdocident, null)
            .map((res: Response) => this.convertResponseTipdocident(res));
    }

    // CONVERT RESPONSE FORMATED ELEMENT - Tipdocident

    private convertResponseTipdocident(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerTipdocident(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemFromServerTipdocident(json: any): Tipdocident {
        const entity: Tipdocident = Object.assign(new Tipdocident(), json);
        return entity;
    }
}
