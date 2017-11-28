import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Infosoli } from './infosoli.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InfosoliService {

    private resourceUrl = '/denuncias/api/infosolis';
    private resourceSearchUrl = '/denuncias/api/_search/infosolis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(infosoli: Infosoli): Observable<Infosoli> {
        const copy = this.convert(infosoli);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(infosoli: Infosoli): Observable<Infosoli> {
        const copy = this.convert(infosoli);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Infosoli> {
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
     * Convert a returned JSON object to Infosoli.
     */
    private convertItemFromServer(json: any): Infosoli {
        const entity: Infosoli = Object.assign(new Infosoli(), json);
        entity.tFecsoli = this.dateUtils
            .convertDateTimeFromServer(json.tFecsoli);
        entity.tFecresp = this.dateUtils
            .convertDateTimeFromServer(json.tFecresp);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Infosoli to a JSON which can be sent to the server.
     */
    private convert(infosoli: Infosoli): Infosoli {
        const copy: Infosoli = Object.assign({}, infosoli);

        copy.tFecsoli = this.dateUtils.toDate(infosoli.tFecsoli);

        copy.tFecresp = this.dateUtils.toDate(infosoli.tFecresp);

        copy.tFecreg = this.dateUtils.toDate(infosoli.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(infosoli.tFecupd);
        return copy;
    }
}
