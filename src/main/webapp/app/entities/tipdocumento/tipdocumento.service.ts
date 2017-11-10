import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipdocumento } from './tipdocumento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipdocumentoService {

    private resourceUrl = '/consultas/api/tipdocumentos';
    private resourceSearchUrl = '/consultas/api/_search/tipdocumentos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipdocumento: Tipdocumento): Observable<Tipdocumento> {
        const copy = this.convert(tipdocumento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipdocumento: Tipdocumento): Observable<Tipdocumento> {
        const copy = this.convert(tipdocumento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipdocumento> {
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
     * Convert a returned JSON object to Tipdocumento.
     */
    private convertItemFromServer(json: any): Tipdocumento {
        const entity: Tipdocumento = Object.assign(new Tipdocumento(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Tipdocumento to a JSON which can be sent to the server.
     */
    private convert(tipdocumento: Tipdocumento): Tipdocumento {
        const copy: Tipdocumento = Object.assign({}, tipdocumento);

        copy.dFechareg = this.dateUtils.toDate(tipdocumento.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(tipdocumento.dFechaupd);
        return copy;
    }
}
