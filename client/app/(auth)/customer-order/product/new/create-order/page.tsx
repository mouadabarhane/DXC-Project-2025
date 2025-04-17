"use client";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import {
  NewCustomerOrderContext,
  OptionType,
} from "../context/new-customer-order-context";
import { AccountServices, ContactServices } from "../services";

interface AccountType {
  sys_id: string;
  name: string;
}

export default function CreateOrder() {
  const route = useRouter();

  const myContext = useContext(NewCustomerOrderContext);

  const [contacts, setContacts] = useState([] as Array<OptionType>);
  const [accounts, setAcconts] = useState([] as Array<OptionType>);
  const [firstAccount, setFirstAccount] = useState<AccountType | null>(null);

  // oussama : I separated the logic in two useEffect so that we first get accounts , then get the contacts of the accounts
  useEffect(() => {
    const getAccounts = async () => {
      try {
        // oussama :  To get only accounts that has a primary contact
        const response = await AccountServices.getAccounts();
        console.log("getAccounts response.data.result", response.data.result);
        // console.log("getAccountById response.data.result", response.data.result);
        if (response.data.result.length > 0) {
          myContext.setAccount({
            value: response.data.result[0].sys_id,
            label: response.data.result[0].name,
          });
          setFirstAccount(response.data.result[0]);

          const accountOptions = response.data.result.map((account: any) => {
            return {
              value: account.sys_id,
              label: account.name,
            };
          });
          console.log("Account Options", accountOptions);
          setAcconts(accountOptions);
        }
      } catch (error) {
        console.error("Error fetching accounts", error);
      }
    };

    getAccounts();
  }, []);

  useEffect(() => {
    const getContacts = async (firstAccountId: string) => {
      try {
        const response = await ContactServices.getContacts(firstAccountId);

        console.log("getContacts response.data.result", response);

        const contactOptions = response.data.result.map((contact: any) => {
          return {
            value: contact.sys_id,
            label: contact.name,
          };
        });
        console.log("Contact Options", contactOptions);
        setContacts(contactOptions);
      } catch (error) {
        console.error("Error fetching contacts", error);
      }
    };

    if(myContext.account){
      getContacts(myContext.account.value);
      return;
    }


    if(myContext.account){
      getContacts(myContext.account.value);
      return;
    }

    if(firstAccount) {
    getContacts(firstAccount.sys_id);
    }
  }, [firstAccount]);
  const handleContinueOnClick = () => {
    route.push("/customer-order/product/new/select-product");
  };

  return (
    <div className="create-order flex flex-col p-4 gap-4 w-full">
      <div className="flex justify-between w-full gap-4">
        {/* <InputText
          slug="account"
          title="Account"
          required={true}
          placeholder="Account"
          value={myContext.account.label}
        />
  */}
        <div className="sm:col-span-3 w-full">
          <label className="block text-xs font-medium leading-6 text-gray-900">
            Account <span className=" text-red-600 font-bold ">*</span>
          </label>
          <SelectInput
            options={accounts}
            className="mt-2 w-full"
            selected={[myContext.account]}
            onChange={myContext.setAccount}
            isMulti={false}
          />
        </div>
        <div className="sm:col-span-3 w-full">
          <label className="block text-xs font-medium leading-6 text-gray-900">
            Contact <span className=" text-red-600 font-bold ">*</span>
          </label>
          <SelectInput
            className="mt-2 w-full"
            options={contacts}
            selected={[myContext.contact]}
            onChange={myContext.setContact}
            isMulti={false}
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={handleContinueOnClick}
          className="rounded-md bg-[#5f249f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5f249f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5f249f]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
