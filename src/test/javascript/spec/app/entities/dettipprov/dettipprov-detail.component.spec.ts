/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DettipprovDetailComponent } from '../../../../../../main/webapp/app/entities/dettipprov/dettipprov-detail.component';
import { DettipprovService } from '../../../../../../main/webapp/app/entities/dettipprov/dettipprov.service';
import { Dettipprov } from '../../../../../../main/webapp/app/entities/dettipprov/dettipprov.model';

describe('Component Tests', () => {

    describe('Dettipprov Management Detail Component', () => {
        let comp: DettipprovDetailComponent;
        let fixture: ComponentFixture<DettipprovDetailComponent>;
        let service: DettipprovService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DettipprovDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DettipprovService,
                    JhiEventManager
                ]
            }).overrideTemplate(DettipprovDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DettipprovDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DettipprovService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Dettipprov(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dettipprov).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
