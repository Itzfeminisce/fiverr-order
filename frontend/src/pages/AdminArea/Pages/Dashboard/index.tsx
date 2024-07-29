import useGetAnalytics from "../../../../hooks/useGetAnalytics"

const Dashboard = () => {
    const {analytic,errors,loading} = useGetAnalytics()
    if (loading) return "Loading..."
    if (errors) return errors
    return (
        <div className="m-4 space-y-4">
            <div className="bg-gray-100 rounded-md p-4">
                <div className="">
                    <p>Total: <span className="font-semibold">{analytic?.gig.totalCreated}</span></p>

                </div>
                <hr className="divide-dashed my-4" />
                <p className="text-center text-gray-500">Gigs</p>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
                <div className="">
                    <p>Total: <span className="font-semibold">{analytic?.card.totalCreated}</span></p>
                    <p>Payment Attempt: <span className="font-semibold">{analytic?.card.totalPaymentAttempt}</span></p>
                    <p>Payment Successful: <span className="font-semibold">{analytic?.card.totalSuccesfulPayment}</span></p>
                    <p>Payment Failed: <span className="font-semibold">{analytic?.card.totalFailedPayment}</span></p>

                </div>
                <hr className="divide-dashed my-4" />
                <p className="text-center text-gray-500">Cards</p>
            </div>
        </div>
    )
}

export default Dashboard