import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Reporteres } from './reporteres.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ReporteresService {

    private resourceUrl = SERVER_API_URL + '/dictamenes/api/reporteres';
    private resourceSearchUrl = SERVER_API_URL + '/dictamenes/api/_search/reporteres';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(reporteres: Reporteres): Observable<Reporteres> {
        const copy = this.convert(reporteres);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(reporteres: Reporteres): Observable<Reporteres> {
        const copy = this.convert(reporteres);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Reporteres> {
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
     * Convert a returned JSON object to Reporteres.
     */
    private convertItemFromServer(json: any): Reporteres {
        const entity: Reporteres = Object.assign(new Reporteres(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Reporteres to a JSON which can be sent to the server.
     */
    private convert(reporteres: Reporteres): Reporteres {
        const copy: Reporteres = Object.assign({}, reporteres);

        copy.tFecreg = this.dateUtils.toDate(reporteres.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(reporteres.tFecupd);
        return copy;
    }
}
