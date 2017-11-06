/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DatlaboralDetailComponent } from '../../../../../../main/webapp/app/entities/datlaboral/datlaboral-detail.component';
import { DatlaboralService } from '../../../../../../main/webapp/app/entities/datlaboral/datlaboral.service';
import { Datlaboral } from '../../../../../../main/webapp/app/entities/datlaboral/datlaboral.model';

describe('Component Tests', () => {

    describe('Datlaboral Management Detail Component', () => {
        let comp: DatlaboralDetailComponent;
        let fixture: ComponentFixture<DatlaboralDetailComponent>;
        let service: DatlaboralService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DatlaboralDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DatlaboralService,
                    JhiEventManager
                ]
            }).overrideTemplate(DatlaboralDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatlaboralDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatlaboralService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Datlaboral(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.datlaboral).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
