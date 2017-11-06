import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Motivoatenci } from './motivoatenci.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MotivoatenciService {

    private resourceUrl = '/consultas/api/motivoatencis';
    private resourceSearchUrl = '/consultas/api/_search/motivoatencis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(motivoatenci: Motivoatenci): Observable<Motivoatenci> {
        const copy = this.convert(motivoatenci);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(motivoatenci: Motivoatenci): Observable<Motivoatenci> {
        const copy = this.convert(motivoatenci);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Motivoatenci> {
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
     * Convert a returned JSON object to Motivoatenci.
     */
    private convertItemFromServer(json: any): Motivoatenci {
        const entity: Motivoatenci = Object.assign(new Motivoatenci(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Motivoatenci to a JSON which can be sent to the server.
     */
    private convert(motivoatenci: Motivoatenci): Motivoatenci {
        const copy: Motivoatenci = Object.assign({}, motivoatenci);

        copy.dFechareg = this.dateUtils.toDate(motivoatenci.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(motivoatenci.dFechaupd);
        return copy;
    }
}
