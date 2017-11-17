import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Dlabingrperc } from './dlabingrperc.model';
import { DlabingrpercService } from './dlabingrperc.service';

@Component({
    selector: 'jhi-dlabingrperc-detail',
    templateUrl: './dlabingrperc-detail.component.html'
})
export class DlabingrpercDetailComponent implements OnInit, OnDestroy {

    dlabingrperc: Dlabingrperc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dlabingrpercService: DlabingrpercService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDlabingrpercs();
    }

    load(id) {
        this.dlabingrpercService.find(id).subscribe((dlabingrperc) => {
            this.dlabingrperc = dlabingrperc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDlabingrpercs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dlabingrpercListModification',
            (response) => this.load(this.dlabingrperc.id)
        );
    }
}
