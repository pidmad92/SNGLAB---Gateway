
import { Pasegl } from './../pasegl.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { DatePipe } from '@angular/common';
import { ResponseWrapper, createRequestOption } from '../../../../shared';
import {ComboModel} from '../../../general/combobox.model';
import { Tipdocident } from '../../../../entities/tipdocident';
import { Dirpernat } from './../dirpernat.model';

@Injectable()
export class DatosWizardService {
    private resourceTipoDoc = '/defensa/api/tipdocidents';
    private resourceDefensa = '/defensa/api';
    private resourceDirec = '/defensa/api/dirpernats';
    private resourceDepa = '/defensa/api/departamentos';
    private resourceProv = '/defensa/api/provincias';
    private resourceDist = '/defensa/api/distritos';
    private resourcePersonaValidarServicio = '//localhost:8020/api/validarpersonaservicio';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private datePipe: DatePipe) { }

    consultaTipoDocIdentidad(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceTipoDoc, null)
            .map((res: Response) => this.convertResponseTipoDocIdentidad(res));
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
    private convertTipoDocFromServer(json: any): Tipdocident {
        const entity: Tipdocident = Object.assign(new Tipdocident(), json);
        return entity;
    }

    consultaPaseGL(query: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceDefensa}/${query}`)
            .map((res: Response) => this.convertResponse(res));
    }
    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemFromServer(json: any): Pasegl {
        const entity: Pasegl = Object.assign(new Pasegl(), json);
        entity.tFecreg = this.datePipe
            // .convertDateTimeFromServer(json.tFecreg);
            .transform(json.tFecreg, 'dd-MM-yyyy');
        entity.tFecupd = this.datePipe
            // .convertDateTimeFromServer(json.tFecupd);
            .transform(json.tFecupd, 'dd-MM-yyyy');
        return entity;
    }

    buscarDirecciones(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceDefensa}/dirpernats/pernatural/${id}`)
            .map((res: Response) => this.convertDirResponse(res));
    }
    private convertDirResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemDirFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemDirFromServer(json: any): Dirpernat {
        const entity: Dirpernat = Object.assign(new Dirpernat(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    consDep(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceDepa, options)
            .map((res: Response) => this.convertResponseDep(res));
    }
    private convertResponseDep(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    consProv(id: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceProv}/${id}`)
            .map((res: Response) => this.convertResponseProv(res));
    }
    private convertResponseProv(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    consDis(id: string, idprov: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceDist}/${id}/${idprov}`)
            .map((res: Response) => this.convertResponseDis(res));
    }
    private convertResponseDis(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    createDir(dirpernat: Dirpernat): Observable<Dirpernat> {
        dirpernat.nUsuareg = 1;
        dirpernat.nFlgactivo = true;
        dirpernat.nSedereg = 1;
        const copy = this.convert(dirpernat);
        return this.http.post(this.resourceDirec, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    updateDir(dirpernat: Dirpernat): Observable<Dirpernat> {
        const copy = this.convert(dirpernat);
        return this.http.put(this.resourceDirec, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    private convert(dirpernat: Dirpernat): Dirpernat {
        const copy: Dirpernat = Object.assign({}, dirpernat);

        copy.tFecreg = this.dateUtils.toDate(dirpernat.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(dirpernat.tFecupd);
        return copy;
    }

    // consultaDepas(): any {
    //     return this.http.get(`${this.resourceDepa}`).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         return jsonResponse;
    //     });
    // }

    // consultaDepa(depas: any): any {
    //     return this.http.get(`${this.resourceDepa}/${depas}`).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         return jsonResponse;
    //     });
    // }

    // consultaProvs(depas: any): any {
    //     return this.http.get(`${this.resourceProv}/${depas}`).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         return jsonResponse;
    //     });
    // }

    // consultaProv(depas: any, prov: any): any {
    //     return this.http.get(`${this.resourceProv}/${depas}/${prov}`).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         return jsonResponse;
    //     });
    // }

    // consultaDist(depas: any, prov: any, dist: any): any {
    //     return this.http.get(`${this.resourceDist}/${depas}/${prov}/${dist}`).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         return jsonResponse;
    //     });
    // }

    // consultaDists(depas: any, prov: any): any {
    //     return this.http.get(`${this.resourceDist}/${depas}/${prov}`).map((res: Response) => {
    //         const jsonResponse = res.json();
    //         return jsonResponse;
    //     });
    // }

}
