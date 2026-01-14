describe('Hermione Granger banking flow', () => {
  const depositAmount = 1000;
  const withdrawAmount = 500;

  before(() => {
    cy.visit(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login'
    );
  });

  it('should complete full banking flow', () => {
    cy.contains('Customer Login').click();

    cy.get('#userSelect').select('Hermoine Granger');
    cy.contains('Login').click();

    cy.get('.borderM strong')
      .eq(0)
      .invoke('text')
      .should('match', /\d+/);

    cy.get('.borderM strong')
      .eq(1)
      .should('contain.text', '0');

    cy.get('.borderM strong')
      .eq(2)
      .should('contain.text', 'Dollar');

    cy.contains('Deposit').click();
    cy.get('input[placeholder="amount"]').type(depositAmount);
    cy.contains('Deposit').click();

    cy.get('.error')
      .should('be.visible')
      .and('contain.text', 'Deposit Successful');

    cy.get('.borderM strong')
      .eq(1)
      .should('contain.text', depositAmount);

    cy.contains('Withdrawl').click();
    cy.get('input[placeholder="amount"]').type(withdrawAmount);
    cy.contains('Withdraw').click();

    cy.get('.error')
      .should('be.visible')
      .and('contain.text', 'Transaction successful');

    cy.get('.borderM strong')
      .eq(1)
      .should('contain.text', depositAmount - withdrawAmount);

    cy.contains('Transactions').click();

    cy.get('table tbody tr')
      .should('have.length.at.least', 2);

    cy.get('table tbody tr')
      .first()
      .should('contain.text', 'Credit');

    cy.get('table tbody tr')
      .last()
      .should('contain.text', 'Debit');

    cy.contains('Back').click();

    cy.get('#accountSelect').select(1);

    cy.contains('Transactions').click();
    cy.get('table tbody tr')
      .should('have.length', 0);

    cy.contains('Logout').click();

    cy.url().should('include', '/login');
    cy.contains('Customer Login').should('be.visible');
  });
});
