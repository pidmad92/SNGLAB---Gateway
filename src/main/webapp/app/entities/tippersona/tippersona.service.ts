import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tippersona } from './tippersona.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TippersonaService {

    private resourceUrl = '/consultas/api/tippersonas';
    private resourceSearchUrl = '/consultas/api/_search/tippersonas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tippersona: Tippersona): Observable<Tippersona> {
        const copy = this.convert(tippersona);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tippersona: Tippersona): Observable<Tippersona> {
        const copy = this.convert(tippersona);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tippersona> {
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
     * Convert a returned JSON object to Tippersona.
     */
    private convertItemFromServer(json: any): Tippersona {
        const entity: Tippersona = Object.assign(new Tippersona(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tippersona to a JSON which can be sent to the server.
     */
    private convert(tippersona: Tippersona): Tippersona {
        const copy: Tippersona = Object.assign({}, tippersona);

        copy.tFecreg = this.dateUtils.toDate(tippersona.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tippersona.tFecupd);
        return copy;
    }
}
