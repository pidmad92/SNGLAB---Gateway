import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Pasegl } from './pasegl.model';
import { PaseglService } from './pasegl.service';

@Component({
    selector: 'jhi-pasegl-detail',
    templateUrl: './pasegl-detail.component.html'
})
export class PaseglDetailComponent implements OnInit, OnDestroy {

    pasegl: Pasegl;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private paseglService: PaseglService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPasegls();
    }

    load(id) {
        this.paseglService.find(id).subscribe((pasegl) => {
            this.pasegl = pasegl;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPasegls() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paseglListModification',
            (response) => this.load(this.pasegl.id)
        );
    }
}
