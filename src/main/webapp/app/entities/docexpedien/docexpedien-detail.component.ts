import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Docexpedien } from './docexpedien.model';
import { DocexpedienService } from './docexpedien.service';

@Component({
    selector: 'jhi-docexpedien-detail',
    templateUrl: './docexpedien-detail.component.html'
})
export class DocexpedienDetailComponent implements OnInit, OnDestroy {

    docexpedien: Docexpedien;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private docexpedienService: DocexpedienService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocexpediens();
    }

    load(id) {
        this.docexpedienService.find(id).subscribe((docexpedien) => {
            this.docexpedien = docexpedien;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocexpediens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'docexpedienListModification',
            (response) => this.load(this.docexpedien.id)
        );
    }
}
