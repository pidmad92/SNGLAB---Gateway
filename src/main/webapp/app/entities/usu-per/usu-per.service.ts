import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { UsuPer } from './usu-per.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UsuPerService {

    private resourceUrl = '/seguridad/api/usu-pers';
    private resourceSearchUrl = '/seguridad/api/_search/usu-pers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(usuPer: UsuPer): Observable<UsuPer> {
        const copy = this.convert(usuPer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(usuPer: UsuPer): Observable<UsuPer> {
        const copy = this.convert(usuPer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UsuPer> {
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
     * Convert a returned JSON object to UsuPer.
     */
    private convertItemFromServer(json: any): UsuPer {
        const entity: UsuPer = Object.assign(new UsuPer(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a UsuPer to a JSON which can be sent to the server.
     */
    private convert(usuPer: UsuPer): UsuPer {
        const copy: UsuPer = Object.assign({}, usuPer);

        copy.datFechaLog = this.dateUtils.toDate(usuPer.datFechaLog);
        return copy;
    }
}
