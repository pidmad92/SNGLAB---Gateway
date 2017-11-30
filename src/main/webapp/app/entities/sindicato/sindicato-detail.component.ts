import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Sindicato } from './sindicato.model';
import { SindicatoService } from './sindicato.service';

@Component({
    selector: 'jhi-sindicato-detail',
    templateUrl: './sindicato-detail.component.html'
})
export class SindicatoDetailComponent implements OnInit, OnDestroy {

    sindicato: Sindicato;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sindicatoService: SindicatoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSindicatoes();
    }

    load(id) {
        this.sindicatoService.find(id).subscribe((sindicato) => {
            this.sindicato = sindicato;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSindicatoes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sindicatoListModification',
            (response) => this.load(this.sindicato.id)
        );
    }
}
