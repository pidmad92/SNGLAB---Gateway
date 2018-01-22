import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { DatePipe } from '@angular/common';
import { ResponseWrapper, createRequestOption } from '../../../shared';
import { Abogado } from '../models/abogado.model';
import { Resulconci} from '../models/resulconci.model';

@Injectable()
export class ConsultaExpedienteService {

    private resource = '/defensa/api/';
    private resourceAbogados         = this.resource + 'abogados';
    private resourceResultadosConci         = this.resource + 'resulconcis';

    constructor(private http: Http, private dateUtils: JhiDateUtils, private datePipe: DatePipe) { }

    consultarAbogados(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceAbogados, options)
            .map((res: Response) => this.convertResponseAbogados(res));
    }

   private convertResponseAbogados(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerAbogados(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemFromServerAbogados(json: any): Abogado {
        const entity: Abogado = Object.assign(new Abogado(), json);
        entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
        return entity;
    }
    private convertAbogados(abogado: Abogado): Abogado {
        const copy: Abogado = Object.assign({}, abogado);
        copy.tFecreg = this.dateUtils.toDate(abogado.tFecreg);
        copy.tFecupd = this.dateUtils.toDate(abogado.tFecupd);
        return copy;
    }

    consultarResultadosConciliacion(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceResultadosConci, options)
            .map((res: Response) => this.convertResponseResulConci(res));
    }
    private convertResponseResulConci(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerResulConci(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemFromServerResulConci(json: any): Resulconci {
        const entity: Resulconci = Object.assign(new Resulconci(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }
    private convertResulConci(resulconci: Resulconci): Resulconci {
        const copy: Resulconci = Object.assign({}, resulconci);

        copy.tFecreg = this.dateUtils.toDate(resulconci.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(resulconci.tFecupd);
        return copy;
    }
}
