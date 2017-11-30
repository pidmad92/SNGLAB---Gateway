import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Srubro } from './srubro.model';
import { SrubroService } from './srubro.service';

@Component({
    selector: 'jhi-srubro-detail',
    templateUrl: './srubro-detail.component.html'
})
export class SrubroDetailComponent implements OnInit, OnDestroy {

    srubro: Srubro;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private srubroService: SrubroService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSrubros();
    }

    load(id) {
        this.srubroService.find(id).subscribe((srubro) => {
            this.srubro = srubro;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSrubros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'srubroListModification',
            (response) => this.load(this.srubro.id)
        );
    }
}
