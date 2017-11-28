/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PerjuridicaDetailComponent } from '../../../../../../main/webapp/app/entities/perjuridica/perjuridica-detail.component';
import { PerjuridicaService } from '../../../../../../main/webapp/app/entities/perjuridica/perjuridica.service';
import { Perjuridica } from '../../../../../../main/webapp/app/entities/perjuridica/perjuridica.model';

describe('Component Tests', () => {

    describe('Perjuridica Management Detail Component', () => {
        let comp: PerjuridicaDetailComponent;
        let fixture: ComponentFixture<PerjuridicaDetailComponent>;
        let service: PerjuridicaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PerjuridicaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PerjuridicaService,
                    JhiEventManager
                ]
            }).overrideTemplate(PerjuridicaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PerjuridicaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerjuridicaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Perjuridica(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.perjuridica).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
