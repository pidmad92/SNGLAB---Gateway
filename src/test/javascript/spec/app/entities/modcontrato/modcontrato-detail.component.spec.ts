/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModcontratoDetailComponent } from '../../../../../../main/webapp/app/entities/modcontrato/modcontrato-detail.component';
import { ModcontratoService } from '../../../../../../main/webapp/app/entities/modcontrato/modcontrato.service';
import { Modcontrato } from '../../../../../../main/webapp/app/entities/modcontrato/modcontrato.model';

describe('Component Tests', () => {

    describe('Modcontrato Management Detail Component', () => {
        let comp: ModcontratoDetailComponent;
        let fixture: ComponentFixture<ModcontratoDetailComponent>;
        let service: ModcontratoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ModcontratoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModcontratoService,
                    JhiEventManager
                ]
            }).overrideTemplate(ModcontratoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModcontratoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModcontratoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Modcontrato(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.modcontrato).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
