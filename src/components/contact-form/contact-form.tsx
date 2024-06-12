import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'contact-form',
  styleUrl: 'contact-form.css',
  shadow: true,
})
export class ContactForm {
  @Prop() sendMessageCallback: (obj: ContactFormData) => {};

  private _handlerSubmit(e: Event) {
    e.preventDefault();
    if (this.sendMessageCallback) {
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      const message = data.get('message');

      let objData: ContactFormData;
      objData = {
        email: email.toString(),
        name: name.toString(),
        message: message.toString(),
      };
      this.sendMessageCallback(objData);
    }
  }

  render() {
    return (
      <div class="contact-form">
        <form onSubmit={e => this._handlerSubmit(e)}>
          <label class="label">Name</label>
          <input type="text" class="input" placeholder="Name" name="name"></input>
          <label class="label">Email</label>

          <input type="text" class="input" placeholder="Email" name="email"></input>
          <label class="label">Message</label>

          <input type="text" class="input" placeholder="Send a message" name="message"></input>
          <input type="submit" class="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};
