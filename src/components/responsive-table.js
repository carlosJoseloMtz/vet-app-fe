import { css, html, LitElement } from "lit";


export class VetResponsiveTable extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      headers: { type: Array },
      dataBody: { type: Array },
      dataKeys: { type: Array }
    }
  }

  constructor() {
    super();

    this.title = '';
    this.headers = [];
    this.dataBody = [];
  }

  static get styles() {
    return css`
      .responsive-table-wrapper {
        overflow-x: auto;
        display: block;
        padding: 17px 0;
        margin: 0 5px;
      }

      table {
        width: 100%;
      }

      thead {
        background-color: var(--light-primary-color);
      }

      :is(table) th,td  {
        padding: 17px 3px;
        text-align: center;
      }

      tbody tr:hover {
        cursor: pointer;
        background-color: var(--light-primary-color);
      }
    `;
  }

  _renderTableHeaders() {
    return html`
      <thead>
        <tr>
          ${this.headers.map(h => html`
            <th>${h}</th>
          `)}
        </tr>
      </thead>
    `;
  }

  _handleResultClick(result) {
    const event = new CustomEvent('vet-table-record-selected', {
      bubbles: true,
      detail: result
    });

    this.dispatchEvent(event);
  }

  _renderTableResults() {

    return html`
      <tbody>
        ${this.dataBody.map((data) =>
          html`
            <tr @click=${() => this._handleResultClick(data)}>
              ${this.dataKeys.map(key => html`
                <td>${data[key]}</td>
              `)}
            </tr>
          `
        )}
      </tbody>
    `;
  }

  render() {
    return html`
    <h2>${this.title}</h2>
    <div class="responsive-table-wrapper">
      <table>
        ${this._renderTableHeaders()}
        ${this._renderTableResults()}
      </table>
    </div>
    `;
  }
}