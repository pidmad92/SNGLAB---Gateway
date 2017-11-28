import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Legajo } from './legajo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LegajoService {

    private resourceUrl = '/patrocinio/api/legajos';
    private resourceSearchUrl = '/patrocinio/api/_search/legajos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(legajo: Legajo): Observable<Legajo> {
        const copy = this.convert(legajo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(legajo: Legajo): Observable<Legajo> {
        const copy = this.convert(legajo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Legajo> {
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
     * Convert a returned JSON object to Legajo.
     */
    private convertItemFromServer(json: any): Legajo {
        const entity: Legajo = Object.assign(new Legajo(), json);
        entity.dFecconc = this.dateUtils
            .convertLocalDateFromServer(json.dFecconc);
        entity.dFecmod = this.dateUtils
            .convertLocalDateFromServer(json.dFecmod);
        entity.dFecexp = this.dateUtils
            .convertLocalDateFromServer(json.dFecexp);
        entity.dFecexpda = this.dateUtils
            .convertLocalDateFromServer(json.dFecexpda);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Legajo to a JSON which can be sent to the server.
     */
    private convert(legajo: Legajo): Legajo {
        const copy: Legajo = Object.assign({}, legajo);
        copy.dFecconc = this.dateUtils
            .convertLocalDateToServer(legajo.dFecconc);
        copy.dFecmod = this.dateUtils
            .convertLocalDateToServer(legajo.dFecmod);
        copy.dFecexp = this.dateUtils
            .convertLocalDateToServer(legajo.dFecexp);
        copy.dFecexpda = this.dateUtils
            .convertLocalDateToServer(legajo.dFecexpda);

        copy.tFecreg = this.dateUtils.toDate(legajo.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(legajo.tFecupd);
        return copy;
    }
}
