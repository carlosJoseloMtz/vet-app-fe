import { css, html, LitElement } from 'lit';

export class VetCrudModal extends LitElement {
  static get styles() {
    return css`
      :host {
        position: fixed;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: var(--secondary-color);
      }

      .wrapper {
        padding: 20px 5px;
      }

      .back-button:hover {
        cursor: pointer;
      }

      @media screen and (min-width: 576px) {
        .wrapper {
          padding: 20px 27px;
        }
      }
      @media screen and (min-width: 768px) {
        .wrapper {
          padding: 20px 75px;
        }
      }
    `;
  }

  _handleBackClick() {
    const event = new CustomEvent('back-click', { bubble: true });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="title">
          <vet-icon
            class="back-button"
            @click=${this._handleBackClick}
            icon="chevron-left"
            label="Go back"
          >
          </vet-icon>
          <slot name="title"> </slot>
        </div>
        <slot name="body"> </slot>
      </div>
    `;
  }
}
