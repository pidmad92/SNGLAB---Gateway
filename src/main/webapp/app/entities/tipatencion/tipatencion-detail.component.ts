import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipatencion } from './tipatencion.model';
import { TipatencionService } from './tipatencion.service';

@Component({
    selector: 'jhi-tipatencion-detail',
    templateUrl: './tipatencion-detail.component.html'
})
export class TipatencionDetailComponent implements OnInit, OnDestroy {

    tipatencion: Tipatencion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipatencionService: TipatencionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipatencions();
    }

    load(id) {
        this.tipatencionService.find(id).subscribe((tipatencion) => {
            this.tipatencion = tipatencion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipatencions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipatencionListModification',
            (response) => this.load(this.tipatencion.id)
        );
    }
}
