import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UsuarioService {

    private resourceUrl = '/seguridad/api/usuarios';
    private resourceSearchUrl = '/seguridad/api/_search/usuarios';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(usuario: Usuario): Observable<Usuario> {
        const copy = this.convert(usuario);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(usuario: Usuario): Observable<Usuario> {
        const copy = this.convert(usuario);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Usuario> {
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
     * Convert a returned JSON object to Usuario.
     */
    private convertItemFromServer(json: any): Usuario {
        const entity: Usuario = Object.assign(new Usuario(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        entity.datFecTermino = this.dateUtils
            .convertLocalDateFromServer(json.datFecTermino);
        return entity;
    }

    /**
     * Convert a Usuario to a JSON which can be sent to the server.
     */
    private convert(usuario: Usuario): Usuario {
        const copy: Usuario = Object.assign({}, usuario);

        copy.datFechaLog = this.dateUtils.toDate(usuario.datFechaLog);
        copy.datFecTermino = this.dateUtils
            .convertLocalDateToServer(usuario.datFecTermino);
        return copy;
    }
}
