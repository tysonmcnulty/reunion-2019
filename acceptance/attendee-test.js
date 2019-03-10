Feature("Reunion attendee registers for the reunion");

Before(I => {
  I.amOnPage("/");
});

Scenario("Single attendee", I => {
  I.see("Class of 2004");
  I.see("15th Reunion");
  I.see("October 4-6, 2019");
  I.see("SEE SCHEDULE");
  I.see("REGISTER NOW");
});
