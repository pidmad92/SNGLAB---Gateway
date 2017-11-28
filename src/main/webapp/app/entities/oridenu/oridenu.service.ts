import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Oridenu } from './oridenu.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OridenuService {

    private resourceUrl = '/denuncias/api/oridenus';
    private resourceSearchUrl = '/denuncias/api/_search/oridenus';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(oridenu: Oridenu): Observable<Oridenu> {
        const copy = this.convert(oridenu);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(oridenu: Oridenu): Observable<Oridenu> {
        const copy = this.convert(oridenu);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Oridenu> {
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
     * Convert a returned JSON object to Oridenu.
     */
    private convertItemFromServer(json: any): Oridenu {
        const entity: Oridenu = Object.assign(new Oridenu(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Oridenu to a JSON which can be sent to the server.
     */
    private convert(oridenu: Oridenu): Oridenu {
        const copy: Oridenu = Object.assign({}, oridenu);

        copy.tFecreg = this.dateUtils.toDate(oridenu.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(oridenu.tFecupd);
        return copy;
    }
}
