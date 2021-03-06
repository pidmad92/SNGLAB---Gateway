import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Notificacion } from './notificacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NotificacionService {

    private resourceUrl = '/defensa/api/notificacions';
    private resourceSearchUrl = '/defensa/api/_search/notificacions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(notificacion: Notificacion): Observable<Notificacion> {
        const copy = this.convert(notificacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(notificacion: Notificacion): Observable<Notificacion> {
        const copy = this.convert(notificacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Notificacion> {
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
     * Convert a returned JSON object to Notificacion.
     */
    private convertItemFromServer(json: any): Notificacion {
        const entity: Notificacion = Object.assign(new Notificacion(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Notificacion to a JSON which can be sent to the server.
     */
    private convert(notificacion: Notificacion): Notificacion {
        const copy: Notificacion = Object.assign({}, notificacion);

        copy.dFechareg = this.dateUtils.toDate(notificacion.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(notificacion.dFechaupd);
        return copy;
    }
}
