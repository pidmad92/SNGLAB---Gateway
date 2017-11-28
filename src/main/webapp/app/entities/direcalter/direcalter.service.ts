import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Direcalter } from './direcalter.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DirecalterService {

    private resourceUrl = '/consultas/api/direcalters';
    private resourceSearchUrl = '/consultas/api/_search/direcalters';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(direcalter: Direcalter): Observable<Direcalter> {
        const copy = this.convert(direcalter);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(direcalter: Direcalter): Observable<Direcalter> {
        const copy = this.convert(direcalter);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Direcalter> {
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
     * Convert a returned JSON object to Direcalter.
     */
    private convertItemFromServer(json: any): Direcalter {
        const entity: Direcalter = Object.assign(new Direcalter(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Direcalter to a JSON which can be sent to the server.
     */
    private convert(direcalter: Direcalter): Direcalter {
        const copy: Direcalter = Object.assign({}, direcalter);

        copy.tFecreg = this.dateUtils.toDate(direcalter.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(direcalter.tFecupd);
        return copy;
    }
}
