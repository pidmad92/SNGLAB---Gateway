import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';
import { ValidarrucModule } from './validar-ruc/validarruc.module';
import { ValidarUsuarioModule } from './validar-usuario/validarusuario.module';
import { RegdenuModule } from './registro-denuncia/Regdenu.module';
import { CalifiModule } from './califi-denuncia/califi.module';
import { ReginternoModule } from './reginterno-denuncia/reginterno.module';

@NgModule({
    imports: [
        ValidarrucModule,
        ValidarUsuarioModule,
        RegdenuModule,
        CalifiModule,
        ReginternoModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDenunciasModule {}
