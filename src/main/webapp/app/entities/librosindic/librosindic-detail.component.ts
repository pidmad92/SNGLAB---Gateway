import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Librosindic } from './librosindic.model';
import { LibrosindicService } from './librosindic.service';

@Component({
    selector: 'jhi-librosindic-detail',
    templateUrl: './librosindic-detail.component.html'
})
export class LibrosindicDetailComponent implements OnInit, OnDestroy {

    librosindic: Librosindic;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private librosindicService: LibrosindicService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLibrosindics();
    }

    load(id) {
        this.librosindicService.find(id).subscribe((librosindic) => {
            this.librosindic = librosindic;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLibrosindics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'librosindicListModification',
            (response) => this.load(this.librosindic.id)
        );
    }
}
