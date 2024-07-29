import useGetGigs from '../../../../hooks/useGetGigs'
import GigCard from '../../Components/GigCard'

const Gigs = () => {
  const { gigData, errors, loading } = useGetGigs()
  if (loading) return "Loading..."
  if (errors) return errors
  return (
    gigData.map(gig => (
      <GigCard gig={gig} />
    ))
  )
}

export default Gigs