/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModacontratoDetailComponent } from '../../../../../../main/webapp/app/entities/modacontrato/modacontrato-detail.component';
import { ModacontratoService } from '../../../../../../main/webapp/app/entities/modacontrato/modacontrato.service';
import { Modacontrato } from '../../../../../../main/webapp/app/entities/modacontrato/modacontrato.model';

describe('Component Tests', () => {

    describe('Modacontrato Management Detail Component', () => {
        let comp: ModacontratoDetailComponent;
        let fixture: ComponentFixture<ModacontratoDetailComponent>;
        let service: ModacontratoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ModacontratoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModacontratoService,
                    JhiEventManager
                ]
            }).overrideTemplate(ModacontratoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModacontratoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModacontratoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Modacontrato(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.modacontrato).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
