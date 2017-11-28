import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Docinperdlb } from './docinperdlb.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DocinperdlbService {

    private resourceUrl = '/consultas/api/docinperdlbs';
    private resourceSearchUrl = '/consultas/api/_search/docinperdlbs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(docinperdlb: Docinperdlb): Observable<Docinperdlb> {
        const copy = this.convert(docinperdlb);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(docinperdlb: Docinperdlb): Observable<Docinperdlb> {
        const copy = this.convert(docinperdlb);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Docinperdlb> {
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
     * Convert a returned JSON object to Docinperdlb.
     */
    private convertItemFromServer(json: any): Docinperdlb {
        const entity: Docinperdlb = Object.assign(new Docinperdlb(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Docinperdlb to a JSON which can be sent to the server.
     */
    private convert(docinperdlb: Docinperdlb): Docinperdlb {
        const copy: Docinperdlb = Object.assign({}, docinperdlb);

        copy.tFecreg = this.dateUtils.toDate(docinperdlb.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(docinperdlb.tFecupd);
        return copy;
    }
}
