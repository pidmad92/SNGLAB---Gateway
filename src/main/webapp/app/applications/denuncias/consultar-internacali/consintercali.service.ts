import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class ConsintercaliService {
    private resourceUrlFiltro = '/denuncias/api/denunciasbycriteriocalif';
    private resourceUrlFiltroInfoSoli = '/denuncias/api/infosolisfiltro';
    private resourceUrlReg = '/denuncias/api/infosolis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    getFiltro(filtro: any): any {
        return this.http.post(`${this.resourceUrlFiltro}`, filtro).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    getFiltroInfoSoli(infosoli: any): any {
        return this.http.post(`${this.resourceUrlFiltroInfoSoli}`, infosoli).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    regInfoSoli(infosoli: any): any {
        return this.http.post(`${this.resourceUrlReg}`, infosoli).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }
}
