import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Reglaboral } from './reglaboral.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ReglaboralService {

    private resourceUrl = SERVER_API_URL + 'api/reglaborals';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/reglaborals';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(reglaboral: Reglaboral): Observable<Reglaboral> {
        const copy = this.convert(reglaboral);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(reglaboral: Reglaboral): Observable<Reglaboral> {
        const copy = this.convert(reglaboral);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Reglaboral> {
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
     * Convert a returned JSON object to Reglaboral.
     */
    private convertItemFromServer(json: any): Reglaboral {
        const entity: Reglaboral = Object.assign(new Reglaboral(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Reglaboral to a JSON which can be sent to the server.
     */
    private convert(reglaboral: Reglaboral): Reglaboral {
        const copy: Reglaboral = Object.assign({}, reglaboral);

        copy.tFecreg = this.dateUtils.toDate(reglaboral.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(reglaboral.tFecupd);
        return copy;
    }

    obtenerRegimenesLaboralesPrivado(): Observable<ResponseWrapper> {
        const options = createRequestOption();
        return this.http.get('/api/obtenerRegimenesLaboralesPrivado', options)
            .map((res: Response) => this.convertResponse(res));
    }

    obtenerRegimenesLaboralesPublico(): Observable<ResponseWrapper> {
        const options = createRequestOption();
        return this.http.get('/api/obtenerRegimenesLaboralesPublico', options)
            .map((res: Response) => this.convertResponse(res));
    }

    obtenerRegimenesLaboralesOtros(): Observable<ResponseWrapper> {
        const options = createRequestOption();
        return this.http.get('/api/obtenerRegimenesLaboralesOtros', options)
            .map((res: Response) => this.convertResponse(res));
    }
}
