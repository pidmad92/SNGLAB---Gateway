import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipnotif } from './tipnotif.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipnotifService {

    private resourceUrl = '/defensa/api/tipnotifs';
    private resourceSearchUrl = '/defensa/api/_search/tipnotifs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipnotif: Tipnotif): Observable<Tipnotif> {
        const copy = this.convert(tipnotif);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipnotif: Tipnotif): Observable<Tipnotif> {
        const copy = this.convert(tipnotif);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipnotif> {
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
     * Convert a returned JSON object to Tipnotif.
     */
    private convertItemFromServer(json: any): Tipnotif {
        const entity: Tipnotif = Object.assign(new Tipnotif(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Tipnotif to a JSON which can be sent to the server.
     */
    private convert(tipnotif: Tipnotif): Tipnotif {
        const copy: Tipnotif = Object.assign({}, tipnotif);

        copy.dFechareg = this.dateUtils.toDate(tipnotif.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(tipnotif.dFechaupd);
        return copy;
    }
}
