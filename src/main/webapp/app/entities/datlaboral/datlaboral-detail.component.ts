import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Datlaboral } from './datlaboral.model';
import { DatlaboralService } from './datlaboral.service';

@Component({
    selector: 'jhi-datlaboral-detail',
    templateUrl: './datlaboral-detail.component.html'
})
export class DatlaboralDetailComponent implements OnInit, OnDestroy {

    datlaboral: Datlaboral;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private datlaboralService: DatlaboralService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDatlaborals();
    }

    load(id) {
        this.datlaboralService.find(id).subscribe((datlaboral) => {
            this.datlaboral = datlaboral;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDatlaborals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'datlaboralListModification',
            (response) => this.load(this.datlaboral.id)
        );
    }
}
