import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pernatudire } from './pernatudire.model';
import { PernatudirePopupService } from './pernatudire-popup.service';
import { PernatudireService } from './pernatudire.service';
import { Personanatur, PersonanaturService } from '../personanatur';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pernatudire-dialog',
    templateUrl: './pernatudire-dialog.component.html'
})
export class PernatudireDialogComponent implements OnInit {

    pernatudire: Pernatudire;
    isSaving: boolean;

    personanaturs: Personanatur[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pernatudireService: PernatudireService,
        private personanaturService: PersonanaturService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personanaturService.query()
            .subscribe((res: ResponseWrapper) => { this.personanaturs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pernatudire.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pernatudireService.update(this.pernatudire));
        } else {
            this.subscribeToSaveResponse(
                this.pernatudireService.create(this.pernatudire));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pernatudire>) {
        result.subscribe((res: Pernatudire) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Pernatudire) {
        this.eventManager.broadcast({ name: 'pernatudireListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonanaturById(index: number, item: Personanatur) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pernatudire-popup',
    template: ''
})
export class PernatudirePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pernatudirePopupService: PernatudirePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pernatudirePopupService
                    .open(PernatudireDialogComponent as Component, params['id']);
            } else {
                this.pernatudirePopupService
                    .open(PernatudireDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
