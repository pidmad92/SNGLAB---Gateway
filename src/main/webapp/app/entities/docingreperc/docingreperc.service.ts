import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Docingreperc } from './docingreperc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DocingrepercService {

    private resourceUrl = '/consultas/api/docingrepercs';
    private resourceSearchUrl = '/consultas/api/_search/docingrepercs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(docingreperc: Docingreperc): Observable<Docingreperc> {
        const copy = this.convert(docingreperc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(docingreperc: Docingreperc): Observable<Docingreperc> {
        const copy = this.convert(docingreperc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Docingreperc> {
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
     * Convert a returned JSON object to Docingreperc.
     */
    private convertItemFromServer(json: any): Docingreperc {
        const entity: Docingreperc = Object.assign(new Docingreperc(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Docingreperc to a JSON which can be sent to the server.
     */
    private convert(docingreperc: Docingreperc): Docingreperc {
        const copy: Docingreperc = Object.assign({}, docingreperc);

        copy.dFechareg = this.dateUtils.toDate(docingreperc.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(docingreperc.dFechaupd);
        return copy;
    }
}
