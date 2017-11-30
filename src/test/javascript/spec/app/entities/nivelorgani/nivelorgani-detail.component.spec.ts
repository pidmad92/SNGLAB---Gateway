/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NivelorganiDetailComponent } from '../../../../../../main/webapp/app/entities/nivelorgani/nivelorgani-detail.component';
import { NivelorganiService } from '../../../../../../main/webapp/app/entities/nivelorgani/nivelorgani.service';
import { Nivelorgani } from '../../../../../../main/webapp/app/entities/nivelorgani/nivelorgani.model';

describe('Component Tests', () => {

    describe('Nivelorgani Management Detail Component', () => {
        let comp: NivelorganiDetailComponent;
        let fixture: ComponentFixture<NivelorganiDetailComponent>;
        let service: NivelorganiService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NivelorganiDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NivelorganiService,
                    JhiEventManager
                ]
            }).overrideTemplate(NivelorganiDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NivelorganiDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NivelorganiService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Nivelorgani(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.nivelorgani).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
