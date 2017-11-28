import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Horacon } from './horacon.model';
import { HoraconService } from './horacon.service';

@Component({
    selector: 'jhi-horacon-detail',
    templateUrl: './horacon-detail.component.html'
})
export class HoraconDetailComponent implements OnInit, OnDestroy {

    horacon: Horacon;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private horaconService: HoraconService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHoracons();
    }

    load(id) {
        this.horaconService.find(id).subscribe((horacon) => {
            this.horacon = horacon;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHoracons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'horaconListModification',
            (response) => this.load(this.horacon.id)
        );
    }
}
