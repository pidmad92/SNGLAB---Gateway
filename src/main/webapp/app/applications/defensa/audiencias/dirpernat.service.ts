import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Dirpernat } from './dirpernat.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class DirpernatService {

    private resourceUrl = '/defensa/api/dirpernats';
    private resourceSearchUrl = '/defensa/api/_search/dirpernats';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(dirpernat: Dirpernat): Observable<Dirpernat> {
        const copy = this.convert(dirpernat);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dirpernat: Dirpernat): Observable<Dirpernat> {
        const copy = this.convert(dirpernat);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Dirpernat> {
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

    buscarDireccionesTrabajador(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/pernatural/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    buscarDireccionesEmpleador(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/empleado/pernatural/${id}`)
            .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to Dirpernat.
     */
    private convertItemFromServer(json: any): Dirpernat {
        const entity: Dirpernat = Object.assign(new Dirpernat(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Dirpernat to a JSON which can be sent to the server.
     */
    private convert(dirpernat: Dirpernat): Dirpernat {
        const copy: Dirpernat = Object.assign({}, dirpernat);

        copy.tFecreg = this.dateUtils.toDate(dirpernat.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(dirpernat.tFecupd);
        return copy;
    }
}
