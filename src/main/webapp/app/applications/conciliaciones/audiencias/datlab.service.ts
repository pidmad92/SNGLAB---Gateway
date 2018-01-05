import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Datlab } from './datlab.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class DatlabService {

    private resourceUrl = '/consultas/api/datlabs';
    private resourceSearchUrl = '/consultas/api/_search/datlabs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(datlab: Datlab): Observable<Datlab> {
        const copy = this.convert(datlab);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(datlab: Datlab): Observable<Datlab> {
        const copy = this.convert(datlab);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Datlab> {
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
     * Convert a returned JSON object to Datlab.
     */
    private convertItemFromServer(json: any): Datlab {
        const entity: Datlab = Object.assign(new Datlab(), json);
        entity.dFecvincul = this.dateUtils
            .convertLocalDateFromServer(json.dFecvincul);
        entity.dFeccese = this.dateUtils
            .convertLocalDateFromServer(json.dFeccese);
        entity.dFecfincon = this.dateUtils
            .convertLocalDateFromServer(json.dFecfincon);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Datlab to a JSON which can be sent to the server.
     */
    private convert(datlab: Datlab): Datlab {
        const copy: Datlab = Object.assign({}, datlab);
        copy.dFecvincul = this.dateUtils
            .convertLocalDateToServer(datlab.dFecvincul);
        copy.dFeccese = this.dateUtils
            .convertLocalDateToServer(datlab.dFeccese);
        copy.dFecfincon = this.dateUtils
            .convertLocalDateToServer(datlab.dFecfincon);

        copy.tFecreg = this.dateUtils.toDate(datlab.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(datlab.tFecupd);
        return copy;
    }
}
