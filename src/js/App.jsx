const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";


//var renderizado =0


var App = React.createClass({

 	getInitialState: function(){
		return {
		 	turno: JUGADORX,
			valores: [
			['-', '-', '-'],
			['-', '-', '-'],
			['-', '-', '-']
			],
			nJugadas: 0
	 	};
 	},

	appClick: function(numeroFila, numberoColumna){

		let valores = this.state.valores;
		let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
		valores[numeroFila][numberoColumna] = nuevoValor;

		this.setState({
		 	turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
		 	valores: this.state.valores,
		 	nJugadas: this.state.nJugadas +1
		});	
	
	},


  	componentDidUpdate: function(){
  
    	let nJugadas = this.state.nJugadas;
    	let valores = this.state.valores;

     
    	var turnoJugador = this.state.turno === JUGADORX ? JUGADOR0:JUGADORX;
 		let nuevoValor = turnoJugador === JUGADORX ? 'X':'0';

 		if(nJugadas > 4){

 		
 		var casilla1 = valores[0][0];
 		var casilla3 = valores[0][2];
 		var casilla5 = valores[1][1];
 		var casilla7 = valores[2][0];
 		var casilla9 = valores[2][2];
 		

 			if ((casilla1 == casilla5 && casilla9 == casilla5) || 
 				(casilla5 == casilla3 && casilla5 == casilla7)) {
			
				alert("Ha ganado " + turnoJugador)
				this.setState({
 					nJugadas:0
 				});
			
				return
				}


	 		for (var i = valores.length - 1; i >= 0; i--) {
	 			if((valores[0][i] == nuevoValor && valores[1][i] == nuevoValor && valores[2][i] == nuevoValor) || 
	 			   (valores[i][0] == nuevoValor && valores[i][1] == nuevoValor && valores[i][2] == nuevoValor)){
	 				
					alert("Ha ganado " + turnoJugador)
					this.setState({
	 					nJugadas:0
	 				});
				
					return
		 		}
	 		};

		}

	},

	reiniciarTablero: function(){
		this.replaceState(this.getInitialState());
	},

	render: function(){

	 	if(this.state.nJugadas == 9){
	 			alert("Empate Técnico")
	 			this.setState({
	 			nJugadas:0
	 		});
	 	}

	var texto;
	texto = "Turno del " + this.state.turno;

		return (
			<div>
				<Cabecera texto={texto}/>
				<Tablero valores={this.state.valores}
				manejadorTableroClick={this.appClick}/>
				<button onClick={this.reiniciarTablero}>Reiniciar</button>
			</div>
		)

	}

});


module.exports = App;