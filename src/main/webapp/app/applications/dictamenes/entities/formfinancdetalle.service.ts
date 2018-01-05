import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { FormfinancDetalle } from './formfinancdetalle.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';
import { SERVER_API_URL } from '../../../app.constants';
import { DatePipe } from '@angular/common/src/pipes';
import { Tabla } from '../formulario-financiero/tabla.model';

@Injectable()
export class FormfinancDetalleService {

    private resourceUrl = SERVER_API_URL + 'api/formfinancdetals';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/formfinancdetals';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(formfinancdetalle: FormfinancDetalle): Observable<FormfinancDetalle> {
        const copy = this.convert(formfinancdetalle);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(formfinancdetalle: FormfinancDetalle): Observable<FormfinancDetalle> {
        const copy = this.convert(formfinancdetalle);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FormfinancDetalle> {
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
     * Convert a returned JSON object to FormfinancDetalle.
     */
    private convertItemFromServer(json: any): FormfinancDetalle {
        const entity: FormfinancDetalle = Object.assign(new FormfinancDetalle(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a FormfinancDetalle to a JSON which can be sent to the server.
     */
    private convert(formfinancdetalle: FormfinancDetalle): FormfinancDetalle {
        const copy: FormfinancDetalle = Object.assign({}, formfinancdetalle);

        copy.tFecreg = this.dateUtils.toDate(formfinancdetalle.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(formfinancdetalle.tFecupd);
        return copy;
    }

    obtenerComponente(codffina: number, componente: string): Observable<FormfinancDetalle> {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/obtenerComponente';
        return this.http.get(url +  '?codffina=' + codffina + '&componente=' + componente, options)
        .map((res: Response) => {
            if (res.text().length !== 0) {
                const jsonResponse = res.json();
                return this.convertItemFromServer(jsonResponse);
            } else {
                return undefined;
            }
        });
    }

    obtenerListaComponente(codffina: number, componente: string): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/obtenerListaComponente';
        return this.http.get(url +  '?codffina=' + codffina + '&componente=' + componente, options)
        .map((res: Response) => this.convertResponse(res));
    }

    obtenerListaComponenteExcluido(codffina: number, componente: string, excluido: string): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/obtenerListaComponenteExcluido';
        return this.http.get(url +  '?codffina=' + codffina + '&componente=' + componente + '&excluido=' + excluido, options)
        .map((res: Response) => this.convertResponse(res));
    }

    obtenerListaComponentes(codffina: number, componente: string, componente2: string): Observable<ResponseWrapper> {
        const options = createRequestOption();
        const url = SERVER_API_URL + 'api/obtenerListaComponentes';
        return this.http.get(url +  '?codffina=' + codffina + '&componente=' + componente + '&componente2=' + componente2, options)
        .map((res: Response) => this.convertResponse(res));
    }

    guardarFormFinancieroTablas(datepipe: DatePipe, tablas: Tabla[], nCodffina: number) {
        for (let i = 0; i < tablas.length; i++) {
            for (let j = 0; j < tablas[i].componentes.length; j++) {
                const obj = new FormfinancDetalle();

                obj.nCodfdetal = tablas[i].componentes[j].id;
                obj.nCodffina = nCodffina;
                obj.nValffina = tablas[i].componentes[j].cantidad;
                obj.vDesffina = tablas[i].descripcion;
                obj.vUndffina = tablas[i].unidadmedida;
                obj.vCompone = tablas[i].componentes[j].codigo;

                if (obj.nCodfdetal === undefined) {
                    obj.vUsuareg = 'UsuReg1';
                    obj.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                    obj.nSedereg = 0;
                    obj.nFlgactivo = true;

                    obj.vUsuaupd = null;
                    obj.nSedeupd = null;
                    obj.tFecupd = null;
                    this.create(obj).subscribe();
                } else {
                    obj.vUsuareg = tablas[i].componentes[j].vUsureg;
                    obj.tFecreg = datepipe.transform(tablas[i].componentes[j].tFecReg, 'yyyy-MM-dd HH:mm:ss');
                    obj.nSedereg = tablas[i].componentes[j].nSedeReg;
                    obj.nFlgactivo = true;
                    obj.vUsuaupd = 'UsuReg1';
                    obj.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                    obj.nSedeupd = 0;
                    obj.nFlgactivo = true;
                    this.update(obj).subscribe();
                }
            }
        }
    }

    guardarFormFinanciero(datepipe: DatePipe, tablas: Tabla, nCodffina: number) {

        for (let j = 0; j < tablas.componentes.length; j++) {
            const obj = new FormfinancDetalle();
            obj.nCodfdetal = tablas.componentes[j].id;
            obj.nCodffina = nCodffina;
            obj.nValffina = tablas.componentes[j].cantidad;
            obj.vDesffina = tablas.descripcion;
            obj.vUndffina = tablas.unidadmedida;
            obj.vCompone = tablas.componentes[j].codigo;

            if (obj.nCodfdetal === undefined) {
                obj.vUsuareg = 'UsuReg1';
                obj.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                obj.nSedereg = 0;
                obj.nFlgactivo = true;

                obj.vUsuaupd = null;
                obj.nSedeupd = null;
                obj.tFecupd = null;
                this.create(obj).subscribe();
            } else {
                obj.vUsuareg = tablas.componentes[j].vUsureg;
                obj.tFecreg =  datepipe.transform(tablas.componentes[j].tFecReg, 'yyyy-MM-dd HH:mm:ss');
                obj.nSedereg = tablas.componentes[j].nSedeReg;
                obj.vUsuaupd = 'UsuReg1';
                obj.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                obj.nSedeupd = 0;
                obj.nFlgactivo = true;
                this.update(obj).subscribe();
            }
        }
    }

}
