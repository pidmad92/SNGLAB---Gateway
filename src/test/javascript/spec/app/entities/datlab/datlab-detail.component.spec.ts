/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DatlabDetailComponent } from '../../../../../../main/webapp/app/entities/datlab/datlab-detail.component';
import { DatlabService } from '../../../../../../main/webapp/app/entities/datlab/datlab.service';
import { Datlab } from '../../../../../../main/webapp/app/entities/datlab/datlab.model';

describe('Component Tests', () => {

    describe('Datlab Management Detail Component', () => {
        let comp: DatlabDetailComponent;
        let fixture: ComponentFixture<DatlabDetailComponent>;
        let service: DatlabService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DatlabDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DatlabService,
                    JhiEventManager
                ]
            }).overrideTemplate(DatlabDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatlabDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatlabService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Datlab(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.datlab).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
