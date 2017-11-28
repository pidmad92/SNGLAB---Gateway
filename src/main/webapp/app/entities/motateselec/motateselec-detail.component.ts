import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motateselec } from './motateselec.model';
import { MotateselecService } from './motateselec.service';

@Component({
    selector: 'jhi-motateselec-detail',
    templateUrl: './motateselec-detail.component.html'
})
export class MotateselecDetailComponent implements OnInit, OnDestroy {

    motateselec: Motateselec;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motateselecService: MotateselecService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotateselecs();
    }

    load(id) {
        this.motateselecService.find(id).subscribe((motateselec) => {
            this.motateselec = motateselec;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotateselecs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motateselecListModification',
            (response) => this.load(this.motateselec.id)
        );
    }
}
