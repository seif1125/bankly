import PaymentTransfer from './[account_id]/page'

const FallbackPaymentTransfer = async () => {
  return <PaymentTransfer params={null} />
}

export default FallbackPaymentTransfer