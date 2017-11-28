import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class FormularioPerfilService {

    private resourceUrl = '/consultas/api/empleador';
    private resourceSearchUrl = '/consultas/api/_search/empleador';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }
}
