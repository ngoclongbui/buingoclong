interface WalletBalance {
  currency: string;
  amount: number;
  // 1. The WalletBalance interface lacks the blockchain property.
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
    // 2. Can using object to find value. Because getPriority don't do anything with the data either.
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // 3. Property 'blockchain' does not exist on type 'WalletBalance'.
        if (lhsPriority > -99) {
          // 4. Cannot find name 'lhsPriority'. It is can be the balancePriority.
          if (balance.amount <= 0) {
            return true;
          }
        }

        return false;
        // 5. Just can be using one line for this result filter.
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);
  // 6. Even if the price changes, it does not affect the balance values.

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  // 7. FormattedBalances has not been used.

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    // 8.
    // - sortedBalances is not FormattedWalletBalance type, in this context it is WalletBalance.
    // - and if this is a mistake of the variable name, we can using 1 loop for problem (formatted and return in new value).
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
