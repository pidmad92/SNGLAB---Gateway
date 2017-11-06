import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Permiso } from './permiso.model';
import { PermisoPopupService } from './permiso-popup.service';
import { PermisoService } from './permiso.service';

@Component({
    selector: 'jhi-permiso-dialog',
    templateUrl: './permiso-dialog.component.html'
})
export class PermisoDialogComponent implements OnInit {

    permiso: Permiso;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private permisoService: PermisoService,
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
        if (this.permiso.id !== undefined) {
            this.subscribeToSaveResponse(
                this.permisoService.update(this.permiso));
        } else {
            this.subscribeToSaveResponse(
                this.permisoService.create(this.permiso));
        }
    }

    private subscribeToSaveResponse(result: Observable<Permiso>) {
        result.subscribe((res: Permiso) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Permiso) {
        this.eventManager.broadcast({ name: 'permisoListModification', content: 'OK'});
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
    selector: 'jhi-permiso-popup',
    template: ''
})
export class PermisoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private permisoPopupService: PermisoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.permisoPopupService
                    .open(PermisoDialogComponent as Component, params['id']);
            } else {
                this.permisoPopupService
                    .open(PermisoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
