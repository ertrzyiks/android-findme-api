Feature: Rooms
  As a API user
  I want to explore rooms API
  So that I can share my position with others

  Background:
    Given there are following rooms:
      | name      |  password  | created_at | updated_at |
      | Room #1   |            |     0      |     0      |
      | Room #2   |     123    |     0      |     0      |

  Scenario: Fetching list of rooms
    Given I am an API client
    When the client requests GET "/api/v1/rooms"
    Then the response should be a "200" with JSON:
    """
    [
      {
        "id": "ROOM_ID",
        "name": "Room #1",
        "is_public": true,
        "created_at": "CREATED_AT_TIMESTAMP",
        "updated_at": "UPDATED_AT_TIMESTAMP"
      },
      {
        "id": "ROOM_ID",
        "name": "Room #2",
        "is_public": false,
        "created_at": "CREATED_AT_TIMESTAMP",
        "updated_at": "UPDATED_AT_TIMESTAMP"
      }
    ]
    """
  @wip
  Scenario: Fetching list of public rooms
    Given I am an API client
    When the client requests GET "/api/v1/rooms?only_public=true"
    Then the response should be a "200" with JSON:
    """
    [
      {
        "id": "ROOM_ID",
        "name": "Room #1",
        "is_public": true,
        "created_at": "CREATED_AT_TIMESTAMP",
        "updated_at": "UPDATED_AT_TIMESTAMP"
      }
    ]
    """

  Scenario: Creating public room
    Given I am an API client
    When the client requests POST "/api/v1/rooms" with data:
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
      "created_at": "CREATED_AT_TIMESTAMP",
      "updated_at": "UPDATED_AT_TIMESTAMP"
    }
   """

  Scenario: Cannot create public room without name
    Given I am an API client
    When the client requests POST "/api/v1/rooms" with data:
    """
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
    When the client requests POST "/api/v1/rooms" with data:
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
      "created_at": "CREATED_AT_TIMESTAMP",
      "updated_at": "UPDATED_AT_TIMESTAMP"
    }
    """
