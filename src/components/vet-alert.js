import { css, html, LitElement } from "lit";


export class VetAlert extends LitElement {

  static get properties() {
    return {
      alert: { type: String },
      message: { type: String },
      toggle: { type: Boolean }
    };
  }

  constructor() {
    super();

    this.alert = 'info';
    this.message = '';
    this.toggle = false;
  }

  static get styles() {
    return css`
      :host {
        --error-color: #db2f56;
        --error-dark-color: #851d41;
        --warn-color: #fc8621;
        --warn-dark-color: #c24914;
        --info-color: #0070e0;
        --info-dark-color: #044789;
        --success-color: #4e8c7c;
        --success-dark-color: #025761;
        /*
        --success-color: #04a559;
        --success-dark-color: #015e37;
         */
        color: white;
      }

      .alert {
        display: none;
        border-radius: 25px 25px 0;
        width: fit-content;
      }

      .message {
        padding: 17px;
      }

      .close-icon {
        border-radius: 25px;
        width: 27px;
        padding: 7px;
        float: right;
      }

      .close-icon:hover {
        cursor: pointer;
      }

      .alert.toggled { 
        display: block;
      }

      .error {
        background-color: var(--error-color);
      }
      .warn {
        background-color: var(--warn-color);
      }
      .info {
        background-color: var(--info-color);
      }
      .success {
        background-color: var(--success-color);
      }

      .close-icon-error {
        background-color: var(--error-dark-color);
      }
      .close-icon-warn {
        background-color: var(--warn-dark-color);
      }
      .close-icon-info {
        background-color: var(--info-dark-color);
      }
      .close-icon-success {
        background-color: var(--success-dark-color);
      }

    `;
  }

  _handleClose(ev) {

    if (ev.key && ev.key !== 'Enter') {
      return;
    }

    this.toggle = false;

    this.dispatchEvent(new CustomEvent('alert-dismiss',
      { bubble: true }));
  }

  render() {
    const displayClass = this.toggle ? 'toggled' : '';
    return html`
      <div class="alert ${this.alert} ${displayClass}">
        <div
          class="close-icon close-icon-${this.alert}"
          @click=${this._handleClose}
          @keypress=${this._handleClose}
        >
          <vet-icon icon="close-small"></vet-icon>
        </div>
        <div class="message">
          ${this.message}
        <div>
      </div>
    `;
  }
}