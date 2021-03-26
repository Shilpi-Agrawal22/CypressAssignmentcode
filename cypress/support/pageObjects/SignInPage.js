class SignInPage
{
    getEmailInput()
    {
        return cy.get('#ap_email')
    }
    getContinueSigninBtn()
    {
        return cy.get('.a-button-inner > #continue')
    }

    getPasswordInput()
    {
        return cy.get('#ap_password')
    }
    getsignInSubmitBtn()
    {
        return cy.get('#signInSubmit')
    }

}

export default SignInPage;