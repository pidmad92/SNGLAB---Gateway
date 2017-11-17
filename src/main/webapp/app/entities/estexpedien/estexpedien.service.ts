import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Estexpedien } from './estexpedien.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EstexpedienService {

    private resourceUrl = '/defensa/api/estexpediens';
    private resourceSearchUrl = '/defensa/api/_search/estexpediens';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(estexpedien: Estexpedien): Observable<Estexpedien> {
        const copy = this.convert(estexpedien);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(estexpedien: Estexpedien): Observable<Estexpedien> {
        const copy = this.convert(estexpedien);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Estexpedien> {
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
     * Convert a returned JSON object to Estexpedien.
     */
    private convertItemFromServer(json: any): Estexpedien {
        const entity: Estexpedien = Object.assign(new Estexpedien(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Estexpedien to a JSON which can be sent to the server.
     */
    private convert(estexpedien: Estexpedien): Estexpedien {
        const copy: Estexpedien = Object.assign({}, estexpedien);

        copy.dFechareg = this.dateUtils.toDate(estexpedien.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(estexpedien.dFechaupd);
        return copy;
    }
}
