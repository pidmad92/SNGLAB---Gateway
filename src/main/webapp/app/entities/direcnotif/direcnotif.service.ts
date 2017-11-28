import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Direcnotif } from './direcnotif.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DirecnotifService {

    private resourceUrl = '/defensa/api/direcnotifs';
    private resourceSearchUrl = '/defensa/api/_search/direcnotifs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(direcnotif: Direcnotif): Observable<Direcnotif> {
        const copy = this.convert(direcnotif);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(direcnotif: Direcnotif): Observable<Direcnotif> {
        const copy = this.convert(direcnotif);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Direcnotif> {
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
     * Convert a returned JSON object to Direcnotif.
     */
    private convertItemFromServer(json: any): Direcnotif {
        const entity: Direcnotif = Object.assign(new Direcnotif(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Direcnotif to a JSON which can be sent to the server.
     */
    private convert(direcnotif: Direcnotif): Direcnotif {
        const copy: Direcnotif = Object.assign({}, direcnotif);

        copy.tFecreg = this.dateUtils.toDate(direcnotif.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(direcnotif.tFecupd);
        return copy;
    }
}
