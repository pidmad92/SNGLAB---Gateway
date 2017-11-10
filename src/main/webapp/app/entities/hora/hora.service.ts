import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Hora } from './hora.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class HoraService {

    private resourceUrl = '/defensa/api/horas';
    private resourceSearchUrl = '/defensa/api/_search/horas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(hora: Hora): Observable<Hora> {
        const copy = this.convert(hora);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(hora: Hora): Observable<Hora> {
        const copy = this.convert(hora);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Hora> {
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
     * Convert a returned JSON object to Hora.
     */
    private convertItemFromServer(json: any): Hora {
        const entity: Hora = Object.assign(new Hora(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Hora to a JSON which can be sent to the server.
     */
    private convert(hora: Hora): Hora {
        const copy: Hora = Object.assign({}, hora);

        copy.dFechareg = this.dateUtils.toDate(hora.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(hora.dFechaupd);
        return copy;
    }
}
