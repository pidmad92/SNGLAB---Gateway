import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Multa } from './multa.model';
import { MultaService } from './multa.service';

@Component({
    selector: 'jhi-multa-detail',
    templateUrl: './multa-detail.component.html'
})
export class MultaDetailComponent implements OnInit, OnDestroy {

    multa: Multa;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private multaService: MultaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMultas();
    }

    load(id) {
        this.multaService.find(id).subscribe((multa) => {
            this.multa = multa;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMultas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'multaListModification',
            (response) => this.load(this.multa.id)
        );
    }
}
