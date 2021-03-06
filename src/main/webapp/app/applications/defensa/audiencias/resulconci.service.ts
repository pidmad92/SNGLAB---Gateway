import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Resulconci } from './resulconci.model';
import { Tipresconc } from './tipresconc.model';
import { ComboModel} from '../../general/combobox.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class ResulconciService {

    private resourceUrl = '/defensa/api/resulconcis';
    private resourceSearchUrl = '/defensa/api/_search/resulconcis';
    private resourceUrlActivos = '/defensa/api/resulconcis/tot';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(resulconci: Resulconci): Observable<Resulconci> {
        const copy = this.convert(resulconci);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(resulconci: Resulconci): Observable<Resulconci> {
        const copy = this.convert(resulconci);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Resulconci> {
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

    consultaCbResultados(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrlActivos, null)
            .map((res: Response) => this.convertResponseResultado(res));
    }

    private convertResponseResultado(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Resulconci = this.convertResultadoFromServer(jsonResponse[i]);
            const ct: Tipresconc = cm.tipresconc;
            result.push(new ComboModel(cm.vDescrip + ' - ' + ct.vDescrip, cm.id.toString(), 0));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertResultadoFromServer(json: any): Resulconci {
        const entity: Resulconci = Object.assign(new Resulconci(), json);
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
     * Convert a returned JSON object to Resulconci.
     */
    private convertItemFromServer(json: any): Resulconci {
        const entity: Resulconci = Object.assign(new Resulconci(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Resulconci to a JSON which can be sent to the server.
     */
    private convert(resulconci: Resulconci): Resulconci {
        const copy: Resulconci = Object.assign({}, resulconci);

        copy.tFecreg = this.dateUtils.toDate(resulconci.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(resulconci.tFecupd);
        return copy;
    }
}
