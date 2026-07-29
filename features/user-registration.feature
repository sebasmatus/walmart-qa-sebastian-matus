Feature: User Registration
  As a new visitor to the OpenCart store
  I want to create a personal account
  So that I can make purchases and track my orders

  Background:
    Given the user is on the home page

  @registration @smoke
  Scenario: Successfully register a new user account
    When the user navigates to the registration page
    And the user fills in the registration form with valid data
    And the user accepts the privacy policy
    And the user submits the registration form
    Then the account creation success page should be displayed

  @registration
  Scenario: Registration fails when required fields are missing
    When the user navigates to the registration page
    And the user submits the registration form without filling any fields
    Then an error message should be displayed on the registration page

  @registration
  Scenario: Registration fails with mismatched passwords
    When the user navigates to the registration page
    And the user fills in the registration form with mismatched passwords
    And the user accepts the privacy policy
    And the user submits the registration form
    Then an error message should be displayed on the registration page
