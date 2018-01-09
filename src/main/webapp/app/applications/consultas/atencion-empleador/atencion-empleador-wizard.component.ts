import { Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message } from 'primeng/primeng';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-atencion-empleador-wizard',
    templateUrl: 'atencion-empleador-wizard.component.html',
    styles: [`
        .ui-steps .ui-steps-item {
            width: 20%;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class AtencionEmpleadorWizardComponent implements OnInit, OnChanges  {
    items: MenuItem[];
    msgs: Message[] = [];
    activeIndex: number;
    url: string;
    router: any;
    routes = ['datos-trabajador-representante', 'datos-empleador', 'datos-trabajador-invitado', 'motivos-consulta'
    // , 'vinculo-laboral'
    , 'documentos-presentados'
    // , 'acciones-realizar'
    ];

    constructor(router: Router, private eventManager: JhiEventManager) {
        this.router = router;
        this.activeIndex = this.getStepCurrent(router.url);
    }

    ngOnInit() {
        this.items = [{
                label: 'Datos del Representante',
                // routerLink: ['/consultas/registro-atencion-empleador', { outlets: { wizard: ['datos-representante'] } }],
                routerLinkActiveOptions: '{exact: true}',
                command: (event: any) => {
                    this.activeIndex = 0;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'First Step', detail: event.item.label});
                }
            },
            {
                label: 'Datos del Empleador',
                // routerLink: ['/consultas/registro-atencion-empleador', { outlets: { wizard: ['motivos-consulta'] } }],
                routerLinkActiveOptions: '{exact: true}',
                command: (event: any) => {
                    this.activeIndex = 1;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Seat Selection', detail: event.item.label});
                }
            },
            {
                label: 'Datos del Trabajador',
                // routerLink: ['/consultas/registro-atencion-empleador', { outlets: { wizard: ['datos-empleador'] } }],
                routerLinkActiveOptions: 'active' ,
                command: (event: any) => {
                    this.activeIndex = 2;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Pay with CC', detail: event.item.label});
                }
            },
            {
                label: 'Motivos de Consulta',
                // routerLink: ['/consultas/registro-atencion-empleador', { outlets: { wizard: ['datos-empleador'] } }],
                routerLinkActiveOptions: 'active' ,
                command: (event: any) => {
                    this.activeIndex = 3;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Last Step', detail: event.item.label});
                }
            },
            // {
            //     label: 'Vínculo Laboral',
            //     // routerLink: ['/consultas/registro-atencion-empleador', { outlets: { wizard: ['vinculo-laboral'] } }],
            //     command: (event: any) => {
            //         this.activeIndex = 3;
            //         this.msgs.length = 0;
            //         this.msgs.push({severity: 'info', summary: 'Last Step', detail: event.item.label});
            //     }
            // },
            {
                label: 'Documentos presentados',
                // routerLink: ['/consultas/registro-atencion-empleador', { outlets: { wizard: ['documentos-presentados'] } }],
                command: (event: any) => {
                    this.activeIndex = 4;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Last Step', detail: event.item.label});
                }
            },
            // {
            //     label: 'Acciones a tomar',
            //     // routerLink: ['/consultas/registro-atencion-empleador', { outlets: { wizard: ['acciones-realizar'] } }],
            //     command: (event: any) => {
            //         this.activeIndex = 5;
            //         this.msgs.length = 0;
            //         this.msgs.push({severity: 'info', summary: 'Last Step', detail: event.item.label});
            //     }
            // }
        ];
    }
    ngOnChanges(changes: SimpleChanges) {
        if (!this.items) {
            // we could also check changes['activeIndex'].isFirstChange()
            return;
        }
    }
    /**
     * Can be used to return step current, passing the url.
     */
    getStepCurrent(url) {
        let ct = 0;
        for (const r of this.routes) {
            if ( url.indexOf(r) !== -1 ) {
                return ct;
            }
            ct++;
        }
    }

    onChangeStep(label: string) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: label});
    }

    public next() {
        this.activeIndex++;
        this.router.navigate(['/consultas/registro-atencion-empleador', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
        // Mostrar / ocultar steps y emitir el label seleccionado
        if (this.activeIndex === 4) {
            this.eventManager.broadcast({ name: 'saveMotivos', content: 'OK'});
        }
        this.ngOnChanges({
            activeIndex: {
                currentValue: this.activeIndex,
                previousValue: this.activeIndex - 1,
                firstChange: false,
                isFirstChange: () => false
            }
        });
    }

    public previous() {
        this.activeIndex--;
        this.router.navigate(['/consultas/registro-atencion-empleador', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
        // show / hide steps and emit selected label
        this.ngOnChanges({
            activeIndex: {
                currentValue: this.activeIndex,
                previousValue: this.activeIndex + 1,
                firstChange: false,
                isFirstChange: () => false
            }
        });
    }

}
