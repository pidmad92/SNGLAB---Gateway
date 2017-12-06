import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class FormregdenunciaService {
    private resourceUrl = '/denuncias/api/validarruc';
    private resourceSearchUrl = '/consultas/api/_search/empleador';
    private resourceValidarRUC = '//localhost:8020/api/validarserviciosunat';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    validarRuc(ruc: any): any {
        console.log(ruc);
        return this.http.get(`${this.resourceUrl}`).map((res: Response) => {
            console.log(res);
            return res.status;
        });

    }
}
