import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Distrito } from './distrito.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DistritoService {

    private resourceUrl = 'api/distritos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    find(id: string, idprov: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/${id}/${idprov}`)
            .map((res: Response) => this.convertResponse(res));
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
    private convert(distrito: Distrito): Distrito {
        const copy: Distrito = Object.assign({}, distrito);
        return copy;
    }
}
