import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Pernatudire } from './pernatudire.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PernatudireService {

    private resourceUrl = '/consultas/api/pernatudires';
    private resourceSearchUrl = '/consultas/api/_search/pernatudires';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pernatudire: Pernatudire): Observable<Pernatudire> {
        const copy = this.convert(pernatudire);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pernatudire: Pernatudire): Observable<Pernatudire> {
        const copy = this.convert(pernatudire);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pernatudire> {
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
     * Convert a returned JSON object to Pernatudire.
     */
    private convertItemFromServer(json: any): Pernatudire {
        const entity: Pernatudire = Object.assign(new Pernatudire(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Pernatudire to a JSON which can be sent to the server.
     */
    private convert(pernatudire: Pernatudire): Pernatudire {
        const copy: Pernatudire = Object.assign({}, pernatudire);

        copy.dFechareg = this.dateUtils.toDate(pernatudire.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(pernatudire.dFechaupd);
        return copy;
    }
}
