import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class CalifiService {
    private resourceUrl = '/denuncias/api/califidenuncia';
    private resourceUrlCalificas= '/denuncias/api/calificas';
    private resourceRegCalifica= '/denuncias/api/califidenunciareg';
    private resourceMotivoDenuncia = '/denuncias/api/motidenuns';
    private resourceDetalleMotivoDenuncia = '/denuncias/api/detmotdens';
    private resourceSaveDenuExterna = '/denuncias/api/denunciasexterna';
    private resourceSearchUrl = '/consultas/api/_search/empleador';
    private resourceValidarRUC = '//localhost:8020/api/validarserviciosunat';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    getDenuncia(denuncia: any): any {
        return this.http.post(`${this.resourceUrl}`, denuncia).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    getCalificas(): any {
        return this.http.get(`${this.resourceUrlCalificas}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    regCalificacion(califica: any): any {
        return this.http.post(`${this.resourceRegCalifica}`, califica).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }
}
