import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Regimenlabo } from './regimenlabo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RegimenlaboService {

    private resourceUrl = '/consultas/api/regimenlabos';
    private resourceSearchUrl = '/consultas/api/_search/regimenlabos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(regimenlabo: Regimenlabo): Observable<Regimenlabo> {
        const copy = this.convert(regimenlabo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(regimenlabo: Regimenlabo): Observable<Regimenlabo> {
        const copy = this.convert(regimenlabo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Regimenlabo> {
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
     * Convert a returned JSON object to Regimenlabo.
     */
    private convertItemFromServer(json: any): Regimenlabo {
        const entity: Regimenlabo = Object.assign(new Regimenlabo(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Regimenlabo to a JSON which can be sent to the server.
     */
    private convert(regimenlabo: Regimenlabo): Regimenlabo {
        const copy: Regimenlabo = Object.assign({}, regimenlabo);

        copy.dFechareg = this.dateUtils.toDate(regimenlabo.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(regimenlabo.dFechaupd);
        return copy;
    }
}
