module.exports = function actorExtensions() {
  return actor({
    registerAsAttendee: function(person) {
      const info = infoFor(person);

      this.waitForText("My Information");
      within("#attendee-info", () => {
        this.fillField("First Name", info.firstName);
        this.fillField("Last Name", info.lastName);
        this.fillField("Email", info.email);
        this.fillField("T-Shirt Size", info.tShirtSize);
      });
    },

    registerAsGuest: function(person) {
      const info = infoFor(person);

      this.waitForText("My Guest's Information");
      within("#guest-info", () => {
        this.fillField("First Name", info.firstName);
        this.fillField("Last Name", info.lastName);
        this.fillField("Email", info.email);
        this.dontSee("T-Shirt Size");
      });
    },

    seeSinglesPaymentFlow: function() {
      this.see("$125.00");
      this.see("$4.04");
      this.see("$129.04");
      this.waitForElement("#paypal-button");
    },

    seeSinglesDinnerOnlyPaymentFlow: function() {
      this.see("$65.00");
      this.see("$2.25");
      this.see("$67.25");
      this.waitForElement("#paypal-button");
    },

    seeCouplesPaymentFlow: function() {
      this.see("$225.00");
      this.see("$7.03");
      this.see("$232.03");
      this.waitForElement("#paypal-button");
    },

    seeCouplesDinnerOnlyPaymentFlow: function() {
      this.see("$130.00");
      this.see("$4.19");
      this.see("$134.19");
      this.waitForElement("#paypal-button");
    },

    seeHomePageContents: function() {
      this.see("Class of 2004");
      this.see("15th Reunion");
      this.see("October 4-6, 2019");
      this.dontSee("#registration-form");

      within("#questions", () => {
        this.see("Facebook group");
      });
    }
  });
};

const persons = {
  Tyson: {
    firstName: "Tyson",
    lastName: "McNulty",
    email: "burger@example.com",
    tShirtSize: "extra awesome"
  },
  Shannon: {
    firstName: "Shannon",
    lastName: "McNulty",
    email: "banana@example.com",
    tShirtSize: "super nice"
  }
};

function infoFor(person) {
  return persons[person];
}
