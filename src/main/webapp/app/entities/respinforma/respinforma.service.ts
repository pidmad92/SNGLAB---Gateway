import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Respinforma } from './respinforma.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RespinformaService {

    private resourceUrl = SERVER_API_URL + 'api/respinformas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/respinformas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(respinforma: Respinforma): Observable<Respinforma> {
        const copy = this.convert(respinforma);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(respinforma: Respinforma): Observable<Respinforma> {
        const copy = this.convert(respinforma);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Respinforma> {
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
     * Convert a returned JSON object to Respinforma.
     */
    private convertItemFromServer(json: any): Respinforma {
        const entity: Respinforma = Object.assign(new Respinforma(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Respinforma to a JSON which can be sent to the server.
     */
    private convert(respinforma: Respinforma): Respinforma {
        const copy: Respinforma = Object.assign({}, respinforma);

        copy.tFecreg = this.dateUtils.toDate(respinforma.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(respinforma.tFecupd);
        return copy;
    }

    obtenerResponsableInformacion(codFormPerfil: number, tipo: string): Observable<Respinforma> {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/obtenerResponsableInformacion';
        return this.http.get(url + '?tipo=' + tipo + '&codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => {
                const jsonResponse = res.text() ? res.json() : res;
                return this.convertItemFromServer(jsonResponse);
            });
    }

    eliminar(codFormPerfil: number) {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/eliminarResp';
        return this.http.get(url + '?codFormPerfil=' + codFormPerfil, options)
            .map((res: Response) => {
                const jsonResponse = res.json();
                return Object.assign(Number, jsonResponse);
        });
    }
}
