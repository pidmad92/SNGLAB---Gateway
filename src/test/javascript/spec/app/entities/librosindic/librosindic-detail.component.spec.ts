/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LibrosindicDetailComponent } from '../../../../../../main/webapp/app/entities/librosindic/librosindic-detail.component';
import { LibrosindicService } from '../../../../../../main/webapp/app/entities/librosindic/librosindic.service';
import { Librosindic } from '../../../../../../main/webapp/app/entities/librosindic/librosindic.model';

describe('Component Tests', () => {

    describe('Librosindic Management Detail Component', () => {
        let comp: LibrosindicDetailComponent;
        let fixture: ComponentFixture<LibrosindicDetailComponent>;
        let service: LibrosindicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [LibrosindicDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LibrosindicService,
                    JhiEventManager
                ]
            }).overrideTemplate(LibrosindicDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LibrosindicDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LibrosindicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Librosindic(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.librosindic).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
