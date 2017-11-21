import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Entidad } from './entidad.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../shared';

@Injectable()
export class EntidadService {

    private resourceUrl = '/seguridad/api/entidades';
    private resourceSearchUrl = '/seguridad/api/_search/entidades';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(entidad: Entidad): Observable<Entidad> {
        const token = this.authServerProvider.getToken();
        entidad.numEliminar = 1;
        entidad.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(entidad);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entidad: Entidad): Observable<Entidad> {
        const copy = this.convert(entidad);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    updateLogic(entidad: Entidad): Observable<Entidad> {
        entidad.numEliminar = 0;
        const copy = this.convert(entidad);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Entidad> {
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
     * Convert a returned JSON object to Entidad.
     */
    private convertItemFromServer(json: any): Entidad {
        const entity: Entidad = Object.assign(new Entidad(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a Entidad to a JSON which can be sent to the server.
     */
    private convert(entidad: Entidad): Entidad {
        const copy: Entidad = Object.assign({}, entidad);

        copy.datFechaLog = this.dateUtils.toDate(entidad.datFechaLog);
        return copy;
    }
}
