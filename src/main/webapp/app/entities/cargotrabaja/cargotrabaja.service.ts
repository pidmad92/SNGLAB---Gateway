import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Cargotrabaja } from './cargotrabaja.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CargotrabajaService {

    private resourceUrl = '/consultas/api/cargotrabajas';
    private resourceSearchUrl = '/consultas/api/_search/cargotrabajas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(cargotrabaja: Cargotrabaja): Observable<Cargotrabaja> {
        const copy = this.convert(cargotrabaja);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(cargotrabaja: Cargotrabaja): Observable<Cargotrabaja> {
        const copy = this.convert(cargotrabaja);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Cargotrabaja> {
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
     * Convert a returned JSON object to Cargotrabaja.
     */
    private convertItemFromServer(json: any): Cargotrabaja {
        const entity: Cargotrabaja = Object.assign(new Cargotrabaja(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Cargotrabaja to a JSON which can be sent to the server.
     */
    private convert(cargotrabaja: Cargotrabaja): Cargotrabaja {
        const copy: Cargotrabaja = Object.assign({}, cargotrabaja);

        copy.dFechareg = this.dateUtils.toDate(cargotrabaja.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(cargotrabaja.dFechaupd);
        return copy;
    }
}
