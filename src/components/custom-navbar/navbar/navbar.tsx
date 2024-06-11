import { Component, Prop, Element, Event, EventEmitter, h, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'nav-bar',
  styleUrl: 'navbar.css',
  shadow: true,
})
export class Navbar {
  @Element() host: HTMLElement;
  @Prop() brand: string;

  //Los links deben ser los navBar-items

  @Prop() fixed: boolean = false;
  @Prop() transparent: boolean = false;

  @Listen('linkClicked')
  _handleClickedElement(event: CustomEvent) {
    let slotted = (this.host.shadowRoot.querySelector('slot') as HTMLSlotElement).assignedNodes().filter(node => {
      return node.nodeName !== '#text';
    });
    console.log('clicked opcion: ', event.detail);
    for (let index = 0; index < slotted.length; index++) {
      (slotted[index] as HTMLElement).shadowRoot.querySelector('a')?.innerText == event.detail
        ? (slotted[index] as HTMLElement).setAttribute('active', 'true')
        : (slotted[index] as HTMLElement).setAttribute('active', 'false');
    }
  }

  render() {
    return (
      <div class={`navbar ${this.fixed ? 'fixed' : ''} ${this.transparent ? 'transparent' : ''}`}>
        <div class="brand">{this.brand}</div>
        <div class="links">
          <slot></slot>
        </div>
      </div>
    );
  }
}
