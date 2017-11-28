import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Liquidacion } from './liquidacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LiquidacionService {

    private resourceUrl = '/liquidaciones/api/liquidacions';
    private resourceSearchUrl = '/liquidaciones/api/_search/liquidacions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(liquidacion: Liquidacion): Observable<Liquidacion> {
        const copy = this.convert(liquidacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(liquidacion: Liquidacion): Observable<Liquidacion> {
        const copy = this.convert(liquidacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Liquidacion> {
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
     * Convert a returned JSON object to Liquidacion.
     */
    private convertItemFromServer(json: any): Liquidacion {
        const entity: Liquidacion = Object.assign(new Liquidacion(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Liquidacion to a JSON which can be sent to the server.
     */
    private convert(liquidacion: Liquidacion): Liquidacion {
        const copy: Liquidacion = Object.assign({}, liquidacion);

        copy.tFecreg = this.dateUtils.toDate(liquidacion.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(liquidacion.tFecupd);
        return copy;
    }
}
