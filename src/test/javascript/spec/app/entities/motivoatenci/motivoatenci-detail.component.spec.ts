/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MotivoatenciDetailComponent } from '../../../../../../main/webapp/app/entities/motivoatenci/motivoatenci-detail.component';
import { MotivoatenciService } from '../../../../../../main/webapp/app/entities/motivoatenci/motivoatenci.service';
import { Motivoatenci } from '../../../../../../main/webapp/app/entities/motivoatenci/motivoatenci.model';

describe('Component Tests', () => {

    describe('Motivoatenci Management Detail Component', () => {
        let comp: MotivoatenciDetailComponent;
        let fixture: ComponentFixture<MotivoatenciDetailComponent>;
        let service: MotivoatenciService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MotivoatenciDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MotivoatenciService,
                    JhiEventManager
                ]
            }).overrideTemplate(MotivoatenciDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MotivoatenciDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotivoatenciService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Motivoatenci(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.motivoatenci).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
