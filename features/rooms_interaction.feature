Feature: Join
  As a API user
  I want to assign user to rooms
  So that I can share my position on selected channels

  Background:
    Given there are following users:
      |             _id          | username      |
      | 507f1f77bcf86cd799439011 | Jeremy        |

    Given there are following clients:
      |             _id          | title         |
      | 507f1f77bcf86cd799439021 | App #1        |

    Given there are following rooms:
      |             _id          | name      |  password  | created_at | updated_at |
      | 507f1f77bcf86cd799439031 | Room #1   |            |     0      |     0      |
      | 507f1f77bcf86cd799439032 | Room #2   |     123    |     0      |     0      |


    Given there are following access tokens:
      | token                        | client_id                | user_id                  |
      | 012345678901234567890        | 507f1f77bcf86cd799439021 | 507f1f77bcf86cd799439011 |

  Scenario: Joining public room
    Given I am an API client
    And I join as "Jeremy"
    When I requests POST "/api/v1/rooms/507f1f77bcf86cd799439031/users" with data:
    """
    {
      "id": "507f1f77bcf86cd799439011"
    }
    """
    Then the response should be a "200" with JSON:
    """
    {
      "id": "507f1f77bcf86cd799439011"
    }
    """
    When I requests GET "/api/v1/rooms/507f1f77bcf86cd799439031/users"
    Then the response should be a "200" with JSON:
    """
    [
      {
        "id": "507f1f77bcf86cd799439011",
        "username": "Jeremy",
        "created_at": "TIMESTAMP",
        "updated_at": "TIMESTAMP"
      }
    ]
    """
