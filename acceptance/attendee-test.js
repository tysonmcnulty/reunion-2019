Feature("Reunion attendee registers for the reunion");

Before(I => {
  I.amOnPage("/");
});

Scenario("Registering alone", I => {
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
  I.fillField("T-Shirt Size", "extra awesome");

  I.see("$125.00");
  I.see("$4.04");
  I.see("$129.04");
  I.waitForElement("#paypal-button");
});

Scenario("Registering as a couple", I => {
  I.see("Class of 2004");
  I.see("15th Reunion");
  I.see("October 4-6, 2019");
  I.dontSee("#registration-form");

  I.click("REGISTER NOW");

  I.waitForElement("#registration-form");
  I.see("Who's registering?");
  I.click("Me and a non-alum");

  I.waitForText("My Information");
  within("#attendee-1", () => {
    I.fillField("First Name", "Tyson");
    I.fillField("Last Name", "McNulty");
    I.fillField("Email", "cool-email@example.com");
    I.fillField("T-Shirt Size", "extra awesome");
  });

  I.waitForText("My Guest's Information");
  within("#attendee-2", () => {
    I.fillField("First Name", "Tyson");
    I.fillField("Last Name", "McNulty");
    I.fillField("Email", "cool-email@example.com");
    I.fillField("T-Shirt Size", "extra awesome");
  });

  I.see("$225.00");
  I.see("$7.03");
  I.see("$232.03");
  I.waitForElement("#paypal-button");
});
