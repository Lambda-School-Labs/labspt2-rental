import React, { Component } from "react";
import { Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import CreditCard from "./creditCard";
import PlanModal from "./planModal";
import { FlexRow } from "../../custom-components";

export default class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextBilling: "",
      billingPlan: "",
      stripeCustomerID: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      nextBilling: "April 21, 2019",
      billingPlan: this.props.user.billingPlan,
      stripeCustomerID: this.props.user.stripeCustomerID
    });
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      this.setState({
        billingPlan: this.props.user.billingPlan
      });
    }
  };

  render() {
    const { nextBilling, billingPlan } = this.state;

    let loading;
    if (this.state.billingPlan === "") {
      loading = (
        <Segment>
          <Header as="h2">Current Plan:</Header>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      );
    } else {
      loading = (
        <Segment>
          <Header as="h2">Current Plan:</Header>
          <Segment.Inline>
            {" "}
            <strong>{billingPlans[billingPlan].name}</strong>:{" "}
            {billingPlans[billingPlan].description}
          </Segment.Inline>
          <FlexRow style={{ marginTop: "25px" }}>
            <PlanModal
              customerID={this.state.stripeCustomerID}
              user={this.props.user}
              properties={this.props.properties}
            />
          </FlexRow>
        </Segment>
      );
    }

    return (
      <div>
        <Header as="h1">Billing Details</Header>
        <CreditCard user={this.props.user} />

        <FlexRow style={{ marginTop: "25px", marginBottom: "35px" }}>
          <p>Your next bill will be sent on {nextBilling}.</p>
        </FlexRow>

        {loading}
      </div>
    );
  }
}

const billingPlans = {
  free: {
    _id: "5ca5930aae431b84bad59a4f",
    name: "Free",
    perPropertyPrice: 0,
    description: "One property"
  },
  upgraded: {
    _id: "5ca5930aae431b84bad59a50",
    name: "Upgraded",
    perPropertyPrice: 8,
    description: "$8 per rental property"
  }
};
