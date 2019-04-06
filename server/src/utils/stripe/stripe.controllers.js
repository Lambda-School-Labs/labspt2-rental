/* eslint-disable camelcase */
import config from '../../config';
import stripeModule from 'stripe';
import { User } from '../../resources/user/user.model';

const keyPublishable = config.keys.stripePublishable;
const keySecret = config.keys.stripeSecret;

const stripe = stripeModule(keySecret);
const planid = 'plan_EpLtM3j2EMurWg';
const propertyQuantity = 2; // get from redux store
const subscriptionID = '';
let userID = '';
const userObject = {
  stripeCustomerID: '',
  subscriptionID: '',
  subscriptionItemID: ''
};

export const render = async (req, res, next) => {
  try {
    res.render('index.js', { keyPublishable });
  } catch (err) {
    console.error(err);
  }
};

// Callback functions used for subscribing

const createSubscription = async (err, customer, res) => {
  if (err && err != null) {
    return res
      .status(500)
      .json({ message: 'Failed to create new customer', err });
  } else {
    userObject.stripeCustomerID = customer.id;
    stripe.subscriptions.create(
      {
        customer: customer.id,
        items: [
          {
            plan: planid
          }
        ]
      },
      async (err, subscription) => {
        userObject.subscriptionID = subscription.id;
        const subscriptionItemID = subscription.items.data[0].id;
        userObject.subscriptionItemID = subscriptionItemID;

        const updateUser = await updateUserWithStripeInfo(err, res);
        if (updateUser) {
          return res.status(200).send(updateUser);
        } else if (err != null) {
          return res
            .status(500)
            .json({ message: 'Failed to update user record', err });
        }
      }
    );
  }
};

const updateUserWithStripeInfo = async (err, res) => {
  if (err && err != null) {
    return res.status(500).json({
      message: 'Failed to create new subscription',
      err
    });
  } else {
    try {
      const user = await User.findByIdAndUpdate(userID, userObject, {
        new: true
      })
        .select('-password')
        .lean()
        .exec();

      console.log('updated user', user);
      // Need to update quantity here or fetch quantity off of it for usage.

      const usage = await createUsageRecord(err, user, res);
      if (usage) {
        return res.status(200).send(usage);
      } else if (err != null) {
        return res
          .status(500)
          .json({ message: 'Failed to create usage record', err });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to updated user record', err });
    }
  }
};

const createUsageRecord = async (err, user, res) => {
  if (err && err != null) {
    return res.status(500).json({
      message: 'Failed to update user with stripe info',
      err
    });
  } else {
    const currentDate = Math.floor(Date.now() / 1000);
    stripe.usageRecords.create(
      user.subscriptionItemID,
      {
        quantity: 2,
        timestamp: currentDate
      },
      (err, usageRecord) => {
        if (err && err != null) {
          return res.status(500).json({
            message: 'Failed to send usage record updating subscription',
            err
          });
        } else {
          return res.status(200).send(usageRecord);
        }
      }
    );
  }
};

// Subscribe is for first time customers. It runs through a series of callback functions:
// 1. Creates a new customer with stripe
// 2. Creates their subscription to the Roostr monthly metered plan
// 3. Creates a usage record to set the number of properties they have
// 4. TO DO: Updates their User profile on the database with Stripe customer info

export const subscribe = async (req, res) => {
  try {
    userID = req.user._id;

    const {
      id,
      email,
      address_line1,
      address_city,
      address_state,
      address_zip,
      name
    } = req.body.token;

    stripe.customers.create(
      {
        email: email,
        address_line1: address_line1,
        address_city: address_city,
        address_state: address_state,
        address_zip: address_zip,
        name: name,
        source: id
      },
      async (err, customer) => {
        const subscription = await createSubscription(err, customer, res);
        if (subscription) {
          return res.status(200);
        } else if (err != null) {
          return res
            .status(500)
            .json({ message: 'Unable to create subscription', err });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

export const updateSubscription = async (req, res) => {
  try {
    stripe.subscriptions
      .update(
        `${subscriptionID}`,
        {
          items: {
            plan: planid,
            quantity: propertyQuantity
          }
        },
        (err, subscription) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          } else {
            // helper function to update
            return res.status(201).json(subscription);
          }
        }
      )
      .then(() => {
        return res
          .status(201)
          .json({ message: 'Successful subscription update!' });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// allows customer to update their CC information on file
export const updateCC = async (req, res, next) => {
  try {
    const { customer, id } = req.body;
    stripe.customers.update(`${customer.id}`, {
      source: id
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
