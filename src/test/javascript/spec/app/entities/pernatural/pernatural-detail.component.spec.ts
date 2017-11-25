/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PernaturalDetailComponent } from '../../../../../../main/webapp/app/entities/pernatural/pernatural-detail.component';
import { PernaturalService } from '../../../../../../main/webapp/app/entities/pernatural/pernatural.service';
import { Pernatural } from '../../../../../../main/webapp/app/entities/pernatural/pernatural.model';

describe('Component Tests', () => {

    describe('Pernatural Management Detail Component', () => {
        let comp: PernaturalDetailComponent;
        let fixture: ComponentFixture<PernaturalDetailComponent>;
        let service: PernaturalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PernaturalDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PernaturalService,
                    JhiEventManager
                ]
            }).overrideTemplate(PernaturalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PernaturalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PernaturalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pernatural(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pernatural).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
