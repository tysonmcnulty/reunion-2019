Feature("Reunion attendee registers for the reunion");

Before(I => {
  I.amOnPage("/");
  I.seeHomePageContents();
});

Scenario("Registering alone", I => {
  I.click("REGISTER NOW");
  I.waitForElement("#registration-form");

  I.see("Are you coming for the full weekend?");
  I.click("Yes, sign me up for everything!");

  I.see("Who's registering?");
  I.click("Just me");

  I.registerAsAttendee("Tyson");

  I.seeSinglesPaymentFlow();
});

Scenario("Registering as a couple", I => {
  I.click("REGISTER NOW");
  I.waitForElement("#registration-form");

  I.see("Are you coming for the full weekend?");
  I.click("Yes, sign me up for everything!");

  I.see("Who's registering?");
  I.click("Me and a non-alum");

  I.registerAsAttendee("Tyson");
  I.registerAsGuest("Shannon");

  I.seeCouplesPaymentFlow();
});

Scenario("Registering alone, dinner only", I => {
  I.click("REGISTER NOW");
  I.waitForElement("#registration-form");

  I.see("Are you coming for the full weekend?");
  I.click("No, just dinner on Saturday night.");

  I.see("Who's registering?");
  I.click("Just me");

  I.registerAsAttendee("Tyson");

  I.seeSinglesDinnerOnlyPaymentFlow();
});

Scenario("Registering as a couple, dinner only", I => {
  I.click("REGISTER NOW");
  I.waitForElement("#registration-form");

  I.see("Are you coming for the full weekend?");
  I.click("No, just dinner on Saturday night.");

  I.see("Who's registering?");
  I.click("Me and a non-alum");

  I.registerAsAttendee("Tyson");
  I.registerAsGuest("Shannon");

  I.seeCouplesDinnerOnlyPaymentFlow();
});
