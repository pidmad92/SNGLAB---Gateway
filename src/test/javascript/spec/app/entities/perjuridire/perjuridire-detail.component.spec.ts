/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PerjuridireDetailComponent } from '../../../../../../main/webapp/app/entities/perjuridire/perjuridire-detail.component';
import { PerjuridireService } from '../../../../../../main/webapp/app/entities/perjuridire/perjuridire.service';
import { Perjuridire } from '../../../../../../main/webapp/app/entities/perjuridire/perjuridire.model';

describe('Component Tests', () => {

    describe('Perjuridire Management Detail Component', () => {
        let comp: PerjuridireDetailComponent;
        let fixture: ComponentFixture<PerjuridireDetailComponent>;
        let service: PerjuridireService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PerjuridireDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PerjuridireService,
                    JhiEventManager
                ]
            }).overrideTemplate(PerjuridireDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PerjuridireDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerjuridireService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Perjuridire(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.perjuridire).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
