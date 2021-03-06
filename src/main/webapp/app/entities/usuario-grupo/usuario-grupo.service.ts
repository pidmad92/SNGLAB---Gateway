import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { UsuarioGrupo } from './usuario-grupo.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../shared';

@Injectable()
export class UsuarioGrupoService {

    private resourceUrl = '/seguridad/api/usuario-grupos';
    private resourceSearchUrl = '/seguridad/api/_search/usuario-grupos';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(usuarioGrupo: UsuarioGrupo): Observable<UsuarioGrupo> {
        const token = this.authServerProvider.getToken();
        usuarioGrupo.numEliminar = 1;
        usuarioGrupo.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(usuarioGrupo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(usuarioGrupo: UsuarioGrupo): Observable<UsuarioGrupo> {
        const copy = this.convert(usuarioGrupo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UsuarioGrupo> {
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
     * Convert a returned JSON object to UsuarioGrupo.
     */
    private convertItemFromServer(json: any): UsuarioGrupo {
        const entity: UsuarioGrupo = Object.assign(new UsuarioGrupo(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a UsuarioGrupo to a JSON which can be sent to the server.
     */
    private convert(usuarioGrupo: UsuarioGrupo): UsuarioGrupo {
        const copy: UsuarioGrupo = Object.assign({}, usuarioGrupo);

        copy.datFechaLog = this.dateUtils.toDate(usuarioGrupo.datFechaLog);
        return copy;
    }
}
