import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Actiecon } from './actiecon.model';
import { ActieconService } from './actiecon.service';

@Component({
    selector: 'jhi-actiecon-detail',
    templateUrl: './actiecon-detail.component.html'
})
export class ActieconDetailComponent implements OnInit, OnDestroy {

    actiecon: Actiecon;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private actieconService: ActieconService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInActiecons();
    }

    load(id) {
        this.actieconService.find(id).subscribe((actiecon) => {
            this.actiecon = actiecon;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInActiecons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'actieconListModification',
            (response) => this.load(this.actiecon.id)
        );
    }
}
