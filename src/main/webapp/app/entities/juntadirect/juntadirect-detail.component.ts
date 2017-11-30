import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Juntadirect } from './juntadirect.model';
import { JuntadirectService } from './juntadirect.service';

@Component({
    selector: 'jhi-juntadirect-detail',
    templateUrl: './juntadirect-detail.component.html'
})
export class JuntadirectDetailComponent implements OnInit, OnDestroy {

    juntadirect: Juntadirect;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private juntadirectService: JuntadirectService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJuntadirects();
    }

    load(id) {
        this.juntadirectService.find(id).subscribe((juntadirect) => {
            this.juntadirect = juntadirect;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJuntadirects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'juntadirectListModification',
            (response) => this.load(this.juntadirect.id)
        );
    }
}
