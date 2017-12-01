import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Anexlaboral } from './anexlaboral.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import { ModelAnexo } from './index';
import { ModelAnexoDetalle } from './index';

@Injectable()
export class AnexlaboralService {

    private resourceUrl = SERVER_API_URL + '/dictamenes/api/listarAnexoLaboral';
    private resourceSearchUrl = SERVER_API_URL + 'dictamenes/api/_search/listarAnexoLaboral';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(anexlaboral: Anexlaboral): Observable<Anexlaboral> {
        const copy = this.convert(anexlaboral);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(anexlaboral: Anexlaboral): Observable<Anexlaboral> {
        const copy = this.convert(anexlaboral);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Anexlaboral> {
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
     * Convert a returned JSON object to Anexlaboral.
     */
    private convertItemFromServer(json: any): Anexlaboral {
        const entity: Anexlaboral = Object.assign(new Anexlaboral(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Anexlaboral to a JSON which can be sent to the server.
     */
    private convert(anexlaboral: Anexlaboral): Anexlaboral {
        const copy: Anexlaboral = Object.assign({}, anexlaboral);

        copy.tFecreg = this.dateUtils.toDate(anexlaboral.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(anexlaboral.tFecupd);
        return copy;
    }

    obtenerListadoLaboral(codFormPerfil: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/listarAnexoLaboral';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => this.convertResponseAnexo(res));
    }

    private convertResponseAnexo(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerAnexo(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, <ModelAnexo[]>result, res.status);
    }

    /**
     * Convert a returned JSON object to Anexlaboral.
     */
    private convertItemFromServerAnexo(json: any): ModelAnexo {
        const entity: ModelAnexo = Object.assign(new ModelAnexo, json);
        return <ModelAnexo>entity;
    }

    obtenerAnios(codFormPerfil: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + '/dictamenes/api/obtenerAnios';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => this.convertResponse(res));
    }

    obtenerDecretosPorTipoAnio(codFormPerfil: number, tipo: string, anio: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + '/dictamenes/api/obtenerDecretosPorTipoAnio';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil + '&tipo=' + tipo + '&anio=' + anio, options)
            .map((res: Response) => this.convertResponse(res));
    }

    obtenerDescripcionPorTipoAnio(codFormPerfil: number, tipo: string, anio: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + '/dictamenes/api/obtenerDescripcionPorTipoAnio';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil + '&tipo=' + tipo + '&anio=' + anio, options)
            .map((res: Response) => this.convertResponse(res));
    }

    obtenerCantidadPorTipoAnioDescripcion(codFormPerfil: number, tipo: string, anio: number, descripcion: string): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + '/dictamenes/api/obtenerCantidadPorTipoAnioDescripcion';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil + '&tipo=' + tipo + '&anio=' + anio + '&descripcion=' + descripcion, options)
            .map((res: Response) => this.convertResponseAnexo(res));
    }
}
