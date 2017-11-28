import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Formperfil } from './formperfil.model';
import { FormperfilService } from './formperfil.service';

@Component({
    selector: 'jhi-formperfil-detail',
    templateUrl: './formperfil-detail.component.html'
})
export class FormperfilDetailComponent implements OnInit, OnDestroy {

    formperfil: Formperfil;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private formperfilService: FormperfilService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFormperfils();
    }

    load(id) {
        this.formperfilService.find(id).subscribe((formperfil) => {
            this.formperfil = formperfil;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFormperfils() {
        this.eventSubscriber = this.eventManager.subscribe(
            'formperfilListModification',
            (response) => this.load(this.formperfil.id)
        );
    }
}
