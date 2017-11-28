import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Califica } from './califica.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CalificaService {

    private resourceUrl = '/denuncias/api/calificas';
    private resourceSearchUrl = '/denuncias/api/_search/calificas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(califica: Califica): Observable<Califica> {
        const copy = this.convert(califica);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(califica: Califica): Observable<Califica> {
        const copy = this.convert(califica);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Califica> {
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
     * Convert a returned JSON object to Califica.
     */
    private convertItemFromServer(json: any): Califica {
        const entity: Califica = Object.assign(new Califica(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Califica to a JSON which can be sent to the server.
     */
    private convert(califica: Califica): Califica {
        const copy: Califica = Object.assign({}, califica);

        copy.tFecreg = this.dateUtils.toDate(califica.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(califica.tFecupd);
        return copy;
    }
}
