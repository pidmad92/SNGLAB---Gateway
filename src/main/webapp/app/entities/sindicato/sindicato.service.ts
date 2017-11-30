import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Sindicato } from './sindicato.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SindicatoService {

    private resourceUrl = '/sindicatos/api/sindicatoes';
    private resourceSearchUrl = '/sindicatos/api/_search/sindicatoes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(sindicato: Sindicato): Observable<Sindicato> {
        const copy = this.convert(sindicato);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sindicato: Sindicato): Observable<Sindicato> {
        const copy = this.convert(sindicato);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Sindicato> {
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
     * Convert a returned JSON object to Sindicato.
     */
    private convertItemFromServer(json: any): Sindicato {
        const entity: Sindicato = Object.assign(new Sindicato(), json);
        entity.tFecafilia = this.dateUtils
            .convertDateTimeFromServer(json.tFecafilia);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Sindicato to a JSON which can be sent to the server.
     */
    private convert(sindicato: Sindicato): Sindicato {
        const copy: Sindicato = Object.assign({}, sindicato);

        copy.tFecafilia = this.dateUtils.toDate(sindicato.tFecafilia);

        copy.tFecreg = this.dateUtils.toDate(sindicato.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(sindicato.tFecupd);
        return copy;
    }
}
