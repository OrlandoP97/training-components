import { Component, Host, h,State,Event } from '@stencil/core';


@Component({
  tag: 'custom-counter',
  styleUrl: 'custom-counter.css',
  shadow: true,
})
export class CustomCounter {

  @State() fechaEvento:Date;
  @State() timeToEvent:number;
@Event() eventStarted:Event;
@Event() eventStoped:Event;
@Event() eventCanceled:Event;

  eventActive=false;
  intervalFunction;

  timeLeftToEvent(){  
    const today = new Date();  
    const days = (this.fechaEvento.getTime() - today.getTime())/(1000*60*60*24);
    this.timeToEvent = parseInt(days.toString()); 
  }

  ///cuando inicie el componente poner q fecha evento sea x defecto hoy
  componentWillLoad(){
    this.fechaEvento = new Date();
  }

  handleCambioFecha(e){  
    this.fechaEvento = new Date(e.target.value);  
  }

  startEvent(e){
   this.intervalFunction = setInterval(()=>{
    console.log(this.timeToEvent);
    this.timeLeftToEvent();
   },1000);
   
    this.eventActive = true;    
    this.timeLeftToEvent();    
  }

  cancelEvent(e){
    this.eventActive = false;

    clearInterval(this.intervalFunction);
    this.fechaEvento = new Date();
    this.timeLeftToEvent(); 

  }

  pauseEvent(e){
    this.eventActive = false;
    clearInterval(this.intervalFunction); 
    this.timeLeftToEvent(); 
  }

  render() {
    return (
      <Host>
      <div class='main-container'>
        <div class='controls-container'>
        <button onClick={e=>this.pauseEvent(e)}>Pausar evento</button>
        <button onClick={e=>this.cancelEvent(e)}>Cancelar cancelar</button>
        <button onClick={e=>this.startEvent(e)}>Iniciar evento</button>
        <input 
          type='date'         
          name='fecha' 
          class = 'input'          
          onChange={e=>this.handleCambioFecha(e)} 
          placeholder='Fecha'/>
        </div>      
        <p class='anuncio'>Días para el evento: {this.timeToEvent}</p>
      </div>
        </Host>
    );
  }

}
