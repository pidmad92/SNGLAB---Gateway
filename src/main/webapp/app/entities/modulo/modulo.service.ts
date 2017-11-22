import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Modulo } from './modulo.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../shared';

@Injectable()
export class ModuloService {

    private resourceUrl = '/seguridad/api/modulos';
    private resourceSearchUrl = '/seguridad/api/_search/modulos';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(modulo: Modulo): Observable<Modulo> {
        const token = this.authServerProvider.getToken();
        modulo.numEliminar = 1;
        modulo.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(modulo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(modulo: Modulo): Observable<Modulo> {
        const copy = this.convert(modulo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Modulo> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    findByEntidad(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/tipo/${id}`)
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
     * Convert a returned JSON object to Modulo.
     */
    private convertItemFromServer(json: any): Modulo {
        const entity: Modulo = Object.assign(new Modulo(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a Modulo to a JSON which can be sent to the server.
     */
    private convert(modulo: Modulo): Modulo {
        const copy: Modulo = Object.assign({}, modulo);

        copy.datFechaLog = this.dateUtils.toDate(modulo.datFechaLog);
        return copy;
    }
}
