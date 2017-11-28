/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InteresperiDetailComponent } from '../../../../../../main/webapp/app/entities/interesperi/interesperi-detail.component';
import { InteresperiService } from '../../../../../../main/webapp/app/entities/interesperi/interesperi.service';
import { Interesperi } from '../../../../../../main/webapp/app/entities/interesperi/interesperi.model';

describe('Component Tests', () => {

    describe('Interesperi Management Detail Component', () => {
        let comp: InteresperiDetailComponent;
        let fixture: ComponentFixture<InteresperiDetailComponent>;
        let service: InteresperiService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InteresperiDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InteresperiService,
                    JhiEventManager
                ]
            }).overrideTemplate(InteresperiDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InteresperiDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InteresperiService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Interesperi(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.interesperi).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
