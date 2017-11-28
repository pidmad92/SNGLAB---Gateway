import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper, createRequestOption } from '../../../shared';
import { Tipdocident } from '../../../entities/tipdocident';
import {ComboModel} from '../../general/combobox.model';
import { Pernatural } from '../../../entities/pernatural';

@Injectable()
export class ValidarUsuarioService {
    private resourceTipoDoc = '/denuncias/api/tipdocidents';
    private resourcePersonaValidarServicio = '/api/validarpersonaservicio';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    consultaTipoDocIdentidad(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceTipoDoc, null)
            .map((res: Response) => this.convertResponseTipoDocIdentidad(res));
    }

    consultaPersonaValidaServicio(personaNatural: any): Observable<Pernatural> {
        return this.http.post(this.resourcePersonaValidarServicio, personaNatural).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertPersonaFromServer(jsonResponse);
        });
    }

    private convertResponseTipoDocIdentidad(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Tipdocident = this.convertTipoDocFromServer(jsonResponse[i]);
            result.push(new ComboModel(cm.vDescorta, cm.id.toString(), cm.nNumdigi));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertTipoDocFromServer(json: any): Tipdocident {
        const entity: Tipdocident = Object.assign(new Tipdocident(), json);
        return entity;
    }

    private convertPersonaFromServer(json: any): Pernatural {
        const entity: Pernatural = Object.assign(new Pernatural(), json);
        return entity;
    }

}
