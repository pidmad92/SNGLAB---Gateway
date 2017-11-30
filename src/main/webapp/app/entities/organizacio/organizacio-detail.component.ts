import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Organizacio } from './organizacio.model';
import { OrganizacioService } from './organizacio.service';

@Component({
    selector: 'jhi-organizacio-detail',
    templateUrl: './organizacio-detail.component.html'
})
export class OrganizacioDetailComponent implements OnInit, OnDestroy {

    organizacio: Organizacio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private organizacioService: OrganizacioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrganizacios();
    }

    load(id) {
        this.organizacioService.find(id).subscribe((organizacio) => {
            this.organizacio = organizacio;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrganizacios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'organizacioListModification',
            (response) => this.load(this.organizacio.id)
        );
    }
}
