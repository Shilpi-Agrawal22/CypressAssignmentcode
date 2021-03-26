/// <reference types="Cypress"/>

import SignInPage from '../../support/pageObjects/SignInPage';
import UserAccountPage from '../../support/pageObjects/UserAccountPage';
import AmazonHomePage from '../../support/pageObjects/AmazonHomePage';
import GiftCardBalancePage from '../../support/pageObjects/GiftCardBalancePage';

describe('Verification of Gift Card default Balance',function()
{
    before(function() {
        // runs once before all tests in the block
       cy.fixture('example').then(function(data)
        {
            this.data=data
        })
    })
    it('TC01_GiftCardValidation',function()
    {
    //Variable initialization
        const signInPage=new SignInPage()
        const userAccountPage=new UserAccountPage()
        const amazonHomePage=new AmazonHomePage()
        const giftCardBalancePage=new GiftCardBalancePage()
    //Navigate to Amazon Application
        cy.visit(Cypress.env('url'))
        amazonHomePage.getSignInBtn().click()
        signInPage.getEmailInput().type(this.data.email)
        signInPage.getContinueSigninBtn().click()
        signInPage.getPasswordInput().type(this.data.password)
        signInPage.getsignInSubmitBtn().click()
    //CLick to User's Account & List 
        amazonHomePage.getAccountAndListEle().should('be.visible')
        amazonHomePage.getAccountAndListEle().trigger('mouseover')
    //Click on Account link
        amazonHomePage.getAccountLink().click()
    //Click on Gift Card
        userAccountPage.getGiftCardsEleBox().click()
    //Verify Gift Card Message Text   
        giftCardBalancePage.getGiftCardBalEle().should('contain','Your Gift Card Balance')
        //Using custom command function
        //cy.textVerificationOnElement( cy.get('.a-row.gc-balance-box h2'),'Your Gift Card Balance')
        //Using custom command function
        
    //Verify Gift Card Balance
        giftCardBalancePage.getGiftCardBalValueEle().then(function(element)
        {
           const giftcardBalance= element.text().trim()
           cy.log(giftcardBalance)
           expect(giftcardBalance.includes('USD 0.00')).to.be.true
        })

    //SignOut from Application
    amazonHomePage.getAccountAndListEle().should('be.visible')
    amazonHomePage.getAccountAndListEle().trigger('mouseover')
    //Click on Signout link
    amazonHomePage.getSignOut().click()
    })
})