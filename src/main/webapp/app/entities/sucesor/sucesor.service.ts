import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Sucesor } from './sucesor.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SucesorService {

    private resourceUrl = '/consultas/api/sucesors';
    private resourceSearchUrl = '/consultas/api/_search/sucesors';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(sucesor: Sucesor): Observable<Sucesor> {
        const copy = this.convert(sucesor);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sucesor: Sucesor): Observable<Sucesor> {
        const copy = this.convert(sucesor);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Sucesor> {
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
     * Convert a returned JSON object to Sucesor.
     */
    private convertItemFromServer(json: any): Sucesor {
        const entity: Sucesor = Object.assign(new Sucesor(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Sucesor to a JSON which can be sent to the server.
     */
    private convert(sucesor: Sucesor): Sucesor {
        const copy: Sucesor = Object.assign({}, sucesor);

        copy.tFecreg = this.dateUtils.toDate(sucesor.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(sucesor.tFecupd);
        return copy;
    }
}
