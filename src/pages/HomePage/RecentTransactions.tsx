import { default as React, useMemo } from "react";
import { dateDiff, getTextForTimeDifference } from "../../utils/date";
import {
  DataTimestamp,
  DataBox,
  DataItem,
  DataTitle,
  TxType,
  TransactionAddress,
  TransactionRecipientLabel,
  TransactionRecipientLink,
  TransactionTypeColumn,
  TransactionHashColumn,
  TransactionRecipientsColumn,
  TransactionRecipientsWrapper,
  TransactionsDataBoxRow,
  TransactionRowColumn,
} from "./components";
import { HomePageTransaction } from "./__generated__/operations";

type Props = {
  transactions: HomePageTransaction[];
};

export const RecentTransactions: React.FC<Props> = ({ transactions }) => {
  const sortedTransactions = transactions
    .sort((t1, t2) =>
      new Date(t1.status!.time).getTime() - new Date(t2.status!.time).getTime() <= 0 ? 1 : -1,
    )
    .slice(0, 5);

  return (
    <DataItem>
      <DataTitle>Recent Transactions</DataTitle>
      <DataBox>
        {sortedTransactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </DataBox>
    </DataItem>
  );
};

const TransactionRow = ({ transaction }: { transaction: HomePageTransaction }) => {
  const difference = useMemo(() => {
    return dateDiff(new Date(), new Date(transaction.status!.time));
  }, [transaction]);
  const timestamp = useMemo(() => getTextForTimeDifference(difference), [difference]);

  return (
    <TransactionsDataBoxRow key={transaction.id}>
      <TransactionRowColumn>
        <TransactionTypeColumn>
          <TxType>{transaction.isScript ? "Script" : "Create"}</TxType>
        </TransactionTypeColumn>
        <TransactionHashColumn>
          <TransactionAddress
            id="recent-transaction-link"
            to={`/${transaction.isScript === false ? "create-transaction" : "transaction"}/${
              transaction.id
            }`}
          >
            {transaction.id}
          </TransactionAddress>
          <DataTimestamp>{timestamp}</DataTimestamp>
        </TransactionHashColumn>
      </TransactionRowColumn>
      <TransactionRecipientsColumn>
        <TransactionRecipientsWrapper>
          <TransactionRecipientLabel>From:</TransactionRecipientLabel>
          {transaction.inputs.map((input) =>
            input.__typename === "InputCoin" ? (
              <TransactionRecipientLink to={`/address/${input.owner}`}>
                {input.owner}
              </TransactionRecipientLink>
            ) : (
              input.__typename
            ),
          )}
        </TransactionRecipientsWrapper>
        <TransactionRecipientsWrapper>
          <TransactionRecipientLabel>To:</TransactionRecipientLabel>
          {transaction.outputs.map((output) =>
            output.__typename === "CoinOutput" ? (
              <TransactionRecipientLink to={`/address/${output.to}`}>
                {output.to}
              </TransactionRecipientLink>
            ) : (
              output.__typename
            ),
          )}
        </TransactionRecipientsWrapper>
      </TransactionRecipientsColumn>
    </TransactionsDataBoxRow>
  );
};
