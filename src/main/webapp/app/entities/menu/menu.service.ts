import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Menu } from './menu.model';
import { ResponseWrapper, createRequestOption, AuthServerProvider } from '../../shared';

@Injectable()
export class MenuService {

    private resourceUrl = '/seguridad/api/menus';
    private resourceSearchUrl = '/seguridad/api/_search/menus';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private authServerProvider: AuthServerProvider) { }

    create(menu: Menu): Observable<Menu> {
        const token = this.authServerProvider.getToken();
        menu.numEliminar = 1;
        menu.varUsuarioLog = token.substring(token.length - 20);
        const copy = this.convert(menu);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(menu: Menu): Observable<Menu> {
        const copy = this.convert(menu);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    updateLogic(menu: Menu): Observable<Menu> {
        menu.numEliminar = 0;
        const copy = this.convert(menu);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Menu> {
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
     * Convert a returned JSON object to Menu.
     */
    private convertItemFromServer(json: any): Menu {
        const entity: Menu = Object.assign(new Menu(), json);
        entity.datFechaLog = this.dateUtils
            .convertDateTimeFromServer(json.datFechaLog);
        return entity;
    }

    /**
     * Convert a Menu to a JSON which can be sent to the server.
     */
    private convert(menu: Menu): Menu {
        const copy: Menu = Object.assign({}, menu);

        copy.datFechaLog = this.dateUtils.toDate(menu.datFechaLog);
        return copy;
    }
}
