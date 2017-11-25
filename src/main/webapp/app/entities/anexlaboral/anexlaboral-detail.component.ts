import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Anexlaboral } from './anexlaboral.model';
import { AnexlaboralService } from './anexlaboral.service';

@Component({
    selector: 'jhi-anexlaboral-detail',
    templateUrl: './anexlaboral-detail.component.html'
})
export class AnexlaboralDetailComponent implements OnInit, OnDestroy {

    anexlaboral: Anexlaboral;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private anexlaboralService: AnexlaboralService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAnexlaborals();
    }

    load(id) {
        this.anexlaboralService.find(id).subscribe((anexlaboral) => {
            this.anexlaboral = anexlaboral;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnexlaborals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'anexlaboralListModification',
            (response) => this.load(this.anexlaboral.id)
        );
    }
}
