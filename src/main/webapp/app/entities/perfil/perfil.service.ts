import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Perfil } from './perfil.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PerfilService {

    private resourceUrl = '/seguridad/api/perfils';
    private resourceSearchUrl = '/seguridad/api/_search/perfils';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(perfil: Perfil): Observable<Perfil> {
        const copy = this.convert(perfil);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(perfil: Perfil): Observable<Perfil> {
        const copy = this.convert(perfil);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Perfil> {
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
     * Convert a returned JSON object to Perfil.
     */
    private convertItemFromServer(json: any): Perfil {
        const entity: Perfil = Object.assign(new Perfil(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a Perfil to a JSON which can be sent to the server.
     */
    private convert(perfil: Perfil): Perfil {
        const copy: Perfil = Object.assign({}, perfil);

        copy.datFechaLog = this.dateUtils.toDate(perfil.datFechaLog);
        return copy;
    }
}
