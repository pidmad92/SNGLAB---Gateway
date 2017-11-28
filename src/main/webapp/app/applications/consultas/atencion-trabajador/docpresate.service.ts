import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Docpresate } from './docpresate.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class DocpresateService {

    private resourceUrl = '/consultas/api/docpresates';
    private resourceSearchUrl = '/consultas/api/_search/docpresates';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(docpresate: Docpresate): Observable<Docpresate> {
        const copy = this.convert(docpresate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(docpresate: Docpresate): Observable<Docpresate> {
        const copy = this.convert(docpresate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Docpresate> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    /** JH
     * DEVUELVE UN ARREGLO DE documentos presentados.
     */
    findListaDocpresate(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl)
        .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to Docpresate.
     */
    private convertItemFromServer(json: any): Docpresate {
        const entity: Docpresate = Object.assign(new Docpresate(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Docpresate to a JSON which can be sent to the server.
     */
    private convert(docpresate: Docpresate): Docpresate {
        const copy: Docpresate = Object.assign({}, docpresate);

        copy.tFecreg = this.dateUtils.toDate(docpresate.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(docpresate.tFecupd);
        return copy;
    }
}
