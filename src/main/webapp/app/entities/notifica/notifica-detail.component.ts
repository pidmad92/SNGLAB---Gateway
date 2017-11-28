import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Notifica } from './notifica.model';
import { NotificaService } from './notifica.service';

@Component({
    selector: 'jhi-notifica-detail',
    templateUrl: './notifica-detail.component.html'
})
export class NotificaDetailComponent implements OnInit, OnDestroy {

    notifica: Notifica;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private notificaService: NotificaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotificas();
    }

    load(id) {
        this.notificaService.find(id).subscribe((notifica) => {
            this.notifica = notifica;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotificas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'notificaListModification',
            (response) => this.load(this.notifica.id)
        );
    }
}
