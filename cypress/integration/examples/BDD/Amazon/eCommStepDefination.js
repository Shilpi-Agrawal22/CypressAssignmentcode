/// <reference types="Cypress" />
import { Given,When,Then, And } from "cypress-cucumber-preprocessor/steps";
import SignInPage from '../../../../support/pageObjects/SignInPage'
import AmazonHomePage from '../../../../support/pageObjects/AmazonHomePage'
import LanguageCurrencySettingPage from '../../../../support/pageObjects/LanguageCurrencySettingPage';
import SmartHomeEntertainmentPage from '../../../../support/pageObjects/SmartHomeEntertainmentPage';
import UserAccountPage from '../../../../support/pageObjects/UserAccountPage';
import GiftCardBalancePage from '../../../../support/pageObjects/GiftCardBalancePage';

//cypress run --spec cypress\integration\examples\BDD\*.feature --headed --browser chrome
//npx cypress-tags run -e TAGS="@Smoke" --headed --browser chrome

const signInPage=new SignInPage()
const amazonHomePage=new AmazonHomePage()
const languageCurrencySettingPage=new LanguageCurrencySettingPage()
const smartHomeEntertainmentPage=new SmartHomeEntertainmentPage()
const userAccountPage=new UserAccountPage()
const giftCardBalancePage=new GiftCardBalancePage()

Given('Starts on the Amazon',function()
{
    cy.visit(Cypress.env('url'))
})
// When I add items to Cart
And('Login with valid credentials',function ()
{
    
    //cy.get('#nav-link-accountList-nav-line-1').click()
        amazonHomePage.getSignInBtn().click().debug()
        signInPage.getEmailInput().type(this.data.email)
        signInPage.getContinueSigninBtn().click()
        signInPage.getPasswordInput().type(this.data.password)
        signInPage.getsignInSubmitBtn().click()
})
//Click on Your account
When('Click on Your account',()=>
{
    const amazonHomePage=new AmazonHomePage()
    amazonHomePage.getAccountAndListEle().should('be.visible')
    amazonHomePage.getAccountAndListEle().trigger('mouseover')
    amazonHomePage.getAccountLink().click()
})

//Click on Gift Cards
And('Click on Gift Cards',()=>
{
    userAccountPage.getGiftCardsEleBox().click()
})

//Check the balance of your gift card is $0.00
Then('Check the balance of your gift card is $0.00',()=>
{

    giftCardBalancePage.getGiftCardBalEle().should('contain','Your Gift Card Balance')
    giftCardBalancePage.getGiftCardBalValueEle().then(function(element)
    {
        const giftcardBalance= element.text().trim()
        cy.log(giftcardBalance)
        expect(giftcardBalance.includes('USD 0.00')).to.be.true
    })
        
})


//Go to Categories list
When('Go to Categories list',()=>
{
    amazonHomePage.getAllCategoryListEle().click()
    cy.wait(8000)
})
//Choose category 'Smart Home'
And('Choose category Smart Home',()=>
{
    //Clicking on Smart Home Menu
    amazonHomePage.getCategorySmartHomeEle().click()
    cy.wait(10000)
})
//Choose sub-category category 'Home Entertainment'

And('Choose sub-category category Home Entertainment',()=>
{
    //Clicking on Home Entertainment SubMenu
    amazonHomePage.getSubCategoryHomeEntertainmentEle().click()
    cy.wait(10000)
})
//Choose sub-category 'Televisions'
And('Choose sub-category Televisions',()=>
{
    //Clicking on Television subcategory
    smartHomeEntertainmentPage.getSmartTelevisionCategoryEle().click()
    cy.wait(10000)
})
//Check the total number of results match the total displayed products
Then('Check the total number of results match the total displayed products',()=>
{
    //Clicking on See All Results
    smartHomeEntertainmentPage.getSeeAllResultLinkEle().click()

    smartHomeEntertainmentPage.getResultMesEle().then(function(element)
    {  
        const NumberOfTelevisionElement= element.text()
        cy.log(NumberOfTelevisionElement)
        var res= NumberOfTelevisionElement.split("of")
        var NoOfTelevisions= res[1].trim()
        var NoOfTelevisions2 = NoOfTelevisions.split("results")
        NoOfTelevisions = NoOfTelevisions2[0].trim()
        cy.log(NoOfTelevisions)
        smartHomeEntertainmentPage.getTelevisionResultsContainerEle().then($elements => {
            const countOfElementsOnEachPage = $elements.length;
            cy.log('No of Elements on Each Page'+countOfElementsOnEachPage)
            cy.get('ul.a-pagination').find('>li').then($element2 => {
                var countOfPage= $element2.length;
                countOfPage=Number(countOfPage)-1
                cy.log("Count of page"+countOfPage)
                smartHomeEntertainmentPage.getPaginationBtns().each(($el, index, $list) => {
                    cy.log("No Of Pages"+countOfPage)
                    //Clicking on All page navigation number buttons to reach last page
                        if (index < countOfPage-1) {
                            if($el.attr('class')=='a-disabled')
                            {
                                $el.attr('class','a-selected')
                                smartHomeEntertainmentPage.getPaginationNextBtn().click({ force: true }) 
                                cy.wait(20000)
                            }
                            else if($el.attr('class')=='a-normal')
                            {
                                $el.attr('class','a-selected')
                                smartHomeEntertainmentPage.getPaginationNextBtn().click({ force: true }) 
                                cy.wait(20000)
                            }
                            else
                            {
                                cy.log("Element class"+$el.attr('class')) 
                                smartHomeEntertainmentPage.getPaginationNextBtn().click({ force: true }) 
                                cy.wait(20000)
                            }
                        }                            
                }).then(($countOfPage)=>{
                smartHomeEntertainmentPage.getTelevisionResultsContainerEle().then($elements3 => {
                    const countOfElementsOnLastPage = $elements3.length
                    cy.log('No of Elements on Last Page'+countOfElementsOnLastPage) 
                    //logic to compute total number of result[TotalCount=NoOfTeleveionsOnLastPage + NoOfrecordsOnEachPage*(TotalNoOfPages-1)]
                    const TotalNumberofRecords=((Number(countOfPage)-1)*Number(countOfElementsOnEachPage))+Number(countOfElementsOnLastPage)
                    cy.log(TotalNumberofRecords)
                    expect(TotalNumberofRecords).to.equal(Number(NoOfTelevisions))
                })
            })
            })
        })
    })

})

//Go to Currency Settings
When('Go to Currency Settings',()=>
{
    //Clicking on Amazon Main Page
    amazonHomePage.getDefaultHomePage().click()
    //clicking on CUrrent Dropdown
    amazonHomePage.getCurrencyDropDown().click()
})
And('Change currency from USD to AED',()=>
{
    //clicking on current change dropdown button
    languageCurrencySettingPage.getChangeCurrentBtn().click()
    //Select Currency 
    languageCurrencySettingPage.getCurrentSelect().contains("AED - Arab Emirates Dirham").click()
    languageCurrencySettingPage.getChangeCurrentBtn().should('have.text','AED - Arab Emirates Dirham')
})
And('Save changes',()=>
{
    //clicking on Save Button
    languageCurrencySettingPage.getSaveCurrencyChangeBtn().click()
})
Then('Check the selected currency displayed for the products on Amazon Home Page',()=>
{
    //Verify changed currency in displayed on CUrrency element in Amazon Home Page
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
})    