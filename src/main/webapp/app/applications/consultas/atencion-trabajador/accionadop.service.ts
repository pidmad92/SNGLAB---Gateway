import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Accionadop } from './accionadop.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class AccionadopService {

    private resourceUrl = '/consultas/api/accionadops';
    private resourceSearchUrl = '/consultas/api/_search/accionadops';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(accionadop: Accionadop): Observable<Accionadop> {
        const copy = this.convert(accionadop);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(accionadop: Accionadop): Observable<Accionadop> {
        const copy = this.convert(accionadop);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Accionadop> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    /** JH
     * DEVUELVE UN ARREGLO DE Acciones adoptadas.
     */
    findListaAccionAdoptada(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl)
        .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to Accionadop.
     */
    private convertItemFromServer(json: any): Accionadop {
        const entity: Accionadop = Object.assign(new Accionadop(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Accionadop to a JSON which can be sent to the server.
     */
    private convert(accionadop: Accionadop): Accionadop {
        const copy: Accionadop = Object.assign({}, accionadop);

        copy.tFecreg = this.dateUtils.toDate(accionadop.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(accionadop.tFecupd);
        return copy;
    }
}
