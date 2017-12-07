
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

}
