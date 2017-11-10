import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Multa } from './multa.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MultaService {

    private resourceUrl = '/defensa/api/multas';
    private resourceSearchUrl = '/defensa/api/_search/multas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(multa: Multa): Observable<Multa> {
        const copy = this.convert(multa);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(multa: Multa): Observable<Multa> {
        const copy = this.convert(multa);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Multa> {
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
     * Convert a returned JSON object to Multa.
     */
    private convertItemFromServer(json: any): Multa {
        const entity: Multa = Object.assign(new Multa(), json);
        entity.dFecresolucionsd = this.dateUtils
            .convertDateTimeFromServer(json.dFecresolucionsd);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Multa to a JSON which can be sent to the server.
     */
    private convert(multa: Multa): Multa {
        const copy: Multa = Object.assign({}, multa);

        copy.dFecresolucionsd = this.dateUtils.toDate(multa.dFecresolucionsd);

        copy.dFechareg = this.dateUtils.toDate(multa.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(multa.dFechaupd);
        return copy;
    }
}
