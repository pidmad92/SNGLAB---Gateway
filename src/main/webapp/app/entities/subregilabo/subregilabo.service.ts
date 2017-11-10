import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Subregilabo } from './subregilabo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SubregilaboService {

    private resourceUrl = '/consultas/api/subregilabos';
    private resourceSearchUrl = '/consultas/api/_search/subregilabos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(subregilabo: Subregilabo): Observable<Subregilabo> {
        const copy = this.convert(subregilabo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(subregilabo: Subregilabo): Observable<Subregilabo> {
        const copy = this.convert(subregilabo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Subregilabo> {
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
     * Convert a returned JSON object to Subregilabo.
     */
    private convertItemFromServer(json: any): Subregilabo {
        const entity: Subregilabo = Object.assign(new Subregilabo(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Subregilabo to a JSON which can be sent to the server.
     */
    private convert(subregilabo: Subregilabo): Subregilabo {
        const copy: Subregilabo = Object.assign({}, subregilabo);

        copy.dFechareg = this.dateUtils.toDate(subregilabo.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(subregilabo.dFechaupd);
        return copy;
    }
}
