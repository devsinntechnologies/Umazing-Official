import React from 'react';
import Faq from '@/components/faqs/Faq';

interface FaqData {
  points: string | string[];
  subPoints?: React.ReactNode[];
}

interface FaqItem {
  trigger: string;
  faqData: FaqData[];
}

const Customercare: React.FC = () => {
  const faq1: FaqItem = {
    trigger: "How can I keep track of the status of my order?",
    faqData: [
      {
        points: [
          "The ‘My Account’ section in your Umazing App will help review the status of your orders, so that you can receive relevant information based on the respective ‘Order Number’.",
        ],
      },
    ],
  };

  const faq2: FaqItem = {
    trigger: "Will I get a confirmation call from Umazing after placing an order?",
    faqData: [
      {
        points: [
          "No, we don't call customers for order confirmation. All new customers are logged into the Clicky app via OTP (one-time password), so we take this as order confirmation and ship your order right away.",
        ],
      },
    ],
  };

  const faq3: FaqItem = {
    trigger: "How can I cancel my order?",
    faqData: [
      {
        points: [
          "To cancel your order, please log into the Clicky app, go to your My Account section, open the order you want to cancel, and select the cancel option. Your order can only be canceled before it reaches the ‘Dispatched’ status in your My Account on the Umazing app.",
        ],
      },
    ],
  };

  const faq4: FaqItem = {
    trigger: "What is the procedure for Returns or Exchange?",
    faqData: [
      {
        points: "You can return your product easily through the Umazing app in a few seconds. Just follow these steps:",
        subPoints: [
          <li key="1">Sign in to your Clicky Account from here.</li>,
          <li key="2">Go to the My Order section</li>,
          <li key="3">Click on View Order for the specific order you want to place a replacement/refund request</li>,
          <li key="4">Select the refund/replace option and click on one or all items you want returned or replaced.</li>,
          <li key="5">Select the quantities and reason for replacement/refund</li>,
          <li key="6">Click on the SAVE button to submit the request</li>,
        ],
      },
    ],
  };

  const faq5: FaqItem = {
    trigger: "I wish to become a seller on Umazing",
    faqData: [
      {
        points: ["Fill out this form, and our team will reach out to you as soon as possible."],
      },
    ],
  };

  const faq6: FaqItem = {
    trigger: "I can’t sign in to my account.",
    faqData: [
      {
        points: [
          "Go to the Reset Password page, enter your registered phone or email ID, and tap Reset Password. An OTP will be sent to your phone or email. Enter the OTP and set a new password.",
        ],
      },
    ],
  };

  const faq7: FaqItem = {
    trigger: "What are the delivery charges?",
    faqData: [
      {
        points: [
          "Delivery charge is the fee for the on-time delivery of a purchased product. Our standard shipping charges are Rs 150, but it may vary based on the number of products purchased. For the best understanding, please see the total shipping fee added to your order at the checkout page.",
        ],
      },
    ],
  };

  return (
    <>
      <div className="w-full h-20 bg-primary flex justify-center items-center text-xl md:text-4xl font-bold text-white">
        Hi. How Can We Help?
      </div>
      <div className=" w-full pl-5 pr-5 sm:pl-16 sm:pr-16">
        {/* <h1 className="text-2xl sm:text-4xl text-primary font-semibold pt-8 pb-4">Helps & Topics</h1> */}
        {/* <div className="bg-white w-full h-80 grid grid-cols-2 sm:grid-cols-3 overflow-auto">
          <div className="flex-col flex items-center justify-center gap-4 md:gap-8">
            <img className="size-12 md:size-14" src="./Shippingdelivery.png" alt="Shipping & Delivery" />
            <h1 className="text-xs sm:text-md lg:text-lg">Shipping & Delivery</h1>
          </div>
          <div className="flex-col flex items-center justify-center gap-4 md:gap-8">
            <img className="size-12 md:size-14" src="./Returnreplacement.png" alt="Return & Replacement" />
            <h1 className="text-xs sm:text-md lg:text-lg">Return & Replacement</h1>
          </div>
          <div className="flex-col flex items-center justify-center gap-4 md:gap-8">
            <img className="size-12 md:size-14" src="./Cancellations.png" alt="Cancellations" />
            <h1 className="text-xs sm:text-md lg:text-lg">Cancellations</h1>
          </div>
          <div className="flex-col flex items-center justify-center gap-4 md:gap-8">
            <img className="size-12 md:size-14" src="./Payment.png" alt="Payments & Refund" />
            <h1 className="text-xs sm:text-md lg:text-lg">Payments & Refund</h1>
          </div>
          <div className="flex-col flex items-center justify-center gap-4 md:gap-8">
            <img className="size-12 md:size-14" src="./Businessbuld.png" alt="Business Inquiry & Bulk Order" />
            <h1 className="text-xs sm:text-md lg:text-lg">Business Inquiry & Bulk Order</h1>
          </div>
          <div className="flex-col flex items-center justify-center gap-4 md:gap-8">
            <img className="size-12 md:size-14" src="./Accountsetting.png" alt="Account Settings" />
            <h1 className="text-xs sm:text-md lg:text-lg">Account Settings</h1>
          </div>
        </div> */}
        <h1 className="text-2xl sm:text-4xl text-primary  font-semibold  pt-8 pb-4">Frequently Asked Questions</h1>
        <Faq data={faq1} />
        <Faq data={faq2} />
        <Faq data={faq3} />
        <Faq data={faq4} />
        <Faq data={faq5} />
        <Faq data={faq6} />
        <Faq data={faq7} />
      </div>
    </>
  );
};

export default Customercare;
