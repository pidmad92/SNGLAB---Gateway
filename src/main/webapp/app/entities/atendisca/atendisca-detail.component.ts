import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Atendisca } from './atendisca.model';
import { AtendiscaService } from './atendisca.service';

@Component({
    selector: 'jhi-atendisca-detail',
    templateUrl: './atendisca-detail.component.html'
})
export class AtendiscaDetailComponent implements OnInit, OnDestroy {

    atendisca: Atendisca;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private atendiscaService: AtendiscaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAtendiscas();
    }

    load(id) {
        this.atendiscaService.find(id).subscribe((atendisca) => {
            this.atendisca = atendisca;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAtendiscas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'atendiscaListModification',
            (response) => this.load(this.atendisca.id)
        );
    }
}
