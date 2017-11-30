import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from './../trabajador.model';
import { AtencionTrabajadorService } from './../atencion-trabajador.service';
import { TipdocidentService } from '../tipdocident.service';
import { CartrabService } from '../cartrab.service';

import { Pernatural } from './../pernatural.model';
import { Tipdocident } from './../tipdocident.model';
import { Cartrab } from './../cartrab.model';
import { ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-datos-empleador',
    templateUrl: './datos-empleador.component.html'
})
// export class DatosEmpleadorComponent implements OnInit, OnDestroy {
    export class DatosEmpleadorComponent {
    trabajador: Trabajador;
    pernatural: Pernatural;
    listadocident: Tipdocident[];
    listacargo: Cartrab[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    buscanum: String;
    buscatipo: number;
    cars: any[];
    cols: any[];
    // fechoy: Date;

    constructor(
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private tipdocidentService: TipdocidentService,
        private cartrabService: CartrabService,
        private route: ActivatedRoute
    ) {
    }

    // ngOnInit() {
    //     // this.fechoy = new Date();
    //     this.trabajador = new Trabajador();
    //     this.trabajador.pernatural = new Pernatural();
    //     this.tipdocidentService.findListaDocIdent()
    //         .subscribe((res: ResponseWrapper) => { this.listadocident = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

    //         this.cartrabService.findListaCargoTrabajador()
    //         .subscribe((res: ResponseWrapper) => { this.listacargo = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

    //     console.log(this.listacargo);
    //     console.log(this.listadocident);
    //     console.log(this.trabajador);
    //     this.cars = [{ 'dpto': 'Lima', 'prov': 'Lima', 'dist': 'Puente Piedra', 'direc': 'Mz D Lt. 18 Urb.', 'noti': '', 'acci': '' },
    //                  { 'dpto': 'Lima', 'prov': 'Lima', 'dist': 'Jesus Maria', 'direc': 'Av. Salaverry x', 'noti': '', 'acci': '' }
    //                 ]
    //     this.cols = [
    //         {field: 'dpto', header: 'Dpto'},
    //         {field: 'prov', header: 'Provincia'},
    //         {field: 'dist', header: 'Distrito'},
    //         {field: 'direc', header: 'Dirección'},
    //         {field: 'noti', header: 'Notificar'},
    //         {field: 'acci', header: 'Acciones'}
    //     ];
    //     this.subscription = this.route.params.subscribe((params) => {
    //         // this.load(params['id']);
    //     });
    //     // this.tipdocidentService.query()
    //     // .subscribe((res: ResponseWrapper) => { this.tipdocidents = res.json; });
    //     // this.registerChangeInAccionadops();
    // }

    load(id) {
        this.atencionTrabajadorService.find(id).subscribe((trabajador) => {
            this.trabajador = trabajador;
        });
    }

    previousState() {
        window.history.back();
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    //     this.eventManager.destroy(this.eventSubscriber);
    // }

    registerChangeInAccionadops() {
        this.eventSubscriber = this.eventManager.subscribe(
            'datosTrabajadorListModification',
            (response) => this.load(this.trabajador.id)
        );
    }

    // trackTipoDocumentoIdentidad(index: number, item: Tipdocident) {
    //     return item.vDescorta;
    // }

    // trackCargos(index: number, item: Cartrab) {
    //     return item.vDesCartra;
    // }

    // buscaTrabajadorByDocIdent() {
    //     //  const tipodoc = this.buscatipo // 45051; // id de DNI
    //      const tipodoc = 1;
    //     //  const numdoc =  this.buscanum; //  '12345678';
    //      const numdoc =  '12345678';
    //      console.log(tipodoc);
    //      console.log(numdoc);
    //     this.atencionTrabajadorService.findTrabajadorByDocIdent(tipodoc, numdoc).subscribe((trabajador) => {
    //         console.log(trabajador);
    //         this.trabajador = trabajador;
    //     });
    // }

    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
    }
}
