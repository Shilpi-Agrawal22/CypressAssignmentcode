class LanguageCurrencySettingPage
{
    getChangeCurrentBtn()
    {
        return cy.get('#a-autoid-0-announce')
    }
    getCurrentSelect()
    {
        return cy.get('.a-nostyle.a-list-link[role="listbox"]')
    }
    getSaveCurrencyChangeBtn()
    {
        return cy.get('.a-button-input')
    }

}
export default LanguageCurrencySettingPage;