import { getServerSession } from "next-auth";
import { P2pTransfers } from "../../../components/P2pTransfers";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getP2pTransfers() {
  const session = await getServerSession(authOptions);
  const transfers = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        {
          recipientId: Number(session?.user?.id),
        },
        {
          senderId: Number(session?.user?.id),
        },
      ],
    },
  });

  return transfers.map((t) => ({
    id: Number(session.user.id),
    time: t.timestamp,
    amount: t.amount,
    sender: t.senderId,
    recipient: t.recipientId,
  }));
}

export default async function Home() {
  const p2pTransfers = await getP2pTransfers();
  
  return (
    <div className="w-full">
      <P2pTransfers transactions={p2pTransfers} />
    </div>
  );
}
