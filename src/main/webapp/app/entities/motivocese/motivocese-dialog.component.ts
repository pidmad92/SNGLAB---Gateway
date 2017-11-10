import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motivocese } from './motivocese.model';
import { MotivocesePopupService } from './motivocese-popup.service';
import { MotivoceseService } from './motivocese.service';

@Component({
    selector: 'jhi-motivocese-dialog',
    templateUrl: './motivocese-dialog.component.html'
})
export class MotivoceseDialogComponent implements OnInit {

    motivocese: Motivocese;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motivoceseService: MotivoceseService,
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
        if (this.motivocese.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motivoceseService.update(this.motivocese));
        } else {
            this.subscribeToSaveResponse(
                this.motivoceseService.create(this.motivocese));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motivocese>) {
        result.subscribe((res: Motivocese) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motivocese) {
        this.eventManager.broadcast({ name: 'motivoceseListModification', content: 'OK'});
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
    selector: 'jhi-motivocese-popup',
    template: ''
})
export class MotivocesePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motivocesePopupService: MotivocesePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motivocesePopupService
                    .open(MotivoceseDialogComponent as Component, params['id']);
            } else {
                this.motivocesePopupService
                    .open(MotivoceseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
