import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Activecono } from './activecono.model';
import { ActiveconoService } from './activecono.service';

@Component({
    selector: 'jhi-activecono-detail',
    templateUrl: './activecono-detail.component.html'
})
export class ActiveconoDetailComponent implements OnInit, OnDestroy {

    activecono: Activecono;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private activeconoService: ActiveconoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInActiveconos();
    }

    load(id) {
        this.activeconoService.find(id).subscribe((activecono) => {
            this.activecono = activecono;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInActiveconos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'activeconoListModification',
            (response) => this.load(this.activecono.id)
        );
    }
}
