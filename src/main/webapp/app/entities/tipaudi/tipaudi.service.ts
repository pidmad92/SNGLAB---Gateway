import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipaudi } from './tipaudi.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipaudiService {

    private resourceUrl = '/patrocinio/api/tipaudis';
    private resourceSearchUrl = '/patrocinio/api/_search/tipaudis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipaudi: Tipaudi): Observable<Tipaudi> {
        const copy = this.convert(tipaudi);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipaudi: Tipaudi): Observable<Tipaudi> {
        const copy = this.convert(tipaudi);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipaudi> {
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
     * Convert a returned JSON object to Tipaudi.
     */
    private convertItemFromServer(json: any): Tipaudi {
        const entity: Tipaudi = Object.assign(new Tipaudi(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipaudi to a JSON which can be sent to the server.
     */
    private convert(tipaudi: Tipaudi): Tipaudi {
        const copy: Tipaudi = Object.assign({}, tipaudi);

        copy.tFecreg = this.dateUtils.toDate(tipaudi.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipaudi.tFecupd);
        return copy;
    }
}
