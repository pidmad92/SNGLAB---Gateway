/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PersonanaturDetailComponent } from '../../../../../../main/webapp/app/entities/personanatur/personanatur-detail.component';
import { PersonanaturService } from '../../../../../../main/webapp/app/entities/personanatur/personanatur.service';
import { Personanatur } from '../../../../../../main/webapp/app/entities/personanatur/personanatur.model';

describe('Component Tests', () => {

    describe('Personanatur Management Detail Component', () => {
        let comp: PersonanaturDetailComponent;
        let fixture: ComponentFixture<PersonanaturDetailComponent>;
        let service: PersonanaturService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PersonanaturDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PersonanaturService,
                    JhiEventManager
                ]
            }).overrideTemplate(PersonanaturDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonanaturDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonanaturService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Personanatur(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.personanatur).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
