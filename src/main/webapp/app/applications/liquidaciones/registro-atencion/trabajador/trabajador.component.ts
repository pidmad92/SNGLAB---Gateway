import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, NgForm } from '@angular/forms' /* Necesario*/
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
    showFormularioDatosTrabajador: boolean;
    showImputTextNumPartidaSucesion: boolean;

    /* Simula la lista de tipo de documentos */
    listaTipDocs: any/*: {codTipDoc: string, tipDoc: string}[]*/ = [
      {
        codTipDoc: '0',
        desTipDoc: 'DNI'
      },
      {
        codTipDoc: '1',
        desTipDoc: 'Carné de Extrangería'
      },
      {
        codTipDoc: '2',
        desTipDoc: 'Pasaporte'
      },
    ];

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
    ) {
      this.formBusquedaTrabajador = new FormGroup({
        'documento': new FormGroup({
          'tipDoc': new FormControl(null,
            Validators.required),
          'numDoc': new FormControl(null, [
            Validators.required,
            Validators.pattern('[0-9]+'),
            Validators.minLength(8),
            Validators.maxLength(15) // http://www2.sunat.gob.pe/pdt/pdtModulos/independientes/p695/TipoDoc.htm
            ])
          })
      });
      this.showFormularioDatosTrabajador = false;
      this.showImputTextNumPartidaSucesion = false;
    }
    ngOnInit() {
    }
    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    buscarTrabajador(formBusquedaTrabajador: FormGroup) {
      console.log(
        `Buscó al Trabajador:
        Tip.Doc: ${formBusquedaTrabajador.value.documento.tipDoc}
        Num.Doc: ${formBusquedaTrabajador.value.documento.numDoc}`);
      console.log(formBusquedaTrabajador);

      this.mostrarFormularioDatosTrabajador();
      /* Reset a los campos de busqueda del trabajador
      this.formBusquedaTrabajador.reset({
        documento: {
          tipDoc: '',
          numDoc: ''
      }});*/
    }

    // Funciones Utilitarias:

    mostrarFormularioDatosTrabajador() {
      this.showFormularioDatosTrabajador = true;
    }

    mostrarImputTextNumPartidaSucesion() {
      this.showImputTextNumPartidaSucesion = true;
    }

}
