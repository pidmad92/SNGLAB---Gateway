import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Modacontrato } from './modacontrato.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ModacontratoService {

    private resourceUrl = '/consultas/api/modacontratoes';
    private resourceSearchUrl = '/consultas/api/_search/modacontratoes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(modacontrato: Modacontrato): Observable<Modacontrato> {
        const copy = this.convert(modacontrato);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(modacontrato: Modacontrato): Observable<Modacontrato> {
        const copy = this.convert(modacontrato);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Modacontrato> {
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
     * Convert a returned JSON object to Modacontrato.
     */
    private convertItemFromServer(json: any): Modacontrato {
        const entity: Modacontrato = Object.assign(new Modacontrato(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Modacontrato to a JSON which can be sent to the server.
     */
    private convert(modacontrato: Modacontrato): Modacontrato {
        const copy: Modacontrato = Object.assign({}, modacontrato);

        copy.dFechareg = this.dateUtils.toDate(modacontrato.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(modacontrato.dFechaupd);
        return copy;
    }
}
