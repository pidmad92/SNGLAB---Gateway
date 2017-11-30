import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Szonal } from './szonal.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SzonalService {

    private resourceUrl = '/sindicatos/api/szonals';
    private resourceSearchUrl = '/sindicatos/api/_search/szonals';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(szonal: Szonal): Observable<Szonal> {
        const copy = this.convert(szonal);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(szonal: Szonal): Observable<Szonal> {
        const copy = this.convert(szonal);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Szonal> {
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
     * Convert a returned JSON object to Szonal.
     */
    private convertItemFromServer(json: any): Szonal {
        const entity: Szonal = Object.assign(new Szonal(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Szonal to a JSON which can be sent to the server.
     */
    private convert(szonal: Szonal): Szonal {
        const copy: Szonal = Object.assign({}, szonal);

        copy.tFecreg = this.dateUtils.toDate(szonal.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(szonal.tFecupd);
        return copy;
    }
}
