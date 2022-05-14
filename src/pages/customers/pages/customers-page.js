import { css, html, LitElement } from 'lit';
import { CustomerService } from '../services/customer-service.js';


export class CustomersPage extends LitElement {
  static get properties() {
    return {
      _searchFilters: { type: Object, state: true },
      _searchResults: { type: Array, state: true },
      _displayCustomerForm: { type: Boolean, state: true },
      _isMessageDisplayed: { type: Boolean, state: true },
      _messageType: { type: String },
      _message: { type: String, state: true },
      _customerToEdit: { type: Object, state: true }
    }
  }

  constructor() {
    super();

    this._searchFilters = {
      name: '',
      email: '',
      phone: ''
    };

    this._displayCustomerForm = false;
    this._isMessageDisplayed = false;

    this._searchResults = [];

    this.customerService = CustomerService();
  }

  static get styles() {
    return css`
    `;
  }

  async _handleSearchCustomer() {

    this._searchResults = [];

    try {
      const matchingCustomers =
        await this.customerService.searchCustomer(this._searchFilters);

      this._searchResults = matchingCustomers;
    } catch (err) {
      console.error('Erro while trying to fetch customers', err);
    }
  }

  _updateName(ev) {
    this._searchFilters.name = ev.target.value
  }

  _updateEmail(ev) {
    this._searchFilters.email = ev.target.value
  }

  _updatePhoneNumber(ev) {
    this._searchFilters.phone = ev.target.value
  }

  _renderSearchFilters() {
    return html`
      <paper-input
        label="Name"
        value=${this._searchFilters.name}
        @change=${this._updateName}
      >
      </paper-input>
      <paper-input
        label="email"
        value=${this._searchFilters.email}
        @change=${this._updateEmail}
      >
      </paper-input>
      <paper-input
        label="Phone Number"
        value=${this._searchFilters.phone}
        @change=${this._updatePhoneNumber}
      >
      </paper-input>
    `;
  }

  _handleOpenCreateCustomer(ev) {
    ev.preventDefault();

    this._displayCustomerForm = true;
  }

  hideCustomerForm() {
    this._displayCustomerForm = false;
    this._customerToEdit = null;
    if (this._searchResults.length > 0) {
      this._handleSearchCustomer();
    }
  }

  _renderCustomerForm() {
    if (!this._displayCustomerForm) {
      return null;
    }

    if (this._customerToEdit == null) {
      return html`
        <vet-crud-modal
          @back-click=${this.hideCustomerForm}
        >
          <h1 slot="title">Customer Info</h1>
          <div slot="body">
            <customer-form
              @transaction-successful=${this.hideCustomerForm}
            >
            </customer-form>
          </div>
        </vet-crud-modal>
      `;
    }

    return html`
      <vet-crud-modal
        @back-click=${this.hideCustomerForm}
      >
        <h1 slot="title">Customer Info</h1>
        <div slot="body">
          <customer-form
            customerName=${this._customerToEdit.name}
            id=${this._customerToEdit.id}
            phoneNumber=${this._customerToEdit.phoneNumber}
            email=${this._customerToEdit.email}
            address=${this._customerToEdit.address}
            ?optsInNotifications=${this._customerToEdit.optsInNotifications}
          >
          </customer-form>
          <h2>Doggy information</h2>
          <customer-pets
            customerId=${this._customerToEdit.id}
          >
          </customer-pets>
        </div>
      </vet-crud-modal>
    `;
  }

  _handleRecordSelected(ev) {
    console.log(ev);

    this._displayCustomerForm = true;
    this._customerToEdit = ev.detail;
  }

  render() {
    return html`
      <h1>Customers Page</h1>
      ${this._renderCustomerForm()}
      <vet-button>
        <paper-button
          @click=${this._handleOpenCreateCustomer}
          raised
          aria-label="Create new customer"
        >
        Create new Customer
        </paper-button>
      </vet-button>
      <h2>Search</h2>
      ${this._renderSearchFilters()}

      <vet-button
        isSecondary
      >
        <paper-button
          raised
          @click=${this._handleSearchCustomer}
        >
          Search Customer
        </paper-button>
      </vet-button>
      <hr/>
      <vet-table
        @vet-table-record-selected=${this._handleRecordSelected}
        title="Customer results"
        headers=${JSON.stringify(['ID', 'Name', 'Phone Number', 'Email'])}
        dataKeys=${JSON.stringify(['id', 'name', 'phoneNumber', 'email'])}
        dataBody=${JSON.stringify(this._searchResults)}
      >
      </vet-table>
    `;
  }
}
