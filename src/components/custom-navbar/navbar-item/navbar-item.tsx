import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'navbar-item',
  styleUrl: 'navbar-item.css',
  shadow: true,
})
export class NavbarItem {
  @Prop() text: string;
  @Prop() href: string;

  render() {
    return <a href={this.href}>{this.text}</a>;
  }
}
