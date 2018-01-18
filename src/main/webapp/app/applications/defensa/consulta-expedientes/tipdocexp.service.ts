import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipdocexp } from './../../../entities/tipdocexp/tipdocexp.model';
import { Tipproveid } from './../../../entities/tipproveid/tipproveid.model';
import { Dettipprov } from './../../../entities/dettipprov/dettipprov.model';
import { ComboModel} from '../../general/combobox.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class TipdocexpService {

    private resourceUrl = '/defensa/api/tipdocexps';
    private resourceSearchUrl = '/defensa/api/_search/tipdocexps';
    private resourceUrlTipProv = '/defensa/api/tipproveids/tipdocexp';
    private resourceUrlDetTipProv = '/defensa/api/dettipprovs/tipproveid';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipdocexp: Tipdocexp): Observable<Tipdocexp> {
        const copy = this.convert(tipdocexp);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipdocexp: Tipdocexp): Observable<Tipdocexp> {
        const copy = this.convert(tipdocexp);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipdocexp> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    consultaCbTipDocExp(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl, null)
            .map((res: Response) => this.convertResponseTipDocExp(res));
    }

    ConsultacbTipProveid(id?: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrlTipProv}/${id}`)
            .map((res: Response) => this.convertResponseTipProveid(res));
    }

    ConsultacbDetTipProv(id?: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrlDetTipProv}/${id}`)
            .map((res: Response) => this.convertResponseDetTipProv(res));
    }

    private convertResponseTipDocExp(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Tipdocexp = this.convertTipDocExpFromServer(jsonResponse[i]);
            result.push(new ComboModel(cm.vDescrip, cm.id.toString(), 0));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertResponseTipProveid(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Tipproveid = this.convertTipProveidFromServer(jsonResponse[i]);
            result.push(new ComboModel(cm.vDescrip, cm.id.toString(), 0));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertResponseDetTipProv(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Dettipprov = this.convertDetTipProveidFromServer(jsonResponse[i]);
            result.push(new ComboModel(cm.vDescrip, cm.id.toString(), 0));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertTipDocExpFromServer(json: any): Tipdocexp {
        const entity: Tipdocexp = Object.assign(new Tipdocexp(), json);
        return entity;
    }

    private convertTipProveidFromServer(json: any): Tipproveid {
        const entity: Tipproveid = Object.assign(new Tipproveid(), json);
        return entity;
    }

    private convertDetTipProveidFromServer(json: any): Dettipprov {
        const entity: Dettipprov = Object.assign(new Dettipprov(), json);
        return entity;
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Tipdocexp.
     */
    private convertItemFromServer(json: any): Tipdocexp {
        const entity: Tipdocexp = Object.assign(new Tipdocexp(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipdocexp to a JSON which can be sent to the server.
     */
    private convert(tipdocexp: Tipdocexp): Tipdocexp {
        const copy: Tipdocexp = Object.assign({}, tipdocexp);

        copy.tFecreg = this.dateUtils.toDate(tipdocexp.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipdocexp.tFecupd);
        return copy;
    }
}
