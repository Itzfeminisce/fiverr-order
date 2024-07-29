import React from "react"
import useGetPaymentCards from "../../../../hooks/useGetPaymentCards"
import PaymentCard from "../../Components/PaymentCard"

const Cards: React.FC = () => {
  const { cards, errors, loading } = useGetPaymentCards()
  if (loading) return "Loading..."
  if (errors) return errors
  return (
    cards.map(card => (
      <PaymentCard card={card} />
    ))
  )
}

export default Cards