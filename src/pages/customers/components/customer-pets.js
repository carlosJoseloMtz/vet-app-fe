import { html, LitElement } from "lit";


export class CustomerPets extends LitElement {
  static get properties() {
    return {
      customerId: { type: String },
      _isLoading: { type: Boolean, state: true }
    }
  }

  constructor() {
    super();

    this.customerId = '';
    this._isLoading = true;
  }

  render() {
    return html`
    ${
      this._isLoading ? 'Loading' : null
    }
    `;
  }
}
