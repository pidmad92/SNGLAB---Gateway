import { Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent  } from '@angular/router';
import { MenuItem, Message } from 'primeng/primeng';
import { EnvioNotificacionWizardService } from './envio-notificacion-wizard/envio-notificacion-wizard.service';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-envio-notificacion',
    templateUrl: './envio-notificacion.component.html',
    styleUrls: ['envio-notificacion.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EnvioNotificacionComponent implements OnInit, OnChanges {

    items: MenuItem[];
    expedientes: any;
    currentUrl = '/';
    msgs: Message[] = [];
    private routeExp = '/conciliaciones/expediente/envio-notificacion';
    activeIndex: number;
    url: string;
    router: any;
    routes = ['seleccion-expediente', 'verificacion-expediente', 'resumen-notificacion'];

    constructor( router: Router, private envioNotificacionService: EnvioNotificacionWizardService, private eventManager: JhiEventManager) {
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
        this.envioNotificacionService.expedienteSeleccionado.subscribe((expedientes) => {
            this.expedientes = expedientes;
            this.isExpedientesSelect();
        });

        this.items = [{
                label: 'Seleccion del Expediente',
                routerLinkActiveOptions: '{exact: true}',
                command: (event: any) => {
                    this.activeIndex = 0;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Seleccion', detail: event.item.label});
                }
            },
            {
                label: 'Verificación de Datos',
                routerLinkActiveOptions: '{exact: true}',
                command: (event: any) => {
                    this.activeIndex = 1;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Verificacion', detail: event.item.label});
                }
            },
            {
                label: 'Resumen',
                routerLinkActiveOptions: 'active' ,
                command: (event: any) => {
                    this.activeIndex = 2;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Resumen', detail: event.item.label});
                }
            },
        ];
    }
    isExpedientesSelect() {
        if ( Object.keys(this.expedientes).length === 0) {
            return false;
        } else {
            return true;
        }
    }

    getStepCurrent(url) {
        let ct = 0;
        for (const r of this.routes) {
            console.log('Compare' + r + '|' + url);
            if ( url.indexOf(r) !== -1 ) {
                console.log('GetStep' + ct);
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

    public next() {
        this.activeIndex++;
        console.log('Cambio de Rutas:' + this.activeIndex);
        this.router.navigate(['/conciliaciones/expediente/envio-notificacion', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
        // show / hide steps and emit selected label
        this.ngOnChanges({
            activeIndex: {
                currentValue: this.activeIndex,
                previousValue: this.activeIndex - 1,
                firstChange: false,
                isFirstChange: () => false
            }
        });
        if (this.activeIndex === 2) {
            this.eventManager.broadcast({ name: 'envioNotificaciones', content: 'OK'});
        }
    }

    public previous() {
        this.activeIndex--;
        this.router.navigate(['/conciliaciones/expediente/envio-notificacion', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
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
