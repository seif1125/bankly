import TransactionHistoryPage from './[account_id]/page'

const FallbackTransactionHistoryPage = async () => {
  return <TransactionHistoryPage params={null} />
}

export default FallbackTransactionHistoryPage
