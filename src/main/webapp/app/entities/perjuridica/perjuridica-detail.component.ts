import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Perjuridica } from './perjuridica.model';
import { PerjuridicaService } from './perjuridica.service';

@Component({
    selector: 'jhi-perjuridica-detail',
    templateUrl: './perjuridica-detail.component.html'
})
export class PerjuridicaDetailComponent implements OnInit, OnDestroy {

    perjuridica: Perjuridica;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private perjuridicaService: PerjuridicaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPerjuridicas();
    }

    load(id) {
        this.perjuridicaService.find(id).subscribe((perjuridica) => {
            this.perjuridica = perjuridica;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPerjuridicas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'perjuridicaListModification',
            (response) => this.load(this.perjuridica.id)
        );
    }
}
