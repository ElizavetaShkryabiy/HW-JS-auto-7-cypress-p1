describe('books app basic tests', () => {

  let bookTitle1 = 'Somethin in the way';
  let bookTitle2 = 'Change';
  let bookDescription = 'Boooook';
    

  it.only('page loads', () => {    
    cy.get('.text-light').should('be.visible')
  });
  it("Should successfully login",
   () => {
    
    cy.visit("/booksNode");
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });
  
  it("Should not login with empty login", () => {
    cy.visit("/booksNode");
    cy.login(" ", "test");    
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле");
  });
  
  it("Should not login with empty password", () => {
    cy.visit("/booksNode");
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.contains("Submit").click();
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it('Should add book',() =>{
    cy.login("test@test.com", "test");
    cy.addBook(bookTitle1,bookDescription);  
    cy.get('.card-title').last().should('have.text',bookTitle1)
  })
  it.only('Should add book and add it to Favotires',() =>{    
    cy.viewport(786,800)
    cy.login("test@test.com", "test");
    cy.addBook(bookTitle2,bookDescription);  
    cy.get('.card-title').last().should('have.text',bookTitle2)
    cy.wait(3000)
    cy.get('.card-footer > .btn').last().click({force:true})
    cy.get('.card-footer > .btn').last().should('have.text', 'Delete from favorite')
  })
  it('Should add book straight to Favorites ',() =>{
    cy.viewport(375,500)
    cy.login("test@test.com", "test");
    cy.addBookWithFavoritesButton(bookTitle1,bookDescription);  
    cy.get('.card-title').last().should('have.text',bookTitle1);
    cy.get('.card-footer > .btn').last().should('have.text', 'Delete from favorite')
  })

})