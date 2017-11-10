/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DocumentoDetailComponent } from '../../../../../../main/webapp/app/entities/documento/documento-detail.component';
import { DocumentoService } from '../../../../../../main/webapp/app/entities/documento/documento.service';
import { Documento } from '../../../../../../main/webapp/app/entities/documento/documento.model';

describe('Component Tests', () => {

    describe('Documento Management Detail Component', () => {
        let comp: DocumentoDetailComponent;
        let fixture: ComponentFixture<DocumentoDetailComponent>;
        let service: DocumentoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DocumentoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DocumentoService,
                    JhiEventManager
                ]
            }).overrideTemplate(DocumentoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Documento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.documento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
