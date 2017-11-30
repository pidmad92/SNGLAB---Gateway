/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ScargoDetailComponent } from '../../../../../../main/webapp/app/entities/scargo/scargo-detail.component';
import { ScargoService } from '../../../../../../main/webapp/app/entities/scargo/scargo.service';
import { Scargo } from '../../../../../../main/webapp/app/entities/scargo/scargo.model';

describe('Component Tests', () => {

    describe('Scargo Management Detail Component', () => {
        let comp: ScargoDetailComponent;
        let fixture: ComponentFixture<ScargoDetailComponent>;
        let service: ScargoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ScargoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ScargoService,
                    JhiEventManager
                ]
            }).overrideTemplate(ScargoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScargoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScargoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Scargo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.scargo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
