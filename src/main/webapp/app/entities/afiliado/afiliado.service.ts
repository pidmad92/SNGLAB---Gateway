import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Afiliado } from './afiliado.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AfiliadoService {

    private resourceUrl = '/sindicatos/api/afiliados';
    private resourceSearchUrl = '/sindicatos/api/_search/afiliados';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(afiliado: Afiliado): Observable<Afiliado> {
        const copy = this.convert(afiliado);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(afiliado: Afiliado): Observable<Afiliado> {
        const copy = this.convert(afiliado);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Afiliado> {
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
     * Convert a returned JSON object to Afiliado.
     */
    private convertItemFromServer(json: any): Afiliado {
        const entity: Afiliado = Object.assign(new Afiliado(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Afiliado to a JSON which can be sent to the server.
     */
    private convert(afiliado: Afiliado): Afiliado {
        const copy: Afiliado = Object.assign({}, afiliado);

        copy.tFecreg = this.dateUtils.toDate(afiliado.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(afiliado.tFecupd);
        return copy;
    }
}
