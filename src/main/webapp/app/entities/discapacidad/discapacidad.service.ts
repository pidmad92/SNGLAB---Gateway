import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Discapacidad } from './discapacidad.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DiscapacidadService {

    private resourceUrl = '/consultas/api/discapacidads';
    private resourceSearchUrl = '/consultas/api/_search/discapacidads';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(discapacidad: Discapacidad): Observable<Discapacidad> {
        const copy = this.convert(discapacidad);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(discapacidad: Discapacidad): Observable<Discapacidad> {
        const copy = this.convert(discapacidad);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Discapacidad> {
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
     * Convert a returned JSON object to Discapacidad.
     */
    private convertItemFromServer(json: any): Discapacidad {
        const entity: Discapacidad = Object.assign(new Discapacidad(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Discapacidad to a JSON which can be sent to the server.
     */
    private convert(discapacidad: Discapacidad): Discapacidad {
        const copy: Discapacidad = Object.assign({}, discapacidad);

        copy.dFechareg = this.dateUtils.toDate(discapacidad.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(discapacidad.dFechaupd);
        return copy;
    }
}
