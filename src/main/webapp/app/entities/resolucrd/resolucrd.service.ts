import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Resolucrd } from './resolucrd.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ResolucrdService {

    private resourceUrl = '/defensa/api/resolucrds';
    private resourceSearchUrl = '/defensa/api/_search/resolucrds';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(resolucrd: Resolucrd): Observable<Resolucrd> {
        const copy = this.convert(resolucrd);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(resolucrd: Resolucrd): Observable<Resolucrd> {
        const copy = this.convert(resolucrd);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Resolucrd> {
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
     * Convert a returned JSON object to Resolucrd.
     */
    private convertItemFromServer(json: any): Resolucrd {
        const entity: Resolucrd = Object.assign(new Resolucrd(), json);
        entity.dFecresosd = this.dateUtils
            .convertLocalDateFromServer(json.dFecresosd);
        entity.dFecconcil = this.dateUtils
            .convertLocalDateFromServer(json.dFecconcil);
        entity.dFechanoti = this.dateUtils
            .convertLocalDateFromServer(json.dFechanoti);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Resolucrd to a JSON which can be sent to the server.
     */
    private convert(resolucrd: Resolucrd): Resolucrd {
        const copy: Resolucrd = Object.assign({}, resolucrd);
        copy.dFecresosd = this.dateUtils
            .convertLocalDateToServer(resolucrd.dFecresosd);
        copy.dFecconcil = this.dateUtils
            .convertLocalDateToServer(resolucrd.dFecconcil);
        copy.dFechanoti = this.dateUtils
            .convertLocalDateToServer(resolucrd.dFechanoti);

        copy.tFecreg = this.dateUtils.toDate(resolucrd.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(resolucrd.tFecupd);
        return copy;
    }
}
