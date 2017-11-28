/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MultaconciDetailComponent } from '../../../../../../main/webapp/app/entities/multaconci/multaconci-detail.component';
import { MultaconciService } from '../../../../../../main/webapp/app/entities/multaconci/multaconci.service';
import { Multaconci } from '../../../../../../main/webapp/app/entities/multaconci/multaconci.model';

describe('Component Tests', () => {

    describe('Multaconci Management Detail Component', () => {
        let comp: MultaconciDetailComponent;
        let fixture: ComponentFixture<MultaconciDetailComponent>;
        let service: MultaconciService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MultaconciDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MultaconciService,
                    JhiEventManager
                ]
            }).overrideTemplate(MultaconciDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MultaconciDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MultaconciService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Multaconci(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.multaconci).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
