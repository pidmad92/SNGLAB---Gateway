import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Negocolect } from './negocolect.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NegocolectService {

    private resourceUrl = SERVER_API_URL + 'api/negocolects';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/negocolects';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(negocolect: Negocolect): Observable<Negocolect> {
        const copy = this.convert(negocolect);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(negocolect: Negocolect): Observable<Negocolect> {
        const copy = this.convert(negocolect);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Negocolect> {
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
     * Convert a returned JSON object to Negocolect.
     */
    private convertItemFromServer(json: any): Negocolect {
        const entity: Negocolect = Object.assign(new Negocolect(), json);
        entity.tFecvigde = this.dateUtils
            .convertDateTimeFromServer(json.tFecvigde);
        entity.tFecvigha = this.dateUtils
            .convertDateTimeFromServer(json.tFecvigha);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Negocolect to a JSON which can be sent to the server.
     */
    private convert(negocolect: Negocolect): Negocolect {
        const copy: Negocolect = Object.assign({}, negocolect);

        copy.tFecvigde = this.dateUtils.toDate(negocolect.tFecvigde);

        copy.tFecvigha = this.dateUtils.toDate(negocolect.tFecvigha);

        copy.tFecreg = this.dateUtils.toDate(negocolect.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(negocolect.tFecupd);
        return copy;
    }

    obtenerNegociacion(codFormPerfil: number, tipo: string): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/listarNegociacionColectiva';
        return this.http.get(url + '?tipo=' + tipo + '&codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => this.convertResponse(res));
    }
}
