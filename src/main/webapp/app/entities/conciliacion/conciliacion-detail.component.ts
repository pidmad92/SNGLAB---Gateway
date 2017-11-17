import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Conciliacion } from './conciliacion.model';
import { ConciliacionService } from './conciliacion.service';

@Component({
    selector: 'jhi-conciliacion-detail',
    templateUrl: './conciliacion-detail.component.html'
})
export class ConciliacionDetailComponent implements OnInit, OnDestroy {

    conciliacion: Conciliacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private conciliacionService: ConciliacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConciliacions();
    }

    load(id) {
        this.conciliacionService.find(id).subscribe((conciliacion) => {
            this.conciliacion = conciliacion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConciliacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'conciliacionListModification',
            (response) => this.load(this.conciliacion.id)
        );
    }
}
