import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Personajurid } from './personajurid.model';
import { PersonajuridService } from './personajurid.service';

@Component({
    selector: 'jhi-personajurid-detail',
    templateUrl: './personajurid-detail.component.html'
})
export class PersonajuridDetailComponent implements OnInit, OnDestroy {

    personajurid: Personajurid;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personajuridService: PersonajuridService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPersonajurids();
    }

    load(id) {
        this.personajuridService.find(id).subscribe((personajurid) => {
            this.personajurid = personajurid;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPersonajurids() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personajuridListModification',
            (response) => this.load(this.personajurid.id)
        );
    }
}
