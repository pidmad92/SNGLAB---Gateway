import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tiporecurso } from './tiporecurso.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TiporecursoService {

    private resourceUrl = '/sindicatos/api/tiporecursos';
    private resourceSearchUrl = '/sindicatos/api/_search/tiporecursos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tiporecurso: Tiporecurso): Observable<Tiporecurso> {
        const copy = this.convert(tiporecurso);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tiporecurso: Tiporecurso): Observable<Tiporecurso> {
        const copy = this.convert(tiporecurso);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tiporecurso> {
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
     * Convert a returned JSON object to Tiporecurso.
     */
    private convertItemFromServer(json: any): Tiporecurso {
        const entity: Tiporecurso = Object.assign(new Tiporecurso(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tiporecurso to a JSON which can be sent to the server.
     */
    private convert(tiporecurso: Tiporecurso): Tiporecurso {
        const copy: Tiporecurso = Object.assign({}, tiporecurso);

        copy.tFecreg = this.dateUtils.toDate(tiporecurso.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tiporecurso.tFecupd);
        return copy;
    }
}
