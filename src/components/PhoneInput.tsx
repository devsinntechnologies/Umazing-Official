"use client";
import React, { useState, useEffect } from "react";
import PhoneInputWithCountry, {
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneInputProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(value || "");
  const [isValid, setIsValid] = useState<boolean>(true);

  // Validate phone number whenever it changes
  useEffect(() => {
    if (phoneNumber) {
      setIsValid(isValidPhoneNumber(phoneNumber));
    }
  }, [phoneNumber]);

  const handleChange = (value: string | undefined) => {
    setPhoneNumber(value || "");
    onChange(value || "");
  };

  return (
    <div className="space-y-2">

      <PhoneInputWithCountry
        value={phoneNumber}
        onChange={handleChange}
        defaultCountry="PK"
        placeholder="Enter phone number"
        className="border border-gray-300 p-2 rounded-md w-full !outline-0"
        international
        countrySelectProps={{ withCallingCode: true }} // This enables showing country code with flag
      />
    </div>
  );
};

export default PhoneInput;
