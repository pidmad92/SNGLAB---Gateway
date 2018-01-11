import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class ReginternoService {
    private resourceUrl = '/denuncias/api/validarruc';
    private resourceMotivoDenuncia = '/denuncias/api/motidenuns';
    private resourceDetalleMotivoDenuncia = '/denuncias/api/detmotdens';
    private resourceOridenuncia = '/denuncias/api/oridenus';
    private resourceSaveDenuExterna = '/denuncias/api/denunciasexterna';
    private resourceSaveDenuInterna = '/denuncias/api/denunciasinterna';
    private resourceSearchUrl = '/consultas/api/_search/empleador';
    private resourceValidarRUC = '//localhost:8020/api/validarserviciosunat';
    private resourcePersonaServicio = '//localhost:8020/api/personaservicio';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    getPersonaServicio(personaNatural: any): any {
        return this.http.post(`${this.resourcePersonaServicio}`, personaNatural).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    guardarDenunciaExterna(denuncia: any): any {
        return this.http.post(`${this.resourceSaveDenuExterna}`, denuncia).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    guardarDenunciaInterna(denuncia: any): any {
        return this.http.post(`${this.resourceSaveDenuInterna}`, denuncia).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

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
        return this.http.get(`${this.resourceDetalleMotivoDenuncia}/${cod}`).map((res: Response) => {
            return res.json();
        });
    }

    getOrigendenuncia(): any {
        return this.http.get(`${this.resourceOridenuncia}`).map((res: Response) => {
            return res.json();
        });
    }
}
