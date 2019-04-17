var Simbolo = /** @class */ (function () {
    function Simbolo(cadena, tipo) {
        this.cadena = cadena;
        this.tipo = tipo;
        this.longitud = cadena.length;
    }
    Simbolo.prototype.getCadena = function () {
        return this.cadena;
    };
    Simbolo.prototype.setCadena = function (cadena) {
        this.cadena = cadena;
    };
    Simbolo.prototype.getTipo = function () {
        return this.tipo;
    };
    Simbolo.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    Simbolo.prototype.getLongitud = function () {
        return this.longitud;
    };
    Simbolo.prototype.setLongitud = function (longitud) {
        this.longitud = longitud;
    };
    Simbolo.prototype.toString = function () {
        return "Cadena:" + this.cadena + " Tipo:" + this.tipo;
    };
    return Simbolo;
}());
var Scanner = /** @class */ (function () {
    function Scanner() {
    }
    Scanner.esReservada = function (palabra) {
        var inicio = 0;
        var fin = this.PALABRAS_R.length - 1;
        while (inicio <= fin) {
            var medio = parseInt((inicio + fin) / 2);

            if (this.PALABRAS_R[medio].localeCompare(palabra) == 0) {
                return true;
            }
            else if (this.PALABRAS_R[medio].localeCompare(palabra) > 0) {
                fin = medio - 1;
            }
            else if (this.PALABRAS_R[medio].localeCompare(palabra) < 0) {
                inicio = medio + 1;
            }
        }
        return false;
    };
    Scanner.esTipoDato = function (palabra) {
        var inicio = 0;
        var fin = this.TIPOS_DATO.length - 1;
        while (inicio <= fin) {
            var medio = parseInt((inicio + fin) / 2);
            if (this.TIPOS_DATO[medio].localeCompare(palabra) == 0) {
                return true;
            }
            else if (this.TIPOS_DATO[medio].localeCompare(palabra) > 0) {
                fin = medio - 1;
            }
            else if (this.TIPOS_DATO[medio].localeCompare(palabra) < 0) {
                inicio = medio + 1;
            }
        }
        return false;
    };
    Scanner.obtenerSimbolo = function (cadena) {
        if (this.indice <= cadena.length) {
            while (cadena.charAt(this.indice) == ' ' || cadena.charAt(this.indice) == '\n') {
                this.indice++;
                if (this.indice == cadena.length) {
                    return null;
                }
            }
            if (cadena.charAt(this.indice) == '/' && cadena.charAt(this.indice + 1) == '*') {
                this.indice += 2;
                do {
                    this.indice++;
                } while (cadena.charAt(this.indice) != '*' && cadena.charAt(this.indice) != '/');
                this.indice += 2;
            }
            if (cadena.charAt(this.indice) == '/' && cadena.charAt(this.indice) == '/') {
                this.indice += 2;
                do {
                    this.indice++;
                } while (cadena.charAt(this.indice) != '\n');
                this.indice += 1;
            }
            if (cadena.charAt(this.indice) >= 'a' && cadena.charAt(this.indice) <= 'z'
                || cadena.charAt(this.indice) >= 'A' && cadena.charAt(this.indice) <= 'Z'
                || cadena.charAt(this.indice) == '_') {
                return this.esIdentificador(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) >= '0' && cadena.charAt(this.indice) <= '9') {
                return this.esNumero(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '=' && cadena.charAt(this.indice + 1) == '='
                || cadena.charAt(this.indice) == '>' || cadena.charAt(this.indice) == '<'
                || cadena.charAt(this.indice) == '!' && cadena.charAt(this.indice + 1) == '=') {
                return this.esOperadorR(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '&' || cadena.charAt(this.indice) == '|'
                || cadena.charAt(this.indice) == '!') {
                return this.esOperadorL(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '+' || cadena.charAt(this.indice) == '-'
                || cadena.charAt(this.indice) == '*' || cadena.charAt(this.indice) == '/'
                || cadena.charAt(this.indice) == '%') {
                return this.esOperadorA(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '"') {
                return this.esCadena(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '\'') {
                return this.esCaracter(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) >= '!' && cadena.charAt(this.indice) <= '/'
                || cadena.charAt(this.indice) >= ':' && cadena.charAt(this.indice) <= '@'
                || cadena.charAt(this.indice) >= '[' && cadena.charAt(this.indice) <= '`'
                || cadena.charAt(this.indice) >= '{' && cadena.charAt(this.indice) <= '¡') {
                var otro = "";
                otro += cadena.charAt(this.indice);
                this.indice++;
                return new Simbolo(otro, "Otro");
            }
        }
    };
    Scanner.esIdentificador = function (cadena, indice) {
        var id = "";
        var simbolo;
        while (cadena.charAt(indice) >= 'a' && cadena.charAt(indice) <= 'z'
            || cadena.charAt(indice) >= 'A' && cadena.charAt(indice) <= 'Z'
            || cadena.charAt(indice) >= '0' && cadena.charAt(indice) <= '9'
            || cadena.charAt(indice) == '_') {
            id += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        if (this.esReservada(id)) {
            return simbolo = new Simbolo(id, "Palabra Reservada");
        }
        else if (this.esTipoDato(id)) {
            return simbolo = new Simbolo(id, "Tipo de Dato");
        }
        else {
            return simbolo = new Simbolo(id, "Identificador");
        }
    };
    Scanner.esNumero = function (cadena, indice) {
        var numero = "";
        var simbolo;
        while (cadena.charAt(indice) >= '0' && cadena.charAt(indice) <= '9'
            || cadena.charAt(indice) == '.') {
            numero += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        return simbolo = new Simbolo(numero, "Numero");
    };
    Scanner.esOperadorR = function (cadena, indice) {
        var operador = "";
        var simbolo;
        while (cadena.charAt(indice) == '=' || cadena.charAt(indice) == '!'
            || cadena.charAt(indice) == '>' || cadena.charAt(indice) == '<') {
            operador += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        if (operador === "<<" || operador === ">>") {
            return simbolo = new Simbolo(operador, "Flujo de programa");
        }
        else {
            return simbolo = new Simbolo(operador, "Operador Relacional");
        }
    };
    Scanner.esOperadorL = function (cadena, indice) {
        var operador = "";
        var simbolo;
        while (cadena.charAt(indice) == '&' || cadena.charAt(indice) == '|'
            || cadena.charAt(indice) == '!') {
            operador += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        return simbolo = new Simbolo(operador, "Operador Logico");
    };
    Scanner.esOperadorA = function (cadena, indice) {
        var operador = "";
        var simbolo;
        while (cadena.charAt(indice) == '+' || cadena.charAt(indice) == '-'
            || cadena.charAt(indice) == '*' || cadena.charAt(indice) == '/'
            || cadena.charAt(indice) == '%' || cadena.charAt(indice) == '=') {
            operador += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        return simbolo = new Simbolo(operador, "Operador Aritmetico");
    };
    Scanner.esCadena = function (cadena, indice) {
        var cad = "";
        var simbolo;
        do {
            cad += cadena.charAt(indice);
            indice++;
        } while (cadena.charAt(indice) != '"');
        cad += cadena.charAt(indice++);
        this.indice = indice;
        return simbolo = new Simbolo(cad, "Cadena");
    };
    Scanner.esCaracter = function (cadena, indice) {
        var caracter = "";
        var simbolo;
        do {
            caracter += cadena.charAt(indice);
            indice++;
        } while (cadena.charAt(indice) != '\'');
        caracter += cadena.charAt(indice++);
        this.indice = indice;
        return simbolo = new Simbolo(caracter, "Caracter");
    };
    Scanner.indice = 0;
    Scanner.PALABRAS_R = ["break", "case", "catch", "class", "const", "continue", "default",
        "delete", "do", "else", "enum", "false", "for", "friend",
        "goto", "if", "inline", "namespace", "new", "operator", "private",
        "protected", "public", "register", "return", "signed", "sizeof", "static",
        "struct", "switch", "this", "throw", "true", "try", "typedef", "typeid", "typename",
        "union", "unsigned", "using", "virtual", "volatile", "while"];
    Scanner.TIPOS_DATO = ["bool", "byte", "double", "float", "int", "long", "short", "void"];
    return Scanner;
}());

/* Codigo JavaScript */
let textArea_txt;

function getText() {
    textArea_txt = document.getElementById("textarea_code").value;
    updateCountsTextArea(textArea_txt);
}

function updateCountsTextArea(txt) {
    let c_id = 0;
    let c_op = 0;
    let c_kw = 0;
    let c_num = 0;
    let c_char = 0;
    let c_str = 0;
    let c_dt = 0;
    let c_other = 0;
    Scanner.indice = 0;
    let simbolo;

    do {
        simbolo = Scanner.obtenerSimbolo(txt);
        if (simbolo != null) {
            switch (simbolo.getTipo()) {
                case "Palabra Reservada":
                    c_kw++;
                    break;

                case "Identificador":
                    c_id++;
                    break;

                case "Numero":
                    c_num++;
                    break;

                case "Operador Relacional":
                case "Operador Logico":
                case "Operador Aritmetico":
                    c_op++;
                    break;

                case "Caracter":
                    c_char++;
                    break;

                case "Cadena":
                    c_str++;
                    break;

                case "Tipo de Dato":
                    c_dt++;
                    break;

                case "Otro":
                    c_other++;
                    break;

            }
        }
    } while (simbolo != null);

    document.getElementById("kw").innerHTML = c_kw;
    document.getElementById("op").innerHTML = c_op;
    document.getElementById("num").innerHTML = c_num;
    document.getElementById("char").innerHTML = c_char;
    document.getElementById("id").innerHTML = c_id;
    document.getElementById("str").innerHTML = c_str;
    document.getElementById("dt").innerHTML = c_dt;
    document.getElementById("other").innerHTML = c_other;


}

function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        document.getElementById("textarea_code").value = contenido;
    };
    var cadena = lector.readAsText(archivo);

}

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}

document.getElementById('file-input')
    .addEventListener('change', leerArchivo, false);