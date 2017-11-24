import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { MenuPerfil } from './menu-perfil.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../shared';

@Injectable()
export class MenuPerfilService {

    private resourceUrl = '/seguridad/api/menu-perfiles';
    private resourceSearchUrl = '/seguridad/api/_search/menu-perfiles';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(menuPerfil: MenuPerfil): Observable<MenuPerfil> {
        const token = this.authServerProvider.getToken();
        menuPerfil.numEliminar = 1;
        menuPerfil.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(menuPerfil);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(menuPerfil: MenuPerfil): Observable<MenuPerfil> {
        const copy = this.convert(menuPerfil);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    updateLogic(menuPerfil: MenuPerfil): Observable<MenuPerfil> {
        menuPerfil.numEliminar = 0;
        const copy = this.convert(menuPerfil);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<MenuPerfil> {
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
     * Convert a returned JSON object to MenuPerfil.
     */
    private convertItemFromServer(json: any): MenuPerfil {
        const entity: MenuPerfil = Object.assign(new MenuPerfil(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a MenuPerfil to a JSON which can be sent to the server.
     */
    private convert(menuPerfil: MenuPerfil): MenuPerfil {
        const copy: MenuPerfil = Object.assign({}, menuPerfil);

        copy.datFechaLog = this.dateUtils.toDate(menuPerfil.datFechaLog);
        return copy;
    }
}
