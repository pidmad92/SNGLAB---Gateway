import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Undnegocio } from './undnegocio.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UndnegocioService {

    private resourceUrl = SERVER_API_URL + 'api/undnegocios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/undnegocios';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(undnegocio: Undnegocio): Observable<Undnegocio> {
        const copy = this.convert(undnegocio);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(undnegocio: Undnegocio): Observable<Undnegocio> {
        const copy = this.convert(undnegocio);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Undnegocio> {
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
     * Convert a returned JSON object to Undnegocio.
     */
    private convertItemFromServer(json: any): Undnegocio {
        const entity: Undnegocio = Object.assign(new Undnegocio(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Undnegocio to a JSON which can be sent to the server.
     */
    private convert(undnegocio: Undnegocio): Undnegocio {
        const copy: Undnegocio = Object.assign({}, undnegocio);

        copy.tFecreg = this.dateUtils.toDate(undnegocio.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(undnegocio.tFecupd);
        return copy;
    }

    obtenerUnidadNegocio(codFormPerfil: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/listarUnidadNegocio';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => this.convertResponse(res));
    }

    eliminar(codFormPerfil: number) {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/eliminarUnidad';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => {
                const jsonResponse = res.json();
                return Object.assign(Number, jsonResponse);
        });
    }
}
