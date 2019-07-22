const emptyDetails = {};

const base65Details = {
  base: "65.00",
  fee: "2.25",
  total: "67.25"
};

const base125Details = {
  base: "125.00",
  fee: "4.04",
  total: "129.04"
};

const base130Details = {
  base: "130.00",
  fee: "4.19",
  total: "134.19"
};

const base225Details = {
  base: "225.00",
  fee: "7.03",
  total: "232.03"
};

function pricingDetails({ ticketOption, attendeeOption }) {
  if (!(ticketOption && attendeeOption)) {
    return emptyDetails;
  }

  if (ticketOption === "dinner") {
    if (attendeeOption === "pair" || attendeeOption === "couple") {
      return base130Details;
    }
    if (attendeeOption === "individual") {
      return base65Details;
    }
  }

  if (ticketOption === "full") {
    if (attendeeOption === "pair" || attendeeOption === "couple") {
      return base225Details;
    }
    if (attendeeOption === "individual") {
      return base125Details;
    }
  }
}

function pricingExplanation(details) {
  return `$${details.base} registration fee + $${
    details.fee
  } PayPal processing fee`;
}

export { pricingDetails, pricingExplanation };
