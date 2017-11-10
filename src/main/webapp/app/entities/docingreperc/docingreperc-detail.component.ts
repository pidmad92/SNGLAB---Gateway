import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Docingreperc } from './docingreperc.model';
import { DocingrepercService } from './docingreperc.service';

@Component({
    selector: 'jhi-docingreperc-detail',
    templateUrl: './docingreperc-detail.component.html'
})
export class DocingrepercDetailComponent implements OnInit, OnDestroy {

    docingreperc: Docingreperc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private docingrepercService: DocingrepercService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocingrepercs();
    }

    load(id) {
        this.docingrepercService.find(id).subscribe((docingreperc) => {
            this.docingreperc = docingreperc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocingrepercs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'docingrepercListModification',
            (response) => this.load(this.docingreperc.id)
        );
    }
}
