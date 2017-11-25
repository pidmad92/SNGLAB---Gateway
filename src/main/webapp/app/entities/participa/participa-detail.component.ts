import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Participa } from './participa.model';
import { ParticipaService } from './participa.service';

@Component({
    selector: 'jhi-participa-detail',
    templateUrl: './participa-detail.component.html'
})
export class ParticipaDetailComponent implements OnInit, OnDestroy {

    participa: Participa;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private participaService: ParticipaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInParticipas();
    }

    load(id) {
        this.participaService.find(id).subscribe((participa) => {
            this.participa = participa;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParticipas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'participaListModification',
            (response) => this.load(this.participa.id)
        );
    }
}
