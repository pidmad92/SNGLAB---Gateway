import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Concilia } from './concilia.model';
import { ConciliaService } from './concilia.service';

@Component({
    selector: 'jhi-concilia-detail',
    templateUrl: './concilia-detail.component.html'
})
export class ConciliaDetailComponent implements OnInit, OnDestroy {

    concilia: Concilia;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private conciliaService: ConciliaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConcilias();
    }

    load(id) {
        this.conciliaService.find(id).subscribe((concilia) => {
            this.concilia = concilia;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConcilias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'conciliaListModification',
            (response) => this.load(this.concilia.id)
        );
    }
}
