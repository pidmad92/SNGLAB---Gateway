/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NegocolectDetailComponent } from '../../../../../../main/webapp/app/entities/negocolect/negocolect-detail.component';
import { NegocolectService } from '../../../../../../main/webapp/app/entities/negocolect/negocolect.service';
import { Negocolect } from '../../../../../../main/webapp/app/entities/negocolect/negocolect.model';

describe('Component Tests', () => {

    describe('Negocolect Management Detail Component', () => {
        let comp: NegocolectDetailComponent;
        let fixture: ComponentFixture<NegocolectDetailComponent>;
        let service: NegocolectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NegocolectDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NegocolectService,
                    JhiEventManager
                ]
            }).overrideTemplate(NegocolectDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NegocolectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NegocolectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Negocolect(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.negocolect).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
