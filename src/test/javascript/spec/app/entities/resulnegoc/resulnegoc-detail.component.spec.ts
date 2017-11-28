/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ResulnegocDetailComponent } from '../../../../../../main/webapp/app/entities/resulnegoc/resulnegoc-detail.component';
import { ResulnegocService } from '../../../../../../main/webapp/app/entities/resulnegoc/resulnegoc.service';
import { Resulnegoc } from '../../../../../../main/webapp/app/entities/resulnegoc/resulnegoc.model';

describe('Component Tests', () => {

    describe('Resulnegoc Management Detail Component', () => {
        let comp: ResulnegocDetailComponent;
        let fixture: ComponentFixture<ResulnegocDetailComponent>;
        let service: ResulnegocService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ResulnegocDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ResulnegocService,
                    JhiEventManager
                ]
            }).overrideTemplate(ResulnegocDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResulnegocDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResulnegocService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Resulnegoc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.resulnegoc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
