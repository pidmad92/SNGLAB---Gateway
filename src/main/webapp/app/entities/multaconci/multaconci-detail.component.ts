import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Multaconci } from './multaconci.model';
import { MultaconciService } from './multaconci.service';

@Component({
    selector: 'jhi-multaconci-detail',
    templateUrl: './multaconci-detail.component.html'
})
export class MultaconciDetailComponent implements OnInit, OnDestroy {

    multaconci: Multaconci;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private multaconciService: MultaconciService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMultaconcis();
    }

    load(id) {
        this.multaconciService.find(id).subscribe((multaconci) => {
            this.multaconci = multaconci;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMultaconcis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'multaconciListModification',
            (response) => this.load(this.multaconci.id)
        );
    }
}
