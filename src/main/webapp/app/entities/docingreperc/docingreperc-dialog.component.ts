import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Docingreperc } from './docingreperc.model';
import { DocingrepercPopupService } from './docingreperc-popup.service';
import { DocingrepercService } from './docingreperc.service';

@Component({
    selector: 'jhi-docingreperc-dialog',
    templateUrl: './docingreperc-dialog.component.html'
})
export class DocingrepercDialogComponent implements OnInit {

    docingreperc: Docingreperc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private docingrepercService: DocingrepercService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.docingreperc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.docingrepercService.update(this.docingreperc));
        } else {
            this.subscribeToSaveResponse(
                this.docingrepercService.create(this.docingreperc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Docingreperc>) {
        result.subscribe((res: Docingreperc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Docingreperc) {
        this.eventManager.broadcast({ name: 'docingrepercListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-docingreperc-popup',
    template: ''
})
export class DocingrepercPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docingrepercPopupService: DocingrepercPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.docingrepercPopupService
                    .open(DocingrepercDialogComponent as Component, params['id']);
            } else {
                this.docingrepercPopupService
                    .open(DocingrepercDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
