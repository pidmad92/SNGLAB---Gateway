/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PalabraclavDetailComponent } from '../../../../../../main/webapp/app/entities/palabraclav/palabraclav-detail.component';
import { PalabraclavService } from '../../../../../../main/webapp/app/entities/palabraclav/palabraclav.service';
import { Palabraclav } from '../../../../../../main/webapp/app/entities/palabraclav/palabraclav.model';

describe('Component Tests', () => {

    describe('Palabraclav Management Detail Component', () => {
        let comp: PalabraclavDetailComponent;
        let fixture: ComponentFixture<PalabraclavDetailComponent>;
        let service: PalabraclavService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PalabraclavDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PalabraclavService,
                    JhiEventManager
                ]
            }).overrideTemplate(PalabraclavDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PalabraclavDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PalabraclavService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Palabraclav(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.palabraclav).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
