import CreateListingForm from "@/components/seller/CreateListingForm"
import AIHelper from "@/components/ai/AIHelper"
import SubscribeButton from "@/components/SubscribeButton"

export default function Page() {
  return (
    <div>
      <h1>Seller Dashboard</h1>
      <CreateListingForm />
      <AIHelper />
      <SubscribeButton />
    </div>
  )
}
