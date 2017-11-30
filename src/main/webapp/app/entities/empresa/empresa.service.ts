import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Empresa } from './empresa.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmpresaService {

    private resourceUrl = '/sindicatos/api/empresas';
    private resourceSearchUrl = '/sindicatos/api/_search/empresas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(empresa: Empresa): Observable<Empresa> {
        const copy = this.convert(empresa);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(empresa: Empresa): Observable<Empresa> {
        const copy = this.convert(empresa);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Empresa> {
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
     * Convert a returned JSON object to Empresa.
     */
    private convertItemFromServer(json: any): Empresa {
        const entity: Empresa = Object.assign(new Empresa(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Empresa to a JSON which can be sent to the server.
     */
    private convert(empresa: Empresa): Empresa {
        const copy: Empresa = Object.assign({}, empresa);

        copy.tFecreg = this.dateUtils.toDate(empresa.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(empresa.tFecupd);
        return copy;
    }
}
