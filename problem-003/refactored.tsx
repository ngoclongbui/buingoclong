interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const blockchainPriorities: { [key: string]: number } = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    return blockchainPriorities[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const formattedWalletBalance: FormattedWalletBalance = {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
    const usdValue = prices[balance.currency] * balance.amount || 0;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={formattedWalletBalance.amount}
        usdValue={usdValue}
        formattedAmount={formattedWalletBalance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
