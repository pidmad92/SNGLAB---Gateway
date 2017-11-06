import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Perjuridire } from './perjuridire.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PerjuridireService {

    private resourceUrl = '/consultas/api/perjuridires';
    private resourceSearchUrl = '/consultas/api/_search/perjuridires';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(perjuridire: Perjuridire): Observable<Perjuridire> {
        const copy = this.convert(perjuridire);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(perjuridire: Perjuridire): Observable<Perjuridire> {
        const copy = this.convert(perjuridire);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Perjuridire> {
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
     * Convert a returned JSON object to Perjuridire.
     */
    private convertItemFromServer(json: any): Perjuridire {
        const entity: Perjuridire = Object.assign(new Perjuridire(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Perjuridire to a JSON which can be sent to the server.
     */
    private convert(perjuridire: Perjuridire): Perjuridire {
        const copy: Perjuridire = Object.assign({}, perjuridire);

        copy.dFechareg = this.dateUtils.toDate(perjuridire.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(perjuridire.dFechaupd);
        return copy;
    }
}
