/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DetmotdenDetailComponent } from '../../../../../../main/webapp/app/entities/detmotden/detmotden-detail.component';
import { DetmotdenService } from '../../../../../../main/webapp/app/entities/detmotden/detmotden.service';
import { Detmotden } from '../../../../../../main/webapp/app/entities/detmotden/detmotden.model';

describe('Component Tests', () => {

    describe('Detmotden Management Detail Component', () => {
        let comp: DetmotdenDetailComponent;
        let fixture: ComponentFixture<DetmotdenDetailComponent>;
        let service: DetmotdenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DetmotdenDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DetmotdenService,
                    JhiEventManager
                ]
            }).overrideTemplate(DetmotdenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DetmotdenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetmotdenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Detmotden(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.detmotden).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
