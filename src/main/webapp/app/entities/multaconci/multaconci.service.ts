import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Multaconci } from './multaconci.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MultaconciService {

    private resourceUrl = '/defensa/api/multaconcis';
    private resourceSearchUrl = '/defensa/api/_search/multaconcis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(multaconci: Multaconci): Observable<Multaconci> {
        const copy = this.convert(multaconci);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(multaconci: Multaconci): Observable<Multaconci> {
        const copy = this.convert(multaconci);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Multaconci> {
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
     * Convert a returned JSON object to Multaconci.
     */
    private convertItemFromServer(json: any): Multaconci {
        const entity: Multaconci = Object.assign(new Multaconci(), json);
        entity.dFecresosd = this.dateUtils
            .convertLocalDateFromServer(json.dFecresosd);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Multaconci to a JSON which can be sent to the server.
     */
    private convert(multaconci: Multaconci): Multaconci {
        const copy: Multaconci = Object.assign({}, multaconci);
        copy.dFecresosd = this.dateUtils
            .convertLocalDateToServer(multaconci.dFecresosd);

        copy.tFecreg = this.dateUtils.toDate(multaconci.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(multaconci.tFecupd);
        return copy;
    }
}
