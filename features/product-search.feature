Feature: Product Search
  As a customer visiting the OpenCart store
  I want to search for products
  So that I can find items I am interested in purchasing

  Background:
    Given the user is on the home page

  @search @smoke
  Scenario: Search for an existing product by name
    When the user searches for "MacBook"
    Then the search results page should be displayed
    And the results should contain at least 1 product

  @search
  Scenario: Search for a product with no results
    When the user searches for "xyzproductnotexist123"
    Then the search results page should be displayed
    And a no results message should be displayed

  @search
  Scenario: Search results display correct product information
    When the user searches for "iPhone"
    Then the search results page should be displayed
    And the results should contain at least 1 product
    And the first product name should contain "iPhone"
