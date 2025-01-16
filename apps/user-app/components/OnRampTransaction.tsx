import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t, idx) => (
          <div className="flex justify-between border-b-[1px] py-2" key={idx}>
            <div>
              {t.status === "Success" ? (
                <div className="text-sm text-green-500 font-bold">
                  Received INR
                </div>
              ) : t.status === "Processing" ? (
                <div className="text-sm text-yellow-500 font-bold">
                  Transaction Pending
                </div>
              ) : (
                <div className="text-sm text-red-500 font-bold">
                  Transaction Failed
                </div>
              )}
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div
              className={`flex flex-col justify-center font-bold ${
                t.status === "Success"
                  ? "text-green-500"
                  : t.status === "Processing"
                    ? "text-yellow-500"
                    : "text-red-500"
              }`}
            >
              Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
