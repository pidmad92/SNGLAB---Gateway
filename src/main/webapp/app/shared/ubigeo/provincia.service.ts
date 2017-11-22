import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Provincia } from './provincia.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProvinciaService {

    private resourceUrl = 'api/provincias';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    find(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/${id}`)
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
    private convert(provincia: Provincia): Provincia {
        const copy: Provincia = Object.assign({}, provincia);
        return copy;
    }
}
