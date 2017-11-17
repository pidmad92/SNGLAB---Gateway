import { Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message } from 'primeng/primeng';

@Component({
    selector: 'jhi-registro-expediente',
    templateUrl: './registro-expediente.component.html',
    styles: [`
        .ui-steps .ui-steps-item {
            width: 20%;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class RegistroExpedienteComponent implements OnInit, OnChanges {

    items: MenuItem[];
    msgs: Message[] = [];
    private routeExp = '/defensa/registro-expediente';
    activeIndex: number;
    url: string;
    router: any;
    routes = ['datos-pase', 'datos-trabajador', 'datos-empleador', 'datos-expediente', 'datos-audiencia'];

    constructor( router: Router) {
        this.router = router;
        this.activeIndex = this.getStepCurrent(router.url);
    }

    ngOnInit() {
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
        this.router.navigate(['/defensa/registro-expediente', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
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
        this.router.navigate(['/defensa/registro-expediente', { outlets: { wizard: [this.routes[this.activeIndex]] } }]);
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
