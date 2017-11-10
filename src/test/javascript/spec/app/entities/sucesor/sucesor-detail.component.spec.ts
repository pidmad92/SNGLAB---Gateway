/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SucesorDetailComponent } from '../../../../../../main/webapp/app/entities/sucesor/sucesor-detail.component';
import { SucesorService } from '../../../../../../main/webapp/app/entities/sucesor/sucesor.service';
import { Sucesor } from '../../../../../../main/webapp/app/entities/sucesor/sucesor.model';

describe('Component Tests', () => {

    describe('Sucesor Management Detail Component', () => {
        let comp: SucesorDetailComponent;
        let fixture: ComponentFixture<SucesorDetailComponent>;
        let service: SucesorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SucesorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SucesorService,
                    JhiEventManager
                ]
            }).overrideTemplate(SucesorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SucesorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SucesorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Sucesor(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.sucesor).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
