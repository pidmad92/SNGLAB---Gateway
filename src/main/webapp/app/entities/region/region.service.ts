import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Region } from './region.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RegionService {

    private resourceUrl = '/sindicatos/api/regions';
    private resourceSearchUrl = '/sindicatos/api/_search/regions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(region: Region): Observable<Region> {
        const copy = this.convert(region);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(region: Region): Observable<Region> {
        const copy = this.convert(region);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Region> {
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
     * Convert a returned JSON object to Region.
     */
    private convertItemFromServer(json: any): Region {
        const entity: Region = Object.assign(new Region(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Region to a JSON which can be sent to the server.
     */
    private convert(region: Region): Region {
        const copy: Region = Object.assign({}, region);

        copy.tFecreg = this.dateUtils.toDate(region.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(region.tFecupd);
        return copy;
    }
}
