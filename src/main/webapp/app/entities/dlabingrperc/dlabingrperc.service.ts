import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Dlabingrperc } from './dlabingrperc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DlabingrpercService {

    private resourceUrl = '/consultas/api/dlabingrpercs';
    private resourceSearchUrl = '/consultas/api/_search/dlabingrpercs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(dlabingrperc: Dlabingrperc): Observable<Dlabingrperc> {
        const copy = this.convert(dlabingrperc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dlabingrperc: Dlabingrperc): Observable<Dlabingrperc> {
        const copy = this.convert(dlabingrperc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Dlabingrperc> {
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
     * Convert a returned JSON object to Dlabingrperc.
     */
    private convertItemFromServer(json: any): Dlabingrperc {
        const entity: Dlabingrperc = Object.assign(new Dlabingrperc(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Dlabingrperc to a JSON which can be sent to the server.
     */
    private convert(dlabingrperc: Dlabingrperc): Dlabingrperc {
        const copy: Dlabingrperc = Object.assign({}, dlabingrperc);

        copy.dFechareg = this.dateUtils.toDate(dlabingrperc.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(dlabingrperc.dFechaupd);
        return copy;
    }
}
