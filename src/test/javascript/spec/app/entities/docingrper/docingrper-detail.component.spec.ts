/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DocingrperDetailComponent } from '../../../../../../main/webapp/app/entities/docingrper/docingrper-detail.component';
import { DocingrperService } from '../../../../../../main/webapp/app/entities/docingrper/docingrper.service';
import { Docingrper } from '../../../../../../main/webapp/app/entities/docingrper/docingrper.model';

describe('Component Tests', () => {

    describe('Docingrper Management Detail Component', () => {
        let comp: DocingrperDetailComponent;
        let fixture: ComponentFixture<DocingrperDetailComponent>;
        let service: DocingrperService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DocingrperDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DocingrperService,
                    JhiEventManager
                ]
            }).overrideTemplate(DocingrperDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocingrperDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocingrperService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Docingrper(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.docingrper).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
