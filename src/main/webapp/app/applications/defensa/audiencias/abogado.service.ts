import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Abogado } from './abogado.model';
import { ComboModel} from '../../general/combobox.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class AbogadoService {

    private resourceUrl = '/defensa/api/abogados';
    private resourceSearchUrl = '/defensa/api/_search/abogados';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(abogado: Abogado): Observable<Abogado> {
        const copy = this.convert(abogado);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(abogado: Abogado): Observable<Abogado> {
        const copy = this.convert(abogado);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Abogado> {
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

    consultaCbAbogados(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl, null)
            .map((res: Response) => this.convertResponseAbogados(res));
    }

    private convertResponseAbogados(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Abogado = this.convertAbogadoFromServer(jsonResponse[i]);
            result.push(new ComboModel(cm.vNomabogad, cm.id.toString(), 0));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertAbogadoFromServer(json: any): Abogado {
        const entity: Abogado = Object.assign(new Abogado(), json);
        return entity;
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
     * Convert a returned JSON object to Abogado.
     */
    private convertItemFromServer(json: any): Abogado {
        const entity: Abogado = Object.assign(new Abogado(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Abogado to a JSON which can be sent to the server.
     */
    private convert(abogado: Abogado): Abogado {
        const copy: Abogado = Object.assign({}, abogado);

        copy.tFecreg = this.dateUtils.toDate(abogado.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(abogado.tFecupd);
        return copy;
    }
}
