import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Dettipprov } from './dettipprov.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DettipprovService {

    private resourceUrl = '/defensa/api/dettipprovs';
    private resourceSearchUrl = '/defensa/api/_search/dettipprovs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(dettipprov: Dettipprov): Observable<Dettipprov> {
        const copy = this.convert(dettipprov);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dettipprov: Dettipprov): Observable<Dettipprov> {
        const copy = this.convert(dettipprov);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Dettipprov> {
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
     * Convert a returned JSON object to Dettipprov.
     */
    private convertItemFromServer(json: any): Dettipprov {
        const entity: Dettipprov = Object.assign(new Dettipprov(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Dettipprov to a JSON which can be sent to the server.
     */
    private convert(dettipprov: Dettipprov): Dettipprov {
        const copy: Dettipprov = Object.assign({}, dettipprov);

        copy.dFechareg = this.dateUtils.toDate(dettipprov.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(dettipprov.dFechaupd);
        return copy;
    }
}
