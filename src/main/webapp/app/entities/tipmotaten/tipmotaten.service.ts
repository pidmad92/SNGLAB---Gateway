import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipmotaten } from './tipmotaten.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipmotatenService {

    private resourceUrl = '/consultas/api/tipmotatens';
    private resourceSearchUrl = '/consultas/api/_search/tipmotatens';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipmotaten: Tipmotaten): Observable<Tipmotaten> {
        const copy = this.convert(tipmotaten);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipmotaten: Tipmotaten): Observable<Tipmotaten> {
        const copy = this.convert(tipmotaten);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipmotaten> {
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
     * Convert a returned JSON object to Tipmotaten.
     */
    private convertItemFromServer(json: any): Tipmotaten {
        const entity: Tipmotaten = Object.assign(new Tipmotaten(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipmotaten to a JSON which can be sent to the server.
     */
    private convert(tipmotaten: Tipmotaten): Tipmotaten {
        const copy: Tipmotaten = Object.assign({}, tipmotaten);

        copy.tFecreg = this.dateUtils.toDate(tipmotaten.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipmotaten.tFecupd);
        return copy;
    }
}
