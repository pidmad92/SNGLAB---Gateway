import { Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message } from 'primeng/primeng';

@Component({
    selector: 'jhi-envio-notificacion',
    templateUrl: './envio-notificacion.component.html',
    styles: [`
        .ui-steps .ui-steps-item {
            width: 33.33333%;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class EnvioNotificacionComponent implements OnInit, OnChanges {

    items: MenuItem[];
    msgs: Message[] = [];
    private routeExp = '/defensa/envio-notificacion';
    activeIndex: number;
    url: string;
    router: any;
    routes = ['seleccion-expediente', 'verificacion-expediente', 'resumen-notificacion'];

    constructor( router: Router) {
        this.router = router;
        this.activeIndex = this.getStepCurrent(router.url);
    }

    ngOnInit() {
        this.items = [{
                label: 'Seleccion del Expediente',
                routerLink: [this.routeExp, { outlets: { wizard: ['seleccion-expediente'] } }],
                routerLinkActiveOptions: '{exact: true}',
                command: (event: any) => {
                    this.activeIndex = 0;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Seleccion', detail: event.item.label});
                }
            },
            {
                label: 'Verificación de Datos',
                routerLink: [this.routeExp, { outlets: { wizard: ['verificacion-expediente'] } }],
                routerLinkActiveOptions: '{exact: true}',
                command: (event: any) => {
                    this.activeIndex = 1;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Verificacion', detail: event.item.label});
                }
            },
            {
                label: 'Resumen',
                routerLink: [this.routeExp, { outlets: { wizard: ['resumen-notificacion'] } }],
                routerLinkActiveOptions: 'active' ,
                command: (event: any) => {
                    this.activeIndex = 2;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Resumen', detail: event.item.label});
                }
            },
        ];
    }

    getStepCurrent(url) {
        let ct = 0;
        for (const r of this.routes) {
            console.log(r);
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

    public next() {
        this.activeIndex++;
        this.router.navigate(['/defensa/envio-notificacion', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
        // show / hide steps and emit selected label
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
        this.router.navigate(['/defensa/envio-notificacion', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
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
