class SmartHomeEntertainmentPage
{
    getSmartTelevisionCategoryEle()
    {
        return cy.get(':nth-child(1) > .bxc-grid__content > .bxc-grid__image > a > img')
    }
    getSeeAllResultLinkEle()
    {
        return cy.get('span:contains("See all results")')
    }
    getResultMesEle()
    {
        return cy.get(' .sg-col-14-of-20 > .sg-col-inner > .a-section > span')
    }
    getTelevisionResultsContainerEle()
    {
        return cy.get('.s-include-content-margin.s-border-bottom.s-latency-cf-section')
    }
    
    getPaginationBtns()
    {
        return cy.get('ul.a-pagination').find('>li')
    }
    getPaginationNextBtn()
    {
        return cy.get('.a-last > a')
    }
    
}
export default SmartHomeEntertainmentPage;