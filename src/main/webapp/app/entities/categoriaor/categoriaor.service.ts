import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Categoriaor } from './categoriaor.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CategoriaorService {

    private resourceUrl = '/sindicatos/api/categoriaors';
    private resourceSearchUrl = '/sindicatos/api/_search/categoriaors';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(categoriaor: Categoriaor): Observable<Categoriaor> {
        const copy = this.convert(categoriaor);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(categoriaor: Categoriaor): Observable<Categoriaor> {
        const copy = this.convert(categoriaor);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Categoriaor> {
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
     * Convert a returned JSON object to Categoriaor.
     */
    private convertItemFromServer(json: any): Categoriaor {
        const entity: Categoriaor = Object.assign(new Categoriaor(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Categoriaor to a JSON which can be sent to the server.
     */
    private convert(categoriaor: Categoriaor): Categoriaor {
        const copy: Categoriaor = Object.assign({}, categoriaor);

        copy.tFecreg = this.dateUtils.toDate(categoriaor.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(categoriaor.tFecupd);
        return copy;
    }
}
