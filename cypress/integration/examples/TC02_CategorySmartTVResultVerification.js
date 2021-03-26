import SignInPage from '../../support/pageObjects/SignInPage';
import AmazonHomePage from '../../support/pageObjects/AmazonHomePage';
import SmartHomeEntertainmentPage from '../../support/pageObjects/SmartHomeEntertainmentPage'

describe('Verification of Smart TV Category Results',function()
{
    before(function() {
        // runs once before all tests in the block
       cy.fixture('example').then(function(data)
        {
            this.data=data
        })
    })
    it('TC02_CategorySmartTVResultVerification',function()
    {
    //Variable Initialization
        const signInPage=new SignInPage()
        const amazonHomePage=new AmazonHomePage()
        const smartHomeEntertainmentPage=new SmartHomeEntertainmentPage()
    //Login to Application
        cy.visit(Cypress.env('url'))
        amazonHomePage.getSignInBtn().click()
        signInPage.getEmailInput().type(this.data.email)
        signInPage.getContinueSigninBtn().click()
        signInPage.getPasswordInput().type(this.data.password)
        signInPage.getsignInSubmitBtn().click()

    //Clicking on ALL Catrgories
        amazonHomePage.getAllCategoryListEle().click()
        cy.wait(8000)
    //Clicking on Smart Home Menu
        amazonHomePage.getCategorySmartHomeEle().click()
        cy.wait(10000)

    //Clicking on Home Entertainment SubMenu
        amazonHomePage.getSubCategoryHomeEntertainmentEle().click()
        cy.wait(10000)
    //Clicking on Television subcategory
        smartHomeEntertainmentPage.getSmartTelevisionCategoryEle().click()
        cy.wait(10000)
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
    //Logic to compute total number of result[TotalCount=NoOfTeleveionsOnLastPage + NoOfrecordsOnEachPage*(TotalNoOfPages-1)]
                        const TotalNumberofRecords=((Number(countOfPage)-1)*Number(countOfElementsOnEachPage))+Number(countOfElementsOnLastPage)
                        cy.log(TotalNumberofRecords)
                        expect(TotalNumberofRecords).to.equal(Number(NoOfTelevisions))
                    })
                })
                })
            })
        })  
        
    //SignOut from Application
        amazonHomePage.getAccountAndListEle().should('be.visible')
        amazonHomePage.getAccountAndListEle().trigger('mouseover')
    //Click on Signout link
        amazonHomePage.getSignOut().click()

    })
})