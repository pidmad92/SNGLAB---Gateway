import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';
import { ValidarrucModule } from './validar-ruc/validarruc.module';
import { ValidarUsuarioModule } from './validar-usuario/validarusuario.module';
import { FormularioregdenunciaModule } from './registro-denuncia/formregdenuncia.module';

@NgModule({
    imports: [
        ValidarrucModule,
        ValidarUsuarioModule,
        FormularioregdenunciaModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDenunciasModule {}
