import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Denuncia } from './denuncia.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DenunciaService {

    private resourceUrl = '/denuncias/api/denuncias';
    private resourceSearchUrl = '/denuncias/api/_search/denuncias';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(denuncia: Denuncia): Observable<Denuncia> {
        const copy = this.convert(denuncia);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(denuncia: Denuncia): Observable<Denuncia> {
        const copy = this.convert(denuncia);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Denuncia> {
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
     * Convert a returned JSON object to Denuncia.
     */
    private convertItemFromServer(json: any): Denuncia {
        const entity: Denuncia = Object.assign(new Denuncia(), json);
        entity.tFecinitra = this.dateUtils
            .convertDateTimeFromServer(json.tFecinitra);
        entity.tFeccese = this.dateUtils
            .convertDateTimeFromServer(json.tFeccese);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Denuncia to a JSON which can be sent to the server.
     */
    private convert(denuncia: Denuncia): Denuncia {
        const copy: Denuncia = Object.assign({}, denuncia);

        copy.tFecinitra = this.dateUtils.toDate(denuncia.tFecinitra);

        copy.tFeccese = this.dateUtils.toDate(denuncia.tFeccese);

        copy.tFecreg = this.dateUtils.toDate(denuncia.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(denuncia.tFecupd);
        return copy;
    }
}
