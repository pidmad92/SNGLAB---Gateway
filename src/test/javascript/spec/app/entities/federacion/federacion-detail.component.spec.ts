/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FederacionDetailComponent } from '../../../../../../main/webapp/app/entities/federacion/federacion-detail.component';
import { FederacionService } from '../../../../../../main/webapp/app/entities/federacion/federacion.service';
import { Federacion } from '../../../../../../main/webapp/app/entities/federacion/federacion.model';

describe('Component Tests', () => {

    describe('Federacion Management Detail Component', () => {
        let comp: FederacionDetailComponent;
        let fixture: ComponentFixture<FederacionDetailComponent>;
        let service: FederacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FederacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FederacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(FederacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FederacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FederacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Federacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.federacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
