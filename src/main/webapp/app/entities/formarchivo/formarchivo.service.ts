import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Formarchivo } from './formarchivo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FormarchivoService {

    private resourceDictamenes = 'dictamenes/';
    private resourceUrl = SERVER_API_URL + this.resourceDictamenes +  'api/formarchivos';
    private resourceSearchUrl = SERVER_API_URL + this.resourceDictamenes +  'api/_search/formarchivos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(formarchivo: Formarchivo): Observable<Formarchivo> {
        const copy = this.convert(formarchivo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(formarchivo: Formarchivo): Observable<Formarchivo> {
        const copy = this.convert(formarchivo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Formarchivo> {
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
     * Convert a returned JSON object to Formarchivo.
     */
    private convertItemFromServer(json: any): Formarchivo {
        const entity: Formarchivo = Object.assign(new Formarchivo(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Formarchivo to a JSON which can be sent to the server.
     */
    private convert(formarchivo: Formarchivo): Formarchivo {
        const copy: Formarchivo = Object.assign({}, formarchivo);

        copy.tFecreg = this.dateUtils.toDate(formarchivo.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(formarchivo.tFecupd);
        return copy;
    }
}
