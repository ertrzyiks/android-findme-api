Feature: Rooms
  As a API user
  I want to explore rooms API
  So that I can share my position with others

  Background:
    Given there are following users:
      |             _id          | username      |
      | 507f1f77bcf86cd799439011 | Jeremy        |

    And there are following rooms:
      |             _id          | name      |  password  | created_at | updated_at |
      | 507f1f77bcf86cd799439031 | Room #1   |            |     0      |     0      |
      | 507f1f77bcf86cd799439032 | Room #2   |     123    |     0      |     0      |

  Scenario: Fetching single room
    Given I am an API client
    And I join as "Jeremy"
    When I requests GET "/api/v1/rooms/507f1f77bcf86cd799439031"
    Then the response should be a "200" with JSON:
    """
    {
      "id": "ROOM_ID",
      "name": "Room #1",
      "is_public": true,
      "created_at": "TIMESTAMP",
      "updated_at": "TIMESTAMP"
    }
    """

  Scenario: Fetching list of rooms
    Given I am an API client
    And I join as "Jeremy"
    When I requests GET "/api/v1/rooms"
    Then the response should be a "200" with JSON:
    """
    [
      {
        "id": "ROOM_ID",
        "name": "Room #1",
        "is_public": true,
        "created_at": "TIMESTAMP",
        "updated_at": "TIMESTAMP"
      },
      {
        "id": "ROOM_ID",
        "name": "Room #2",
        "is_public": false,
        "created_at": "TIMESTAMP",
        "updated_at": "TIMESTAMP"
      }
    ]
    """

  Scenario: Fetching list of public rooms
    Given I am an API client
    And I join as "Jeremy"
    When I requests GET "/api/v1/rooms?only_public=true"
    Then the response should be a "200" with JSON:
    """
    [
      {
        "id": "ROOM_ID",
        "name": "Room #1",
        "is_public": true,
        "created_at": "TIMESTAMP",
        "updated_at": "TIMESTAMP"
      }
    ]
    """

  Scenario: Creating public room
    Given I am an API client
    And I join as "Jeremy"
    When I requests POST "/api/v1/rooms" with data:
    """
    {
      "name": "MyPublicRoom"
    }
    """
    Then the response should be a "200" with JSON:
    """
    {
      "id": "ROOM_ID",
      "name": "MyPublicRoom",
      "is_public": true,
      "created_at": "TIMESTAMP",
      "updated_at": "TIMESTAMP"
    }
   """

  Scenario: Cannot create public room without name
    Given I am an API client
    And I join as "Jeremy"
    When I requests POST "/api/v1/rooms" with data:
    """
    {}
    """
    Then the response should be a "400" with JSON:
    """
    {
      "code": 400,
      "message": "invalid name"
    }
    """

  Scenario: Creating private room
    Given I am an API client
    And I join as "Jeremy"
    When I requests POST "/api/v1/rooms" with data:
    """
    {
      "name": "MyPrivateRoom",
      "password": "newpassword"
    }
    """
    Then the response should be a "200" with JSON:
    """
    {
      "id": "ROOM_ID",
      "name": "MyPrivateRoom",
      "is_public": false,
      "created_at": "TIMESTAMP",
      "updated_at": "TIMESTAMP"
    }
    """
