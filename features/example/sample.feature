Feature: Example feature
  As a API user
  I want to call sample method
  So that I can know Im able to use API

  Background:
    Given there are following users:
      | _id | username  |
      | 1   | user1     |
      | 2   | user2     |

  Scenario: Calling sample method
    Given I am an API client
    When the client requests GET "/api"
    Then the response should be a "200" with JSON:
    """
    {
      "message": "Ecomm API is running"
    }
    """

  Scenario: Calling method connected to db
    Given I am an API client
    When the client requests GET "/users"
    Then the response should be a "200" with JSON:
    """
    [
      {
        "id": "1",
        "username": "user1"
      },
      {
        "id": "2",
        "username": "user2"
      }
    ]
    """
