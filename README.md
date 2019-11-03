# Hoover & Strong Developer Exercise

Thank you for applying for a development position at Hoover & Strong!

## Your task

Build this screen used to manage customer addresses. The users of this screen would be employees of Hoover & Strong doing data entry of information provided to them by customers over the phone, on chat, or by email.  Customer data is provided via an **API**, described below.

You should match, as closely as possible, [the design](./design.pdf). Additionally, you should attempt to implement the **functional requirements**, described below, to the extent possible within the timebox.

To get you started, this repository contains an empty React app, with a basic layout started. You are free to replace this with anything you like, and you may use any additional libraries you want. Just be sure to provide updated instructions under **Building and Running** if you alter the steps necessary to bring the site online.

You should work on a separate branch, once you're done push that branch and let us know about it, either by creating a pull request, or by phone/email.

### Timebox / Limits

Please limit yourself to no more than **4 hours** for this exercise. It is more important that you stop at the end of the time limit than it is that you complete the requirements.

You are free to use any resources necessary to complete the task, just be prepared to talk about the choices you made and why you made them.

### Building and Running

To start the webserver, ruyn

    > npm install
    > npm start 

The website will then be visible at ['http://localhost:3000'](http://localhost:3000).


## API

This api provides data about customers and their addresses.

It is accessable at the URL `https://www.hooverandstrong.com`, and provides five endpoints.

### List Customers

    GET /api/mock/customers

Lists the customers in the system

### Get addresses for a customer

    GET /api/mock/customer/:id/addresses

Lists the addresses we have for the specified customer id.

### Insert a new address

    POST /api/mock/customer/:id/address 

Create a new address record for the specified customer id, field names should match those provided by the **Get Addresses** endpoint above.

### Update an existing address

    PUT /api/mock/customer/:id/address

Updates an existing address record.  The Id of the record must be provided. Again the field names should match those provided by the **Get Addresses** endpoint above.

### Get options to support dropdowns

    GET /api/mock/customers/address/options


## Functional Requirements

- The Customer dropdown should be populated with customer keys provided by the **List Customers** API endpoint.
- Selecting a Customer from the dropdown should load address data from the API. The header will then show 'add', 'save', and 'cancel' buttons.
 - The **add** button should show a new record at the bottom of the address grid. It should not be persisted until the save button is pressed.
 - The **save** button should persist each record in the grid, updating records with an Id, and inserting records without.
 - The **cancel** button should update the dropdown to clear the selected customer, and the data grid and previously used addresses should dissapear, as should the buttons on the header.
- Addresses will be shown in an editable grid. With dropdowns loaded from data provided by the **Get Options** API endpoint.
- If a country code is selected that is not equal to "US" the region dropdown should be replaced by a text input.
- If the ActiveTo field contains a date in the past, or the current date, the address should not be listed in the edit grid, but should be shown below as a **Previously Used Address**
- If the disable address button is pressed, its ActiveTo field should be set to the current date.
- If the enable address button is pressed on a disabled address, it's ActiveTo field should be set to the empty string.
