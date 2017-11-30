import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Legajoasig } from './legajoasig.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LegajoasigService {

    private resourceUrl = '/patrocinio/api/legajoasigs';
    private resourceSearchUrl = '/patrocinio/api/_search/legajoasigs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(legajoasig: Legajoasig): Observable<Legajoasig> {
        const copy = this.convert(legajoasig);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(legajoasig: Legajoasig): Observable<Legajoasig> {
        const copy = this.convert(legajoasig);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Legajoasig> {
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
     * Convert a returned JSON object to Legajoasig.
     */
    private convertItemFromServer(json: any): Legajoasig {
        const entity: Legajoasig = Object.assign(new Legajoasig(), json);
        entity.dFecasig = this.dateUtils
            .convertLocalDateFromServer(json.dFecasig);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Legajoasig to a JSON which can be sent to the server.
     */
    private convert(legajoasig: Legajoasig): Legajoasig {
        const copy: Legajoasig = Object.assign({}, legajoasig);
        copy.dFecasig = this.dateUtils
            .convertLocalDateToServer(legajoasig.dFecasig);

        copy.tFecreg = this.dateUtils.toDate(legajoasig.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(legajoasig.tFecupd);
        return copy;
    }
}
