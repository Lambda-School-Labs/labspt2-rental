import React, { Component } from "react";
import {
  Dropdown,
  Header,
  Input,
  Button,
  Label,
  Statistic,
  Popup,
  Icon,
  Message
} from "semantic-ui-react";
import { FlexRow, FlexColumn, Text } from "custom-components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

const HeaderBar = styled(FlexRow)`
  border-bottom: thin solid lightgrey;
  padding: 10px;
`;

const ReservationContainer = styled(FlexColumn)`
  span {
    color: grey;
  }
`;

class ReservationView extends Component {
  componentDidMount() {
    this.props.fetchSingleReservation(this.props.match.params.id);
  }

  render() {
    const { reservation, loading } = this.props;
    return loading ? (
      "Loading..."
    ) : (
      <>
        {reservation._id && (
          <ReservationContainer justifyBetween alignCenter width="full">
            <HeaderBar width="full" spaceBottom alignCenter justifyBetween>
              <FlexRow alignCenter>
                <Header as="h3" style={{ margin: 0 }}>
                  {reservation.property.name}
                </Header>
                &nbsp;
                <Popup
                  position="right center"
                  trigger={
                    <Label circular>
                      <Icon fitted name="info" />
                    </Label>
                  }
                  content={reservation._id}
                />
              </FlexRow>

              <Header as="h4" style={{ color: "grey", margin: 0 }}>
                {reservation.guest.firstName}&nbsp;{reservation.guest.lastName}
              </Header>
            </HeaderBar>

            <FlexRow width="full" justifyBetween>
              {!reservation.paid && (
                <Label color="red" center style={{ marginBottom: "5px" }}>
                  Not Paid
                </Label>
              )}

              {reservation.paid && (
                <Label color="green" center>
                  Paid
                </Label>
              )}

              <FlexColumn alignEnd>
                <span>{reservation.guest.email}</span>
                <span>{reservation.guest.phoneNumber}</span>
              </FlexColumn>
            </FlexRow>

            <FlexRow
              width="full"
              justifyCenter
              alignCenter
              spaceTop="40px"
              spaceBottom="40px"
            >
              <Statistic size="tiny" style={{ margin: "0 15px" }}>
                <Statistic.Label>Check In</Statistic.Label>
                <Statistic.Value>
                  {moment(reservation.checkIn).format("MM/DD")}
                </Statistic.Value>
              </Statistic>

              <Statistic size="tiny" style={{ margin: "0 15px" }}>
                <Statistic.Label>Check Out</Statistic.Label>
                <Statistic.Value>
                  {moment(reservation.checkOut).format("MM/DD")}
                </Statistic.Value>
              </Statistic>
            </FlexRow>

            <FlexRow width="300px" spaceTop alignEnd justifyBetween>
              <Link to={`/dashboard/reservations/edit/${reservation._id}`}>
                <Button basic>Edit</Button>
              </Link>
              <Link to="/dashboard/checkout">
                <Button basic color="blue" disabled={reservation.paid}>
                  Process Payment
                </Button>
              </Link>
            </FlexRow>
          </ReservationContainer>
        )}
      </>
    );
  }
}

export default ReservationView;
