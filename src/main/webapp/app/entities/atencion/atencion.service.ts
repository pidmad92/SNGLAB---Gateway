import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Atencion } from './atencion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AtencionService {

    private resourceUrl = '/consultas/api/atencions';
    private resourceSearchUrl = '/consultas/api/_search/atencions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(atencion: Atencion): Observable<Atencion> {
        const copy = this.convert(atencion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(atencion: Atencion): Observable<Atencion> {
        const copy = this.convert(atencion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Atencion> {
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
     * Convert a returned JSON object to Atencion.
     */
    private convertItemFromServer(json: any): Atencion {
        const entity: Atencion = Object.assign(new Atencion(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Atencion to a JSON which can be sent to the server.
     */
    private convert(atencion: Atencion): Atencion {
        const copy: Atencion = Object.assign({}, atencion);

        copy.dFechareg = this.dateUtils.toDate(atencion.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(atencion.dFechaupd);
        return copy;
    }
}
