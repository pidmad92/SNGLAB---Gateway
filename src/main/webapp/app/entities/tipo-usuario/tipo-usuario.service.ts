import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { TipoUsuario } from './tipo-usuario.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipoUsuarioService {

    private resourceUrl = '/seguridad/api/tipo-usuarios';
    private resourceSearchUrl = '/seguridad/api/_search/tipo-usuarios';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipoUsuario: TipoUsuario): Observable<TipoUsuario> {
        const copy = this.convert(tipoUsuario);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipoUsuario: TipoUsuario): Observable<TipoUsuario> {
        const copy = this.convert(tipoUsuario);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TipoUsuario> {
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
     * Convert a returned JSON object to TipoUsuario.
     */
    private convertItemFromServer(json: any): TipoUsuario {
        const entity: TipoUsuario = Object.assign(new TipoUsuario(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a TipoUsuario to a JSON which can be sent to the server.
     */
    private convert(tipoUsuario: TipoUsuario): TipoUsuario {
        const copy: TipoUsuario = Object.assign({}, tipoUsuario);

        copy.datFechaLog = this.dateUtils.toDate(tipoUsuario.datFechaLog);
        return copy;
    }
}
