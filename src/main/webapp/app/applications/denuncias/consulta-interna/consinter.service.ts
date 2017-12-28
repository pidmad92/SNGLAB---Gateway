import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class ConsinterService {
    private resourceUrlFiltro = '/denuncias/api/denunciasbycriterio';
    private resourceUrlFiltroInfoSoli = '/denuncias/api/infosolisfiltro';
    private resourceUrlReg = '/denuncias/api/infosolis';
    private resourceUrlAtenderDenu= '/denuncias/api/atenderdenu';
    private resourceUrlFiltroMotFin = '/denuncias/api/motfins';
    private resourceUrlFinalizaDenu = '/denuncias/api/finalizadenu';
    private resourceOridenuncia = '/denuncias/api/oridenus';

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

    getFiltroMotFin(): any {
        return this.http.get(`${this.resourceUrlFiltroMotFin}`).map((res: Response) => {
            return res.json();
        });
    }

    regInfoSoli(infosoli: any): any {
        return this.http.post(`${this.resourceUrlReg}`, infosoli).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    regAtenderDenu(denu: any): any {
        return this.http.post(`${this.resourceUrlAtenderDenu}`, denu).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    regFinalizaDenu(denu: any): any {
        return this.http.post(`${this.resourceUrlFinalizaDenu}`, denu).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    getOrigendenuncia(): any {
        return this.http.get(`${this.resourceOridenuncia}`).map((res: Response) => {
            return res.json();
        });
    }
}
