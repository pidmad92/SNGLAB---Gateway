import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Solicform } from './solicform.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SolicformService {

    private resourceUrl = SERVER_API_URL + '/dictamenes/api/solicforms';
    private resourceSearchUrl = SERVER_API_URL + '/dictamenes/api/_search/solicforms';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(solicform: Solicform): Observable<Solicform> {
        const copy = this.convert(solicform);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(solicform: Solicform): Observable<Solicform> {
        const copy = this.convert(solicform);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Solicform> {
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
     * Convert a returned JSON object to Solicform.
     */
    private convertItemFromServer(json: any): Solicform {
        const entity: Solicform = Object.assign(new Solicform(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Solicform to a JSON which can be sent to the server.
     */
    private convert(solicform: Solicform): Solicform {
        const copy: Solicform = Object.assign({}, solicform);

        copy.tFecreg = this.dateUtils.toDate(solicform.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(solicform.tFecupd);
        return copy;
    }

    obtenerlistaFormulariosObligatorios(flgObligatorio: number, nCodsolic: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + '/dictamenes/api/obtenerDatosFormulario';
        return this.http.get(url + '?flgObligatorio=' + flgObligatorio + '&codSolicitud=' + nCodsolic, options)
            .map((res: Response) => this.convertResponse(res));
    }
}
