import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Resulconci } from './resulconci.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../../shared';

@Injectable()
export class ResulconciService {

    private resourceUrl = '/defensa/api/resulconcis';
    private resourceUrlTot = '/defensa/api/resulconcis/tot';
    private resourceSearchUrl = '/defensa/api/_search/resulconcis';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(resulconci: Resulconci): Observable<Resulconci> {
        const token = this.authServerProvider.getToken();
        resulconci.nUsuareg = 1;
        resulconci.nFlgactivo = true;
        resulconci.nSedereg = 1;
        const copy = this.convert(resulconci);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(resulconci: Resulconci): Observable<Resulconci> {
        const copy = this.convert(resulconci);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Resulconci> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlTot, options)
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
     * Convert a returned JSON object to Resulconci.
     */
    private convertItemFromServer(json: any): Resulconci {
        const entity: Resulconci = Object.assign(new Resulconci(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Resulconci to a JSON which can be sent to the server.
     */
    private convert(resulconci: Resulconci): Resulconci {
        const copy: Resulconci = Object.assign({}, resulconci);

        copy.tFecreg = this.dateUtils.toDate(resulconci.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(resulconci.tFecupd);
        return copy;
    }
}
