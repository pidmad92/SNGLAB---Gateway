import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Califica } from './califica.model';
import { CalificaService } from './califica.service';

@Component({
    selector: 'jhi-califica-detail',
    templateUrl: './califica-detail.component.html'
})
export class CalificaDetailComponent implements OnInit, OnDestroy {

    califica: Califica;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private calificaService: CalificaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCalificas();
    }

    load(id) {
        this.calificaService.find(id).subscribe((califica) => {
            this.califica = califica;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCalificas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'calificaListModification',
            (response) => this.load(this.califica.id)
        );
    }
}
