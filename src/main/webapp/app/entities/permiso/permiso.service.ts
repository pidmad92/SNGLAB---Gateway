import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Permiso } from './permiso.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PermisoService {

    private resourceUrl = '/seguridad/api/permisos';
    private resourceSearchUrl = '/seguridad/api/_search/permisos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(permiso: Permiso): Observable<Permiso> {
        const copy = this.convert(permiso);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(permiso: Permiso): Observable<Permiso> {
        const copy = this.convert(permiso);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Permiso> {
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
     * Convert a returned JSON object to Permiso.
     */
    private convertItemFromServer(json: any): Permiso {
        const entity: Permiso = Object.assign(new Permiso(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a Permiso to a JSON which can be sent to the server.
     */
    private convert(permiso: Permiso): Permiso {
        const copy: Permiso = Object.assign({}, permiso);

        copy.datFechaLog = this.dateUtils.toDate(permiso.datFechaLog);
        return copy;
    }
}
