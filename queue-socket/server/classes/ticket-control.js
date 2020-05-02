const fs = require('fs');

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    let data = JSON.parse(fs.readFileSync('./server/data/data.json'));

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    } else {
      this.reiniciarConteo();
    }
  }

  siguiente() {
    this.ultimo += 1;

    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    console.log(this.ultimo);

    this.grabarArchivo();

    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return 'No hay tickets';
    }

    let numeroTicket = this.tickets[0].numero;
    this.tickets.shift();

    let ticketPorAtender = new Ticket(numeroTicket, escritorio);

    this.ultimos4.unshift(ticketPorAtender);

    if (this.ultimos4.lengt > 4) {
      this.ultimos4.pop();
    }

    console.log('Ultimos 4');
    console.log(this.ultimos4);

    this.grabarArchivo();

    return this.ticketPorAtender;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];

    console.log('Se ha inicializado el sistema');

    this.grabarArchivo();
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
