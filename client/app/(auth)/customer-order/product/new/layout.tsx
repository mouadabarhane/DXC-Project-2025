"use client";

import { Fragment, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import NewCustomerOrderContextProvider, {
  NewCustomerOrderContext,
} from "./context/new-customer-order-context";
import Header from "../../../dashboard/components/header/Header";
import Footer from "../../../dashboard/components/Footer";
import Sidebar from "../../../dashboard/components/Sidebar";

type StepType = {
  id: number;
  title: string;
  path: string;
};

const STEPS: StepType[] = [
  { id: 1, title: "Create Order", path: "create-order" },
  { id: 2, title: "Select Product", path: "select-product" },
  { id: 3, title: "Configure Product", path: "configure-product" },
  { id: 4, title: "Review Order", path: "review-order" },
];

function RootLayout({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const pathname = usePathname();

  const myContext = useContext(NewCustomerOrderContext);

  const [currentStep, setCurrentStep] = useState(1);

  const handleStepOnClick = (step: StepType) => {
    route.push("/customer-order/product/new/" + step.path);
  };

  useEffect(() => {
    if (!myContext.account.value && currentStep >= 2) {
      handleStepOnClick(STEPS[0]);
    } else if (!myContext.selectedLocationId && currentStep >= 3) {
      handleStepOnClick(STEPS[1]);
    }
  }, [myContext.account, myContext.selectedLocationId, currentStep]);

  useEffect(() => {
    const target = pathname?.split("/")?.slice(-1)?.[0];
    const stepFound = STEPS.find((step) => step.path === target);
    if (stepFound) {
      setCurrentStep(stepFound.id);
    }
  }, [pathname]);

  return (
    <div className="product-customer-orders">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          <div className="new-customer-order">
            <h1 className="p-4">New Product Order</h1>
            <div className="flex gap-4 p-2 text-sm">
              <div className="flex flex-col">
                <h4>Account</h4>
                <h5 className="text-sky-600">{myContext.account?.label}</h5>
              </div>
              <div className="flex flex-col">
                <h4>Contact</h4>
                <h5 className="text-sky-600">{myContext.contact?.label}</h5>
              </div>
            </div>
            <div className="flex justify-center gap-4 font-extrabold p-4 border-b-2 border-t-2 border-gray-500">
              {STEPS.map((step, index) => (
                <Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <span
                      onClick={() => handleStepOnClick(step)}
                      className={`flex items-center justify-center cursor-pointer border-2 ${
                        currentStep === step.id ? "border-[#39175f]" : ""
                      } ${
                        currentStep !== step.id ? "text-gray-500" : ""
                      } w-8 h-8 rounded-full bg-opacity-75 bg-[#c19de8]`}
                    >
                      {step.id}
                    </span>
                    <h4
                      onClick={() => handleStepOnClick(step)}
                      className={`cursor-pointer ${
                        currentStep !== step.id ? "text-gray-500" : ""
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>
                  {index !== STEPS.length - 1 && (
                    <hr
                      className={`border-2 ${
                        index + 1 < currentStep
                          ? "border-[#5f249f]"
                          : "border-gray-500"
                      } w-16 mt-4`}
                    />
                  )}
                </Fragment>
              ))}
            </div>

            <div className="flex">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default function ExtraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NewCustomerOrderContextProvider>
      <RootLayout>{children}</RootLayout>
    </NewCustomerOrderContextProvider>
  );
}
