import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Empleador } from './empleador.model';
import { EmpleadorService } from './empleador.service';

@Component({
    selector: 'jhi-empleador-detail',
    templateUrl: './empleador-detail.component.html'
})
export class EmpleadorDetailComponent implements OnInit, OnDestroy {

    empleador: Empleador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private empleadorService: EmpleadorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmpleadors();
    }

    load(id) {
        this.empleadorService.find(id).subscribe((empleador) => {
            this.empleador = empleador;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmpleadors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'empleadorListModification',
            (response) => this.load(this.empleador.id)
        );
    }
}
