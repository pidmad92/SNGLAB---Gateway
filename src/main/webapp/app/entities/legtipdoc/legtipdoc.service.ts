import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Legtipdoc } from './legtipdoc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LegtipdocService {

    private resourceUrl = '/patrocinio/api/legtipdocs';
    private resourceSearchUrl = '/patrocinio/api/_search/legtipdocs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(legtipdoc: Legtipdoc): Observable<Legtipdoc> {
        const copy = this.convert(legtipdoc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(legtipdoc: Legtipdoc): Observable<Legtipdoc> {
        const copy = this.convert(legtipdoc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Legtipdoc> {
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
     * Convert a returned JSON object to Legtipdoc.
     */
    private convertItemFromServer(json: any): Legtipdoc {
        const entity: Legtipdoc = Object.assign(new Legtipdoc(), json);
        entity.dFecdoc = this.dateUtils
            .convertLocalDateFromServer(json.dFecdoc);
        entity.dFecentr = this.dateUtils
            .convertLocalDateFromServer(json.dFecentr);
        entity.dFecdev = this.dateUtils
            .convertLocalDateFromServer(json.dFecdev);
        entity.dFecrecjuz = this.dateUtils
            .convertLocalDateFromServer(json.dFecrecjuz);
        entity.dFecmod = this.dateUtils
            .convertLocalDateFromServer(json.dFecmod);
        entity.dFeccit = this.dateUtils
            .convertLocalDateFromServer(json.dFeccit);
        entity.dFecdocreq = this.dateUtils
            .convertLocalDateFromServer(json.dFecdocreq);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Legtipdoc to a JSON which can be sent to the server.
     */
    private convert(legtipdoc: Legtipdoc): Legtipdoc {
        const copy: Legtipdoc = Object.assign({}, legtipdoc);
        copy.dFecdoc = this.dateUtils
            .convertLocalDateToServer(legtipdoc.dFecdoc);
        copy.dFecentr = this.dateUtils
            .convertLocalDateToServer(legtipdoc.dFecentr);
        copy.dFecdev = this.dateUtils
            .convertLocalDateToServer(legtipdoc.dFecdev);
        copy.dFecrecjuz = this.dateUtils
            .convertLocalDateToServer(legtipdoc.dFecrecjuz);
        copy.dFecmod = this.dateUtils
            .convertLocalDateToServer(legtipdoc.dFecmod);
        copy.dFeccit = this.dateUtils
            .convertLocalDateToServer(legtipdoc.dFeccit);
        copy.dFecdocreq = this.dateUtils
            .convertLocalDateToServer(legtipdoc.dFecdocreq);

        copy.tFecreg = this.dateUtils.toDate(legtipdoc.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(legtipdoc.tFecupd);
        return copy;
    }
}
