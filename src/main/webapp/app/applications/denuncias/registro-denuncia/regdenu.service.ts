import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class RegdenuService {
    private resourceUrl = '/denuncias/api/validarruc';
    private resourceMotivoDenuncia = '/denuncias/api/motidenuns';
    private resourceDetalleMotivoDenuncia = '/denuncias/api/detmotdens';
    private resourceSearchUrl = '/consultas/api/_search/empleador';
    private resourceValidarRUC = '//localhost:8020/api/validarserviciosunat';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    validarserviciosunat(empresaBean: any): any {
        return this.http.post(`${this.resourceValidarRUC}`, empresaBean).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    getMotivosDenuncia(): any {
        return this.http.get(`${this.resourceMotivoDenuncia}`).map((res: Response) => {
            return res.json();
        });
    }

    getDetalleMotivosDenuncia(cod: number): any {
        return this.http.get(`${this.resourceMotivoDenuncia}/${cod}`).map((res: Response) => {
            return res.json();
        });
    }
}
