/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DirecnotifDetailComponent } from '../../../../../../main/webapp/app/entities/direcnotif/direcnotif-detail.component';
import { DirecnotifService } from '../../../../../../main/webapp/app/entities/direcnotif/direcnotif.service';
import { Direcnotif } from '../../../../../../main/webapp/app/entities/direcnotif/direcnotif.model';

describe('Component Tests', () => {

    describe('Direcnotif Management Detail Component', () => {
        let comp: DirecnotifDetailComponent;
        let fixture: ComponentFixture<DirecnotifDetailComponent>;
        let service: DirecnotifService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DirecnotifDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DirecnotifService,
                    JhiEventManager
                ]
            }).overrideTemplate(DirecnotifDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DirecnotifDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirecnotifService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Direcnotif(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.direcnotif).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
