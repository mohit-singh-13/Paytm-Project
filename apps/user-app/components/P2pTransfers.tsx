"use client";

import { Card } from "@repo/ui/card";

export const P2pTransfers = ({
  transactions,
}: {
  transactions: {
    id: number;
    time: Date;
    amount: number;
    sender: number;
    recipient: number;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <div className="m-8">
        <Card title="Recent Transactions">
          <div className="text-center pb-8 pt-8">No Recent transactions</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="m-8 w-[80%] sm:w-[70%] mx-auto">
      <Card title="P2P Transactions">
        <div className="pt-2">
          {transactions.map((t, idx) => (
            <div className="flex justify-between border-b-[1px] py-2" key={idx}>
              <div>
                {t.id === t.recipient ? (
                  <div className="text-sm text-green-500 font-bold">
                    Received INR
                  </div>
                ) : (
                  <div className="text-sm text-red-500 font-bold">Sent INR</div>
                )}
                <div className="text-slate-600 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div
                className={`flex flex-col justify-center font-bold ${
                  t.id === t.recipient ? "text-green-500" : "text-red-500"
                }`}
              >
                Rs {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
