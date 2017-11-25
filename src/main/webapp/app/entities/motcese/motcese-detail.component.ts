import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motcese } from './motcese.model';
import { MotceseService } from './motcese.service';

@Component({
    selector: 'jhi-motcese-detail',
    templateUrl: './motcese-detail.component.html'
})
export class MotceseDetailComponent implements OnInit, OnDestroy {

    motcese: Motcese;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motceseService: MotceseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotcese();
    }

    load(id) {
        this.motceseService.find(id).subscribe((motcese) => {
            this.motcese = motcese;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotcese() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motceseListModification',
            (response) => this.load(this.motcese.id)
        );
    }
}
