import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdocident } from './tipdocident.model';
import { TipdocidentService } from './tipdocident.service';

@Component({
    selector: 'jhi-tipdocident-detail',
    templateUrl: './tipdocident-detail.component.html'
})
export class TipdocidentDetailComponent implements OnInit, OnDestroy {

    tipdocident: Tipdocident;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipdocidentService: TipdocidentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipdocidents();
    }

    load(id) {
        this.tipdocidentService.find(id).subscribe((tipdocident) => {
            this.tipdocident = tipdocident;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipdocidents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipdocidentListModification',
            (response) => this.load(this.tipdocident.id)
        );
    }
}
