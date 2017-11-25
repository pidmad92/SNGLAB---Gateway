/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SegsaludDetailComponent } from '../../../../../../main/webapp/app/entities/segsalud/segsalud-detail.component';
import { SegsaludService } from '../../../../../../main/webapp/app/entities/segsalud/segsalud.service';
import { Segsalud } from '../../../../../../main/webapp/app/entities/segsalud/segsalud.model';

describe('Component Tests', () => {

    describe('Segsalud Management Detail Component', () => {
        let comp: SegsaludDetailComponent;
        let fixture: ComponentFixture<SegsaludDetailComponent>;
        let service: SegsaludService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SegsaludDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SegsaludService,
                    JhiEventManager
                ]
            }).overrideTemplate(SegsaludDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SegsaludDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SegsaludService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Segsalud(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.segsalud).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
