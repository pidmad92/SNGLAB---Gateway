/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SolicformDetailComponent } from '../../../../../../main/webapp/app/entities/solicform/solicform-detail.component';
import { SolicformService } from '../../../../../../main/webapp/app/entities/solicform/solicform.service';
import { Solicform } from '../../../../../../main/webapp/app/entities/solicform/solicform.model';

describe('Component Tests', () => {

    describe('Solicform Management Detail Component', () => {
        let comp: SolicformDetailComponent;
        let fixture: ComponentFixture<SolicformDetailComponent>;
        let service: SolicformService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SolicformDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SolicformService,
                    JhiEventManager
                ]
            }).overrideTemplate(SolicformDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolicformDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicformService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Solicform(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.solicform).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
