import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms' /* Necesario*/
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../../shared';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-trabajador',
    templateUrl: './trabajador.component.html'
})

export class TrabajadorComponent implements OnInit {
    messages: Message[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    formBusquedaTrabajador: FormGroup;

    trabajador: any = {
      documento: {
        tipDoc: '',
        numDoc: '',
      },
    };

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
    ) {
      this.formBusquedaTrabajador = new FormGroup({
        'documento': new FormGroup({
          'tipDoc': new FormControl(this.trabajador.documento.tipDoc,
            Validators.required/*Regla de Validacion,Regla de Validacion Asincrona*/),
          'numDoc': new FormControl('', [
            Validators.required,
            Validators.pattern('[0-9]+'),
            Validators.minLength(8),
            Validators.maxLength(15)
            ])
          })
      });
    }
    ngOnInit() {
    }
    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    buscarTrabajador(formBusquedaTrabajador: FormGroup) {
      console.log(`Buscó al Trabajador:
        Tip.Doc: ${formBusquedaTrabajador.value.documento.tipDoc}
        Num.Doc: ${formBusquedaTrabajador.value.documento.numDoc}`);
      /* Reset a los campos de busqueda del trabajador
      this.formBusquedaTrabajador.reset({
        documento: {
          tipDoc: '',
          numDoc: ''
      }});*/
    }

}
