import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { TipoEntidad } from './tipo-entidad.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../shared';

@Injectable()
export class TipoEntidadService {

    private resourceUrl = '/seguridad/api/tipo-entidades';
    private resourceSearchUrl = '/seguridad/api/_search/tipo-entidades';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(tipoEntidad: TipoEntidad): Observable<TipoEntidad> {
        const token = this.authServerProvider.getToken();
        tipoEntidad.numEliminar = 1;
        tipoEntidad.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(tipoEntidad);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipoEntidad: TipoEntidad): Observable<TipoEntidad> {
        const copy = this.convert(tipoEntidad);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TipoEntidad> {
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
     * Convert a returned JSON object to TipoEntidad.
     */
    private convertItemFromServer(json: any): TipoEntidad {
        const entity: TipoEntidad = Object.assign(new TipoEntidad(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a TipoEntidad to a JSON which can be sent to the server.
     */
    private convert(tipoEntidad: TipoEntidad): TipoEntidad {
        const copy: TipoEntidad = Object.assign({}, tipoEntidad);

        copy.datFechaLog = this.dateUtils.toDate(tipoEntidad.datFechaLog);
        return copy;
    }
}
