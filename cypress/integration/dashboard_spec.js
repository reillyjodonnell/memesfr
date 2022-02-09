describe('Simulate the dashboard for the user to ensure everything works smoothly', () => {
  it('User will be unable to login with incorrect credentials', () => {
    cy.visit('/');
    // Visit the sign in page
    cy.findByText(/Log in/i).click();
    // Type in a valid username
    cy.findByPlaceholderText(/Phone #/i).type('OReally');
    // Press the next button
    cy.findByText(/next/i).click();
    // Input password into the appropriate input container
    cy.findByPlaceholderText(/Password/i).type('Password');
    // Submit the form by clicking the Log in button
    cy.findByTestId(/submit-button/i).click();
    // The error message "Invalid email or username" should appear
    cy.findByText(/Invalid email or username/i).should('exist');
  });

  it('User will be successfully login with correct credentials', () => {
    console.log(process.env.REACT_APP_SAMPLE_USER_EMAIL);
    cy.visit('/');
    // Visit the sign in page
    cy.findByText(/Log in/i).click();
    // Type in a valid username
    cy.findByPlaceholderText(/Phone #/i).type(
      process.env.REACT_APP_SAMPLE_USER_EMAIL
    );
    // Press the next button
    cy.findByText(/next/i).click();
    // Input password into the appropriate input container
    cy.findByPlaceholderText(/Password/i).type(
      process.env.REACT_APP_SAMPLE_USER_PASSWORD
    );
    // Submit the form by clicking the Log in button
    cy.findByTestId(/submit-button/i).click();
    // The error message "Invalid email or username" should appear
    cy.findByText(/Invalid email or username/i).should('exist');
  });
});
