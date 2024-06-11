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
  @Prop() type: string;

  @Event() linkClicked: EventEmitter<any>;
  _handleClick() {
    this.linkClicked.emit(this.text);
  }

  render() {
    return this.type == 'dropdown' ? (
      <div class="dropdown">
        <button class="dropbtn">
          {this.text}
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <slot></slot>
        </div>
      </div>
    ) : (
      <a class={`${this.active ? 'active' : ''}`} onClick={this._handleClick.bind(this)} href={this.href}>
        {this.text}
      </a>
    );
  }
}
