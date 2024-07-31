export const stores = [
    { storeName: "usuarios",  sincronizeAsk: true, definition: "++id,id_empresa,dni_usuario,idresponsable,nombres_apellidos,usuario,clave" },
    { storeName: "zonas", sincronizeAsk: true,  definition: "++id,id_empresa,id_zona,descripcion" },
    { storeName: "pozos", sincronizeAsk: true,  definition: "++id,id_empresa,id_pozo,id_consumidor,descripcion,id_zona" },
    { storeName: "registroCabecera",  sincronizeAsk: false, 
        definition: "++id,id_empresa,fecha_dia,dni_usuario"
    },
    { storeName: "registroDetalle", sincronizeAsk: false,  
        definition:"++id,id_empresa,id_pozo, descripcion_pozo,fecha_dia,dni_usuario,valor_inicial,hora_inicial,valor_final,hora_final,horas_total, valor_total,enviado_inicial,enviado_final",
        indexes : ["[fecha_dia+id_pozo]","[fecha_dia+dni_usuario]","[fecha_dia+dni_usuario+enviado_inicio+enviado_final]","[fecha_dia+enviado_inicial+enviado_final]"]  
    },
];