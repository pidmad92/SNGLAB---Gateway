import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Atencionpj } from './atencionpj.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AtencionpjService {

    private resourceUrl = '/patrocinio/api/atencionpjs';
    private resourceSearchUrl = '/patrocinio/api/_search/atencionpjs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(atencionpj: Atencionpj): Observable<Atencionpj> {
        const copy = this.convert(atencionpj);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(atencionpj: Atencionpj): Observable<Atencionpj> {
        const copy = this.convert(atencionpj);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Atencionpj> {
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
     * Convert a returned JSON object to Atencionpj.
     */
    private convertItemFromServer(json: any): Atencionpj {
        const entity: Atencionpj = Object.assign(new Atencionpj(), json);
        entity.dFecaten = this.dateUtils
            .convertLocalDateFromServer(json.dFecaten);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Atencionpj to a JSON which can be sent to the server.
     */
    private convert(atencionpj: Atencionpj): Atencionpj {
        const copy: Atencionpj = Object.assign({}, atencionpj);
        copy.dFecaten = this.dateUtils
            .convertLocalDateToServer(atencionpj.dFecaten);

        copy.tFecreg = this.dateUtils.toDate(atencionpj.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(atencionpj.tFecupd);
        return copy;
    }
}
