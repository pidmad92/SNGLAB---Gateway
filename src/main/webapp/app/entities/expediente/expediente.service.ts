import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Expediente } from './expediente.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ExpedienteService {

    private resourceUrl = '/defensa/api/expedientes';
    private resourceSearchUrl = '/defensa/api/_search/expedientes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(expediente: Expediente): Observable<Expediente> {
        const copy = this.convert(expediente);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(expediente: Expediente): Observable<Expediente> {
        const copy = this.convert(expediente);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Expediente> {
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

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Expediente.
     */
    private convertItemFromServer(json: any): Expediente {
        const entity: Expediente = Object.assign(new Expediente(), json);
        entity.dFecregexp = this.dateUtils
            .convertDateTimeFromServer(json.dFecregexp);
        entity.dFecmesapartes = this.dateUtils
            .convertDateTimeFromServer(json.dFecmesapartes);
        entity.dFecArchivo = this.dateUtils
            .convertDateTimeFromServer(json.dFecArchivo);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Expediente to a JSON which can be sent to the server.
     */
    private convert(expediente: Expediente): Expediente {
        const copy: Expediente = Object.assign({}, expediente);

        copy.dFecregexp = this.dateUtils.toDate(expediente.dFecregexp);

        copy.dFecmesapartes = this.dateUtils.toDate(expediente.dFecmesapartes);

        copy.dFecArchivo = this.dateUtils.toDate(expediente.dFecArchivo);

        copy.dFechareg = this.dateUtils.toDate(expediente.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(expediente.dFechaupd);
        return copy;
    }
}
