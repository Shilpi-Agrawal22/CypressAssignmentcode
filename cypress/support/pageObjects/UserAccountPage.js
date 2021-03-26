
class UserAccountPage
{
getGiftCardsEleBox()
{
    return cy.get(':nth-child(3) > :nth-child(1) > .ya-card__whole-card-link > .a-box')
}

}
export default UserAccountPage;