import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Ususol } from './ususol.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UsusolService {

    private resourceDictamenes = 'dictamenes/';
    private resourceUrl = SERVER_API_URL + this.resourceDictamenes +  '/api/ususols';
    private resourceSearchUrl = SERVER_API_URL + this.resourceDictamenes +  '/api/_search/ususols';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ususol: Ususol): Observable<Ususol> {
        const copy = this.convert(ususol);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ususol: Ususol): Observable<Ususol> {
        const copy = this.convert(ususol);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to Ususol.
     */
    private convertItemFromServer(json: any): Ususol {
        const entity: Ususol = Object.assign(new Ususol(), json);
        entity.tFecreg = this.dateUtils
        .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
        .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Ususol to a JSON which can be sent to the server.
     */
    private convert(ususol: Ususol): Ususol {
        const copy: Ususol = Object.assign({}, ususol);
        copy.tFecreg = this.dateUtils.toDate(ususol.tFecreg);
        copy.tFecupd = this.dateUtils.toDate(ususol.tFecupd);
        return copy;
    }

    obtenerUsuarioPorTipo(codSolicitud: number, tipoUsuario: string): Observable<Ususol> {
        const options = createRequestOption();
        return this.http.get(SERVER_API_URL +   this.resourceDictamenes +  'api/obtenerUsuarioPorTipo?codSolicitud=' + codSolicitud + '&tipoUsuario=' + tipoUsuario, options)
            .map((res: Response) => {
                try {
                    const jsonResponse = res.json();
                    return this.convertItemFromServer(jsonResponse);
                }catch (e) {
                    return undefined;
                }
            });
    }
}
