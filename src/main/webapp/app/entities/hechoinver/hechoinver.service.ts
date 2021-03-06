import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Hechoinver } from './hechoinver.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class HechoinverService {

    private resourceDictamenes = 'dictamenes/';
    private resourceUrl = SERVER_API_URL + this.resourceDictamenes +  'api/hechoinvers';
    private resourceSearchUrl = SERVER_API_URL + this.resourceDictamenes +  'api/_search/hechoinvers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(hechoinver: Hechoinver): Observable<Hechoinver> {
        const copy = this.convert(hechoinver);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(hechoinver: Hechoinver): Observable<Hechoinver> {
        const copy = this.convert(hechoinver);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Hechoinver> {
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
     * Convert a returned JSON object to Hechoinver.
     */
    private convertItemFromServer(json: any): Hechoinver {
        const entity: Hechoinver = Object.assign(new Hechoinver(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Hechoinver to a JSON which can be sent to the server.
     */
    private convert(hechoinver: Hechoinver): Hechoinver {
        const copy: Hechoinver = Object.assign({}, hechoinver);

        copy.tFecreg = this.dateUtils.toDate(hechoinver.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(hechoinver.tFecupd);
        return copy;
    }

    obtenerHechoInversionPorTipo(codFormPerfil: number, tipo: string): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL +  this.resourceDictamenes +  'api/listarHechosInversiones';
        return this.http.get(url +  '?tipo=' + tipo + '&codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => this.convertResponse(res));
    }

    eliminar(codFormPerfil: number) {
        const options = createRequestOption();
        const url = SERVER_API_URL + this.resourceDictamenes +   'api/eliminarHecho';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => {
                const jsonResponse = res.json();
                return Object.assign(Number, jsonResponse);
        });
    }
}
