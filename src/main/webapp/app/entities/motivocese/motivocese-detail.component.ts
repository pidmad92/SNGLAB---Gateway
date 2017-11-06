import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motivocese } from './motivocese.model';
import { MotivoceseService } from './motivocese.service';

@Component({
    selector: 'jhi-motivocese-detail',
    templateUrl: './motivocese-detail.component.html'
})
export class MotivoceseDetailComponent implements OnInit, OnDestroy {

    motivocese: Motivocese;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motivoceseService: MotivoceseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotivocese();
    }

    load(id) {
        this.motivoceseService.find(id).subscribe((motivocese) => {
            this.motivocese = motivocese;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotivocese() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motivoceseListModification',
            (response) => this.load(this.motivocese.id)
        );
    }
}
