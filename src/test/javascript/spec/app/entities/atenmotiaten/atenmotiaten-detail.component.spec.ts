/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AtenmotiatenDetailComponent } from '../../../../../../main/webapp/app/entities/atenmotiaten/atenmotiaten-detail.component';
import { AtenmotiatenService } from '../../../../../../main/webapp/app/entities/atenmotiaten/atenmotiaten.service';
import { Atenmotiaten } from '../../../../../../main/webapp/app/entities/atenmotiaten/atenmotiaten.model';

describe('Component Tests', () => {

    describe('Atenmotiaten Management Detail Component', () => {
        let comp: AtenmotiatenDetailComponent;
        let fixture: ComponentFixture<AtenmotiatenDetailComponent>;
        let service: AtenmotiatenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AtenmotiatenDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AtenmotiatenService,
                    JhiEventManager
                ]
            }).overrideTemplate(AtenmotiatenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtenmotiatenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtenmotiatenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Atenmotiaten(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.atenmotiaten).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
