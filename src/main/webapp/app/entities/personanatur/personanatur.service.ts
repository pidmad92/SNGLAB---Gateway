import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Personanatur } from './personanatur.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PersonanaturService {

    private resourceUrl = '/consultas/api/personanaturs';
    private resourceSearchUrl = '/consultas/api/_search/personanaturs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(personanatur: Personanatur): Observable<Personanatur> {
        const copy = this.convert(personanatur);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(personanatur: Personanatur): Observable<Personanatur> {
        const copy = this.convert(personanatur);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Personanatur> {
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
     * Convert a returned JSON object to Personanatur.
     */
    private convertItemFromServer(json: any): Personanatur {
        const entity: Personanatur = Object.assign(new Personanatur(), json);
        entity.dFecnacimiento = this.dateUtils
            .convertDateTimeFromServer(json.dFecnacimiento);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Personanatur to a JSON which can be sent to the server.
     */
    private convert(personanatur: Personanatur): Personanatur {
        const copy: Personanatur = Object.assign({}, personanatur);

        copy.dFecnacimiento = this.dateUtils.toDate(personanatur.dFecnacimiento);

        copy.dFechareg = this.dateUtils.toDate(personanatur.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(personanatur.dFechaupd);
        return copy;
    }
}
