import { html, LitElement } from "lit";

import { CustomerService } from "../services/customer-service.js";


export class CreateCustomer extends LitElement {

  static get properties() {
    return {
      id: { type: Number },
      customerName: { type: String },
      phoneNumber: { type: String },
      email: { type: String },
      address: { type: String },
      optsInNotifications: { type: Boolean },
      _isMessageDisplayed: { type: Boolean, state: true },
      _message: { type: String, state: true },
      _messageType: { type: String, state: true }
    };
  }

  constructor() {
    super();

    this.customerName = '';
    this.phoneNumber = '';
    this.email = '';
    this.address = '';
    this.optsInNotifications = false;

    this._isMessageDisplayed = false;
    this._message = '';
    this._messageType = '';

    this.customerService = CustomerService();
  }

  _isEditMode() {
    return this.id !== undefined && this.id !== null;
  }

  _isCustomerValid() {
    const name = this.shadowRoot.querySelector('#customer-name');
    const phoneNumber = this.shadowRoot.querySelector('#phone-number');
    const email = this.shadowRoot.querySelector('#email');

    const isValid = name.validate() &
      phoneNumber.validate() &
      email.validate();

    return isValid;
  }

  _handleSaveCustomer(ev) {
    ev.preventDefault();

    this.resetCustomerAlert();

    if (!this._isCustomerValid()) {
      return;
    }

    const customer = {
      id: this.id,
      name: this.customerName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      address: this.address,
      optsInNotifications: this.optsInNotifications
    };

    this.performTransaction(customer, this._isEditMode());
  }

  async performTransaction(customerInfo, isEditMode) {
    
    let result = null;
    const isNewCustomer = !isEditMode;

    if (isNewCustomer) {
      result = await this._createCustomer(customerInfo);
    } else if (isEditMode) {
      result = await this._editCustomer(customerInfo);
    }

    const isError = result instanceof Error;
    this._isMessageDisplayed = isError;

    if (isError) {
      this._message = result.message;
      this._messageType = 'error';
      return;
    }

    this.resetCustomerAlert();

    const event = new CustomEvent('transaction-successful', {
      bubbles: true,
      detail: customerInfo
    });

    this.dispatchEvent(event);
  }

  async _editCustomer(customerInfo) {
    try {
      return await this.customerService
        .updateCustomer(customerInfo);
    } catch (ex) {
      console.error('Error while trying to update the user', ex);
      return ex;
    }
  }

  async _createCustomer(newCustomer) {
    try {
      return await this.customerService
        .createCustomer(newCustomer);
    } catch (ex) {
      console.error('Error while trying to create the user', ex);
      return ex;
    }
  }

  resetCustomerAlert() {
    this._message = '';
    this._messageType = '';
    this._isMessageDisplayed = false;
  }

  _updateName(ev) {
    this.customerName = ev.target.value;
  }

  _updatePhoneNumber(ev) {
    this.phoneNumber = ev.target.value;
  }

  _updateEmail(ev) {
    this.email = ev.target.value;
  }

  _updateAddress(ev) {
    this.address = ev.target.value;
  }

  handleAlertDismis() {
    this._isMessageDisplayed = false;
  }

  render() {
    const isEditMode = this._isEditMode();
    return html`
      <vet-alert
        @alert-dismiss=${this.handleAlertDismis}
        ?toggle=${this._isMessageDisplayed}
        message=${this._message}
        alert=${this._messageType}
      >
      </vet-alert>
      <paper-input
        label="Id"
        id="id"
        ?required=${isEditMode}
        value=${isEditMode ? this.id : 'None'}
        readonly
      >
      </paper-input>
      <paper-input
        label="Name"
        id="customer-name"
        required
        error-message="Customer name is required"
        @change=${this._updateName}
        value=${this.customerName}
      >
      </paper-input>
      <paper-input
        label="Phone Number"
        id="phone-number"
        required
        error-message="Phone number is required"
        @change=${this._updatePhoneNumber}
        value=${this.phoneNumber}
      >
      </paper-input>
      <paper-input
        label="Email"
        id="email"
        required
        error-message="email is required"
        type="email"
        @change=${this._updateEmail}
        value=${this.email}
      >
      </paper-input>
      <paper-input
        label="Address"
        id="address"
        @change=${this._updateAddress}
        value=${this.address}
      >
      </paper-input>
      <paper-checkbox
        ?checked=${this.optsInNotifications}
        id="notifications-enabled"
      >
        Receive Notifications
      </paper-checkbox>
      <vet-button>
        <paper-button
          raised
          @click=${this._handleSaveCustomer}
        >
          Save
        </paper-button>
      </vet-button>
    `;
  }
}