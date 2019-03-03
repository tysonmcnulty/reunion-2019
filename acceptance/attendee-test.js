Feature("Reunion attendee registers for the reunion");

Before(I => {
  I.amOnPage("/");
});

Scenario("Single attendee", I => {
  I.see("Class of 2004 Reunion");
});
