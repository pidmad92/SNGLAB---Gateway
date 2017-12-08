import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class ValidarrucService {
    private resourceUrl = '/denuncias/api/validarruc';
    private resourceSearchUrl = '/consultas/api/_search/empleador';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    validarRuc(ruc: number): Observable<Number> {
        console.log(ruc);
        return this.http.get(`${this.resourceUrl}/${ruc}`).map((res: Response) => {
            return res.status;
        });

    }
}
