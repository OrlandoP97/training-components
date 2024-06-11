import { Component, Prop, Event, h, EventEmitter } from '@stencil/core';

@Component({
  tag: 'navbar-item',
  styleUrl: 'navbar-item.css',
  shadow: true,
})
export class NavbarItem {
  @Prop() text: string;
  @Prop() href: string;
  @Prop() active = false;

  @Event() linkClicked: EventEmitter<any>;
  _handleClick() {
    this.linkClicked.emit(this.text);
  }

  render() {
    return (
      <a class={`${this.active ? 'active' : ''}`} onClick={this._handleClick.bind(this)} href={this.href}>
        {this.text}
      </a>
    );
  }
}
