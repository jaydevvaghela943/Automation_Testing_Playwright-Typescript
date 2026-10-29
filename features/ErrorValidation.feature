Feature: Ecommerce Validation
    @Validation
    Scenario Outline: Placing the Order
        Given a login to ecommerce2 application with "<username>" and "<password>"
        Then Verify Errow message is displayed

        Examples:
        | username          | password      |
        | anshika@gmail.com | Iamking@000   |
        | 1323@gmail.com    | Iamking@000   |