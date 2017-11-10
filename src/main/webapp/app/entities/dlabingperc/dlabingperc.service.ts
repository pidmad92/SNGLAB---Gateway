import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Dlabingperc } from './dlabingperc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DlabingpercService {

    private resourceUrl = '/consultas/api/dlabingpercs';
    private resourceSearchUrl = '/consultas/api/_search/dlabingpercs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(dlabingperc: Dlabingperc): Observable<Dlabingperc> {
        const copy = this.convert(dlabingperc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dlabingperc: Dlabingperc): Observable<Dlabingperc> {
        const copy = this.convert(dlabingperc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Dlabingperc> {
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
     * Convert a returned JSON object to Dlabingperc.
     */
    private convertItemFromServer(json: any): Dlabingperc {
        const entity: Dlabingperc = Object.assign(new Dlabingperc(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Dlabingperc to a JSON which can be sent to the server.
     */
    private convert(dlabingperc: Dlabingperc): Dlabingperc {
        const copy: Dlabingperc = Object.assign({}, dlabingperc);

        copy.dFechareg = this.dateUtils.toDate(dlabingperc.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(dlabingperc.dFechaupd);
        return copy;
    }
}
