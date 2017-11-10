import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Resulconci } from './resulconci.model';
import { ResulconciService } from './resulconci.service';

@Component({
    selector: 'jhi-resulconci-detail',
    templateUrl: './resulconci-detail.component.html'
})
export class ResulconciDetailComponent implements OnInit, OnDestroy {

    resulconci: Resulconci;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resulconciService: ResulconciService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResulconcis();
    }

    load(id) {
        this.resulconciService.find(id).subscribe((resulconci) => {
            this.resulconci = resulconci;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResulconcis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resulconciListModification',
            (response) => this.load(this.resulconci.id)
        );
    }
}
