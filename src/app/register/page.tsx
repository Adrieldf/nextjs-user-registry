"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import DatePickerField from "@/components/DatePickerField";
import { toast } from "react-toastify";
import { useAddUser } from "@/hooks/useAddUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const RegisterPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const { status } = useSession();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const redirectOrClearInputs = () => {
    toast.success("User saved successfully!");
    // Redirect to login after first registration
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobileNumber("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setBirthDate(null);
    }
  };
  const { mutate: addUser, isPending } = useAddUser(redirectOrClearInputs);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValidations({
      minLength: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    });
  };

  const allValid = Object.values(passwordValidations).every(Boolean);
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid || !passwordsMatch) {
      toast.error(
        "Please make sure all password requirements are met and the passwords match."
      );
      return;
    }

    addUser({
      firstName,
      lastName,
      email,
      mobileNumber,
      username,
      password,
      birthDate,
    });
  };

  return (
    <div className="flex h-min bg-slate-900 text-slate-100 min-h-screen p-4">
      <div className="w-full max-w-screen-lg bg-slate-800 text-slate-100 p-8 rounded-lg shadow-md overflow-y-auto h-min">
        <h2 className="text-2xl font-bold mb-6">Register user</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
            <InputField
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <InputField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="w-full">
              <label
                htmlFor="phone"
                className="block text-sm font-medium common-text mb-1"
              >
                Mobile Number
              </label>
              <PhoneInput
                country={"us"} // Set default country code
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e)}
                inputProps={{
                  name: "phone",
                  required: false,
                  className: "w-full p-2 border rounded common-input pl-12",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <InputField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4 relative">
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
            />
            {isPasswordFocused && (
              <div className="absolute bottom-full mt-2 p-3 bg-slate-500 border rounded shadow-md w-50 z-11">
                <p
                  className={
                    passwordValidations.minLength
                      ? "text-slate-300"
                      : "text-slate-700"
                  }
                >
                  • Minimum 8 characters
                </p>
                <p
                  className={
                    passwordValidations.uppercase
                      ? "text-slate-300"
                      : "text-slate-700"
                  }
                >
                  • At least one uppercase letter
                </p>
                <p
                  className={
                    passwordValidations.lowercase
                      ? "text-slate-300"
                      : "text-slate-700"
                  }
                >
                  • At least one lowercase letter
                </p>
                <p
                  className={
                    passwordValidations.number
                      ? "text-slate-300"
                      : "text-slate-700"
                  }
                >
                  • At least one number
                </p>
                <p
                  className={
                    passwordValidations.specialChar
                      ? "text-slate-300"
                      : "text-slate-700"
                  }
                >
                  • At least one special character (e.g., !@#$%^&*)
                </p>
              </div>
            )}
            <InputField
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && !passwordsMatch && (
              <div className="absolute bottom-full mt-2 p-3 bg-slate-500 border rounded shadow-md w-50 z-10">
                <p className="text-slate-300 text-sm mt-1">
                  Passwords do not match.
                </p>
              </div>
            )}
          </div>
          <DatePickerField
            label="Birth Date"
            value={birthDate}
            onChange={(date) => setBirthDate(date)}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 common-button"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
