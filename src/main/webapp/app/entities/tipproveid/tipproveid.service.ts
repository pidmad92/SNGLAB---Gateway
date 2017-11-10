import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipproveid } from './tipproveid.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipproveidService {

    private resourceUrl = '/defensa/api/tipproveids';
    private resourceSearchUrl = '/defensa/api/_search/tipproveids';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipproveid: Tipproveid): Observable<Tipproveid> {
        const copy = this.convert(tipproveid);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipproveid: Tipproveid): Observable<Tipproveid> {
        const copy = this.convert(tipproveid);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipproveid> {
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
     * Convert a returned JSON object to Tipproveid.
     */
    private convertItemFromServer(json: any): Tipproveid {
        const entity: Tipproveid = Object.assign(new Tipproveid(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Tipproveid to a JSON which can be sent to the server.
     */
    private convert(tipproveid: Tipproveid): Tipproveid {
        const copy: Tipproveid = Object.assign({}, tipproveid);

        copy.dFechareg = this.dateUtils.toDate(tipproveid.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(tipproveid.dFechaupd);
        return copy;
    }
}
