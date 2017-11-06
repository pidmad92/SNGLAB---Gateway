import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarioHorario } from './usuario-horario.model';
import { UsuarioHorarioService } from './usuario-horario.service';

@Component({
    selector: 'jhi-usuario-horario-detail',
    templateUrl: './usuario-horario-detail.component.html'
})
export class UsuarioHorarioDetailComponent implements OnInit, OnDestroy {

    usuarioHorario: UsuarioHorario;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private usuarioHorarioService: UsuarioHorarioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsuarioHorarios();
    }

    load(id) {
        this.usuarioHorarioService.find(id).subscribe((usuarioHorario) => {
            this.usuarioHorario = usuarioHorario;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsuarioHorarios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'usuarioHorarioListModification',
            (response) => this.load(this.usuarioHorario.id)
        );
    }
}
