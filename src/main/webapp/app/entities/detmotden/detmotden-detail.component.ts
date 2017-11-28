import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Detmotden } from './detmotden.model';
import { DetmotdenService } from './detmotden.service';

@Component({
    selector: 'jhi-detmotden-detail',
    templateUrl: './detmotden-detail.component.html'
})
export class DetmotdenDetailComponent implements OnInit, OnDestroy {

    detmotden: Detmotden;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private detmotdenService: DetmotdenService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDetmotdens();
    }

    load(id) {
        this.detmotdenService.find(id).subscribe((detmotden) => {
            this.detmotden = detmotden;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDetmotdens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'detmotdenListModification',
            (response) => this.load(this.detmotden.id)
        );
    }
}
