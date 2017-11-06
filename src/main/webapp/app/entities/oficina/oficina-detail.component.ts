import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Oficina } from './oficina.model';
import { OficinaService } from './oficina.service';

@Component({
    selector: 'jhi-oficina-detail',
    templateUrl: './oficina-detail.component.html'
})
export class OficinaDetailComponent implements OnInit, OnDestroy {

    oficina: Oficina;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private oficinaService: OficinaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOficinas();
    }

    load(id) {
        this.oficinaService.find(id).subscribe((oficina) => {
            this.oficina = oficina;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOficinas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'oficinaListModification',
            (response) => this.load(this.oficina.id)
        );
    }
}
