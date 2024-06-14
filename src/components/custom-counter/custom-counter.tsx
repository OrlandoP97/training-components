import { Component, Host, h, State, Event, Prop } from '@stencil/core';
import { EventEmitter } from 'stream';

@Component({
  tag: 'custom-counter',
  styleUrl: 'custom-counter.css',
  shadow: true,
})
export class CustomCounter {
  @State() fechaEvento: Date;
  @State() timeToEvent: number;

  @Prop() eventState: string;

  @Event() eventStarted: EventEmitter;
  @Event() eventStopped: EventEmitter;
  @Event() eventCanceled: EventEmitter;

  eventActive = false;
  intervalFunction;

  ///cuando inicie el componente poner q fecha evento sea x defecto hoy
  componentWillLoad() {
    this.fechaEvento = new Date();
  }

  timeLeftToEvent() {
    const today = new Date();
    const days = (this.fechaEvento.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    this.timeToEvent = parseInt(days.toString());
  }

  handleCambioFecha(e) {
    this.fechaEvento = new Date(e.target.value);
  }

  startEvent(e) {
    this.intervalFunction = setInterval(() => {
      console.log(this.timeToEvent);
      this.timeLeftToEvent();
    }, 1000);

    this.eventStarted.emit('eventStarted');
    this.eventActive = true;
    this.timeLeftToEvent();
  }

  cancelEvent(e) {
    this.eventActive = false;
    clearInterval(this.intervalFunction);
    this.fechaEvento = new Date();
    this.timeLeftToEvent();
    this.eventCanceled.emit('eventCanceled');
  }

  pauseEvent(e) {
    this.eventActive = false;

    clearInterval(this.intervalFunction);
    this.timeLeftToEvent();
    //ver xq no se lanza este evento
    this.eventStopped.emit('eventPaused');
  }

  render() {
    return (
      <Host>
        <div class="main-container">
          <div class="controls-container">
            <button onClick={e => this.pauseEvent(e)}>Pausar evento</button>
            <button onClick={e => this.cancelEvent(e)}>Cancelar evento</button>
            <button onClick={e => this.startEvent(e)}>Iniciar evento</button>
            <input type="date" name="fecha" class="input" onChange={e => this.handleCambioFecha(e)} placeholder="Fecha" />
          </div>
          <h2 class="estado">Estado del evento: {this.eventState != null ? this.eventState : 'Desconocido'}</h2>

          <p class="anuncio">Días para el evento: {this.timeToEvent}</p>
        </div>
      </Host>
    );
  }
}
