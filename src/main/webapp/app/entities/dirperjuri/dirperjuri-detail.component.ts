import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Dirperjuri } from './dirperjuri.model';
import { DirperjuriService } from './dirperjuri.service';

@Component({
    selector: 'jhi-dirperjuri-detail',
    templateUrl: './dirperjuri-detail.component.html'
})
export class DirperjuriDetailComponent implements OnInit, OnDestroy {

    dirperjuri: Dirperjuri;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dirperjuriService: DirperjuriService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDirperjuris();
    }

    load(id) {
        this.dirperjuriService.find(id).subscribe((dirperjuri) => {
            this.dirperjuri = dirperjuri;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDirperjuris() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dirperjuriListModification',
            (response) => this.load(this.dirperjuri.id)
        );
    }
}
