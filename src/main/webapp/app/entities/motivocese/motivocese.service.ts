import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Motivocese } from './motivocese.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MotivoceseService {

    private resourceUrl = '/consultas/api/motivocese';
    private resourceSearchUrl = '/consultas/api/_search/motivocese';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(motivocese: Motivocese): Observable<Motivocese> {
        const copy = this.convert(motivocese);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(motivocese: Motivocese): Observable<Motivocese> {
        const copy = this.convert(motivocese);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Motivocese> {
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
     * Convert a returned JSON object to Motivocese.
     */
    private convertItemFromServer(json: any): Motivocese {
        const entity: Motivocese = Object.assign(new Motivocese(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Motivocese to a JSON which can be sent to the server.
     */
    private convert(motivocese: Motivocese): Motivocese {
        const copy: Motivocese = Object.assign({}, motivocese);

        copy.dFechareg = this.dateUtils.toDate(motivocese.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(motivocese.dFechaupd);
        return copy;
    }
}
