/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RegimenlabDetailComponent } from '../../../../../../main/webapp/app/entities/regimenlab/regimenlab-detail.component';
import { RegimenlabService } from '../../../../../../main/webapp/app/entities/regimenlab/regimenlab.service';
import { Regimenlab } from '../../../../../../main/webapp/app/entities/regimenlab/regimenlab.model';

describe('Component Tests', () => {

    describe('Regimenlab Management Detail Component', () => {
        let comp: RegimenlabDetailComponent;
        let fixture: ComponentFixture<RegimenlabDetailComponent>;
        let service: RegimenlabService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [RegimenlabDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RegimenlabService,
                    JhiEventManager
                ]
            }).overrideTemplate(RegimenlabDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegimenlabDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegimenlabService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Regimenlab(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.regimenlab).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
