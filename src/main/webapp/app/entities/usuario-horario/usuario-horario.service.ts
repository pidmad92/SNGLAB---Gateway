import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { UsuarioHorario } from './usuario-horario.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../shared';

@Injectable()
export class UsuarioHorarioService {

    private resourceUrl = '/seguridad/api/usuario-horarios';
    private resourceSearchUrl = '/seguridad/api/_search/usuario-horarios';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(usuarioHorario: UsuarioHorario): Observable<UsuarioHorario> {
        const token = this.authServerProvider.getToken();
        usuarioHorario.numEliminar = 1;
        usuarioHorario.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(usuarioHorario);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    createFromUser(usuarioHorario: UsuarioHorario): Observable<ResponseWrapper> {
        const token = this.authServerProvider.getToken();
        usuarioHorario.numEliminar = 1;
        usuarioHorario.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(usuarioHorario);
        return this.http.post(this.resourceUrl, copy)
            .map((res: Response) => this.convertResponse(res));
    }
    update(usuarioHorario: UsuarioHorario): Observable<UsuarioHorario> {
        const copy = this.convert(usuarioHorario);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    updateFromUser(usuarioHorario: UsuarioHorario): Observable<ResponseWrapper> {
        const copy = this.convert(usuarioHorario);
        return this.http.put(this.resourceUrl, copy)
            .map((res: Response) => this.convertResponse(res));
    }

    find(id: number): Observable<UsuarioHorario> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    findById(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/tipo/${id}`)
            .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to UsuarioHorario.
     */
    private convertItemFromServer(json: any): UsuarioHorario {
        const entity: UsuarioHorario = Object.assign(new UsuarioHorario(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a UsuarioHorario to a JSON which can be sent to the server.
     */
    private convert(usuarioHorario: UsuarioHorario): UsuarioHorario {
        const copy: UsuarioHorario = Object.assign({}, usuarioHorario);
        copy.datFechaLog = this.dateUtils.toDate(usuarioHorario.datFechaLog);
        return copy;
    }
}
