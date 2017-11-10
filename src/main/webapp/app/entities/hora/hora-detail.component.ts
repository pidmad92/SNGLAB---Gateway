import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Hora } from './hora.model';
import { HoraService } from './hora.service';

@Component({
    selector: 'jhi-hora-detail',
    templateUrl: './hora-detail.component.html'
})
export class HoraDetailComponent implements OnInit, OnDestroy {

    hora: Hora;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private horaService: HoraService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHoras();
    }

    load(id) {
        this.horaService.find(id).subscribe((hora) => {
            this.hora = hora;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHoras() {
        this.eventSubscriber = this.eventManager.subscribe(
            'horaListModification',
            (response) => this.load(this.hora.id)
        );
    }
}
