Feature: End to end Ecommerce validation
Scenario: Check your gift card's balance is $0.00
Given Starts on the Amazon
And Login with valid credentials
When Click on Your account
And Click on Gift Cards
Then Check the balance of your gift card is $0.00

Scenario: Check the total displayed number of results for category Smart Home | Televisions
Given Starts on the Amazon
And Login with valid credentials
When Go to Categories list
And Choose category Smart Home
And Choose sub-category category Home Entertainment
And Choose sub-category Televisions
Then Check the total number of results match the total displayed products

Scenario: Check the selected currency displayed for the products' price
Given Starts on the Amazon
And Login with valid credentials
When Go to Currency Settings
And Change currency from USD to AED
And Save changes
Then Check the selected currency displayed for the products on Amazon Home Page