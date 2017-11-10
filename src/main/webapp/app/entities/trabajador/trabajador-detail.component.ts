import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from './trabajador.model';
import { TrabajadorService } from './trabajador.service';

@Component({
    selector: 'jhi-trabajador-detail',
    templateUrl: './trabajador-detail.component.html'
})
export class TrabajadorDetailComponent implements OnInit, OnDestroy {

    trabajador: Trabajador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private trabajadorService: TrabajadorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTrabajadors();
    }

    load(id) {
        this.trabajadorService.find(id).subscribe((trabajador) => {
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

    registerChangeInTrabajadors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'trabajadorListModification',
            (response) => this.load(this.trabajador.id)
        );
    }
}
