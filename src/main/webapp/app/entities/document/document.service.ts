import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Document } from './document.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DocumentService {

    private resourceUrl = '/sindicatos/api/documents';
    private resourceSearchUrl = '/sindicatos/api/_search/documents';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(document: Document): Observable<Document> {
        const copy = this.convert(document);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(document: Document): Observable<Document> {
        const copy = this.convert(document);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Document> {
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
     * Convert a returned JSON object to Document.
     */
    private convertItemFromServer(json: any): Document {
        const entity: Document = Object.assign(new Document(), json);
        entity.tFecregist = this.dateUtils
            .convertDateTimeFromServer(json.tFecregist);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Document to a JSON which can be sent to the server.
     */
    private convert(document: Document): Document {
        const copy: Document = Object.assign({}, document);

        copy.tFecregist = this.dateUtils.toDate(document.tFecregist);

        copy.tFecreg = this.dateUtils.toDate(document.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(document.tFecupd);
        return copy;
    }
}
