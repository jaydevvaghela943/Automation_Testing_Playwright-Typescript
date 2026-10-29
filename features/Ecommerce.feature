Feature: Ecommerce Validation
  @Regression
  Scenario: Placing the Order
    Given a login to ecommerce application with "netstaffle@gmail.com" and "Iamking@000"
      When Add "ZARA COAT 3" to cart
      Then Verify "ZARA COAT 3" is displayed in the cart
      When Enter valid details and place the order
      Then verify order is present in the orderHistory
  
  @Validation
    Scenario Outline: Placing the Order
      Given a login to ecommerce2 application with "<username>" and "<password>"
        Then Verify Errow message is displayed

        Examples:
        | username          | password      |
        | anshika@gmail.com | Iamking@000   |
        | 1323@gmail.com    | Iamking@000   |