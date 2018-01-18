
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from '../../models/trabajador.model';
import { AtencionTrabajadorService } from './../atencion-trabajador.service';
import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';

import { Sucesor } from '../../models/sucesor.model';
import { Atencion } from '../../models/atencion.model';
import { Dirpernat } from '../../models/dirpernat.model';
import { Pernatural } from '../../models/pernatural.model';
import { Tipdocident } from '../../models/tipdocident.model';
import { Cartrab } from '../../models/cartrab.model';
import { ComboModel } from '../../../general/combobox.model';
import { ResponseWrapper } from '../../../../shared';
import { ES } from './../../../applications.constant';

@Component({
    selector: 'jhi-datos-trabajador',
    templateUrl: './datos-trabajador.component.html'
})
export class DatosTrabajadorComponent implements OnInit, OnDestroy {
    // export class DatosTrabajadorComponent {

    atencion: any;
    // trabajador: Trabajador;
    trabajador: any;
    pernatural: Pernatural;
    listadocident: Tipdocident[] = [];
    listacargo: Cartrab[] = [];
    tipodocs: Tipdocident[];
    selectedTipodoc: Tipdocident;
    selectedTipodocsu: Tipdocident;
    private subscription: Subscription;
    private atenSubscription: Subscription;
    private eventSubscriber: Subscription;
    private bandPantSuscriber: Subscription;
    private atenSuscriber: Subscription;
    vNumdocumento: String;
    vNumdocumentosu: String;
    routeSub: any;
    direcciones: any;
    displayDialog: boolean;
    displayDialogsu: boolean;
    newDirec: boolean;
    newDirecsu: boolean;
    departamentos: SelectItem[];
    departs: ResponseWrapper;
    provins: ResponseWrapper;
    distris: ResponseWrapper;
    dirpernat: Dirpernat[];
    dirpersucesor: Dirpernat[];
    dirper = new Dirpernat();
    dirpersu = new Dirpernat();
    selecDirper: Dirpernat;

    actividadSelec: string;

    fechoy: Date;
    maxlengthDocIdent: number;
    maxlengthDocIdentsu: number;
    paganterior: string;
    isVisible: boolean;

    es: any;
    dFecnac: Date;
    // dFecnac: String;
    accion: number;
    accionsu: number;
    predecesor: string;

    block: boolean;
    mensajes: Message[] = [];

    sucesor: any;

    constructor(
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private router: Router,
        private registroAtencionWizard: RegistroAtencionWizardService,
        // private cartrabService: CartrabService,
        private route: ActivatedRoute
    ) {
    }

    loadTipoDoc() {
        this.atencionTrabajadorService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
            },
        (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    loadDirecPerNatu(id: any) {
        this.atencionTrabajadorService.buscarDireccionesPerNat(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirpernat = res.json;
                if (this.dirpernat !== undefined) {
                    this.isVisible = true;
                } else {
                    this.isVisible = false;
                }
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    loadDirecPerSucesor(id: any) {
        this.atencionTrabajadorService.buscarDireccionesSucesor(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirpersucesor = res.json;
                if (this.dirpersucesor !== undefined) {
                    this.isVisible = true;
                } else {
                    this.isVisible = false;
                }
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    inicializaTablas() {
        this.dirpernat = [];
        this.dirper = new Dirpernat();
        this.isVisible = false;
        this.dirpersucesor = [];
        this.dirpersu = new Dirpernat();
    }

    inicializarFormulario() {
        this.inicializaTablas();
        // this.vNumdocumento = '';
        this.displayDialog = false;
        if (this.trabajador !== null) {
            // this.trabajador = new Trabajador();
            this.trabajador.nFlgsuces = false;
            this.trabajador.id = undefined;
            this.trabajador.pernatural = new Pernatural();
            // this.sucesor = new Sucesor();
            // this.sucesor.pernatural = new Pernatural();
            this.trabajador.cartrab = new Cartrab();
        }
    }

    changeTipdocident() {
        this.vNumdocumento = '';
        if (this.selectedTipodoc !== undefined) {
            this.maxlengthDocIdent = this.selectedTipodoc.nNumdigi;
        }
        this.inicializarFormulario();
    }

    changeTipdocidentsu() {
        this.vNumdocumentosu = '';
        if (this.selectedTipodocsu !== undefined) {
            this.maxlengthDocIdentsu = this.selectedTipodocsu.nNumdigi;
        }
        // this.inicializarFormulario();
        this.dirpersucesor = [];
        this.dirpersu = new Dirpernat();
    }

    buscaSucesorByDocIdent() {
        if (this.selectedTipodocsu.id === undefined || this.vNumdocumentosu === undefined) {
            return;
        }
        if (this.selectedTipodocsu.id === this.selectedTipodoc.id || this.vNumdocumentosu === this.vNumdocumento) {
            return;
        }
        this.atencionTrabajadorService.findPernaturalByDocIdent(this.selectedTipodocsu.id, this.vNumdocumentosu).subscribe((personanatural) => {
            this.sucesor = new Sucesor();
            if (personanatural.id !== undefined) {
                this.sucesor.trabajador = this.trabajador;
                this.sucesor.pernatural = personanatural;
                this.loadDirecPerSucesor(this.sucesor.pernatural.id);
            } else {
                this.sucesor.pernatural = new Pernatural();
                this.sucesor.trabajador = new Trabajador();
            }
            this.registerChangeSucesor();
        });
    }

    buscaTrabajadorByDocIdent() {
        // this.inicializarFormulario();
        //  const tipodoc = 1;
        //  const numdoc =  this.vNumdocumento; //  '12345678';
        // this.atencionTrabajadorService.findTrabajadorByDocIdent(tipodoc, numdoc).subscribe((trabajador) => {
        //     this.trabajador = trabajador;
        // });
        // console.log('Busca Trabajador...');
        // console.log(JSON.stringify(this.selectedTipodoc.id) + '|' + this.vNumdocumento);
        if (this.selectedTipodoc.id === undefined || this.vNumdocumento === undefined) {
            return;
        }
         const tipodoc = this.selectedTipodoc.id; // 1;
         const numdoc =  this.vNumdocumento; //  '12345678';
        //  console.log(tipodoc);
        //  console.log(numdoc);
        this.atencionTrabajadorService.findTrabajadorByDocIdent(tipodoc, numdoc).subscribe((trabajador) => {
            // console.log(trabajador);
            this.trabajador = trabajador;
            if (this.trabajador.id !== undefined) {
                this.loadDirecPerNatu(this.trabajador.id);
                if (this. trabajador.nFlgsuces) {
                    this.atencionTrabajadorService.findSucesorByTrabajador(this.trabajador.id).subscribe((sucesor) => {
                        this.sucesor = sucesor;
                        if (this.sucesor.id !== undefined) {
                            this.sucesor.pernatural = sucesor.pernatural;
                            this.sucesor.trabajador = this.trabajador
                            this.selectedTipodocsu = this.sucesor.pernatural.tipdocident;
                            this.vNumdocumentosu = this.sucesor.pernatural.vNumdoc;
                            this.dirpersu.pernatural = this.sucesor.pernatural;
                            this.loadDirecPerSucesor(this.sucesor.id);
                        } else {
                            this.dirpersu = new Dirpernat();
                            this.dirpersucesor = [];
                            this.sucesor = new Sucesor();
                            this.sucesor.pernatural = new Pernatural();
                            this.sucesor.trabajador = new Trabajador();
                        }
                    });
                    this.registerChangeSucesor();
                }
            }
            this.registerChangeInTrabajador();
            this.registroAtencionWizard.trabajadorSeleccionado.subscribe((loadtrabajador) => {
                this.trabajador = loadtrabajador;
                this.predecesor = this.trabajador.pernatural.vNombres + ' ' + this.trabajador.pernatural.vApepat + ' ' + this.trabajador.pernatural.vApemat;
            });
        },
        (res: ResponseWrapper) => { this.onError(res.json); }
    );
        // this.mensajes = [];
        // this.mensajes.push({severity: 'success', summary: 'Mensaje de Confirmación', detail: 'Motivo del pase deseleccionado correctamente'});
    }

    // private subscribeToSaveResponse(result: Observable<Motivpase>, mensaje: string) {
    //     result.subscribe((res: Motivpase) =>
    //         this.onSaveSuccess(res, mensaje), (res: Response) => this.onSaveError(res));
    // }
    // private onSaveSuccess(result: Motivpase, mensaje: string) {
    //     this.loadMotivOfic(this.pasegl.id);
    //     this.mensajes = [];
    //     this.mensajes.push({severity: 'success', summary: 'Mensaje de Confirmación', detail: mensaje});
    // }

    formattedDate(d: Date): string {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return `${day}/${month}/${year}`;
    }

    ngOnInit() {
        this.accion = 1;
        this.es = ES;
        this.inicializaTablas();
        this.fechoy = new Date();
        this.loadTipoDoc();
        this.loadDepartamentos();
        this.atencion = new Atencion();
        this.trabajador = new Trabajador();
        this.trabajador.pernatural = new Pernatural();
        this.sucesor = new Sucesor();
        this.sucesor.pernatural = new Pernatural();
        this.sucesor.trabajador = new Trabajador();
        // Se carga el tipo de actividad a realizar y los datos de la atención
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadsel) => {
            this.actividadSelec = actividadsel;
            this.atenSubscription = this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                this.registroAtencionWizard.trabajadorSeleccionado.subscribe((loadtrabajador) => {
                    this.trabajador = loadtrabajador;
                this.bandPantSuscriber = this.registroAtencionWizard.paganteriorSelec.subscribe((paginante) => {
                    this.paganterior = paginante;
                    // console.log('Pagina Anterior: ' + paginante);
                    // console.log('actividadseleccionada: ' + actividadsel);
                if (actividadsel === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-trabajador']);
                } else if (actividadsel === '1') { // Si el flujo es generado al clickear el boton nuevo registro se instanciaran los datos en blanco
                        if (this.paganterior === '0') {
                            this.isVisible = false;
                            this.trabajador = new Trabajador();
                            this.trabajador.pernatural = new Pernatural();
                            this.sucesor = new Sucesor();
                            this.sucesor.pernatural = new Pernatural();
                            this.sucesor.trabajador = new Trabajador();
                            this.dirpernat = [];
                            this.dirper = new Dirpernat();
                            this.dirpersu = new Dirpernat();
                            this.dirpersucesor = [];
                            // console.log('destruir todo');
                            this.ngOnDestroy();
                        } else {
                            if (this.paganterior >= '1') {
                                    // console.log('Recupera trabajador grabado: ' + JSON.stringify(this.trabajador));
                                    if (this.trabajador.id !== undefined) {
                                        this.isVisible = true;
                                        this.dirper = new Dirpernat();
                                        this.dirpernat = [];
                                        this.dirper.pernatural = this.trabajador.pernatural;
                                        this.dirpersu = new Dirpernat();
                                        this.dirpersucesor = [];
                                        // console.log('Load Trabajador.Personanatural: ' + JSON.stringify(this.trabajador.pernatural));
                                        this.selectedTipodoc = this.trabajador.pernatural.tipdocident;
                                        this.vNumdocumento = this.trabajador.pernatural.vNumdoc;
                                        // this.dFecnac = new Date(this.trabajador.pernatural.dFecnac);
                                        this.dFecnac = this.atencionTrabajadorService.convertFechas(this.trabajador.pernatural.dFecnac);
                                        this.loadDirecPerNatu(this.trabajador.id);
                                        this.predecesor = this.trabajador.pernatural.vNombres + ' ' + this.trabajador.pernatural.vApepat + ' ' + this.trabajador.pernatural.vApemat;
                                        this.sucesor = new Sucesor();
                                        this.sucesor.pernatural = new Pernatural();
                                        this.sucesor.trabajador = new Trabajador();
                                        if (this.trabajador.nFlgsuces) {
                                            this.registroAtencionWizard.sucesorSeleccionado.subscribe((loadSucesor) => {
                                                this.sucesor = loadSucesor;
                                                if (this.sucesor.id !== undefined) {
                                                    this.sucesor.pernatural = loadSucesor.pernatural;
                                                    this.sucesor.trabajador = loadSucesor.trabajador;
                                                    this.selectedTipodocsu = this.sucesor.pernatural.tipdocident;
                                                    this.vNumdocumentosu = this.sucesor.pernatural.vNumdoc;
                                                    // this.dFecnac = this.atencionTrabajadorService.convertFechas(this.trabajador.pernatural.dFecnac);
                                                    this.dirpersu.pernatural = this.sucesor.pernatural;
                                                    this.loadDirecPerSucesor(this.sucesor.pernatural.id);
                                                }
                                            });
                                        }
                                    } else {
                                        this.isVisible = false;
                                        this.trabajador = new Trabajador();
                                        this.trabajador.pernatural = new Pernatural();
                                        this.sucesor = new Sucesor();
                                        this.sucesor.pernatural = new Pernatural();
                                        this.sucesor.trabajador = new Trabajador();
                                        this.dirpernat = [];
                                        this.dirper = new Dirpernat();
                                        this.dirpersu = new Dirpernat();
                                        this.dirpersucesor = [];
                                    }
                            }
                        }
                        this.paganterior = '1';
                } else {
                    if (atencion.datlab !== undefined ) { // Si la atencion datos laborales se obtienen los datos del trabajador de esta entidad
                        this.trabajador =  this.atencion.datlab.trabajador;
                        this.trabajador.pernatural = this.atencion.datlab.trabajador.pernatural;
                        this.selectedTipodoc = this.atencion.datlab.trabajador.pernatural.tipdocident;
                        this.vNumdocumento = this.atencion.datlab.trabajador.pernatural.vNumdoc;
                        this.dFecnac = new Date(this.atencion.datlab.trabajador.pernatural.dFecnac);
                        this.dFecnac = this.atencionTrabajadorService.convertFechas(this.atencion.datlab.trabajador.pernatural.dFecnac);
                        this.dirper = new Dirpernat();
                        this.dirper.pernatural = this.trabajador.pernatural;
                        this.loadDirecPerNatu(this.trabajador.id);
                        this.predecesor = this.trabajador.pernatural.vNombres + ' ' + this.trabajador.pernatural.vApepat + ' ' + this.trabajador.pernatural.vApemat;
                        this.dirpersu = new Dirpernat();
                        this.dirpersucesor = [];
                        this.sucesor = new Sucesor();
                        this.sucesor.pernatural = new Pernatural();
                        this.sucesor.trabajador = new Trabajador();
                        if (this.trabajador.nFlgsuces) {
                            this.registroAtencionWizard.sucesorSeleccionado.subscribe((loadSucesor) => {
                                this.sucesor = loadSucesor;
                                // this.sucesor.pernatural = loadSucesor.pernatural;
                                // console.log('Atencion.datlab.Sucesor1: ' + JSON.stringify(this.sucesor));
                                if (this.sucesor.id === undefined) {
                                    this.sucesor = new Sucesor();
                                    this.sucesor.pernatural = new Pernatural();
                                    this.sucesor.trabajador = new Trabajador();
                                    // console.log('buscar sucesor por id trabajador: ' + this.trabajador.id);
                                    this.atencionTrabajadorService.findSucesorByTrabajador(this.trabajador.id).subscribe((sucesor) => {
                                        // console.log('sucesor: ', sucesor);
                                        this.sucesor = sucesor;
                                        // console.log('Atencion.datlab.Sucesor2: ' + JSON.stringify(this.sucesor));
                                        if (this.sucesor.id !== undefined) {
                                            this.sucesor.pernatural = sucesor.pernatural;
                                            this.sucesor.trabajador = sucesor.trabajador;
                                            this.selectedTipodocsu = this.sucesor.pernatural.tipdocident;
                                            this.vNumdocumentosu = this.sucesor.pernatural.vNumdoc;
                                            this.dirpersu.pernatural = this.sucesor.pernatural;
                                            this.loadDirecPerSucesor(this.sucesor.pernatural.id);
                                        } else {
                                            this.dirpersu = new Dirpernat();
                                            this.dirpersucesor = [];
                                            this.sucesor = new Sucesor();
                                            this.sucesor.pernatural = new Pernatural();
                                            this.sucesor.trabajador = new Trabajador();
                                        }
                                    });
                                } else if (this.sucesor.id !== undefined) {
                                        // console.log('Existe Sucesor!');
                                        this.sucesor.pernatural = loadSucesor.pernatural;
                                        this.sucesor.trabajador = loadSucesor.trabajador;
                                        this.selectedTipodocsu = this.sucesor.pernatural.tipdocident;
                                        this.vNumdocumento = this.sucesor.pernatural.vNumdoc;
                                        this.dirpersu.pernatural = this.sucesor.pernatural;
                                        this.loadDirecPerSucesor(this.sucesor.pernatural.id);
                                }
                            });
                        } else {
                            this.dirpersu = new Dirpernat();
                            this.dirpersucesor = [];
                            this.sucesor = new Sucesor();
                            this.sucesor.pernatural = new Pernatural();
                            this.sucesor.trabajador = new Trabajador();
                        }
                    } else { // Si la atención no tiene datos laborales se carga la información de la propia atención.
                        this.trabajador =  this.atencion.trabajador;
                        this.trabajador.pernatural = this.atencion.trabajador.pernatural;
                        this.selectedTipodoc = this.atencion.trabajador.pernatural.tipdocident;
                        this.vNumdocumento = this.atencion.trabajador.pernatural.vNumdoc;
                        // this.dFecnac = new Date(this.atencion.trabajador.pernatural.dFecnac);
                        this.dFecnac = this.atencionTrabajadorService.convertFechas(this.atencion.trabajador.pernatural.dFecnac);
                        this.dirper = new Dirpernat();
                        this.dirper.pernatural = this.trabajador.pernatural;
                        this.loadDirecPerNatu(this.trabajador.id);
                        this.predecesor = this.trabajador.pernatural.vNombres + ' ' + this.trabajador.pernatural.vApepat + ' ' + this.trabajador.pernatural.vApemat;
                        this.sucesor = new Sucesor();
                        this.sucesor.pernatural = new Pernatural();
                        this.sucesor.trabajador = new Trabajador();
                        if (this.trabajador.nFlgsuces) {
                            this.registroAtencionWizard.sucesorSeleccionado.subscribe((loadSucesor) => {
                                this.sucesor = loadSucesor;
                                // console.log('Atencion.trabajador.Sucesor3: ' + JSON.stringify(this.sucesor));
                                if (this.sucesor.id === undefined) {
                                    this.sucesor = new Sucesor();
                                    this.sucesor.pernatural = new Pernatural();
                                    this.sucesor.trabajador = new Trabajador();
                                    this.atencionTrabajadorService.findSucesorByTrabajador(this.trabajador.id).subscribe((sucesor) => {
                                        this.sucesor = sucesor;
                                        // console.log('Atencion.trabajador.Sucesor4: ' + JSON.stringify(this.sucesor));
                                        if (this.sucesor.id !== undefined) {
                                            this.sucesor.pernatural = sucesor.pernatural;
                                            this.sucesor.trabajador = sucesor.trabajador;
                                            this.selectedTipodocsu = this.sucesor.pernatural.tipdocident;
                                            this.vNumdocumentosu = this.sucesor.pernatural.vNumdoc;
                                            this.dirpersu.pernatural = this.sucesor.pernatural;
                                            this.loadDirecPerSucesor(this.sucesor.pernatural.id);
                                        } else {
                                            this.dirpersu = new Dirpernat();
                                            this.dirpersucesor = [];
                                            this.sucesor = new Sucesor();
                                            this.sucesor.pernatural = new Pernatural();
                                            this.sucesor.trabajador = new Trabajador();
                                        }
                                    });
                                }
                                if (this.sucesor.id !== undefined) {
                                    this.sucesor.pernatural = loadSucesor.pernatural;
                                    this.sucesor.trabajador = loadSucesor.trabajador;
                                    this.selectedTipodocsu = this.sucesor.pernatural.tipdocident;
                                    this.vNumdocumentosu = this.sucesor.pernatural.vNumdoc;
                                    this.dirpersu.pernatural = this.sucesor.pernatural;
                                    this.loadDirecPerSucesor(this.sucesor.pernatural.id);
                                }
                            });
                        } else {
                            this.dirpersu = new Dirpernat();
                            this.dirpersucesor = [];
                            this.sucesor = new Sucesor();
                            this.sucesor.pernatural = new Pernatural();
                            this.sucesor.trabajador = new Trabajador();
                        }
                    }
                }
            });
            this.registerChangeSucesor();
            this.registerChangePaganterior();
            });
            });
            this.registerChangeInTrabajador();
        });
        // if (this.sucesor === undefined) {
        //     this.sucesor = new Sucesor();
        //     this.sucesor.pernatural = new Pernatural();
        //     this.sucesor.trabajador = new Trabajador();
        // }
    }
    ngOnDestroy() {
        if (this.subscription !== undefined) {
            this.subscription.unsubscribe();
        }
        if (this.atenSubscription !== undefined) {
            this.atenSubscription.unsubscribe();
        }
        if (this.eventSubscriber !== undefined) {
            this.eventSubscriber.unsubscribe();
        }
    }

    load(id) {
        this.atencionTrabajadorService.findTrabajadorById(id).subscribe((trabajador) => {
            this.trabajador = trabajador;
        });
    }
    loadDepartamentos() {
        this.atencionTrabajadorService.consDep().subscribe((departamentos) => {
            this.departs = departamentos.json;
        });
    }
    loadProvincias(init: boolean, idDept) {
        this.atencionTrabajadorService.consProv(this.padWithZero(idDept)).subscribe((provincias) => {
            this.provins = provincias.json;
            if (init) {
                this.dirper.nCodprov = Number(this.provins[0].vCodpro);
                this.loadDistritos(true, this.provins[0].vCodpro);
            }
        });
    }
    loadDistritos(init: boolean, idProv) {
        this.atencionTrabajadorService.consDis(this.padWithZero(this.dirper.nCoddepto), this.padWithZero(idProv)).subscribe((distritos) => {
            this.distris = distritos.json;
            if (init) {
                this.dirper.nCoddist = Number(this.distris[0].vCoddis);
            }
        });
    }

    showDialogToAdd() {
        this.newDirec = true;
        this.displayDialog = true;
        this.accion = 1;
    }

    showDialogToAddsu() {
        this.newDirecsu = true;
        this.displayDialogsu = true;
        this.accionsu = 1;
    }

    showDialogToAction(accion: number) {
        this.accion = accion;
        if (this.accion === 2) {
            console.log('Editar: ' + this.dirper);
        } else if (this.accion === 3) {
            console.log('Eliminar: ' + this.dirper);
        }
        this.newDirec = false;
        this.displayDialog = true;
    }

    showDialogToActionsu(accion: number) {
        this.accionsu = accion;
        if (this.accionsu === 2) {
            console.log('Editar: ' + this.dirpersu);
        } else if (this.accionsu === 3) {
            console.log('Eliminar: ' + this.dirpersu);
        }
        this.newDirecsu = false;
        this.displayDialogsu = true;
    }

    onRowSelect(event) {
        this.newDirec = false;
        this.dirper = this.cloneDirec(event.data.direc);
        this.loadProvincias(false, this.dirper.nCoddepto);
        this.loadDistritos(false, this.dirper.nCodprov);
        this.displayDialog = true;
    }

    onRowSelectsu(event) {
        this.newDirecsu = false;
        this.dirpersu = this.cloneDirec(event.data.direc);
        this.loadProvincias(false, this.dirpersu.nCoddepto);
        this.loadDistritos(false, this.dirpersu.nCodprov);
        this.displayDialogsu = true;
    }

    save() {
        if (this.newDirec) {
            this.subscribeToSaveResponse(
                 this.atencionTrabajadorService.createDirPerNat(this.dirper));
        } else {
            this.subscribeToSaveResponse(
                this.atencionTrabajadorService.updateDirPerNat(this.dirper));
        }
        this.dirper = new Dirpernat();
    }

    savesu() {
        if (this.newDirecsu) {
            this.subscribeToSaveResponse(
                 this.atencionTrabajadorService.createDirPerNat(this.dirpersu));
        } else {
            this.subscribeToSaveResponse(
                this.atencionTrabajadorService.updateDirPerNat(this.dirpersu));
        }
        this.dirper = new Dirpernat();
    }

    close() {
        this.dirper = new Dirpernat();
        this.dirper.pernatural = this.trabajador.pernatural;
        this.displayDialog = false;
    }

    closesu() {
        this.dirpersu = new Dirpernat();
        this.dirpersu.pernatural = this.trabajador.pernatural;
        this.displayDialogsu = false;
    }

    delete() {}

    deletesu() {}

    registerChangeSucesor() {
        this.registroAtencionWizard.cambiarSucesor(this.sucesor);
    }

    registerChangeInTrabajador() {
        // this.eventSubscriber = this.eventManager.subscribe('saveTrabajador',
        // (response) => {
            // console.log('PasarTrabajador' + JSON.stringify(this.trabajador));
            // this.registroAtencionWizard.cambiarEstadoStep();
            this.registroAtencionWizard.cambiarTrabajador(this.trabajador);
        // });
    }

    registerChangeAtencion(atencion: Atencion) {
        // this.atenSuscriber = this.eventManager.subscribe('saveAten',
        // (response) => {
            this.registroAtencionWizard.cambiarAtencion(atencion);
        // });
    }

    registerChangePaganterior() {
        // this.bandPantSuscriber = this.eventManager.subscribe('savePageAnte',
        // (response) => {
            this.registroAtencionWizard.cambiarBandPagAnterior(this.paganterior);
        // });
    }

    private subscribeToSaveResponse(result: Observable<Dirpernat>) {
        result.subscribe((res: Dirpernat) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dirpernat) {
        this.loadDirecPerNatu(this.trabajador.id);
        this.close();
    }
    private onSaveError() {
        console.log('saveerror');
    }

    previousState() {
        window.history.back();
    }
    trackTipoDocumentoIdentidad(index: number, item: Tipdocident) {
        return item.vDescorta;
    }

    trackCargos(index: number, item: Cartrab) {
        return item.vDescartra;
    }

    cloneDirec(dir: Dirpernat): Dirpernat {
        const direc = new Dirpernat();
        for (const prop in dir) {
            if ( prop) {
                direc[prop] = dir[prop];
            }
        }
        return direc;
    }
    padWithZero(number) {
        let num_form = '' + number;
        if (num_form.length < 2) {
            num_form = '0' + num_form;
        }
        return num_form;
    }

    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }
}
