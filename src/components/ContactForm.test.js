import React from 'react';
import {logRoles, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
     const formHeader = screen.getByText(/Contact Form/i)
    //logRoles(formHeader);

     expect(formHeader).toBeDefined();

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //arrange
    render(<ContactForm />)

    //act
    const firstNameField = screen.getByTestId("firstName");
    //screen.debug(firstNameField);

    userEvent.type(firstNameField,"abc");

    const error = screen.getByTestId("error");

    //screen.debug(error);

    //assert
    expect(error).toBeDefined();
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByTestId("submit");

    //screen.debug(submitButton);

    userEvent.click(submitButton);

    const firstNameError = screen.getByText(/firstName must have at least 5 characters./i)
    const lastNameError = screen.getByText(/lastName is a required field./i);
    const emailError = screen.getByText(/email must be a valid email address./i);
    
    
    expect(firstNameError).toBeDefined();
    expect(lastNameError).toBeDefined();
    expect(emailError).toBeDefined();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/First Name/i)
    userEvent.type(firstName, "TestName");

    const lastName = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastName, "Burke");

    const submitButton = screen.getByTestId("submit");
    userEvent.click(submitButton);

    const emailError = screen.getByText(/email must be a valid email address./i);
    expect(emailError).toBeDefined();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, "test@testcom");

    const emailError = screen.getByText(/email must be a valid email address./i);
    expect(emailError).toBeDefined();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByTestId("submit");
    userEvent.click(submitButton);

    const lastNameError = screen.getByText(/lastName is a required field./i);
    expect(lastNameError).toBeDefined();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    
    const firstName = screen.getByLabelText(/First Name/i)
    userEvent.type(firstName, "TestName");

    const lastName = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastName, "Burke");

    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, "test@test.com");

    const submitButton = screen.getByTestId("submit");
    userEvent.click(submitButton);

    const firstnameDisplay = screen.getByTestId("firstnameDisplay");
    const lastnameDisplay = screen.getByTestId("lastnameDisplay");
    const emailDisplay = screen.getByTestId("emailDisplay");

    expect(firstnameDisplay).toBeEnabled();
    expect(lastnameDisplay).toBeEnabled();
    expect(emailDisplay).toBeEnabled();
     
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    
    const firstName = screen.getByLabelText(/First Name/i)
    userEvent.type(firstName, "TestName");

    const lastName = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastName, "Burke");

    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, "test@test.com");

    const messageInput = screen.getByLabelText(/Message/i)
    userEvent.type(messageInput, "Some message!")


    const submitButton = screen.getByTestId("submit");
    userEvent.click(submitButton);

    const firstnameDisplay = screen.getByTestId("firstnameDisplay");
    const lastnameDisplay = screen.getByTestId("lastnameDisplay");
    const emailDisplay = screen.getByTestId("emailDisplay");
    const messageDisplay = screen.getByTestId("messageDisplay");

    expect(firstnameDisplay).toBeEnabled();
    expect(lastnameDisplay).toBeEnabled();
    expect(emailDisplay).toBeEnabled();
    expect(messageDisplay).toBeEnabled();
});