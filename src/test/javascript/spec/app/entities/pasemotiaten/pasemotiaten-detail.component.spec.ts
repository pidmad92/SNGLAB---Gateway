/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PasemotiatenDetailComponent } from '../../../../../../main/webapp/app/entities/pasemotiaten/pasemotiaten-detail.component';
import { PasemotiatenService } from '../../../../../../main/webapp/app/entities/pasemotiaten/pasemotiaten.service';
import { Pasemotiaten } from '../../../../../../main/webapp/app/entities/pasemotiaten/pasemotiaten.model';

describe('Component Tests', () => {

    describe('Pasemotiaten Management Detail Component', () => {
        let comp: PasemotiatenDetailComponent;
        let fixture: ComponentFixture<PasemotiatenDetailComponent>;
        let service: PasemotiatenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PasemotiatenDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PasemotiatenService,
                    JhiEventManager
                ]
            }).overrideTemplate(PasemotiatenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PasemotiatenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PasemotiatenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pasemotiaten(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pasemotiaten).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
