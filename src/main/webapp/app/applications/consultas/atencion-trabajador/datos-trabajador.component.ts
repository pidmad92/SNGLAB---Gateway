import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from './trabajador.model';
import { AtencionTrabajadorService } from './atencion-trabajador.service';
import { MenuItem, Message } from 'primeng/primeng';

@Component({
    selector: 'jhi-datos-trabajador',
    templateUrl: './datos-trabajador.component.html',
    styles: [`
        body .ui-steps:before{
            border: 1px solid #F90014;
            border-bottom: 0px solid red;
        }
        body .ui-steps .ui-steps-item.ui-state-highlight .ui-steps-number {
            background-color: #F90014;
            color: #ffffff;
            border-color: #F90014;
        }
        p-steps{
            width:100%;
        }
        .ui-steps .ui-steps-item {
            width: 20%;
        }
        .ui-steps.steps-custom {
            margin-bottom: 30px;
        }
        .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
            height: 10px;
            padding: 0 1em;
        }
        .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
            background-color: #0081c2;
            color: #FFFFFF;
            display: inline-block;
            width: 36px;
            border-radius: 50%;
            margin-top: -14px;
            margin-bottom: 10px;
        }
        .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
            color: #F90014;
        }
        body .ui-steps .ui-steps-item.ui-state-highlight .ui-steps-title{
            font-weight: 300;
            font-size: 16px;
            font-family: "FranklinGothicStdBC";
            color: #F90014;
        }
        body .ui-steps .ui-steps-item .ui-menuitem-link .ui-steps-title{
            font-weight: 300;
            font-size: 16px;
            font-family: "FranklinGothicStdBC";
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class DatosTrabajadorComponent implements OnInit, OnDestroy {

    trabajador: Trabajador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    items: MenuItem[];
    msgs: Message[] = [];
    activeIndex = 1;

    constructor(
        private eventManager: JhiEventManager,
        private accionadopService: AtencionTrabajadorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.items = [{
            label: 'Datos del Trabajador',
                command: (event: any) => {
                    this.activeIndex = 0;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'First Step', detail: event.item.label});
                }
            },
            {
                label: 'Datos del Empleador',
                command: (event: any) => {
                    this.activeIndex = 1;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Seat Selection', detail: event.item.label});
                }
            },
            {
                label: 'Datos trabajador invitado',
                command: (event: any) => {
                    this.activeIndex = 2;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Pay with CC', detail: event.item.label});
                }
            },
            {
                label: 'Motivos de consulta',
                command: (event: any) => {
                    this.activeIndex = 3;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Last Step', detail: event.item.label});
                }
            },
            {
                label: 'Documento presentado',
                command: (event: any) => {
                    this.activeIndex = 4;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Last Step', detail: event.item.label});
                }
            }
        ];
        this.subscription = this.route.params.subscribe((params) => {
            // this.load(params['id']);
        });
        this.registerChangeInAccionadops();
    }

    load(id) {
        this.accionadopService.find(id).subscribe((trabajador) => {
            this.trabajador = trabajador;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccionadops() {
        this.eventSubscriber = this.eventManager.subscribe(
            'datosTrabajadorListModification',
            (response) => this.load(this.trabajador.id)
        );
    }
}
