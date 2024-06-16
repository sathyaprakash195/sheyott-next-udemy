import React from "react";
import { subscriptionPlans } from "./data";
import { Button, message } from "antd";
import { createPaymentIntent } from "@/server-actions/payments";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModal from "./payment-modal";
import { IUsersGlobalStore, useUsersGlobalStore } from "@/store/users-store";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
function SubscriptionDetails() {
  const { loggedInUserData }: IUsersGlobalStore =
    useUsersGlobalStore() as IUsersGlobalStore;
  const [clientSecret, setClientSecret] = React.useState<string>("");
  console.log("loggedInUserData", loggedInUserData);
  const [selectedPlan, setSelectedPlan] = React.useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] =
    React.useState<boolean>(false);
  const [tenure, setTenure] = React.useState<string>("monthly");
  const getClientSecret = async (amount: number, plan: any) => {
    try {
      const response: any = await createPaymentIntent(amount);
      if (response.success) {
        setClientSecret(response.data.clientSecret);
        setSelectedPlan(plan);
        setShowPaymentModal(true);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const renderUserSubscriptionProperty = (label: string, value: any) => {
    return (
      <div className="flex flex-col">
        <span className="font-bold text-sm">{label}</span>
        <span className="text-sm text-gray-600">{value}</span>
      </div>
    );
  };

  return (
    <div>
      {loggedInUserData?.currentSubscription && (
        <>
          <div>
            <h1 className="text-lg font-bold text-gray-500">Current Subscription: </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-7">
              {renderUserSubscriptionProperty(
                "Plan",
                loggedInUserData?.currentSubscription.plan.name
              )}

              {renderUserSubscriptionProperty(
                "Price",
                `$${loggedInUserData?.currentSubscription.price}`
              )}

              {renderUserSubscriptionProperty(
                "Expiry Date",
                loggedInUserData?.currentSubscription?.expiryDate
              )}

              {renderUserSubscriptionProperty(
                "Payment Id",
                loggedInUserData?.currentSubscription?.paymentId
              )}

              {renderUserSubscriptionProperty(
                "Purchased On",
                loggedInUserData?.currentSubscription?.createdAt
              )}
            </div>
          </div>

          <hr className="my-5 border-gray-400" />
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">
        {subscriptionPlans.map((plan, index) => (
          <div className="p-5 border border-black rounded-sm">
            <h1 className="text-3xl font-bold">{plan.name}</h1>
            <h1 className="text-sm font-bold text-gray-500">
              {plan.price.perMonth} / Per Month
            </h1>
            <h1 className="text-sm font-bold text-gray-500">
              {plan.price.perYear} / Per Year
            </h1>

            <hr className="my-3" />

            <div className="flex flex-col gap-1">
              {plan.features.map((feature) => (
                <p className="text-sm font-semibold">* {feature}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-7 mt-7">
              <Button
                onClick={() => {
                  getClientSecret(plan.price.perMonth, plan);
                  setTenure("monthly");
                }}
              >
                Buy Monthly Plan
              </Button>

              <Button
                type="primary"
                onClick={() => {
                  getClientSecret(plan.price.perYear, plan);
                  setTenure("yearly");
                }}
              >
                Buy Yearly Plan
              </Button>
            </div>
          </div>
        ))}

        {showPaymentModal && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <PaymentModal
              showPaymentModal={showPaymentModal}
              setShowPaymentModal={setShowPaymentModal}
              plan={selectedPlan}
              tenure={tenure}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default SubscriptionDetails;
