import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import axios from "axios";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const name = searchParams.get("name") || "User";
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTransfer = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:3000/api/v1/account/transfer", {
        to: id,
        amount,
      });
      setSuccess("Transfer successful!");
      navigate("/dashboard"); // Redirect to dashboard after successful transfer
    } catch (err) {
      setError("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-2 w-[35%] h-[50%] shadow-lg rounded-lg bg-white">
        <Heading label={"Send Money"} />
        <div className="mt-10 flex flex-col items-start w-[70%]">
          <div className="flex items-center gap-3">
            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-green-500 text-white text-2xl uppercase font-semibold">
              {name[0]}
            </div>
            <div className="mt-2 text-lg uppercase items-center">{name}</div>
          </div>
          <div className="text-lg">{"Amount (in Rs.)"}</div>
          <div className="mt-2 w-full">
            <input
              type="text"
              placeholder="amount"
              className="w-full px-2 py-1 border rounded-lg border-slate-200 outline-none"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mt-4 w-full">
            <button
              className="bg-green-500 w-full rounded-lg h-10 text-white"
              onClick={handleTransfer}
              disabled={loading}
            >
              {loading ? "Processing..." : "Initiate Transfer"}
            </button>
          </div>
          {error && <div className="mt-2 text-red-500">{error}</div>}
          {success && <div className="mt-2 text-green-500">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
