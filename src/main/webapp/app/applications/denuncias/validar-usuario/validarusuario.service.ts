import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper, createRequestOption } from '../../../shared';
import { Tipdocident } from '../../../entities/tipdocident';
import {ComboModel} from '../../general/combobox.model';
import { Pernatural } from '../../../entities/pernatural';
import { Tipvia } from '../../../entities/tipvia';
import { Tipzona } from '../../../entities/tipzona';

@Injectable()
export class ValidarUsuarioService {
    private resourceTipoDoc = '/api/tipdocidents';
    private resourceDepa = '/api/departamentos';
    private resourceProv = '/api/provincias';
    private resourceDist = '/api/distritos';
    private resourceTVia = '/api/tipvias';
    private resourceTZona = '/api/tipzonas';
    private resourcePersonaValidarServicio = '//localhost:8020/api/validarpersonaservicio';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    consultaTipoDocIdentidad(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceTipoDoc, null)
            .map((res: Response) => this.convertResponseTipoDocIdentidad(res));
    }

    consultaPersonaValidaServicio(personaNatural: any): Observable<Pernatural> {
        return this.http.post(this.resourcePersonaValidarServicio, personaNatural).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertPersonaFromServer(jsonResponse);
        });
    }

    consultaTVia(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceTVia, null)
        .map((res: Response) => this.convertResponseTipvia(res));
    }

    consultaTZona(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceTZona, null)
        .map((res: Response) => this.convertResponseTipzona(res));
    }

    consultaDepas(): any {
        return this.http.get(`${this.resourceDepa}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaDepa(depas: any): any {
        return this.http.get(`${this.resourceDepa}/${depas}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaProvs(depas: any): any {
        return this.http.get(`${this.resourceProv}/${depas}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaProv(depas: any, prov: any): any {
        return this.http.get(`${this.resourceProv}/${depas}/${prov}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaDist(depas: any, prov: any, dist: any): any {
        return this.http.get(`${this.resourceDist}/${depas}/${prov}/${dist}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaDists(depas: any, prov: any): any {
        return this.http.get(`${this.resourceDist}/${depas}/${prov}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    private convertResponseTipoDocIdentidad(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Tipdocident = this.convertTipoDocFromServer(jsonResponse[i]);
            result.push(new ComboModel(cm.vDescorta, cm.id.toString(), cm.nNumdigi));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertResponseTipvia(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Tipvia = this.convertTViaFromServer(jsonResponse[i]);
            result.push(new ComboModel(cm.vDescrip, cm.id.toString(), 0));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertResponseTipzona(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Tipzona = this.convertTZonaFromServer(jsonResponse[i]);
            result.push(new ComboModel(cm.vDesccorta, cm.id.toString(), 0));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertTipoDocFromServer(json: any): Tipdocident {
        const entity: Tipdocident = Object.assign(new Tipdocident(), json);
        return entity;
    }

    private convertPersonaFromServer(json: any): Pernatural {
        const entity: Pernatural = Object.assign(new Pernatural(), json);
        return entity;
    }

    private convertTViaFromServer(json: any): Tipvia {
        const entity: Tipvia = Object.assign(new Tipvia(), json);
        return entity;
    }

    private convertTZonaFromServer(json: any): Tipzona {
        const entity: Tipzona = Object.assign(new Tipzona(), json);
        return entity;
    }

}
