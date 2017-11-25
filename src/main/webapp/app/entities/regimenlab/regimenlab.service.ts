import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Regimenlab } from './regimenlab.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RegimenlabService {

    private resourceUrl = '/consultas/api/regimenlabs';
    private resourceSearchUrl = '/consultas/api/_search/regimenlabs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(regimenlab: Regimenlab): Observable<Regimenlab> {
        const copy = this.convert(regimenlab);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(regimenlab: Regimenlab): Observable<Regimenlab> {
        const copy = this.convert(regimenlab);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Regimenlab> {
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
     * Convert a returned JSON object to Regimenlab.
     */
    private convertItemFromServer(json: any): Regimenlab {
        const entity: Regimenlab = Object.assign(new Regimenlab(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Regimenlab to a JSON which can be sent to the server.
     */
    private convert(regimenlab: Regimenlab): Regimenlab {
        const copy: Regimenlab = Object.assign({}, regimenlab);

        copy.tFecreg = this.dateUtils.toDate(regimenlab.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(regimenlab.tFecupd);
        return copy;
    }
}
