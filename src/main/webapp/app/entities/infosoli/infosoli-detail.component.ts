import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Infosoli } from './infosoli.model';
import { InfosoliService } from './infosoli.service';

@Component({
    selector: 'jhi-infosoli-detail',
    templateUrl: './infosoli-detail.component.html'
})
export class InfosoliDetailComponent implements OnInit, OnDestroy {

    infosoli: Infosoli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private infosoliService: InfosoliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInfosolis();
    }

    load(id) {
        this.infosoliService.find(id).subscribe((infosoli) => {
            this.infosoli = infosoli;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInfosolis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'infosoliListModification',
            (response) => this.load(this.infosoli.id)
        );
    }
}
