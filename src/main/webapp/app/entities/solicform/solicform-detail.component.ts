import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Solicform } from './solicform.model';
import { SolicformService } from './solicform.service';

@Component({
    selector: 'jhi-solicform-detail',
    templateUrl: './solicform-detail.component.html'
})
export class SolicformDetailComponent implements OnInit, OnDestroy {

    solicform: Solicform;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private solicformService: SolicformService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSolicforms();
    }

    load(id) {
        this.solicformService.find(id).subscribe((solicform) => {
            this.solicform = solicform;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSolicforms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'solicformListModification',
            (response) => this.load(this.solicform.id)
        );
    }
}
