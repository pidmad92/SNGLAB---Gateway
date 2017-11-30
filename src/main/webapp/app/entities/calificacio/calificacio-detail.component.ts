import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Calificacio } from './calificacio.model';
import { CalificacioService } from './calificacio.service';

@Component({
    selector: 'jhi-calificacio-detail',
    templateUrl: './calificacio-detail.component.html'
})
export class CalificacioDetailComponent implements OnInit, OnDestroy {

    calificacio: Calificacio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private calificacioService: CalificacioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCalificacios();
    }

    load(id) {
        this.calificacioService.find(id).subscribe((calificacio) => {
            this.calificacio = calificacio;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCalificacios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'calificacioListModification',
            (response) => this.load(this.calificacio.id)
        );
    }
}
