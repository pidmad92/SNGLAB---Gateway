import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Perreglab } from './perreglab.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class PerreglabService {

    private resourceDictamenes = 'dictamenes/';
    private resourceUrl = SERVER_API_URL + this.resourceDictamenes +  '/api/perreglabs';
    private resourceSearchUrl = SERVER_API_URL + this.resourceDictamenes +  '/api/_search/perreglabs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(perreglab: Perreglab): Observable<Perreglab> {
        const copy = this.convert(perreglab);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(perreglab: Perreglab): Observable<Perreglab> {
        const copy = this.convert(perreglab);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Perreglab> {
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
     * Convert a returned JSON object to Perreglab.
     */
    private convertItemFromServer(json: any): Perreglab {
        const entity: Perreglab = Object.assign(new Perreglab(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Perreglab to a JSON which can be sent to the server.
     */
    private convert(perreglab: Perreglab): Perreglab {
        const copy: Perreglab = Object.assign({}, perreglab);
        copy.tFecreg = this.dateUtils.toDate(perreglab.tFecreg);
        copy.tFecupd = this.dateUtils.toDate(perreglab.tFecupd);
        return copy;
    }

    obtenerRegimenesSeleccionados(codPerfil: number, codRegimen: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        return this.http.get(SERVER_API_URL +   this.resourceDictamenes +  'api/obtenerRegimenesSeleccionados?codPerfil=' + codPerfil + '&codRegimen=' + codRegimen, options)
            .map((res: any) => this.convertResponse(res));
    }

    eliminarRegimenes(codPerfil: number, codRegimen: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        return this.http.get(SERVER_API_URL +   this.resourceDictamenes +  'api/eliminarRegimenes?codPerfil=' + codPerfil + '&codRegimen=' + codRegimen, options)
            .map((res: any) => this.convertResponse(res));
    }

}
