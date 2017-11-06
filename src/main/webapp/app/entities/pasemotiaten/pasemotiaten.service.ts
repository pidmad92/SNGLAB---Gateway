import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Pasemotiaten } from './pasemotiaten.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PasemotiatenService {

    private resourceUrl = '/consultas/api/pasemotiatens';
    private resourceSearchUrl = '/consultas/api/_search/pasemotiatens';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pasemotiaten: Pasemotiaten): Observable<Pasemotiaten> {
        const copy = this.convert(pasemotiaten);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pasemotiaten: Pasemotiaten): Observable<Pasemotiaten> {
        const copy = this.convert(pasemotiaten);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pasemotiaten> {
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
     * Convert a returned JSON object to Pasemotiaten.
     */
    private convertItemFromServer(json: any): Pasemotiaten {
        const entity: Pasemotiaten = Object.assign(new Pasemotiaten(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Pasemotiaten to a JSON which can be sent to the server.
     */
    private convert(pasemotiaten: Pasemotiaten): Pasemotiaten {
        const copy: Pasemotiaten = Object.assign({}, pasemotiaten);

        copy.dFechareg = this.dateUtils.toDate(pasemotiaten.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(pasemotiaten.dFechaupd);
        return copy;
    }
}
