/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PersonajuridDetailComponent } from '../../../../../../main/webapp/app/entities/personajurid/personajurid-detail.component';
import { PersonajuridService } from '../../../../../../main/webapp/app/entities/personajurid/personajurid.service';
import { Personajurid } from '../../../../../../main/webapp/app/entities/personajurid/personajurid.model';

describe('Component Tests', () => {

    describe('Personajurid Management Detail Component', () => {
        let comp: PersonajuridDetailComponent;
        let fixture: ComponentFixture<PersonajuridDetailComponent>;
        let service: PersonajuridService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PersonajuridDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PersonajuridService,
                    JhiEventManager
                ]
            }).overrideTemplate(PersonajuridDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonajuridDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonajuridService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Personajurid(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.personajurid).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
