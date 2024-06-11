import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'nav-bar',
  styleUrl: 'navbar.css',
  shadow: true,
})
export class Navbar {
  @Prop() brand: string;

  //Los links deben ser los navBar-items

  @Prop() fixed: boolean = false;
  @Prop() transparent: boolean = false;

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
