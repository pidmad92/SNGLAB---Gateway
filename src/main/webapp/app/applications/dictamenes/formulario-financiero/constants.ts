export class Constants {

    // Formulario 1 - Estado de Resultados
    // -----------------------------------------------------------------
    // INGRESOS DE VENTAS NETOS U OPERACIÓN
    public readonly FORM1_TOTAL_DE_INGRESOS = 'TOTAL DE INGRESOS';

    // COSTOS DE VENTAS U OPERACIÓN
    //  I. EMPRESAS DE PRODUCCIÓN (1)
    public readonly FORM1_MATERIA_PRIMA = 'Materia Prima (2)';
    public readonly FORM1_MANO_OBRA_DIRECTA = 'Mano de Obra Directa';
    public readonly FORM1_GASTOS_FABRICACION = 'Gastos de Fabricación (2)';
    public readonly FORM1_SUB_TOTAL = 'Sub-Total';
    public readonly FORM1_DIFERENCIA_INVENTARIO_PRODUCTO_TERMINADO = '(+/-) Diferencia Inventario Producto Terminado';
    public readonly FORM1_DIFERENCIA_INVENTARIO_PRODUCTO_PROCESO = '(+/-) Diferencia Inventario Producto en Proceso';
    public readonly FORM1_SUBTOTAL_PRODUCCION = 'SUBTOTAL';

    //  II. EMPRESAS DE SERVICIOS O COMERCIALIZADORA (1)
    public readonly FORM1_SUBTOTAL_SERVICIOS = 'SUBTOTAL';
    public readonly FORM1_TOTAL_COSTOS_TOTALES_VENTAS_OPERACIONES_SERVICIOS = 'TOTAL COSTOS TOTALES DE VENTAS, OPERACIÓN Y/O SERVICIOS';
    public readonly FORM1_UTILIDAD_BRUTA = 'UTILIDAD (PÉRDIDA) BRUTA';

    // GASTOS OPERATIVOS
    public readonly FORM1_GASTOS_VENTAS_DISTRIBUCION = 'Gastos de Ventas y Distribución (3)';
    public readonly FORM1_GASTOS_ADMINISTRACION = 'Gastos de Administración (3)';
    public readonly FORM1_TOTAL_GASTOS_OPERATIVOS = 'TOTAL DE GASTOS OPERATIVOS';
    public readonly FORM1_UTILIDAD_OPERATIVA = 'UTILIDAD (PÉRDIDA) OPERATIVA';
    public readonly FORM1_INGRESOS_FINANCIEROS = 'Ingresos Financieros (3)';
    public readonly FORM1_GASTOS_FINANCIEROS = 'Gastos Financieros (3)';
    public readonly FORM1_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO = 'Enajenación de Valores y Bienes del Activo Fijo';
    public readonly FORM1_COSTO_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO = 'Costo de Enajenación de Valores y Bienes del Activo Fijo';
    public readonly FORM1_OTROS_INGRESOS = 'Otros Ingresos (3)';
    public readonly FORM1_OTROS_EGRESOS = 'Otros Egresos (3)';
    public readonly FORM1_SUBTOTAL_GASTOS_OPERATIVOS = 'SUBTOTAL';

    public readonly FORM1_UTILIDAD_ANTES_PARTICIPACIONES = 'UTILIDAD (PÉRDIDA) ANTES DE PARTICIPACIONES	';
    public readonly FORM1_PARTICIPACION_TRABAJADORES = 'Participación de los Trabajadores';
    public readonly FORM1_UTILIDAD_ANTES_IMPUESTOS = 'UTILIDAD (PÉRDIDA) ANTES DEL IMPUESTO';
    public readonly FORM1_IMPUESTO_RENTA = 'Impuesto a la Renta';
    public readonly FORM1_UTILIDAD_EJERCICIO = 'UTILIDAD (PÉRDIDA) DEL EJERCICIO';

    // Codigos
    // INGRESOS DE VENTAS NETOS U OPERACIÓN
    public readonly FORM1_COD_TOTAL_DE_INGRESOS = 'f1_tingreso';

    // COSTOS DE VENTAS U OPERACIÓN
    //  I. EMPRESAS DE PRODUCCIÓN (1)
    public readonly FORM1_COD_MATERIA_PRIMA = 'f1_mprima';
    public readonly FORM1_COD_MANO_OBRA_DIRECTA = 'f1_modirecta';
    public readonly FORM1_COD_GASTOS_FABRICACION = 'f1_gasfrab';
    public readonly FORM1_COD_SUB_TOTAL = 'f1_subtotal';
    public readonly FORM1_COD_DIFERENCIA_INVENTARIO_PRODUCTO_TERMINADO = 'f1_difinvproterm';
    public readonly FORM1_COD_DIFERENCIA_INVENTARIO_PRODUCTO_PROCESO = 'f1_difinvpropro';
    public readonly FORM1_COD_SUBTOTAL_PRODUCCION = 'f1_subtotalprod';

    //  II. EMPRESAS DE SERVICIOS O COMERCIALIZADORA (1)
    public readonly FORM1_COD_SUBTOTAL_SERVICIOS = 'f1_subtotalserv';
    public readonly FORM1_COD_TOTAL_COSTOS_TOTALES_VENTAS_OPERACIONES_SERVICIOS = 'f1_tcostvopser';
    public readonly FORM1_COD_UTILIDAD_BRUTA = 'f1_utibruta';

    // GASTOS OPERATIVOS
    public readonly FORM1_COD_GASTOS_VENTAS_DISTRIBUCION = 'f1_gasvendis';
    public readonly FORM1_COD_GASTOS_ADMINISTRACION = 'f1_gasadmin';
    public readonly FORM1_COD_TOTAL_GASTOS_OPERATIVOS = 'f1_tgasope';
    public readonly FORM1_COD_UTILIDAD_OPERATIVA = 'f1_utioper';
    public readonly FORM1_COD_INGRESOS_FINANCIEROS = 'f1_ingfinan';
    public readonly FORM1_COD_GASTOS_FINANCIEROS = 'f1_gasfinan';
    public readonly FORM1_COD_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO = 'f1_envabiacfi';
    public readonly FORM1_COD_COSTO_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO = 'f1_coenvabiacfi';
    public readonly FORM1_COD_OTROS_INGRESOS = 'f1_otroing';
    public readonly FORM1_COD_OTROS_EGRESOS = 'f1_otroegr';
    public readonly FORM1_COD_SUBTOTAL_GASTOS_OPERATIVOS = 'f1_subtotalgasop';

    public readonly FORM1_COD_UTILIDAD_ANTES_PARTICIPACIONES = 'f1_utiantparti';
    public readonly FORM1_COD_PARTICIPACION_TRABAJADORES = 'f1_partitrab';
    public readonly FORM1_COD_UTILIDAD_ANTES_IMPUESTOS = 'f1_utiantimp';
    public readonly FORM1_COD_IMPUESTO_RENTA = 'f1_imprenta';
    public readonly FORM1_COD_UTILIDAD_EJERCICIO = 'f1_utiejerc';
    // -----------------------------------------------------------------
    // Formulario 1 - ANEXO 1A - INGRESOS POR VENTAS NETAS Y/O SERVICIOS
    // -----------------------------------------------------------------
    public readonly FORM1ANEX1A_COD_NAC_VOLUMEN_FISICO = 'f1anex1a_nacvolfisi';
    public readonly FORM1ANEX1A_COD_NAC_PRECIO_PROMEDIO = 'f1anex1a_nacpreprom';
    public readonly FORM1ANEX1A_COD_NAC_INGRESOS = 'f1anex1a_nacingresos';

    public readonly FORM1ANEX1A_COD_INT_VOLUMEN_FISICO = 'f1anex1a_intvolfisi';
    public readonly FORM1ANEX1A_COD_INT_PRECIO_PROMEDIO = 'f1anex1a_intpreprom';
    public readonly FORM1ANEX1A_COD_INT_INGRESOS = 'f1anex1a_intingresos';

    // -----------------------------------------------------------------
    // Formulario 1 - ANEXO 1C - INGRESOS POR VENTAS NETAS Y/O SERVICIOS
    // -----------------------------------------------------------------
    public readonly FORM1ANEX1C_COD_MP_NAC_CANTIDAD_CONSUMIDA = 'f1anex1c_nacmpcantconsu';
    public readonly FORM1ANEX1C_COD_MP_NAC_PRECIO_PROMEDIO = 'f1anex1c_nacmppreprom';
    public readonly FORM1ANEX1C_COD_MP_NAC_COSTO_TOTAL = 'f1anex1c_nacmpcostotal';

    public readonly FORM1ANEX1C_COD_MP_IMP_CANTIDAD_CONSUMIDA = 'f1anex1c_impmpcantconsu';
    public readonly FORM1ANEX1C_COD_MP_IMP_PRECIO_PROMEDIO = 'f1anex1c_impmppreprom';
    public readonly FORM1ANEX1C_COD_MP_IMP_COSTO_TOTAL = 'f1anex1c_impmpcostotal';

    public readonly FORM1ANEX1C_COD_GF_CANTIDAD_CONSUMIDA = 'f1anex1c_gfcantconsu';
    public readonly FORM1ANEX1C_COD_GF_PRECIO_PROMEDIO = 'f1anex1c_gfpreprom';
    public readonly FORM1ANEX1C_COD_GF_COSTO_TOTAL = 'f1anex1c_gfcostotal';

    // -----------------------------------------------------------------
    // Formulario 1 - ANEXO 1D - INGRESOS POR VENTAS NETAS Y/O SERVICIOS
    // -----------------------------------------------------------------
    public readonly FORM1ANEX1D_GASTOS_VENTAS_DISTRIBUCION = 'TOTAL';
    public readonly FORM1ANEX1D_COD_GASTOS_VENTAS_DISTRIBUCION = 'f1anex1d_totalgasvendistri';

    public readonly FORM1ANEX1D_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'f1anex1d_totalgasservprester';

    public readonly FORM1ANEX1D_GASTOS_CARGOS_DIVERSOS_GESTION = 'TOTAL';
    public readonly FORM1ANEX1D_COD_GASTOS_CARGOS_DIVERSOS_GESTION = 'f1anex1d_totalgascardivgestion';

    public readonly FORM1ANEX1D_PROVISIONES = 'TOTAL';
    public readonly FORM1ANEX1D_COD_PROVISIONES = 'f1anex1d_totalprovisiones';

    public readonly FORM1ANEX1D_GASTOS_ADMINISTRACION = 'TOTAL';
    public readonly FORM1ANEX1D_COD_GASTOS_ADMINISTRACION = 'f1anex1d_totalgasadmin';

    public readonly FORM1ANEX1D_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS = 'f1anex1d_totaldeadmgasservpreter';

    public readonly FORM1ANEX1D_INGRESOS_FINANCIEROS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_INGRESOS_FINANCIEROS = 'f1anex1d_totalingfinan';

    public readonly FORM1ANEX1D_GASTOS_FINANCIEROS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_GASTOS_FINANCIEROS = 'f1anex1d_totalgasfinan';

    public readonly FORM1ANEX1D_OTROS_INGRESOS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_OTROS_INGRESOS = 'f1anex1d_totalotrosingresos';

    public readonly FORM1ANEX1D_OTROS_EGRESOS = 'TOTAL';
    public readonly FORM1ANEX1D_COD_OTROS_EGRESOS = 'f1anex1d_totalotrosegresos';

    // -----------------------------------------------------------------
    // Formulario 2 - ESTADO DE SITUACIÓN FINANCIERA
    // -----------------------------------------------------------------

    // ACTIVO CORRIENTE
    public readonly FORM2_CAJA_BANCOS = 'Caja y Bancos';
    public readonly FORM2_INV_VALOR_RAZONABLE_DISPONIBLE_VENTA = 'Inversiones Valor Razonable y Disponible para Venta';
    public readonly FORM2_CUENTAS_COBRAR_COMERCIALES = 'Cuentas por Cobrar Comerciales (1)';
    public readonly FORM2_PROV_CUENTAS_COBRANZA_DUDOSA = '(Provisiones de Cuentas por Cobranza Dudosa)';
    public readonly FORM2_CUENTAS_COBRAR_COMERCIALES_RELACIONADAS = 'Cuentas por Cobrar Comerciales-Relacionadas (1)';
    public readonly FORM2_CUENTAS_COBRAR_PERSONAL_ACCIONISTAS_SOCIOS_DIRECTORES_GERENTES = 'Cuentas por Cobrar al Personal, Accionistas, Socios, Directores y Gerentes';
    public readonly FORM2_CUENTAS_COBRAR_DIVERSAS = 'Cuentas por Cobrar Diversas (1)';
    public readonly FORM2_SERVICIOS_OTROS_CONTRATADOS_ANTICIPADO = 'Servicios y Otros Contratados por Anticipado';
    public readonly FORM2_EXISTENCIAS = 'Existencias';
    public readonly FORM2_OTRAS_CUENTAS = 'Otras Cuentas del Activo Corriente (1)';
    public readonly FORM2_TOTAL_ACTIVO_CORRIENTE = 'TOTAL ACTIVO CORRIENTE';

    // ACTIVO NO CORRIENTE
    public readonly FORM2_INVERSIONES_INMOBILIARIAS = 'Inversiones Inmobiliarias';
    public readonly FORM2_INVERSIONES_MOBILIARIAS = 'Inversiones Mobiliarias';
    public readonly FORM2_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO = 'Activos Adquiridos en Arrendamiento Financiero';
    public readonly FORM2_DEPRECIACION_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO = '(Depreciación de Activos Adquiridos en Arrendamiento Financiero)';
    public readonly FORM2_INMUEBLES_MAQUINARIA_EQUIPO = 'Inmuebles Maquinaria y Equipo';
    public readonly FORM2_DEPRECIACION_INMUEBLES_MAQUINARIA_EQUIPO = '(Depreciación de Inmuebles Maquinaria y Equipo)';
    public readonly FORM2_ACTIVOS_INTANGIBLES_NETO = 'Activos Intangibles Neto';
    public readonly FORM2_ACTIVOS_BIOLOGICOS = 'Activos Biológicos';
    public readonly FORM2_DEPRECIACION_ACTIVO_BIOL_AMOR_AGOTA_ACUM = '(Depreciación de Activo biol.amor.y agota.acum)';
    public readonly FORM2_ACTIVO_DIFERIDO = 'Activo Diferido';
    public readonly FORM2_OTRAS_CUENTAS_ACTIVO_NO_CORRIENTE = 'Otras Cuentas del Activo no Corriente (1)';
    public readonly FORM2_TOTAL_ACTIVO_NO_CORRIENTE = 'TOTAL ACTIVO NO CORRIENTE';

    // PASIVO CORRIENTE
    public readonly FORM2_SOBREGIROS_BANCARIOS = 'Sobregiros Bancarios';
    public readonly FORM2_TRIBUTOS_CONTRAPRESTACIONES_APORTES_PENSIONES_SALUD = 'Tributos, Contraprestaciones y Aportes al Sistema de Pensiones y de Salud por Pagar';
    public readonly FORM2_REMUNERACIONES_PARTICIPACION_PAGAR = 'Remuneraciones y Participaciones por Pagar';
    public readonly FORM2_CUENTAS_PAGAR_COMERCIALES = 'Cuentas por Pagar Comerciales (1)';
    public readonly FORM2_CUENTAS_PAGAR_ACCIONISTAS_DIRECTORES_GERENTES = 'Cuentas por Pagar a los accionistas,directores y gerentes';
    public readonly FORM2_CUENTAS_PAGAR_COMERCIALES_RELACIONADAS = 'Cuentas por Pagar Comerciales - Relacionadas (1)';
    public readonly FORM2_OTRAS_CUENTAS_PAGAR_DIVERSAS = 'Otras Cuentas por Pagar Diversas';
    public readonly FORM2_OBLIGACIONES_FINANCIERAS_PARTE_DEUDA = 'Obligaciones Financieras (Parte corriente de deuda a LP)(1)';
    public readonly FORM2_PROVISIONES = 'Provisiones (1)';
    public readonly FORM2_PASIVO_DIFERIDO = 'Pasivo Diferido';
    public readonly FORM2_OTRAS_CUENTAS_PASIVO_CORRIENTE = 'Otras cuentas del pasivo corriente (1)';
    public readonly FORM2_TOTAL_PASIVO_CORRIENTE = 'TOTAL PASIVO CORRIENTE';

    // PASIVO NO CORRIENTE
    public readonly FORM2_OBLIGACIONES_FINANCIERAS = 'Obligaciones Financieras (1)';
    public readonly FORM2_CUENTAS_PAGAR_COMERCIALES_OTRAS_CUENTAS = 'Cuentas por pagar comerciales y otras cuentas por pagar';
    public readonly FORM2_PROVISIONES_PASIVO_NO_CORRIENTE = 'Provisiones (1)';
    public readonly FORM2_OTRAS_CUENTAS_PASIVO_NO_CORRIENTE = 'Otras cuentas del pasivo no corriente (1)';
    public readonly FORM2_TOTAL_PASIVO_NO_CORRIENTE = 'TOTAL PASIVO NO CORRIENTE';

    // PATRIMONIO
    public readonly FORM2_CAPITAL = 'Capital';
    public readonly FORM2_CAPITAL_ADICIONAL = 'Capital Adicional';
    public readonly FORM2_ACCIONES_INVERSION = 'Acciones de Inversión';
    public readonly FORM2_RESERVAS = 'Reservas';
    public readonly FORM2_RESULTADOS_ACUMULADOS = 'Resultados Acumulados';
    public readonly FORM2_EXCEDENTE_REVALUACION = 'Excedente de Revaluación';
    public readonly FORM2_RESULTADOS_NO_REALIZADOS = 'Resultados No Realizados (1)';
    public readonly FORM2_UTILIDAD = 'Utilidad (Pérdida) neta del Ejercicio';
    public readonly FORM2_TOTAL_PATRIMONIO = 'TOTAL PATRIMONIO';

    // TOTALES
    public readonly FORM2_TOTAL_ACTIVOS = 'TOTAL ACTIVOS';
    public readonly FORM2_TOTAL_PASIVOS = 'TOTAL PASIVOS';
    public readonly FORM2_TOTAL_PASIVOS_PATRIMONIO = 'TOTAL PASIVO Y PATRIMONIO';

    // CODIGOS
    // ACTIVO CORRIENTE
    public readonly FORM2_COD_CAJA_BANCOS = 'form2_cajabancos';
    public readonly FORM2_COD_INV_VALOR_RAZONABLE_DISPONIBLE_VENTA = 'form2_invvalrazdisven';
    public readonly FORM2_COD_CUENTAS_COBRAR_COMERCIALES = 'form2_cuentascocom';
    public readonly FORM2_COD_PROV_CUENTAS_COBRANZA_DUDOSA = 'form2_provcuentascobdud';
    public readonly FORM2_COD_CUENTAS_COBRAR_COMERCIALES_RELACIONADAS = 'form2_cuentascocomerrela';
    public readonly FORM2_COD_CUENTAS_COBRAR_PERSONAL_ACCIONISTAS_SOCIOS_DIRECTORES_GERENTES = 'form2_cuentascoperaccsocdirger';
    public readonly FORM2_COD_CUENTAS_COBRAR_DIVERSAS = 'form2_cuentascodiver';
    public readonly FORM2_COD_SERVICIOS_OTROS_CONTRATADOS_ANTICIPADO = 'form2_servotroscontanti';
    public readonly FORM2_COD_EXISTENCIAS = 'form2_existencias';
    public readonly FORM2_COD_OTRAS_CUENTAS = 'form2_otrascuentas';
    public readonly FORM2_COD_TOTAL_ACTIVO_CORRIENTE = 'form2_totalactcorr';

    // ACTIVO NO CORRIENTE
    public readonly FORM2_COD_INVERSIONES_INMOBILIARIAS = 'form2_invinmobi';
    public readonly FORM2_COD_INVERSIONES_MOBILIARIAS = 'form2_invmobi';
    public readonly FORM2_COD_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO = 'form2_actadqarrfinan';
    public readonly FORM2_COD_DEPRECIACION_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO = 'form2_depreactadqarrfinan';
    public readonly FORM2_COD_INMUEBLES_MAQUINARIA_EQUIPO = 'form2_inmmaqequi';
    public readonly FORM2_COD_DEPRECIACION_INMUEBLES_MAQUINARIA_EQUIPO = 'form2_depinmmaqequipo';
    public readonly FORM2_COD_ACTIVOS_INTANGIBLES_NETO = 'form2_actintneto';
    public readonly FORM2_COD_ACTIVOS_BIOLOGICOS = 'form2_actbiolo';
    public readonly FORM2_COD_DEPRECIACION_ACTIVO_BIOL_AMOR_AGOTA_ACUM = 'form2_depactbiolamoragoacum';
    public readonly FORM2_COD_ACTIVO_DIFERIDO = 'form2_actdif';
    public readonly FORM2_COD_OTRAS_CUENTAS_ACTIVO_NO_CORRIENTE = 'form2_otrascuenactnocorr';
    public readonly FORM2_COD_TOTAL_ACTIVO_NO_CORRIENTE = 'form2_totalactnocorr';

    // PASIVO CORRIENTE
    public readonly FORM2_COD_SOBREGIROS_BANCARIOS = 'form2_sobregiros';
    public readonly FORM2_COD_TRIBUTOS_CONTRAPRESTACIONES_APORTES_PENSIONES_SALUD = 'form2_tribcontaporpensalud';
    public readonly FORM2_COD_REMUNERACIONES_PARTICIPACION_PAGAR = 'form2_remupartpagar';
    public readonly FORM2_COD_CUENTAS_PAGAR_COMERCIALES = 'form2_cuentaspagarcomer';
    public readonly FORM2_COD_CUENTAS_PAGAR_ACCIONISTAS_DIRECTORES_GERENTES = 'form2_cuentaspagaraccdirger';
    public readonly FORM2_COD_CUENTAS_PAGAR_COMERCIALES_RELACIONADAS = 'form2_cuentaspagarcomrel';
    public readonly FORM2_COD_OTRAS_CUENTAS_PAGAR_DIVERSAS = 'form2_otrascuepagardiv';
    public readonly FORM2_COD_OBLIGACIONES_FINANCIERAS_PARTE_DEUDA = 'form2_oblfinanpartedeuda';
    public readonly FORM2_COD_PROVISIONES = 'form2_provisiones';
    public readonly FORM2_COD_PASIVO_DIFERIDO = 'form2_pasivodif';
    public readonly FORM2_COD_OTRAS_CUENTAS_PASIVO_CORRIENTE = 'form2_otrascuentpasivcorr';
    public readonly FORM2_COD_TOTAL_PASIVO_CORRIENTE = 'form2_totalpasivcorr';

    // PASIVO NO CORRIENTE
    public readonly FORM2_COD_OBLIGACIONES_FINANCIERAS = 'form2_obligfinan';
    public readonly FORM2_COD_CUENTAS_PAGAR_COMERCIALES_OTRAS_CUENTAS = 'form2_cuentaspagarcomerotrcuen';
    public readonly FORM2_COD_PROVISIONES_PASIVO_NO_CORRIENTE = 'form2_provpasnocorr';
    public readonly FORM2_COD_OTRAS_CUENTAS_PASIVO_NO_CORRIENTE = 'form2_otrascuentaspa';
    public readonly FORM2_COD_TOTAL_PASIVO_NO_CORRIENTE = 'form2_totalpasnocorr';

    // PATRIMONIO
    public readonly FORM2_COD_CAPITAL = 'form2_capital';
    public readonly FORM2_COD_CAPITAL_ADICIONAL = 'form2_capitaladicional';
    public readonly FORM2_COD_ACCIONES_INVERSION = 'form2_accinv';
    public readonly FORM2_COD_RESERVAS = 'form2_reservas';
    public readonly FORM2_COD_RESULTADOS_ACUMULADOS = 'form2_resulacumulados';
    public readonly FORM2_COD_EXCEDENTE_REVALUACION = 'form2_excereval';
    public readonly FORM2_COD_RESULTADOS_NO_REALIZADOS = 'form2_resulnoreal';
    public readonly FORM2_COD_UTILIDAD = 'form2_utilidad';
    public readonly FORM2_COD_TOTAL_PATRIMONIO = 'form2_totalpatromonio';

    // TOTALES
    public readonly FORM2_COD_TOTAL_ACTIVOS = 'form2_totalactivos';
    public readonly FORM2_COD_TOTAL_PASIVOS = 'form2_totalpasivos';
    public readonly FORM2_COD_TOTAL_PASIVOS_PATRIMONIO = 'form2_totalpasivospatrimonio';
}
