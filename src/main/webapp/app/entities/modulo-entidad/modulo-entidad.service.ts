import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ModuloEntidad } from './modulo-entidad.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../shared';

@Injectable()
export class ModuloEntidadService {

    private resourceUrl = '/seguridad/api/modulo-entidades';
    private resourceSearchUrl = '/seguridad/api/_search/modulo-entidades';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(moduloEntidad: ModuloEntidad): Observable<ModuloEntidad> {
        const token = this.authServerProvider.getToken();
        moduloEntidad.numEliminar = 1;
        moduloEntidad.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(moduloEntidad);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(moduloEntidad: ModuloEntidad): Observable<ModuloEntidad> {
        const copy = this.convert(moduloEntidad);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ModuloEntidad> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to ModuloEntidad.
     */
    private convertItemFromServer(json: any): ModuloEntidad {
        const entity: ModuloEntidad = Object.assign(new ModuloEntidad(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a ModuloEntidad to a JSON which can be sent to the server.
     */
    private convert(moduloEntidad: ModuloEntidad): ModuloEntidad {
        const copy: ModuloEntidad = Object.assign({}, moduloEntidad);

        copy.datFechaLog = this.dateUtils.toDate(moduloEntidad.datFechaLog);
        return copy;
    }
}
