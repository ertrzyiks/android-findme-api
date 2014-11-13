Feature: Example feature
  As a API user
  I want to call sample method
  So that I can know Im able to use API

  Scenario: Calling sample method
    Given I am an API client
    When the client requests GET "/api"
    Then the response should be a "200" with JSON:
    """
    Ecomm API is running
    """
