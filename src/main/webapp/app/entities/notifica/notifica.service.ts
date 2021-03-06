import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Notifica } from './notifica.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NotificaService {

    private resourceUrl = '/defensa/api/notificas';
    private resourceSearchUrl = '/defensa/api/_search/notificas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(notifica: Notifica): Observable<Notifica> {
        const copy = this.convert(notifica);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(notifica: Notifica): Observable<Notifica> {
        const copy = this.convert(notifica);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Notifica> {
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
     * Convert a returned JSON object to Notifica.
     */
    private convertItemFromServer(json: any): Notifica {
        const entity: Notifica = Object.assign(new Notifica(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Notifica to a JSON which can be sent to the server.
     */
    private convert(notifica: Notifica): Notifica {
        const copy: Notifica = Object.assign({}, notifica);

        copy.tFecreg = this.dateUtils.toDate(notifica.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(notifica.tFecupd);
        return copy;
    }
}
