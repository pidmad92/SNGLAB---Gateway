import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Calidenu } from './calidenu.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CalidenuService {

    private resourceUrl = '/denuncias/api/calidenus';
    private resourceSearchUrl = '/denuncias/api/_search/calidenus';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(calidenu: Calidenu): Observable<Calidenu> {
        const copy = this.convert(calidenu);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(calidenu: Calidenu): Observable<Calidenu> {
        const copy = this.convert(calidenu);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Calidenu> {
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
     * Convert a returned JSON object to Calidenu.
     */
    private convertItemFromServer(json: any): Calidenu {
        const entity: Calidenu = Object.assign(new Calidenu(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Calidenu to a JSON which can be sent to the server.
     */
    private convert(calidenu: Calidenu): Calidenu {
        const copy: Calidenu = Object.assign({}, calidenu);

        copy.tFecreg = this.dateUtils.toDate(calidenu.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(calidenu.tFecupd);
        return copy;
    }
}
