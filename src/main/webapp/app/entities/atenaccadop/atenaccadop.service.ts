import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Atenaccadop } from './atenaccadop.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AtenaccadopService {

    private resourceUrl = '/consultas/api/atenaccadops';
    private resourceSearchUrl = '/consultas/api/_search/atenaccadops';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(atenaccadop: Atenaccadop): Observable<Atenaccadop> {
        const copy = this.convert(atenaccadop);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(atenaccadop: Atenaccadop): Observable<Atenaccadop> {
        const copy = this.convert(atenaccadop);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Atenaccadop> {
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
     * Convert a returned JSON object to Atenaccadop.
     */
    private convertItemFromServer(json: any): Atenaccadop {
        const entity: Atenaccadop = Object.assign(new Atenaccadop(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Atenaccadop to a JSON which can be sent to the server.
     */
    private convert(atenaccadop: Atenaccadop): Atenaccadop {
        const copy: Atenaccadop = Object.assign({}, atenaccadop);

        copy.dFechareg = this.dateUtils.toDate(atenaccadop.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(atenaccadop.dFechaupd);
        return copy;
    }
}
