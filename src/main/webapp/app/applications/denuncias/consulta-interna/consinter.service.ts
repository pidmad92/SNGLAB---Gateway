import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class ConsinterService {
    private resourceUrlFiltro = '/denuncias/api/denunciasbycriterio';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    getFiltro(filtro: any): any {
        return this.http.post(`${this.resourceUrlFiltro}`, filtro).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }
}
