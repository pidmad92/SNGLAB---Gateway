/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DenunciaDetailComponent } from '../../../../../../main/webapp/app/entities/denuncia/denuncia-detail.component';
import { DenunciaService } from '../../../../../../main/webapp/app/entities/denuncia/denuncia.service';
import { Denuncia } from '../../../../../../main/webapp/app/entities/denuncia/denuncia.model';

describe('Component Tests', () => {

    describe('Denuncia Management Detail Component', () => {
        let comp: DenunciaDetailComponent;
        let fixture: ComponentFixture<DenunciaDetailComponent>;
        let service: DenunciaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DenunciaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DenunciaService,
                    JhiEventManager
                ]
            }).overrideTemplate(DenunciaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DenunciaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DenunciaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Denuncia(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.denuncia).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
