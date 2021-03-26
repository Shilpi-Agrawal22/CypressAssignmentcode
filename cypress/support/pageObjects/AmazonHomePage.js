class AmazonHomePage
{
getSignInBtn()
{
    return cy.get('#nav-link-accountList-nav-line-1')
}
getSignOut()
{
    return cy.get('#nav-item-signout')
}
getAccountAndListEle()
{
    return cy.get('.nav-short-width > .nav-icon')
}

getAccountLink()
{
    return cy.get('#nav-al-your-account > a:nth-child(2) > span')
}

getDefaultHomePage()
{
    return cy.get('#nav-logo-sprites')
}
getCurrencyDropDown()
{
    return cy.get('#icp-touch-link-cop')
}
getCurrencySymbol()
{
    return cy.get('.icp-currency-symbol')
}
getCurrencyName()
{
    return cy.get('#icp-touch-link-cop > span.icp-color-base')
}
getAllCategoryListEle()
{
    return cy.get('a#nav-hamburger-menu[aria-label="Open Menu"]')
}
getCategorySmartHomeEle()
{
    return cy.get('a.hmenu-item>div:contains("Smart Home")')
}
getSubCategoryHomeEntertainmentEle()
{
    return cy.get('a.hmenu-item:contains("Home Entertainment")')
}
}
export default AmazonHomePage;