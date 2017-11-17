import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Docexpedien } from './docexpedien.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DocexpedienService {

    private resourceUrl = '/defensa/api/docexpediens';
    private resourceSearchUrl = '/defensa/api/_search/docexpediens';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(docexpedien: Docexpedien): Observable<Docexpedien> {
        const copy = this.convert(docexpedien);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(docexpedien: Docexpedien): Observable<Docexpedien> {
        const copy = this.convert(docexpedien);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Docexpedien> {
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
     * Convert a returned JSON object to Docexpedien.
     */
    private convertItemFromServer(json: any): Docexpedien {
        const entity: Docexpedien = Object.assign(new Docexpedien(), json);
        entity.dFecha = this.dateUtils
            .convertDateTimeFromServer(json.dFecha);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Docexpedien to a JSON which can be sent to the server.
     */
    private convert(docexpedien: Docexpedien): Docexpedien {
        const copy: Docexpedien = Object.assign({}, docexpedien);

        copy.dFecha = this.dateUtils.toDate(docexpedien.dFecha);

        copy.dFechareg = this.dateUtils.toDate(docexpedien.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(docexpedien.dFechaupd);
        return copy;
    }
}
