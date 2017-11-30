import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Motatenofic } from './motatenofic.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class MotatenoficService {

    private resourceUrl = '/consultas/api/motatenofics';
    private resourceSearchUrl = '/consultas/api/_search/motatenofics';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(motatenofic: Motatenofic): Observable<Motatenofic> {
        const copy = this.convert(motatenofic);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(motatenofic: Motatenofic): Observable<Motatenofic> {
        const copy = this.convert(motatenofic);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Motatenofic> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    /** JH
     * DEVUELVE UN ARREGLO DE Motivos de Atencion en la Oficina.
     */
    findListaMotatenOfic(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/oficina/id/${id}`)
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
     * Convert a returned JSON object to Motatenofic.
     */
    private convertItemFromServer(json: any): Motatenofic {
        const entity: Motatenofic = Object.assign(new Motatenofic(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Motatenofic to a JSON which can be sent to the server.
     */
    private convert(motatenofic: Motatenofic): Motatenofic {
        const copy: Motatenofic = Object.assign({}, motatenofic);

        copy.tFecreg = this.dateUtils.toDate(motatenofic.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(motatenofic.tFecupd);
        return copy;
    }
}
