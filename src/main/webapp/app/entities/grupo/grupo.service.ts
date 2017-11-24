import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Grupo } from './grupo.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../shared';

@Injectable()
export class GrupoService {

    private resourceUrl = '/seguridad/api/grupos';
    private resourceSearchUrl = '/seguridad/api/_search/grupos';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(grupo: Grupo): Observable<Grupo> {
        const token = this.authServerProvider.getToken();
        grupo.numEliminar = 1;
        grupo.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(grupo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(grupo: Grupo): Observable<Grupo> {
        const copy = this.convert(grupo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    updateLogic(grupo: Grupo): Observable<Grupo> {
        grupo.numEliminar = 0;
        const copy = this.convert(grupo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Grupo> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    findByGrupo(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/${id}/grupo`)
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
     * Convert a returned JSON object to Grupo.
     */
    private convertItemFromServer(json: any): Grupo {
        const entity: Grupo = Object.assign(new Grupo(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a Grupo to a JSON which can be sent to the server.
     */
    private convert(grupo: Grupo): Grupo {
        const copy: Grupo = Object.assign({}, grupo);

        copy.datFechaLog = this.dateUtils.toDate(grupo.datFechaLog);
        return copy;
    }
}
