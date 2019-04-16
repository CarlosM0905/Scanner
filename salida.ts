class Simbolo {
    private cadena: string;
    private tipo: string;
    private longitud: number;

    constructor(cadena: string, tipo: string) {
        this.cadena = cadena;
        this.tipo = tipo;
        this.longitud = cadena.length;
    }

}

class Scanner {
    private static indice: number = 0;
    private static PALABRAS_R: string[] = ["break", "case", "catch", "class", "const", "continue", "default",
        "delete", "do", "else", "enum", "false", "for", "friend","goto", "if", "inline", "namespace", "new", 
        "operator", "private","protected", "public", "register", "return", "signed", "sizeof", "static",
        "struct", "switch", "this", "throw", "true", "try", "typedef", "typeid", "typename","union",
        "unsigned", "using", "virtual", "volatile", "while"];

    private static TIPOS_DATO: string[] = ["bool", "byte", "double", "float", "int", "long", "short", "void"];

    public static esReservada(palabra: string): boolean {
        let inicio: number = 0;
        let fin: number = this.PALABRAS_R.length - 1;

        while (inicio <= fin) {
            let medio: number = (inicio + fin) / 2;

            if (this.PALABRAS_R[medio].localeCompare(palabra) === 0) {
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
    }

    public static esTipoDato(palabra: string): boolean {
        let inicio: number = 0;
        let fin: number = this.TIPOS_DATO.length - 1;

        while (inicio <= fin) {
            let medio: number = (inicio + fin) / 2;

            if (this.TIPOS_DATO[medio].localeCompare(palabra) === 0) {
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
    }

    public static obtenerSimbolo(cadena: string) {
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
                } while (cadena.charAt(this.indice) != '*' && cadena.charAt(this.indice) != '/')
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

                let otro: string = "";
                otro += cadena.charAt(this.indice);
                this.indice++;

                return new Simbolo(otro, "Otro");
            }
        }
    }

    private static esIdentificador(cadena: string, indice: number): Simbolo {
        let id: string = "";
        let simbolo: Simbolo;

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
        } else if (this.esTipoDato(id)) {
            return simbolo = new Simbolo(id, "Tipo de Dato");
        } else {
            return simbolo = new Simbolo(id, "Identificador");
        }
    }

    private static esNumero(cadena: string, indice: number): Simbolo {
        let numero: string = "";
        let simbolo: Simbolo;

        while (cadena.charAt(indice) >= '0' && cadena.charAt(indice) <= '9'
            || cadena.charAt(indice) == '.') {
            numero += cadena.charAt(indice);
            indice++;
        }

        this.indice = indice;

        return simbolo = new Simbolo(numero, "Numero");
    }

    private static esOperadorR(cadena: string, indice: number) {
        let operador: string = "";
        let simbolo: Simbolo;

        while (cadena.charAt(indice) == '=' || cadena.charAt(indice) == '!'
            || cadena.charAt(indice) == '>' || cadena.charAt(indice) == '<') {
            operador += cadena.charAt(indice);
            indice++;
        }

        this.indice = indice;

        if (operador === "<<" || operador === ">>") {
            return simbolo = new Simbolo(operador, "Flujo de programa");
        } else {
            return simbolo = new Simbolo(operador, "Operador Relacional");
        }
    }

    private static esOperadorL(cadena: string, indice: number): Simbolo {
        let operador: string = "";
        let simbolo: Simbolo;

        while (cadena.charAt(indice) == '&' || cadena.charAt(indice) == '|'
            || cadena.charAt(indice) == '!') {
            operador += cadena.charAt(indice);
            indice++;
        }

        this.indice = indice;

        return simbolo = new Simbolo(operador, "Operador Logico");
    }

    private static esOperadorA(cadena: string, indice: number) {
        let operador: string = "";
        let simbolo: Simbolo;

        while (cadena.charAt(indice) == '+' || cadena.charAt(indice) == '-'
            || cadena.charAt(indice) == '*' || cadena.charAt(indice) == '/'
            || cadena.charAt(indice) == '%' || cadena.charAt(indice) == '=') {
            operador += cadena.charAt(indice);
            indice++;
        }

        this.indice = indice;

        return simbolo = new Simbolo(operador, "Operador Aritmetico");
    }

    private static esCadena(cadena: string, indice: number) {
        let cad: string = "";
        let simbolo: Simbolo;

        do {
            cad += cadena.charAt(indice);
            indice++;
        } while (cadena.charAt(indice) != '"');
        cad += cadena.charAt(indice++);

        this.indice = indice;
        return simbolo = new Simbolo(cad, "Cadena");
    }

    private static esCaracter(cadena: string, indice: number) {
        let caracter: string = "";
        let simbolo: Simbolo;

        do {
            caracter += cadena.charAt(indice);
            indice++;
        } while (cadena.charAt(indice) != '\'');

        caracter += cadena.charAt(indice++);

        this.indice = indice;

        return simbolo = new Simbolo(caracter, "Caracter");
    }

}