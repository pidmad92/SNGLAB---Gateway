/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AmbitoorganDetailComponent } from '../../../../../../main/webapp/app/entities/ambitoorgan/ambitoorgan-detail.component';
import { AmbitoorganService } from '../../../../../../main/webapp/app/entities/ambitoorgan/ambitoorgan.service';
import { Ambitoorgan } from '../../../../../../main/webapp/app/entities/ambitoorgan/ambitoorgan.model';

describe('Component Tests', () => {

    describe('Ambitoorgan Management Detail Component', () => {
        let comp: AmbitoorganDetailComponent;
        let fixture: ComponentFixture<AmbitoorganDetailComponent>;
        let service: AmbitoorganService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AmbitoorganDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AmbitoorganService,
                    JhiEventManager
                ]
            }).overrideTemplate(AmbitoorganDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AmbitoorganDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AmbitoorganService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Ambitoorgan(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.ambitoorgan).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
