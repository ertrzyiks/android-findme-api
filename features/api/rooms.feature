Feature: Rooms
  As a API user
  I want to explore rooms API
  So that I can share my position with others

  Background:
    Given there are following rooms:
      | name      |  is_public  |  password  | created_at | updated_at |
      | Room #1   |  true       |            |     0      |     0      |
      | Room #2   |  false      | 123        |     0      |     0      |

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
      "message":"Validation failed",
      "name":"ValidationError",
      "errors":{
        "name":{
          "message":"name is required",
          "name":"ValidatorError",
          "path":"name",
          "type":"required"
        }
      }
    }
   """
  @wip
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
      "is_public": false
    }
    """
