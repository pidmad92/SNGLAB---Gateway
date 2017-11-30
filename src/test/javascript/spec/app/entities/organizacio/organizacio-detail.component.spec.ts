/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OrganizacioDetailComponent } from '../../../../../../main/webapp/app/entities/organizacio/organizacio-detail.component';
import { OrganizacioService } from '../../../../../../main/webapp/app/entities/organizacio/organizacio.service';
import { Organizacio } from '../../../../../../main/webapp/app/entities/organizacio/organizacio.model';

describe('Component Tests', () => {

    describe('Organizacio Management Detail Component', () => {
        let comp: OrganizacioDetailComponent;
        let fixture: ComponentFixture<OrganizacioDetailComponent>;
        let service: OrganizacioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OrganizacioDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OrganizacioService,
                    JhiEventManager
                ]
            }).overrideTemplate(OrganizacioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganizacioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganizacioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Organizacio(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.organizacio).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
