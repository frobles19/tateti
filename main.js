const casillas = document.querySelectorAll('.casilla');
const jugadasGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

class Tateti {
    constructor(casillas) {
        this.turnoJugador = 0;
        this.rondasJugadas = 0;
        this.juegoTerminado = false;
        this.bloquearBoton = false;
        this.botones = Array.from(casillas);
    }

    comenzarJuego() {
        this.actualizarRonda(0);
        this.juegoTerminado = false;
        this.bloquearBoton = false;
        this.botones.forEach((boton, i) => {
            boton.classList.remove('seleccionado-j1');
            boton.classList.remove('seleccionado-j2');
            boton.classList.remove('ganador');
            boton.textContent = '';
            boton.onclick = () => this.clickBoton(i);
        })
        this.turnoJugador = 0;
    }

    actualizarRonda(value) {
        this.rondasJugadas = value;
    }

    clickBoton(value) {
        !this.bloquearBoton && this.pintarBoton(value);
    }

    pintarBoton(value) {
        if (!(this.botones[value].classList.contains('seleccionado-j1') || this.botones[value].classList.contains('seleccionado-j2'))) {
            if (this.turnoJugador === 0) {
                this.botones[value].classList.add('seleccionado-j1');
                this.botones[value].textContent = '0';
                this.comprobarGanador();
                this.turnoJugador = 1;
            } else if (this.turnoJugador === 1) {
                this.botones[value].classList.add('seleccionado-j2');
                this.botones[value].textContent = '1';
                this.comprobarGanador();
                this.turnoJugador = 0;

            }
            this.actualizarRonda(this.rondasJugadas + 1);
            this.comprobarJuegoTerminado();
        }
    }

    comprobarJuegoTerminado() {
        if (this.rondasJugadas >= 9) {
            this.bloquearBoton = true;
            this.botones.forEach(boton => {
                boton.classList.add('ganador');
            })
        }
    }

    comprobarGanador() {
        jugadasGanadoras.forEach(jugada => {
            if (this.botones[jugada[0]].textContent === this.botones[jugada[1]].textContent && this.botones[jugada[1]].textContent === this.botones[jugada[2]].textContent && this.botones[jugada[1]].textContent !== '') {
                this.botones[jugada[0]].classList.add('ganador');
                this.botones[jugada[1]].classList.add('ganador');
                this.botones[jugada[2]].classList.add('ganador');
                this.bloquearBoton = true;
            }
        })
    }

}

const tateti = new Tateti(casillas);
tateti.comenzarJuego();