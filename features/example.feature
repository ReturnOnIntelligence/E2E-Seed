Feature: Google Search
	In order to use google.com
	As application user
	I want to be able to find something.

@google, @test
Scenario: Search Hello World in Google
    Given I on 'google.com' website
    When I enter 'Wiki' in search line
    Then I should see some link to 'Wiki' website