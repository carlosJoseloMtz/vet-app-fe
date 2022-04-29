import { css, html, LitElement } from "lit";

export class VetButton extends LitElement {
  static get properties() {
    return {
      isSecondary: { type: Boolean }
    }
  }

  constructor() {
    super();

    this.isSecondary = false;
  }
  
  static get styles() {
    return css`
      .btn-container ::slotted(paper-button) {
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
      }

      .btn-container.secondary-btn ::slotted(paper-button) {
        background-color: var(--secondary-action-color);
        color: var(--secondary-action-text-color);
      }
    `;
  }

  render() {
    return html`
      <div class="btn-container ${this.isSecondary && "secondary-btn"}">
        <slot></slot>
      </div>
    `;
  }
}