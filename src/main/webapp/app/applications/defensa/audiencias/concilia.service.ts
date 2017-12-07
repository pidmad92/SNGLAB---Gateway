import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Concilia } from './concilia.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class ConciliaService {

    private resourceUrl = '/defensa/api/concilias';
    private resourceSearchUrl = '/defensa/api/_search/concilias';
    private resourceUrlFecha = '/defensa/api/concilias/fecha';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(concilia: Concilia): Observable<Concilia> {
        const copy = this.convert(concilia);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(concilia: Concilia): Observable<Concilia> {
        const copy = this.convert(concilia);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Concilia> {
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

    SearfechaVar(fecha?: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrlFecha}/${fecha}`)
            .map((res: any) => this.convertResponse(res));
    }

    searfecha(fecha?: any): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrlFecha)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        console.log('Convert');
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Concilia.
     */
    private convertItemFromServer(json: any): Concilia {
        const entity: Concilia = Object.assign(new Concilia(), json);
        entity.dFecconci = this.dateUtils
            .convertLocalDateFromServer(json.dFecconci);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Concilia to a JSON which can be sent to the server.
     */
    private convert(concilia: Concilia): Concilia {
        const copy: Concilia = Object.assign({}, concilia);
        copy.dFecconci = this.dateUtils
            .convertLocalDateToServer(concilia.dFecconci);

        copy.tFecreg = this.dateUtils.toDate(concilia.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(concilia.tFecupd);
        return copy;
    }
}
