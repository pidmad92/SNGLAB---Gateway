import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Pasegl } from './pasegl.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../../shared';

@Injectable()
export class RegistroExpedienteService {

    private resourceUrl = '/defensa/api/resulconcis';
    private resourceUrlTot = '/defensa/api/resulconcis/tot';
    private resourceSearchUrl = '/defensa/api/_search/resulconcis';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(pasegl: Pasegl): Observable<Pasegl> {
        const token = this.authServerProvider.getToken();
        pasegl.nUsuareg = 1;
        pasegl.nFlgactivo = true;
        pasegl.nSedereg = 1;
        const copy = this.convert(pasegl);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pasegl: Pasegl): Observable<Pasegl> {
        const copy = this.convert(pasegl);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    updateLogic(pasegl: Pasegl): Observable<Pasegl> {
        pasegl.nFlgactivo = false;
        const copy = this.convert(pasegl);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pasegl> {
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
    private convertItemFromServer(json: any): Pasegl {
        const entity: Pasegl = Object.assign(new Pasegl(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Resulconci to a JSON which can be sent to the server.
     */
    private convert(resulconci: Pasegl): Pasegl {
        const copy: Pasegl = Object.assign({}, resulconci);

        copy.tFecreg = this.dateUtils.toDate(resulconci.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(resulconci.tFecupd);
        return copy;
    }
}
