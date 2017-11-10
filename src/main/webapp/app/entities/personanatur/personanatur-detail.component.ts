import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Personanatur } from './personanatur.model';
import { PersonanaturService } from './personanatur.service';

@Component({
    selector: 'jhi-personanatur-detail',
    templateUrl: './personanatur-detail.component.html'
})
export class PersonanaturDetailComponent implements OnInit, OnDestroy {

    personanatur: Personanatur;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personanaturService: PersonanaturService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPersonanaturs();
    }

    load(id) {
        this.personanaturService.find(id).subscribe((personanatur) => {
            this.personanatur = personanatur;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPersonanaturs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personanaturListModification',
            (response) => this.load(this.personanatur.id)
        );
    }
}
