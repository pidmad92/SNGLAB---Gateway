import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Horacon } from './horacon.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class HoraconService {

    private resourceUrl = '/defensa/api/horacons';
    private resourceSearchUrl = '/defensa/api/_search/horacons';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(horacon: Horacon): Observable<Horacon> {
        const copy = this.convert(horacon);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(horacon: Horacon): Observable<Horacon> {
        const copy = this.convert(horacon);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Horacon> {
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
     * Convert a returned JSON object to Horacon.
     */
    private convertItemFromServer(json: any): Horacon {
        const entity: Horacon = Object.assign(new Horacon(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Horacon to a JSON which can be sent to the server.
     */
    private convert(horacon: Horacon): Horacon {
        const copy: Horacon = Object.assign({}, horacon);

        copy.tFecreg = this.dateUtils.toDate(horacon.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(horacon.tFecupd);
        return copy;
    }
}
