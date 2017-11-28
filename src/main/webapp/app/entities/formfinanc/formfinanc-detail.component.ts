import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Formfinanc } from './formfinanc.model';
import { FormfinancService } from './formfinanc.service';

@Component({
    selector: 'jhi-formfinanc-detail',
    templateUrl: './formfinanc-detail.component.html'
})
export class FormfinancDetailComponent implements OnInit, OnDestroy {

    formfinanc: Formfinanc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private formfinancService: FormfinancService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFormfinancs();
    }

    load(id) {
        this.formfinancService.find(id).subscribe((formfinanc) => {
            this.formfinanc = formfinanc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFormfinancs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'formfinancListModification',
            (response) => this.load(this.formfinanc.id)
        );
    }
}
