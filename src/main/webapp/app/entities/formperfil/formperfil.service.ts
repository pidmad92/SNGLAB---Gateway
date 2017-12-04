import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Formperfil } from './formperfil.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FormperfilService {

    private resourceUrl = SERVER_API_URL + 'api/formperfils';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/formperfils';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(formperfil: Formperfil): Observable<Formperfil> {
        const copy = this.convert(formperfil);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(formperfil: Formperfil): Observable<Formperfil> {
        const copy = this.convert(formperfil);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Formperfil> {
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
     * Convert a returned JSON object to Formperfil.
     */
    private convertItemFromServer(json: any): Formperfil {
        const entity: Formperfil = Object.assign(new Formperfil(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Formperfil to a JSON which can be sent to the server.
     */
    private convert(formperfil: Formperfil): Formperfil {
        const copy: Formperfil = Object.assign({}, formperfil);

        copy.tFecreg = this.dateUtils.toDate(formperfil.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(formperfil.tFecupd);
        return copy;
    }

}
