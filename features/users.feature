Feature: Users
  As a API user
  I want to authenticate
  So that I can recieve personalized experience

  Scenario: Signin up
    Given I am an API client
    When the client requests POST "/api/v1/users" with data:
    """
    {
      "username": "Jeremy"
    }
    """
    Then the response should be a "200" with JSON:
    """
    {
      "access_token": "ACCESS_TOKEN",
      "refresh_token": "REFRESH_TOKEN",
      "type": "bearer",
      "expire_time": "TIMESTAMP"
    }
    """
