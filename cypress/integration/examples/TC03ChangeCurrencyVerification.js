/// <reference types="Cypress"/>

import SignInPage from '../../support/pageObjects/SignInPage';
import AmazonHomePage from '../../support/pageObjects/AmazonHomePage';
import LanguageCurrencySettingPage from '../../support/pageObjects/LanguageCurrencySettingPage';


describe('Change Currency Verification',function()
{
    before(function() {
        // runs once before all tests in the block
       cy.fixture('example').then(function(data)
        {
            this.data=data
        })
    })
    it('TC03ChangeCurrencyVerification',function()
    {
    //Varaiable Initialization
        const signInPage=new SignInPage()
        const amazonHomePage=new AmazonHomePage()
        const languageCurrencySettingPage=new LanguageCurrencySettingPage()
    //Signin
        cy.visit(Cypress.env('url'))
        amazonHomePage.getSignInBtn().click()
        signInPage.getEmailInput().type(this.data.email)
        signInPage.getContinueSigninBtn().click()
        signInPage.getPasswordInput().type(this.data.password)
        signInPage.getsignInSubmitBtn().click()
    //Click on Currency setting buttonthis.data.email
        amazonHomePage.getDefaultHomePage().click()
        amazonHomePage.getCurrencyDropDown().click()
    //Click on Change Currency button
        languageCurrencySettingPage.getChangeCurrentBtn().click()
        //languageCurrencySettingPage.getCurrentSelect().find('#icp-sc-dropdown_3').click()
        languageCurrencySettingPage.getCurrentSelect().contains("AED - Arab Emirates Dirham").click()
       
    //Verification after change should be visible in same field also on Change currency setting page
        languageCurrencySettingPage.getChangeCurrentBtn().should('have.text','AED - Arab Emirates Dirham')
        languageCurrencySettingPage.getSaveCurrencyChangeBtn().click()
    //Verification after change should be visible in same field on Amazon Home Page
        amazonHomePage.getCurrencySymbol().then(function(element){
        const currencySymbol= element.text()
        cy.log(currencySymbol)

        amazonHomePage.getCurrencyName().then(function(element2){
            var currencyName= element2.text()
            cy.log(currencyName)
             currencyName=currencySymbol+' - '+currencyName
            cy.log(currencyName)
            expect(currencyName).to.equals('AED - Arab Emirates Dirham')
           }) 
        })
    //SignOut from Application
         amazonHomePage.getAccountAndListEle().should('be.visible')
         amazonHomePage.getAccountAndListEle().trigger('mouseover')
    //Click on Signout link
         amazonHomePage.getSignOut().click()

    })
    
        
})