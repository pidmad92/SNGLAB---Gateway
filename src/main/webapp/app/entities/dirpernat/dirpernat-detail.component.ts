import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Dirpernat } from './dirpernat.model';
import { DirpernatService } from './dirpernat.service';

@Component({
    selector: 'jhi-dirpernat-detail',
    templateUrl: './dirpernat-detail.component.html'
})
export class DirpernatDetailComponent implements OnInit, OnDestroy {

    dirpernat: Dirpernat;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dirpernatService: DirpernatService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDirpernats();
    }

    load(id) {
        this.dirpernatService.find(id).subscribe((dirpernat) => {
            this.dirpernat = dirpernat;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDirpernats() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dirpernatListModification',
            (response) => this.load(this.dirpernat.id)
        );
    }
}
