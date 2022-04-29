import { css, html, LitElement } from 'lit';


export class VetIcon extends LitElement {
  static get properties() {
    return {
      icon: { type: String },
      label: { type: String }
    }
  }

  static get styles() {
    return css`
    `;
  }

  render() {
    return html`
      <vaadin-icon
        icon="vaadin:${this.icon}"
        aria-label="${this.label}"
      >
      </vaadin-icon>
    `;
  }
}