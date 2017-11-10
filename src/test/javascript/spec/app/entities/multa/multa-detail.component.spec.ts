/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MultaDetailComponent } from '../../../../../../main/webapp/app/entities/multa/multa-detail.component';
import { MultaService } from '../../../../../../main/webapp/app/entities/multa/multa.service';
import { Multa } from '../../../../../../main/webapp/app/entities/multa/multa.model';

describe('Component Tests', () => {

    describe('Multa Management Detail Component', () => {
        let comp: MultaDetailComponent;
        let fixture: ComponentFixture<MultaDetailComponent>;
        let service: MultaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MultaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MultaService,
                    JhiEventManager
                ]
            }).overrideTemplate(MultaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MultaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MultaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Multa(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.multa).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
