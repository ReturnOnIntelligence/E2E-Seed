Feature: Privnote
	In order to use privnote
	I want to sent message.

@privnote, @test
Scenario: sent note
    Given I on 'privnote.com' website
    When I sent 'This is my message for you'
    Then I should see result url
    When I navigate by url
    And I open message
    Then I should see own message
