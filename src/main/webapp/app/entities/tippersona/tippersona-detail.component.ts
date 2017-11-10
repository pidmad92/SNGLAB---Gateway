import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tippersona } from './tippersona.model';
import { TippersonaService } from './tippersona.service';

@Component({
    selector: 'jhi-tippersona-detail',
    templateUrl: './tippersona-detail.component.html'
})
export class TippersonaDetailComponent implements OnInit, OnDestroy {

    tippersona: Tippersona;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tippersonaService: TippersonaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTippersonas();
    }

    load(id) {
        this.tippersonaService.find(id).subscribe((tippersona) => {
            this.tippersona = tippersona;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTippersonas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tippersonaListModification',
            (response) => this.load(this.tippersona.id)
        );
    }
}
