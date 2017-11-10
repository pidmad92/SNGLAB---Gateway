import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Resolutor } from './resolutor.model';
import { ResolutorService } from './resolutor.service';

@Component({
    selector: 'jhi-resolutor-detail',
    templateUrl: './resolutor-detail.component.html'
})
export class ResolutorDetailComponent implements OnInit, OnDestroy {

    resolutor: Resolutor;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resolutorService: ResolutorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResolutors();
    }

    load(id) {
        this.resolutorService.find(id).subscribe((resolutor) => {
            this.resolutor = resolutor;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResolutors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resolutorListModification',
            (response) => this.load(this.resolutor.id)
        );
    }
}
