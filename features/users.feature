Feature: Users
  As a API user
  I want to authenticate
  So that I can recieve personalized experience

  Background:
    Given there are following users:
      |             _id          | username      |
      | 507f1f77bcf86cd799439011 | Jeremy        |

  Scenario: Signin up
    Given I am an API client
    When I requests POST "/api/v1/users" with data:
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
      "token_type": "Bearer",
      "expire_time": "TIMESTAMP"
    }
    """

  Scenario: Signin in
    Given I am an API client
    And I join as "Jeremy"
    When my access token expire
    Then I requests POST "/oauth/v2/token" with data:
    """
    {
      "client_id": "{{ CLIENT_ID }}",
      "client_secret": "{{ CLIENT_SECRET }}",
      "grant_type": "refresh_token",
      "refresh_token": "{{ REFRESH_TOKEN }}"
    }
    """
    And the response should be a "200" with JSON:
    """
    {
      "access_token": "ACCESS_TOKEN",
      "refresh_token": "REFRESH_TOKEN",
      "token_type": "Bearer",
      "expire_time": "TIMESTAMP"
    }
    """
