import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Docpresate } from './docpresate.model';
import { DocpresateService } from './docpresate.service';

@Component({
    selector: 'jhi-docpresate-detail',
    templateUrl: './docpresate-detail.component.html'
})
export class DocpresateDetailComponent implements OnInit, OnDestroy {

    docpresate: Docpresate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private docpresateService: DocpresateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocpresates();
    }

    load(id) {
        this.docpresateService.find(id).subscribe((docpresate) => {
            this.docpresate = docpresate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocpresates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'docpresateListModification',
            (response) => this.load(this.docpresate.id)
        );
    }
}
