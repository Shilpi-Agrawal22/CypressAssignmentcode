class GiftCardBalancePage
{
getGiftCardBalEle()
{
    return cy.get('.a-row.gc-balance-box h2')
}
getGiftCardBalValueEle()
{
    return cy.get('#gc-ui-balance-gc-balance-value')
}

}
export default GiftCardBalancePage;