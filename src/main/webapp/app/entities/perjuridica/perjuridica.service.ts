import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Perjuridica } from './perjuridica.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PerjuridicaService {

    private resourceUrl = '/consultas/api/perjuridicas';
    private resourceSearchUrl = '/consultas/api/_search/perjuridicas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(perjuridica: Perjuridica): Observable<Perjuridica> {
        const copy = this.convert(perjuridica);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(perjuridica: Perjuridica): Observable<Perjuridica> {
        const copy = this.convert(perjuridica);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Perjuridica> {
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
     * Convert a returned JSON object to Perjuridica.
     */
    private convertItemFromServer(json: any): Perjuridica {
        const entity: Perjuridica = Object.assign(new Perjuridica(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Perjuridica to a JSON which can be sent to the server.
     */
    private convert(perjuridica: Perjuridica): Perjuridica {
        const copy: Perjuridica = Object.assign({}, perjuridica);

        copy.tFecreg = this.dateUtils.toDate(perjuridica.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(perjuridica.tFecupd);
        return copy;
    }
}
