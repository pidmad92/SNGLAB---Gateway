import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Calidenu } from './calidenu.model';
import { CalidenuService } from './calidenu.service';

@Component({
    selector: 'jhi-calidenu-detail',
    templateUrl: './calidenu-detail.component.html'
})
export class CalidenuDetailComponent implements OnInit, OnDestroy {

    calidenu: Calidenu;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private calidenuService: CalidenuService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCalidenus();
    }

    load(id) {
        this.calidenuService.find(id).subscribe((calidenu) => {
            this.calidenu = calidenu;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCalidenus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'calidenuListModification',
            (response) => this.load(this.calidenu.id)
        );
    }
}
