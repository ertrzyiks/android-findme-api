Feature: Rooms
  As a API user
  I want to explore rooms API
  So that I can share my position with others

  Background:
    Given there are following rooms:
      | name      |  is_public  |  password  |
      | Room #1   |  true       |            |
      | Room #2   |  false      | 123        |

  Scenario: Fetching list of rooms
    Given I am an API client
    When the client requests GET "/api/v1/rooms"
    Then print last response
    And the response should be a "200" with JSON:
    """
    [
      {
        "id": "ROOM_ID",
        "name": "Room #1",
        "is_public": true
      }
    ]
    """
  @wip
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
      "id": "ROOM_ID"
      "name": "MyPublicRoom",
      "is_public": true
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
      "id": "ROOM_ID"
      "name": "MyPrivateRoom",
      "is_public": false
    }
    """
