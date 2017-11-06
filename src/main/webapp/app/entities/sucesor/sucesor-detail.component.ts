import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Sucesor } from './sucesor.model';
import { SucesorService } from './sucesor.service';

@Component({
    selector: 'jhi-sucesor-detail',
    templateUrl: './sucesor-detail.component.html'
})
export class SucesorDetailComponent implements OnInit, OnDestroy {

    sucesor: Sucesor;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sucesorService: SucesorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSucesors();
    }

    load(id) {
        this.sucesorService.find(id).subscribe((sucesor) => {
            this.sucesor = sucesor;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSucesors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sucesorListModification',
            (response) => this.load(this.sucesor.id)
        );
    }
}
