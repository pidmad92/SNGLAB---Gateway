import { Pasegl } from '../../models/pasegl.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { DatePipe } from '@angular/common';
import { ResponseWrapper, createRequestOption } from '../../../../shared';
import {ComboModel} from '../../../general/combobox.model';
import { Tipdocident } from '../../../../entities/tipdocident';
import { Dirpernat } from '../../models/dirpernat.model';
import { Dirperjuri } from '../../models/dirperjuri.model';
import { Motatenofic } from '../../models/motatenofic.model';
import { Motivpase } from '../../models/motivpase.model';

@Injectable()
export class DatosWizardService {

    private resource = '/defensa/api/';

    private resourceTipoDoc     = this.resource + 'tipdocidents';
    private resourceDPerNatu    = this.resource + 'dirpernats';
    private resourceDPerJuri    = this.resource + 'dirperjuris';
    private resourceMotivOfic   = this.resource + 'motatenofics/ofic';
    private resourceMotivPases  = this.resource + 'motivpases';

    private resourceDepa        = this.resource + 'departamentos';
    private resourceProv        = this.resource + 'provincias';
    private resourceDist        = this.resource + 'distritos';
    private resourcePersonaValidarServicio = '//localhost:8020/api/validarpersonaservicio';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private datePipe: DatePipe) { }

    createMotivPase(motivPase: Motivpase): Observable<Motivpase> {
        motivPase.nUsuareg = 1;
        motivPase.nFlgactivo = true;
        motivPase.nSedereg = 1;
        const copy = this.convertMotiv(motivPase);
        return this.http.post(this.resourceMotivPases, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }
    updateMotivPase(motivPase: Motivpase): Observable<Motivpase> {
        motivPase.nFlgactivo = true;
        // const copy = this.convertMotiv(motivPase);
        return this.http.put(this.resourceMotivPases, motivPase).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }
    private convertMotiv(motivpase: Motivpase): Motivpase {
        const copy: Motivpase = Object.assign({}, motivpase);
        copy.tFecreg = this.dateUtils.toDate(motivpase.tFecreg);
        copy.tFecupd = this.dateUtils.toDate(motivpase.tFecupd);
        return copy;
    }

    deleteMotivPase(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceMotivPases}/${id}`);
    }

    consultaMotivOfic(id: any): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceMotivOfic}/${id}`)
            .map((res: Response) => this.convertResponseOficPase(res));
    }
    private convertResponseOficPase(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemMotivOficFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemMotivOficFromServer(json: any): Motatenofic {
        const entity: Motatenofic = Object.assign(new Motatenofic(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    consultaMotivPases(query?: any): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceMotivPases}/${query}`)
            .map((res: Response) => this.convertResponseMotivPase(res));
    }
    private convertResponseMotivPase(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemMotivPaseFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemMotivPaseFromServer(json: any): Motivpase {
        const entity: Motivpase = Object.assign(new Motivpase(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

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
        return this.http.get(`${this.resource}/${query}`)
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
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
            // .transform(json.tFecreg, 'dd-MM-yyyy');
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
            // .transform(json.tFecupd, 'dd-MM-yyyy');
        return entity;
    }

    buscarDirecciones(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceDPerNatu}/pernatural/${id}`)
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
    buscarDireccionesPerJur(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceDPerJuri}/perjuridica/${id}`)
            .map((res: Response) => this.convertDirPerJuResponse(res));
    }
    private convertDirPerJuResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemPerJuDirFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemPerJuDirFromServer(json: any): Dirperjuri {
        const entity: Dirperjuri = Object.assign(new Dirperjuri(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    consDep(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceDepa, options)
            .map((res: Response) => this.convertResponseUbigeo(res));
    }
    consProv(id: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceProv}/${id}`)
            .map((res: Response) => this.convertResponseUbigeo(res));
    }
    consDis(id: string, idprov: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceDist}/${id}/${idprov}`)
            .map((res: Response) => this.convertResponseUbigeo(res));
    }
    private convertResponseUbigeo(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    createDir(dirpernat: Dirpernat): Observable<Dirpernat> {
        dirpernat.nUsuareg = 1;
        dirpernat.nFlgactivo = true;
        dirpernat.nSedereg = 1;
        const copy = this.convert(dirpernat);
        return this.http.post(this.resourceDPerNatu, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    updateDir(dirpernat: Dirpernat): Observable<Dirpernat> {
        const copy = this.convert(dirpernat);
        return this.http.put(this.resourceDPerNatu, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    createDirPerJu(dirperjuri: Dirperjuri): Observable<Dirperjuri> {
        dirperjuri.nUsuareg = 1;
        dirperjuri.nFlgactivo = true;
        dirperjuri.nSedereg = 1;
        const copy = this.convert(dirperjuri);
        return this.http.post(this.resourceDPerJuri, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    updateDirPerJu(dirperjuri: Dirperjuri): Observable<Dirperjuri> {
        const copy = this.convert(dirperjuri);
        return this.http.put(this.resourceDPerJuri, copy).map((res: Response) => {
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
}
