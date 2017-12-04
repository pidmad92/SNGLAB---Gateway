import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Solicitud } from './solicitud.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SolicitudService {

    private resourceUrl = SERVER_API_URL + 'api/solicituds';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/solicituds';
    private obtenerLista = '/obtenerSolicitud';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(solicitud: Solicitud): Observable<Solicitud> {
        const copy = this.convert(solicitud);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(solicitud: Solicitud): Observable<Solicitud> {
        const copy = this.convert(solicitud);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Solicitud> {
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
     * Convert a returned JSON object to Solicitud.
     */
    private convertItemFromServer(json: any): Solicitud {
        const entity: Solicitud = Object.assign(new Solicitud(), json);
        entity.tFecsolic = this.dateUtils
            .convertDateTimeFromServer(json.tFecsolic);
        entity.tFecenvio = this.dateUtils
            .convertDateTimeFromServer(json.tFecenvio);
        entity.tFecvigde = this.dateUtils
            .convertDateTimeFromServer(json.tFecvigde);
        entity.tFecvigha = this.dateUtils
            .convertDateTimeFromServer(json.tFecvigha);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Solicitud to a JSON which can be sent to the server.
     */
    private convert(solicitud: Solicitud): Solicitud {
        const copy: Solicitud = Object.assign({}, solicitud);

        copy.tFecsolic = this.dateUtils.toDate(solicitud.tFecsolic);

        copy.tFecenvio = this.dateUtils.toDate(solicitud.tFecenvio);

        copy.tFecvigde = this.dateUtils.toDate(solicitud.tFecvigde);

        copy.tFecvigha = this.dateUtils.toDate(solicitud.tFecvigha);

        copy.tFecreg = this.dateUtils.toDate(solicitud.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(solicitud.tFecupd);
        return copy;
    }

    obtenerlistaSolicitudes(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        const url = SERVER_API_URL + '/dictamenes/api/obtenerSolicitud';
        return this.http.get(url + '?codUsuario=CODUSU', options)
            .map((res: Response) => this.convertResponse(res));
    }
}
