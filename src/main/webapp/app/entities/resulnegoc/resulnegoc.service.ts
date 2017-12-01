import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Resulnegoc } from './resulnegoc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ResulnegocService {

    private resourceUrl = SERVER_API_URL + '/dictamenes/api/resulnegocs';
    private resourceSearchUrl = SERVER_API_URL + '/dictamenes/api/_search/resulnegocs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(resulnegoc: Resulnegoc): Observable<Resulnegoc> {
        const copy = this.convert(resulnegoc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(resulnegoc: Resulnegoc): Observable<Resulnegoc> {
        const copy = this.convert(resulnegoc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Resulnegoc> {
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
     * Convert a returned JSON object to Resulnegoc.
     */
    private convertItemFromServer(json: any): Resulnegoc {
        const entity: Resulnegoc = Object.assign(new Resulnegoc(), json);
        entity.tFecreneg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreneg);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Resulnegoc to a JSON which can be sent to the server.
     */
    private convert(resulnegoc: Resulnegoc): Resulnegoc {
        const copy: Resulnegoc = Object.assign({}, resulnegoc);

        copy.tFecreneg = this.dateUtils.toDate(resulnegoc.tFecreneg);

        copy.tFecreg = this.dateUtils.toDate(resulnegoc.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(resulnegoc.tFecupd);
        return copy;
    }

    obtenerResultadoNegociaciones(codFormPerfil: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + '/dictamenes/api/listarResultadoNegocio';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => this.convertResponse(res));
    }
}
