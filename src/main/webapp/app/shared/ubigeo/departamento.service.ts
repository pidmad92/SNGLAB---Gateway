import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Departamento } from './departamento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DepartamentoService {

    private resourceUrl = 'api/departamentos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    find(id: number): Observable<Departamento> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
    private convert(departamento: Departamento): Departamento {
        const copy: Departamento = Object.assign({}, departamento);
        return copy;
    }
}
