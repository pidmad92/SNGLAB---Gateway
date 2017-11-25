import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Motateselec } from './motateselec.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MotateselecService {

    private resourceUrl = '/consultas/api/motateselecs';
    private resourceSearchUrl = '/consultas/api/_search/motateselecs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(motateselec: Motateselec): Observable<Motateselec> {
        const copy = this.convert(motateselec);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(motateselec: Motateselec): Observable<Motateselec> {
        const copy = this.convert(motateselec);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Motateselec> {
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
     * Convert a returned JSON object to Motateselec.
     */
    private convertItemFromServer(json: any): Motateselec {
        const entity: Motateselec = Object.assign(new Motateselec(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Motateselec to a JSON which can be sent to the server.
     */
    private convert(motateselec: Motateselec): Motateselec {
        const copy: Motateselec = Object.assign({}, motateselec);

        copy.tFecreg = this.dateUtils.toDate(motateselec.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(motateselec.tFecupd);
        return copy;
    }
}
