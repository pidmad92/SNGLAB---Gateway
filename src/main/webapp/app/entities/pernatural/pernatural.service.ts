import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Pernatural } from './pernatural.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PernaturalService {

    private resourceUrl = '/consultas/api/pernaturals';
    private resourceSearchUrl = '/consultas/api/_search/pernaturals';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pernatural: Pernatural): Observable<Pernatural> {
        const copy = this.convert(pernatural);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pernatural: Pernatural): Observable<Pernatural> {
        const copy = this.convert(pernatural);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pernatural> {
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
     * Convert a returned JSON object to Pernatural.
     */
    private convertItemFromServer(json: any): Pernatural {
        const entity: Pernatural = Object.assign(new Pernatural(), json);
        entity.dFecnac = this.dateUtils
            .convertLocalDateFromServer(json.dFecnac);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Pernatural to a JSON which can be sent to the server.
     */
    private convert(pernatural: Pernatural): Pernatural {
        const copy: Pernatural = Object.assign({}, pernatural);
        copy.dFecnac = this.dateUtils
            .convertLocalDateToServer(pernatural.dFecnac);

        copy.tFecreg = this.dateUtils.toDate(pernatural.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(pernatural.tFecupd);
        return copy;
    }
}
