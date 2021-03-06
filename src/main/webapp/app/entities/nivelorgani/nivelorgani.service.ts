import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Nivelorgani } from './nivelorgani.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NivelorganiService {

    private resourceUrl = '/sindicatos/api/nivelorganis';
    private resourceSearchUrl = '/sindicatos/api/_search/nivelorganis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(nivelorgani: Nivelorgani): Observable<Nivelorgani> {
        const copy = this.convert(nivelorgani);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(nivelorgani: Nivelorgani): Observable<Nivelorgani> {
        const copy = this.convert(nivelorgani);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Nivelorgani> {
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
     * Convert a returned JSON object to Nivelorgani.
     */
    private convertItemFromServer(json: any): Nivelorgani {
        const entity: Nivelorgani = Object.assign(new Nivelorgani(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Nivelorgani to a JSON which can be sent to the server.
     */
    private convert(nivelorgani: Nivelorgani): Nivelorgani {
        const copy: Nivelorgani = Object.assign({}, nivelorgani);

        copy.tFecreg = this.dateUtils.toDate(nivelorgani.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(nivelorgani.tFecupd);
        return copy;
    }
}
