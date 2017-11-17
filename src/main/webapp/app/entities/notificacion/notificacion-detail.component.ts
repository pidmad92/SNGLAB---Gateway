import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Notificacion } from './notificacion.model';
import { NotificacionService } from './notificacion.service';

@Component({
    selector: 'jhi-notificacion-detail',
    templateUrl: './notificacion-detail.component.html'
})
export class NotificacionDetailComponent implements OnInit, OnDestroy {

    notificacion: Notificacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private notificacionService: NotificacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotificacions();
    }

    load(id) {
        this.notificacionService.find(id).subscribe((notificacion) => {
            this.notificacion = notificacion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotificacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'notificacionListModification',
            (response) => this.load(this.notificacion.id)
        );
    }
}
