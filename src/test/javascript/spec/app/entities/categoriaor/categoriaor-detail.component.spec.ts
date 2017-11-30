/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CategoriaorDetailComponent } from '../../../../../../main/webapp/app/entities/categoriaor/categoriaor-detail.component';
import { CategoriaorService } from '../../../../../../main/webapp/app/entities/categoriaor/categoriaor.service';
import { Categoriaor } from '../../../../../../main/webapp/app/entities/categoriaor/categoriaor.model';

describe('Component Tests', () => {

    describe('Categoriaor Management Detail Component', () => {
        let comp: CategoriaorDetailComponent;
        let fixture: ComponentFixture<CategoriaorDetailComponent>;
        let service: CategoriaorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CategoriaorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CategoriaorService,
                    JhiEventManager
                ]
            }).overrideTemplate(CategoriaorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoriaorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Categoriaor(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.categoriaor).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
