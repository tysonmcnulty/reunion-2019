Feature("Reunion attendee registers for the reunion");

Before(I => {
  I.amOnPage("/");
});

Scenario("Single attendee", I => {
  I.see("Class of 2004");
  I.see("15th Reunion");
  I.see("October 4-6, 2019");
  I.dontSee("#registration-form");

  I.click("REGISTER NOW");

  I.waitForElement("#registration-form");
  I.see("Who's registering?");
  I.click("Just me");

  I.waitForText("My Information");
  I.fillField("First Name", "Tyson");
  I.fillField("Last Name", "McNulty");
  I.fillField("Email", "cool-email@example.com");

  I.see("$125");
  I.waitForElement("#paypal-button");
});
