import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

@Injectable()
export class FormularioFinancieroPrivadoService {

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }
}
