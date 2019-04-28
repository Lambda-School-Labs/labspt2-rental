import React, { Component } from "react";
import { FlexColumn, Container, FlexRow } from "custom-components";
import { Divider, Header, Icon } from 'semantic-ui-react';
import DashboardCards from "./DashboardCards";

export default class DashboardContent extends Component {
  componentDidMount() {
    this.props.getEverything();
    this.props.getUserRole();
  }

  render() {
    const {
      reservTotals,
      reservActive,
      propTotal,
      propInactive,
      emplTotal,
      tasksToday,
      tasksOverdue
    } = this.props;

    // this sets the color of the overdue label to red if any exist
    let overdueColor = "blue";
    if (tasksOverdue) overdueColor = "red";

    // this sets the color of unreserved properties label to yellow if any exist and red if more than 50% of total exist
    let propInactiveColor = "blue";
    let inactiveHomeText = "None of the homes are unreserved";
    if (propInactive) {
      if (propInactive >= propTotal / 2) {
        propInactiveColor = "red";
        inactiveHomeText = "50% or more homes are unreserved";
      } else {
        propInactiveColor = "yellow";
        inactiveHomeText = "Some of the homes are unreserved";
      }
    }

    // this sets the color of the active reservations and total reservations labels to red if none exist
    let reservTotalsColor = "blue";
    let reservActiveColor = "blue";
    if (!reservTotals) reservTotalsColor = "red";
    if (!reservActive) reservActiveColor = "red";

    return (
      <Container>
        <FlexColumn alignCenter width="full">

        <FlexRow style={{width: '100%'}}>

          <div style={{width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '2%', padding: '2%', backgroundColor: '#f6f9fc'}}>
            <p style={{alignSelf: 'center', fontSize: '2.5em', marginBottom: 0}} >{reservTotals}</p>

            <Divider horizontal>
              <Header as='h4'>
                Reservations
              </Header>
            </Divider>

            <Icon name='bar chart' size='big' style={{alignSelf: 'center', color: '#0080D6'}} />
          </div>

          <div style={{width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '2%', padding: '2%', backgroundColor: '#f6f9fc'}}>
            <p style={{alignSelf: 'center', fontSize: '2.5em', marginBottom: 0}} >{tasksOverdue}</p>

            <Divider horizontal>
              <Header as='h4'>
                Overdue Tasks
              </Header>
            </Divider>

            <Icon name='alarm' size='big' style={{alignSelf: 'center', color: '#ec0000'}} />
          </div>

          <div style={{width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '2%', padding: '2%', backgroundColor: '#f6f9fc'}}>
            <p style={{alignSelf: 'center', fontSize: '2.5em', marginBottom: 0}} >{tasksToday}</p>

            <Divider horizontal>
              <Header as='h4'>
                Today's Tasks
              </Header>
            </Divider>

            <Icon name='clipboard list' color='green' size='big' style={{alignSelf: 'center'}} />
          </div>
        </FlexRow>





          <DashboardCards
            title="Reservations"
            iconName="book"
            value1={reservTotals}
            label1="Total"
            color1={reservTotalsColor}
            popupText1="Total reservations"
            value2={reservActive}
            label2="Active"
            color2={reservActiveColor}
            popupText2="Current reservations"
          />
          <DashboardCards
            title="Properties"
            iconName="home"
            value1={propTotal}
            label1="Total"
            color1="blue"
            popupText1="Total homes"
            value2={propInactive}
            label2="Unreserved"
            color2={propInactiveColor}
            popupText2={inactiveHomeText}
          />
          <DashboardCards
            title="Employees"
            iconName="address card"
            value1={emplTotal}
            label1="Total"
            color1="blue"
            popupText1="Total employees"
          />
          <DashboardCards
            title="Tasks"
            iconName="clipboard list"
            value1={tasksToday}
            label1="Today"
            color1="blue"
            popupText1="Tasks due today"
            value2={tasksOverdue}
            label2="Overdue"
            color2={overdueColor}
            popupText2="Overdue tasks"
          />
        </FlexColumn>
      </Container>
    );
  }
}

// Mobile view of cards
{/* <div style={{width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '2%', padding: '2%', backgroundColor: '#f6f9fc'}}>
<p style={{alignSelf: 'center', fontSize: '2.5em', marginBottom: 0}} >{reservTotals}</p>

<Divider horizontal>
  <Header as='h4'>
    Reservations
  </Header>
</Divider>

<Icon name='bar chart' size='big' style={{alignSelf: 'center', color: '#0080D6'}} />
</div>

<div style={{width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '2%', padding: '2%', backgroundColor: '#f6f9fc'}}>
<p style={{alignSelf: 'center', fontSize: '2.5em', marginBottom: 0}} >{tasksOverdue}</p>

<Divider horizontal>
  <Header as='h4'>
    Overdue Tasks
  </Header>
</Divider>

<Icon name='alarm' size='big' style={{alignSelf: 'center', color: '#ec0000'}} />
</div>

<div style={{width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '2%', padding: '2%', backgroundColor: '#f6f9fc'}}>
<p style={{alignSelf: 'center', fontSize: '2.5em', marginBottom: 0}} >{tasksToday}</p>

<Divider horizontal>
  <Header as='h4'>
    Today's Tasks
  </Header>
</Divider>

<Icon name='clipboard list' color='green' size='big' style={{alignSelf: 'center'}} />
</div> */}