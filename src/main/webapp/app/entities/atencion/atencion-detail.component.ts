import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Atencion } from './atencion.model';
import { AtencionService } from './atencion.service';

@Component({
    selector: 'jhi-atencion-detail',
    templateUrl: './atencion-detail.component.html'
})
export class AtencionDetailComponent implements OnInit, OnDestroy {

    atencion: Atencion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private atencionService: AtencionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAtencions();
    }

    load(id) {
        this.atencionService.find(id).subscribe((atencion) => {
            this.atencion = atencion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAtencions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'atencionListModification',
            (response) => this.load(this.atencion.id)
        );
    }
}
