/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PasepjDetailComponent } from '../../../../../../main/webapp/app/entities/pasepj/pasepj-detail.component';
import { PasepjService } from '../../../../../../main/webapp/app/entities/pasepj/pasepj.service';
import { Pasepj } from '../../../../../../main/webapp/app/entities/pasepj/pasepj.model';

describe('Component Tests', () => {

    describe('Pasepj Management Detail Component', () => {
        let comp: PasepjDetailComponent;
        let fixture: ComponentFixture<PasepjDetailComponent>;
        let service: PasepjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PasepjDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PasepjService,
                    JhiEventManager
                ]
            }).overrideTemplate(PasepjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PasepjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PasepjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pasepj(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pasepj).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
