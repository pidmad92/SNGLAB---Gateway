import { Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent  } from '@angular/router';
import { RegistroExpedienteWizardService } from './registro-expediente-wizard/registro-expediente-wizard.service';
import { MenuItem, Message } from 'primeng/primeng';
import { Pasegl } from './';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-registro-expediente',
    templateUrl: './registro-expediente.component.html',
    styleUrls: ['registro-expediente.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegistroExpedienteComponent implements OnInit, OnChanges {

    pasegl = new Pasegl();
    currentUrl = '/';
    items: MenuItem[];
    msgs: Message[] = [];
    private routeExp = '/conciliaciones/expediente/registro';
    activeIndex: number;
    message: string;
    url: string;
    router: any;
    routes = ['datos-pase', 'datos-trabajador', 'datos-empleador', 'datos-expediente', 'datos-audiencia'];

    constructor( router: Router, private data: RegistroExpedienteWizardService, private eventManager: JhiEventManager) {
        this.router = router;
        this.activeIndex = this.getStepCurrent(router.url);
        router.events.forEach((event: NavigationEvent) => {
            if (event instanceof NavigationStart) {
                this.currentUrl = event.url;
                this.activeIndex = this.getStepCurrent(this.currentUrl);
            }
        });
    }

    ngOnInit() {
        this.data.paseSeleccionado.subscribe((pasegl) => {
            this.pasegl = pasegl;
            this.isPaseSelect();
        });

        this.items = [{
                label: 'Datos del Pase',
                routerLink: [this.routeExp, { outlets: { wizard: ['datos-pase'] } }],
                routerLinkActiveOptions: '{exact: true}',
                command: (event: any) => {
                    this.activeIndex = 0;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Pase', detail: event.item.label});
                }
            },
            {
                label: 'Datos del Trabajador',
                routerLink: [this.routeExp, { outlets: { wizard: ['datos-trabajador'] } }],
                routerLinkActiveOptions: '{exact: true}',
                command: (event: any) => {
                    this.activeIndex = 1;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Trabajador', detail: event.item.label});
                }
            },
            {
                label: 'Datos del Empleador',
                routerLink: [this.routeExp, { outlets: { wizard: ['datos-empleador'] } }],
                routerLinkActiveOptions: 'active' ,
                command: (event: any) => {
                    this.activeIndex = 2;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Empleador', detail: event.item.label});
                }
            },
            {
                label: 'Datos del Expediente',
                routerLink: [this.routeExp, { outlets: { wizard: ['datos-expediente'] } }],
                command: (event: any) => {
                    this.activeIndex = 3;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Last Step', detail: event.item.label});
                }
            },
            {
                label: 'Audiencia',
                routerLink: [this.routeExp, { outlets: { wizard: ['datos-audiencia'] } }],
                command: (event: any) => {
                    this.activeIndex = 4;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Audiencia', detail: event.item.label});
                }
            },
        ];
    }

    isPaseSelect() {
        if (typeof this.pasegl.id === 'undefined') {
            return false;
        } else {
            return true;
        }
    }

    getStepCurrent(url) {
        let ct = 0;
        for (const r of this.routes) {
            if ( url.indexOf(r) !== -1 ) {
                return ct;
            }
            ct++;
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        if (!this.items) {
            // we could also check changes['activeIndex'].isFirstChange()
            return;
        }
    }

    onChangeStep(label: string) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: label});
    }
    public start() {
        this.activeIndex++;
        this.router.navigate(['/conciliaciones/expediente/registro', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
        this.ngOnChanges({
            activeIndex: {
                currentValue: this.activeIndex,
                previousValue: this.activeIndex - 1,
                firstChange: false,
                isFirstChange: () => false
            }
        });
    }
    public next() {
        if (this.activeIndex === 4) {
            this.eventManager.broadcast({ name: 'saveExpedienteFinal', content: 'OK'});
        } else {
            this.activeIndex++;
            console.log('Cambio de Rutas:' + this.activeIndex);
            this.router.navigate(['/conciliaciones/expediente/registro', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
            this.ngOnChanges({
                activeIndex: {
                    currentValue: this.activeIndex,
                    previousValue: this.activeIndex - 1,
                    firstChange: false,
                    isFirstChange: () => false
                }
            });
            if (this.activeIndex === 2) {
                this.eventManager.broadcast({ name: 'saveTrabajador', content: 'OK'});
            } else if (this.activeIndex === 3) {
                this.eventManager.broadcast({ name: 'saveEmpleador', content: 'OK'});
            } else if (this.activeIndex === 4) {
                console.log('routeNEXT');
                this.eventManager.broadcast({ name: 'saveExpediente', content: 'OK'});
            }
        }
    }

    public previous() {
        this.activeIndex--;
        this.router.navigate(['/conciliaciones/expediente/registro', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
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
