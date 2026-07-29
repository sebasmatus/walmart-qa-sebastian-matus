Feature: Add Product to Cart
  As a customer visiting the OpenCart store
  I want to add products to the shopping cart
  So that I can review and purchase them

  Background:
    Given the user is on the home page

  @cart @smoke
  Scenario: Add a product to the cart from search results
    When the user searches for "MacBook"
    And the user clicks on the first product in the search results
    And the user adds the product to the cart
    Then a success notification should be displayed
    And the cart should contain 1 item

  @cart
  Scenario: Add multiple units of a product to the cart
    When the user searches for "MacBook"
    And the user clicks on the first product in the search results
    And the user sets the quantity to 2
    And the user adds the product to the cart
    Then a success notification should be displayed
    When the user navigates to the shopping cart
    Then the first product in the cart should have quantity 2

  @cart
  Scenario: View cart after adding a product
    When the user searches for "MacBook"
    And the user clicks on the first product in the search results
    And the user adds the product to the cart
    And the user navigates to the shopping cart
    Then the shopping cart should not be empty
    And the cart should display the product that was added
